import React from 'react';

interface SavedCase {
    id: number;
    title: string;
    created_at: string;
}

interface CaseHistoryPanelProps {
    cases: SavedCase[];
    activeId: number | null;
    onLoad: (id: number) => void;
    onDelete: (id: number) => void;
    onNewCase: () => void;
    loading: boolean;
}

const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

const CaseHistoryPanel: React.FC<CaseHistoryPanelProps> = ({
    cases, activeId, onLoad, onDelete, onNewCase, loading
}) => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <p className="sidebar-title">📁 Case History</p>
                <button
                    id="new-case-btn"
                    className="btn-secondary"
                    style={{ padding: '7px 12px', fontSize: 12 }}
                    onClick={onNewCase}
                >
                    + New Case
                </button>
            </div>

            <div className="case-list">
                {loading && (
                    <div style={{ padding: 12 }}>
                        {[1, 2, 3].map(i => (
                            <div
                                key={i}
                                className="skeleton"
                                style={{ height: 52, marginBottom: 6 }}
                            />
                        ))}
                    </div>
                )}

                {!loading && cases.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-state-icon">📂</div>
                        <p className="empty-state-text">
                            No cases saved yet.<br />
                            Process & save a case to see history here.
                        </p>
                    </div>
                )}

                {!loading && cases.map(c => (
                    <div
                        key={c.id}
                        id={`case-item-${c.id}`}
                        className={`case-item ${activeId === c.id ? 'active' : ''}`}
                        onClick={() => onLoad(c.id)}
                    >
                        <div className="case-item-row">
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p className="case-item-title">{c.title}</p>
                                <p className="case-item-date">{formatDate(c.created_at)}</p>
                            </div>
                            <button
                                className="case-item-delete"
                                title="Delete case"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(c.id);
                                }}
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CaseHistoryPanel;
