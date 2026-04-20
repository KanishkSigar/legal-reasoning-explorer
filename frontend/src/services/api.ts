import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const processText = async (text: string) => {
    const response = await axios.post(`${API_URL}/process`, { text });
    return response.data;
};

// ── Authentication (JWT) ──────────────────────────────────
export const login = async (name: string, email: string) => {
    const response = await axios.post(`${API_URL}/login`, { name, email });
    return response.data;
};

export const verifyToken = async (token: string) => {
    const response = await axios.get(`${API_URL}/verify`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const sendChatMessage = async (
    messages: { role: 'user' | 'assistant'; content: string }[],
    context?: { judgmentText?: string; graphData?: any }
) => {
    const response = await axios.post(`${API_URL}/chat`, { messages, context });
    return response.data;
};

export const uploadPDF = async (file: File) => {
    const formData = new FormData();
    formData.append('pdf', file);
    const response = await axios.post(`${API_URL}/upload-pdf`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};
