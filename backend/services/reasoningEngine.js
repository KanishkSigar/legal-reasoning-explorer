const Node = require('../models/nodeModel');

/**
 * Phase 2 – Enhanced Reasoning Engine
 *
 * Improvements over Phase 1:
 *  - 4 node types: claim, precedent, conclusion, reasoning
 *  - Better sentence splitting that respects legal abbreviations (vs., no., art., sec.)
 *  - Expanded keyword patterns for richer extraction
 *  - Priority ranking: conclusion > reasoning > claim > precedent
 */
class ReasoningEngine {
    constructor() {
        this.patterns = {
            conclusion: /\b(held that|holds that|it is held|therefore|thus|accordingly|consequently|we conclude|court concludes|verdict is|judgment is|decision is|hereby orders|dismissed|allowed|quashed|upheld|set aside)\b/i,
            reasoning:  /\b(because|since|as it appears|in view of|on account of|in light of|having regard to|considering that|it follows that|this is so because|the reason being|for the foregoing reasons|it is evident|it is clear that|the court is of the opinion)\b/i,
            claim:      /\b(argued|claimed|contended|submitted|alleged|pleaded|urged|asserted|maintained|averred|it is the case of|the petitioner claims|the appellant submits|the respondent argues)\b/i,
            precedent:  /\b(vs\.?|v\.s\.?|cited|relied on|referred to|as held in|in the case of|the ratio in|following the decision|the principle in|the judgment in|as per|pursuant to)\b/i,
        };

        // Legal abbreviations to avoid splitting on
        this.abbreviations = /\b(vs|v\.s|no|art|sec|cl|para|p|vol|ed|approx|dept|govt|hon|sr|jr|dr|mr|mrs|ms)\./gi;
    }

    /**
     * Smart sentence splitter that preserves legal abbreviations.
     */
    _splitSentences(text) {
        // Temporarily replace known abbreviation periods with a placeholder
        const placeholder = '<<<DOT>>>';
        let protected_text = text.replace(this.abbreviations, (match) => match.replace('.', placeholder));

        // Split on sentence-ending punctuation
        const raw = protected_text.match(/[^.!?]+[.!?]+/g) || [text];

        // Restore placeholders
        return raw.map(s => s.replace(new RegExp(placeholder, 'g'), '.').trim()).filter(Boolean);
    }

    process(text) {
        const sentences = this._splitSentences(text);
        const nodes = [];

        sentences.forEach((sentence, index) => {
            const clean = sentence.trim();
            if (!clean || clean.length < 10) return;

            let type = null;

            // Priority: conclusion > reasoning > claim > precedent
            if (this.patterns.conclusion.test(clean)) {
                type = 'conclusion';
            } else if (this.patterns.reasoning.test(clean)) {
                type = 'reasoning';
            } else if (this.patterns.claim.test(clean)) {
                type = 'claim';
            } else if (this.patterns.precedent.test(clean)) {
                type = 'precedent';
            }

            if (type) {
                nodes.push(new Node(`node-${index}`, type, clean));
            }
        });

        return nodes;
    }
}

module.exports = new ReasoningEngine();
