import React from 'react';
import NodeLegend from './NodeLegend';

interface InputSectionProps {
    inputText: string;
    setInputText: (text: string) => void;
    onProcess: () => void;
    loading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({
    inputText, setInputText, onProcess, loading
}) => {
    return (
        <div className="input-panel">
            <div className="panel-header">
                <div className="panel-title">
                    <div className="panel-icon">📄</div>
                    Input Judgment
                </div>
                <span className="char-count">{inputText.length.toLocaleString()} chars</span>
            </div>

            <div className="panel-body">
                {/* Textarea */}
                <div className="textarea-wrapper">
                    <textarea
                        id="legal-text-input"
                        className="legal-textarea"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Paste legal judgment text here…&#10;&#10;The system will extract claims, reasoning, precedents, and conclusions automatically."
                    />
                </div>

                {/* Process button */}
                <button
                    id="process-btn"
                    className="btn-primary"
                    onClick={onProcess}
                    disabled={loading || !inputText.trim()}
                >
                    {loading ? (
                        <>
                            <span className="btn-spinner" />
                            Analyzing…
                        </>
                    ) : (
                        <>⚡ Analyze & Visualize</>
                    )}
                </button>

                {/* Node legend */}
                <NodeLegend />
            </div>
        </div>
    );
};

export default InputSection;
