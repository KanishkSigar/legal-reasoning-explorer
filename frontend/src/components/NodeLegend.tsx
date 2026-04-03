import React from 'react';

const NODE_TYPES = [
    { type: 'claim',      color: '#3b82f6', label: 'Claim',      desc: 'argued / submitted' },
    { type: 'reasoning',  color: '#10b981', label: 'Reasoning',  desc: 'because / since' },
    { type: 'conclusion', color: '#f59e0b', label: 'Conclusion', desc: 'held that / thus' },
    { type: 'precedent',  color: '#a855f7', label: 'Precedent',  desc: 'cited / relied on' },
];

const NodeLegend: React.FC = () => {
    return (
        <div>
            <p className="section-label">Node Type Legend</p>
            <div className="legend">
                {NODE_TYPES.map(({ type, color, label }) => (
                    <div key={type} className="legend-item">
                        <span className="legend-dot" style={{ background: color }} />
                        <span className="legend-label">{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NodeLegend;
