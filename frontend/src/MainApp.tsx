import { useState } from 'react';
import InputSection      from './components/InputSection';
import ResultSection     from './components/ResultSection';
import GraphVisualizer   from './components/GraphVisualizer';
import { processText }   from './services/api';

function MainApp() {
    // ── Core state ──────────────────────────────────────
    const [inputText,  setInputText]  = useState<string>('');
    const [graphData,  setGraphData]  = useState<any>(null);
    const [loading,    setLoading]    = useState<boolean>(false);
    const [error,      setError]      = useState<string | null>(null);
    const [viewMode,   setViewMode]   = useState<'json' | 'graph'>('graph');

    // ── Process text ─────────────────────────────────────
    const handleProcess = async () => {
        if (!inputText.trim()) return;
        setLoading(true);
        setError(null);
        try {
            const result = await processText(inputText);
            setGraphData(result);
        } catch (err: any) {
            setError(err.response?.data?.error || err.message || 'Failed to process text');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-layout">
            {/* ── Header ── */}
            <header className="app-header">
                <div className="header-brand">
                    <div className="header-logo">⚖️</div>
                    <div>
                        <div className="header-title">Legal Case Reasoning Explorer</div>
                        <div className="header-subtitle">Judicial reasoning visualization platform</div>
                    </div>
                </div>

                {/* View toggle */}
                {graphData && (
                    <div className="view-toggle">
                        <button
                            id="json-view-btn"
                            className={`view-toggle-btn ${viewMode === 'json' ? 'active' : ''}`}
                            onClick={() => setViewMode('json')}
                        >
                            {'{ }'} JSON
                        </button>
                        <button
                            id="graph-view-btn"
                            className={`view-toggle-btn ${viewMode === 'graph' ? 'active' : ''}`}
                            onClick={() => setViewMode('graph')}
                        >
                            ◎ Graph
                        </button>
                    </div>
                )}
            </header>

            {/* ── Main ── */}
            <main className="main-content">
                {/* Input panel */}
                <InputSection
                    inputText={inputText}
                    setInputText={setInputText}
                    onProcess={handleProcess}
                    loading={loading}
                />

                {/* Output panel */}
                <div className="output-panel">
                    {error && (
                        <div style={{ padding: '12px 20px' }}>
                            <div className="error-banner">⚠️ {error}</div>
                        </div>
                    )}

                    <ResultSection graphData={graphData} viewMode={viewMode}>
                        <GraphVisualizer graphData={graphData} />
                    </ResultSection>
                </div>
            </main>
        </div>
    );
}

export default MainApp;
