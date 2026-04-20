import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './services/api';

const LandingPage: React.FC = () => {
    // Auth State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // UI State
    const [activeTab, setActiveTab] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !email.trim()) {
            setError('Please provide both Name and Email to continue.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const res = await login(name, email);
            localStorage.setItem('token', res.token);
            navigate('/app');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Validation failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const tabs = [
        {
            title: "PRE-BUILT APPLICATIONS",
            headline: "Contextual NLP Extraction",
            desc: "Automatically identify and extract claims, precedents, reasoning chains, and conclusions from verbose legal texts with domain-trained natural language processing.",
            label: "GUIDE: ENTITY RECOGNITION"
        },
        {
            title: "APPLICATION ACCELERATORS",
            headline: "Dagre Auto-Layout Graphing",
            desc: "Visualize highly complex legal argument topologies with high-performance automated directional graphs that adapt to nested reasoning.",
            label: "GUIDE: TOPOLOGIES"
        },
        {
            title: "TAILORED APPLICATIONS",
            headline: "Zero-Latency Synchronization",
            desc: "Toggle seamlessly between visual reasoning graphs and structured JSON data arrays. Ready to export, ready to integrate into your existing firm software.",
            label: "GUIDE: PIPELINES"
        }
    ];

    return (
        <div style={{
            fontFamily: 'Inter, sans-serif',
            color: '#00393e',
            display: 'flex',
            flexDirection: 'column',
            width: '100%'
        }}>
            {/* Top Navigation */}
            <nav style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '24px 60px',
                position: 'sticky',
                top: 0,
                background: 'rgba(235, 253, 255, 0.8)',
                backdropFilter: 'blur(12px)',
                zIndex: 100,
                borderBottom: '1px solid rgba(0, 57, 62, 0.05)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: 32, height: 32, background: '#000000', color: 'white', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>⚖️</div>
                        <span style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.03em' }}>Lex.ai</span>
                    </div>
                    <div style={{ display: 'flex', gap: '24px', fontSize: '13px', fontWeight: 500, color: '#1f6870' }}>
                        <span style={{ cursor: 'pointer' }}>Agentic Legal Apps</span>
                        <span style={{ cursor: 'pointer' }}>Platform</span>
                        <span style={{ cursor: 'pointer' }}>Marketplace</span>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Sign in</span>
                    <button style={{
                        padding: '10px 20px',
                        background: '#000000',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        cursor: 'pointer'
                    }}>Get in Touch</button>
                </div>
            </nav>

            {/* Hero Section */}
            <section style={{
                padding: '120px 20px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '32px'
            }}>
                <div style={{
                    background: '#005cc1',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                }}>New Release Available</div>

                <h1 style={{
                    fontSize: '5rem',
                    fontWeight: 700,
                    letterSpacing: '-0.04em',
                    lineHeight: 1.05,
                    maxWidth: '1000px',
                    margin: 0
                }}>
                    Visualizing Legal Reasoning  <br />Through Interactive Graphs
                </h1>

                <p style={{
                    fontSize: '1.25rem',
                    color: '#1f6870',
                    maxWidth: '600px',
                    margin: 0,
                    fontWeight: 400
                }}>
                    Built on the industry-leading, analyst-recognized agent platform. Transform unstructured judgments into powerful interactive graphs.
                </p>

                <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                    <button style={{
                        padding: '14px 28px',
                        background: '#000000',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                    }}>Get a Demo</button>
                    <button style={{
                        padding: '14px 28px',
                        background: 'transparent',
                        color: '#00393e',
                        border: '1px solid rgba(0, 57, 62, 0.2)',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        cursor: 'pointer'
                    }}>Analyst Reports</button>
                </div>
            </section>

            {/* Features Array */}
            <section style={{ padding: '40px 60px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                    {[
                        { title: 'Information Extraction', text: 'Instantly pull claims, precedents, reasoning, and conclusions from deep textual records.' },
                        { title: 'Interactive Graph Topologies', text: 'Understand complex dependencies at a glance with beautiful, auto-correcting vector networks.' },
                        { title: 'Secure Enterprise Output', text: 'All data synchronizes to structured JSON format ready for ingest into your firm\'s knowledge base.' }
                    ].map((feature, i) => (
                        <div key={i} style={{
                            background: 'rgba(255, 255, 255, 0.6)',
                            border: '1px solid rgba(0, 57, 62, 0.05)',
                            padding: '32px',
                            borderRadius: '16px',
                            boxShadow: '0 12px 32px rgba(0, 57, 62, 0.04)',
                            transition: 'bottom 0.2s',
                            position: 'relative',
                            bottom: 0
                        }} onMouseOver={(e) => e.currentTarget.style.bottom = '4px'} onMouseOut={(e) => e.currentTarget.style.bottom = '0px'}>
                            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>{feature.title}</h3>
                            <p style={{ fontSize: '14px', color: '#1f6870', lineHeight: 1.6 }}>{feature.text}</p>
                            <div style={{ marginTop: '24px', width: '32px', height: '32px', borderRadius: '50%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                                →
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Split Capabilities Section */}
            <section style={{
                padding: '120px 60px',
                maxWidth: '1400px',
                margin: '0 auto',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '80px'
            }}>
                <h2 style={{
                    fontSize: '3.5rem',
                    fontWeight: 700,
                    letterSpacing: '-0.04em',
                    lineHeight: 1.1,
                    maxWidth: '800px',
                    margin: 0
                }}>
                    Agentic AI applications that drive faster business outcomes in legal analysis, argument prep, and research automation
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '60px' }}>
                    {/* Left Tabs */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ fontSize: '11px', fontWeight: 600, color: '#41848c', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                            Use tabs to explore more ↓
                        </div>
                        {tabs.map((tab, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveTab(idx)}
                                style={{
                                    padding: '20px 24px',
                                    textAlign: 'left',
                                    background: activeTab === idx ? '#000000' : 'transparent',
                                    color: activeTab === idx ? '#ffffff' : '#00393e',
                                    border: activeTab === idx ? 'none' : '1px solid rgba(0, 57, 62, 0.1)',
                                    borderRadius: '12px',
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    letterSpacing: '0.05em',
                                    textTransform: 'uppercase',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    boxShadow: activeTab === idx ? '0 12px 24px rgba(0,0,0,0.1)' : 'none'
                                }}
                            >
                                {tab.title}
                            </button>
                        ))}
                    </div>

                    {/* Right Content Profile */}
                    <div style={{
                        background: '#ffffff',
                        borderRadius: '24px',
                        padding: '60px',
                        boxShadow: '0 20px 60px rgba(0, 57, 62, 0.08)',
                        border: '1px solid rgba(0, 57, 62, 0.04)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '24px'
                    }}>
                        <h3 style={{ fontSize: '32px', fontWeight: 700, margin: 0, letterSpacing: '-0.02em', color: '#005cc1' }}>
                            {tabs[activeTab].headline}
                        </h3>
                        <p style={{ fontSize: '18px', color: '#1f6870', lineHeight: 1.6, maxWidth: '600px', margin: 0 }}>
                            {tabs[activeTab].desc}
                        </p>
                        <div style={{ marginTop: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <button style={{
                                padding: '12px 24px',
                                background: '#000000',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '11px',
                                fontWeight: 700,
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                                cursor: 'pointer'
                            }}>Learn More ▸</button>
                            <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#41848c' }}>
                                {tabs[activeTab].label}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Auth Gate Footer Section */}
            <section style={{
                background: '#ffffff',
                padding: '100px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderTop: '1px solid rgba(0, 57, 62, 0.05)'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    maxWidth: '480px',
                    width: '100%',
                    gap: '32px'
                }}>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.03em', margin: '0 0 16px 0' }}>Ready to explore?</h2>
                        <p style={{ fontSize: '15px', color: '#1f6870', margin: 0 }}>Provide your credentials below to establish a session and enter the analytical dashboard.</p>
                    </div>

                    <div style={{ width: '100%' }}>
                        {error && (
                            <div style={{ padding: '14px', background: '#fff1f2', color: '#e11d48', borderRadius: '12px', fontSize: '13px', fontWeight: 500, marginBottom: '20px' }}>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Full Name"
                                    style={{
                                        padding: '18px 20px',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(193, 199, 204, 0.5)',
                                        background: '#f8fbfc',
                                        fontSize: '15px',
                                        color: '#00393e',
                                        outline: 'none',
                                        transition: 'all 0.2s',
                                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                                    }}
                                    onFocus={(e) => { e.target.style.borderColor = '#005cc1'; e.target.style.background = '#ffffff'; }}
                                    onBlur={(e) => { e.target.style.borderColor = 'rgba(193, 199, 204, 0.5)'; e.target.style.background = '#f8fbfc'; }}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Work Email"
                                    style={{
                                        padding: '18px 20px',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(193, 199, 204, 0.5)',
                                        background: '#f8fbfc',
                                        fontSize: '15px',
                                        color: '#00393e',
                                        outline: 'none',
                                        transition: 'all 0.2s',
                                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                                    }}
                                    onFocus={(e) => { e.target.style.borderColor = '#005cc1'; e.target.style.background = '#ffffff'; }}
                                    onBlur={(e) => { e.target.style.borderColor = 'rgba(193, 199, 204, 0.5)'; e.target.style.background = '#f8fbfc'; }}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    marginTop: '8px',
                                    padding: '18px',
                                    background: '#005cc1',
                                    color: '#ffffff',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '14px',
                                    fontWeight: 700,
                                    letterSpacing: '0.02em',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    opacity: loading ? 0.8 : 1,
                                    transition: 'background 0.2s, box-shadow 0.2s'
                                }}
                                onMouseOver={(e) => { if (!loading) { e.currentTarget.style.background = '#004aa3'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 92, 193, 0.25)' } }}
                                onMouseOut={(e) => { if (!loading) { e.currentTarget.style.background = '#005cc1'; e.currentTarget.style.boxShadow = 'none' } }}
                            >
                                {loading ? 'Validating Session...' : 'Launch Explorer →'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
