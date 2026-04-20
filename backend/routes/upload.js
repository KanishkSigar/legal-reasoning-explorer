require('dotenv').config();
const express = require('express');
const multer  = require('multer');
const router  = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        // Accept any PDF — browsers sometimes send different mimetypes
        const isPDF = file.mimetype === 'application/pdf'
            || file.mimetype === 'application/octet-stream'
            || file.originalname.toLowerCase().endsWith('.pdf');
        if (isPDF) cb(null, true);
        else cb(new Error('Only PDF files are allowed.'));
    }
});

async function extractTextFromPDF(buffer) {
    const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');

    const loadingTask = pdfjsLib.getDocument({
        data: new Uint8Array(buffer),
        verbosity: 0
    });
    const pdf = await loadingTask.promise;

    const pageTexts = [];
    for (let i = 1; i <= pdf.numPages; i++) {
        const page    = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items
            .map(item => ('str' in item ? item.str : ''))
            .join(' ')
            .replace(/ {2,}/g, ' ')
            .trim();
        if (pageText) pageTexts.push(pageText);
    }

    return { text: pageTexts.join('\n\n'), pages: pdf.numPages };
}

// Inline multer error handling — avoids Express router middleware quirks
router.post('/', (req, res) => {
    upload.single('pdf')(req, res, async (err) => {
        if (err) {
            console.error('[Upload] Multer error:', err.message);
            if (err.code === 'LIMIT_FILE_SIZE')
                return res.status(413).json({ error: 'File too large. Maximum size is 5MB.' });
            return res.status(400).json({ error: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No PDF file received.' });
        }

        console.log('[Upload] Received file:', req.file.originalname, 'size:', req.file.size, 'mime:', req.file.mimetype);

        try {
            const { text, pages } = await extractTextFromPDF(req.file.buffer);

            if (!text || text.length < 20) {
                return res.status(422).json({ error: 'Could not extract text. The PDF may be scanned or image-based.' });
            }

            console.log('[Upload] Extracted', text.length, 'chars from', pages, 'pages');
            res.json({ text, pages, filename: req.file.originalname, size: req.file.size });
        } catch (parseErr) {
            console.error('[Upload] PDF parse error:', parseErr.message);
            res.status(500).json({ error: 'Failed to parse PDF: ' + parseErr.message });
        }
    });
});

module.exports = router;
