import React, { useState } from 'react';

interface ResultSectionProps {
    graphData: any;
    viewMode: 'json' | 'graph';
    children: React.ReactNode; // Graph visualizer is injected here
}

const ResultSection: React.FC<ResultSectionProps> = ({ graphData, viewMode, children }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(graphData, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Count nodes by type
    const nodeCounts: Record<string, number> = {};
    if (graphData?.nodes) {
        graphData.nodes.forEach((n: any) => {
            nodeCounts[n.type] = (nodeCounts[n.type] || 0) + 1;
        });
    }

    const statOrder = ['claim', 'reasoning', 'conclusion', 'precedent'];

    return (
        <>
            {/* Stats header */}
            {graphData && (
                <div className="output-header">
                    <div className="node-stats">
                        {statOrder.map(type =>
                            nodeCounts[type] ? (
                                <span key={type} className={`stat-chip ${type}`}>
                                    <span>●</span>
                                    {nodeCounts[type]} {type}
                                </span>
                            ) : null
                        )}
                        <span className="stat-chip" style={{ background: 'rgba(100,116,139,0.1)', color: '#64748b', border: '1px solid rgba(100,116,139,0.2)' }}>
                            {graphData.edges?.length || 0} edges
                        </span>
                    </div>

                    {viewMode === 'json' && (
                        <button
                            id="copy-json-btn"
                            className={`btn-copy ${copied ? 'copied' : ''}`}
                            onClick={handleCopy}
                        >
                            {copied ? '✓ Copied!' : '⎘ Copy JSON'}
                        </button>
                    )}
                </div>
            )}

            {/* Output body */}
            <div className="output-body">
                {!graphData && (
                    <div className="placeholder-state">
                        <div className="placeholder-icon">⚖️</div>
                        <p className="placeholder-text">No case analyzed yet</p>
                        <p className="placeholder-sub">
                            Paste a legal judgment in the input panel and click "Analyze & Visualize" to generate a reasoning graph.
                        </p>
                    </div>
                )}

                {graphData && viewMode === 'json' && (
                    <pre className="json-viewer">
                        {JSON.stringify(graphData, null, 2)}
                    </pre>
                )}

                {graphData && viewMode === 'graph' && children}
            </div>
        </>
    );
};

export default ResultSection;
