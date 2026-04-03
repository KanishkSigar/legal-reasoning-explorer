import React, { useEffect, useRef } from 'react';
import ReactFlow, {
    Node,
    Edge,
    useNodesState,
    useEdgesState,
    MarkerType,
    Controls,
    Background,
    BackgroundVariant,
    MiniMap,
    Handle,
    Position,
} from 'reactflow';
import dagre from 'dagre';
import 'reactflow/dist/style.css';

interface GraphVisualizerProps {
    graphData: {
        nodes: { id: string; type: string; text: string }[];
        edges: { source: string; target: string; relation: string }[];
    } | null;
}

// ── Node dimensions ──────────────────────────────────────
const NODE_W = 200;
const NODE_H = 60;

// ── Color map for node types ─────────────────────────────
const TYPE_STYLES: Record<string, { bg: string; border: string; color: string; dot: string }> = {
    claim:      { bg: '#eff6ff', border: '#1d4ed8', color: '#1e3a8a', dot: '#3bd8f6' },
    conclusion: { bg: '#fffbeb', border: '#b45309', color: '#78350f', dot: '#f59e0b' },
    precedent:  { bg: '#faf5ff', border: '#7c3aed', color: '#581c87', dot: '#a855f7' },
    reasoning:  { bg: '#ecfdf5', border: '#047857', color: '#064e3b', dot: '#10b981' },
};

// ── Edge color map ───────────────────────────────────────
const EDGE_STYLES: Record<string, string> = {
    supports: '#3b82f6',
    cites:    '#a855f7',
    raises:   '#f59e0b',
    leads_to: '#10b981',
};

// ── Custom node component ────────────────────────────────
const CustomNode = ({ data }: { data: any }) => {
    const style = TYPE_STYLES[data.nodeType] || TYPE_STYLES.claim;
    return (
        <div
            title={data.fullText}
            style={{
                background:   style.bg,
                border:       `1.5px solid ${style.border}`,
                borderRadius: '10px',
                padding:      '10px 14px',
                width:        NODE_W,
                fontFamily:   'Inter, sans-serif',
                cursor:       'default',
                boxShadow:    `0 0 12px ${style.border}44`,
            }}
        >
            <Handle type="target" position={Position.Top}    style={{ background: style.dot, border: 'none', width: 8, height: 8 }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: style.dot, flexShrink: 0 }} />
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', color: style.dot }}>
                    {data.nodeType}
                </span>
            </div>
            <p style={{ fontSize: 11, color: style.color, lineHeight: 1.4, margin: 0 }}>
                {data.label}
            </p>
            <Handle type="source" position={Position.Bottom} style={{ background: style.dot, border: 'none', width: 8, height: 8 }} />
        </div>
    );
};

const nodeTypes = { customNode: CustomNode };

// ── Dagre layout helper ──────────────────────────────────
const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
    const g = new dagre.graphlib.Graph();
    g.setDefaultEdgeLabel(() => ({}));
    g.setGraph({ rankdir: 'TB', ranksep: 80, nodesep: 50 });

    nodes.forEach(n => g.setNode(n.id, { width: NODE_W, height: NODE_H }));
    edges.forEach(e => g.setEdge(e.source, e.target));

    dagre.layout(g);

    nodes.forEach(n => {
        const pos = g.node(n.id);
        n.position = { x: pos.x - NODE_W / 2, y: pos.y - NODE_H / 2 };
    });

    return { nodes, edges };
};

// ── Main component ───────────────────────────────────────
const GraphVisualizer: React.FC<GraphVisualizerProps> = ({ graphData }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    useEffect(() => {
        if (!graphData) return;

        const initialNodes: Node[] = graphData.nodes.map(node => ({
            id:       node.id,
            type:     'customNode',
            position: { x: 0, y: 0 },
            data: {
                nodeType: node.type,
                label:    node.text.length > 60 ? node.text.substring(0, 60) + '…' : node.text,
                fullText: node.text,
            },
        }));

        const initialEdges: Edge[] = graphData.edges.map((edge, i) => ({
            id:        `e${i}`,
            source:    edge.source,
            target:    edge.target,
            label:     edge.relation,
            type:      'smoothstep',
            animated:  true,
            style:     { stroke: EDGE_STYLES[edge.relation] || '#94a3b8', strokeWidth: 1.5 },
            labelStyle: {
                fill:       EDGE_STYLES[edge.relation] || '#41848c',
                fontSize:   10,
                fontWeight: 700,
                fontFamily: 'Inter, sans-serif',
            },
            labelBgStyle: { fill: '#ffffff', fillOpacity: 0.9 },
            markerEnd: {
                type:  MarkerType.ArrowClosed,
                color: EDGE_STYLES[edge.relation] || '#94a3b8',
            },
        }));

        const { nodes: ln, edges: le } = getLayoutedElements(initialNodes, initialEdges);
        setNodes(ln);
        setEdges(le);
    }, [graphData, setNodes, setEdges]);

    if (!graphData) return null;

    return (
        <div className="graph-container">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
                fitViewOptions={{ padding: 0.2 }}
                minZoom={0.3}
                maxZoom={2}
                style={{ background: 'transparent' }}
            >
                <Controls style={{ bottom: 16, left: 16 }} />
                <MiniMap
                    nodeColor={(n) => TYPE_STYLES[n.data?.nodeType]?.dot || '#41848c'}
                    style={{ width: 120, height: 80, bottom: 16, right: 16, background: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                    maskColor="rgba(235, 253, 255, 0.6)"
                />
                <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#bbf2f9" />
            </ReactFlow>
        </div>
    );
};

export default GraphVisualizer;
