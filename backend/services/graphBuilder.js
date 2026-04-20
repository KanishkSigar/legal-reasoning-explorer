const CaseGraph = require('../models/caseModel');
const Edge      = require('../models/edgeModel');

class GraphBuilder {
    build(nodes) {
        const graph = new CaseGraph();
        nodes.forEach(n => graph.addNode(n));

        // Extract doc-order index from node id ("node-42" → 42)
        const idx = n => parseInt(n.id.replace('node-', ''), 10) || 0;

        const byType = type => nodes.filter(n => n.type === type).sort((a, b) => idx(a) - idx(b));

        const claims      = byType('claim');
        const reasonings  = byType('reasoning');
        const conclusions = byType('conclusion');
        const precedents  = byType('precedent');

        // Returns the single closest node in `targets` that appears AFTER `source`
        // in the document. Falls back to the globally nearest if none follow.
        const nearest = (source, targets) => {
            const si = idx(source);
            const after  = targets.filter(t => idx(t) > si);
            const before = targets.filter(t => idx(t) < si);
            if (after.length)  return after.reduce((a, b) => idx(a) - si < idx(b) - si ? a : b);
            if (before.length) return before.reduce((a, b) => si - idx(a) < si - idx(b) ? a : b);
            return null;
        };

        const addOnce = (src, tgt, rel) => {
            if (src && tgt) graph.addEdge(new Edge(src.id, tgt.id, rel));
        };

        // claim → nearest reasoning (raises)
        claims.forEach(c => addOnce(c, nearest(c, reasonings), 'raises'));

        // claim → nearest conclusion (supports)
        claims.forEach(c => addOnce(c, nearest(c, conclusions), 'supports'));

        // reasoning → nearest conclusion (leads_to)
        reasonings.forEach(r => addOnce(r, nearest(r, conclusions), 'leads_to'));

        // conclusion → nearest precedent (cites)
        conclusions.forEach(c => addOnce(c, nearest(c, precedents), 'cites'));

        return graph.toJSON();
    }
}

module.exports = new GraphBuilder();
