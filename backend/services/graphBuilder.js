const CaseGraph = require('../models/caseModel');
const Edge = require('../models/edgeModel');

/**
 * Phase 2 – Enhanced Graph Builder
 *
 * Node types: claim, reasoning, precedent, conclusion
 * Edge types:
 *   claim       --> conclusion  : "supports"
 *   claim       --> reasoning   : "raises"
 *   reasoning   --> conclusion  : "leads_to"
 *   conclusion  --> precedent   : "cites"
 */
class GraphBuilder {
    build(nodes) {
        const graph = new CaseGraph();

        nodes.forEach(node => graph.addNode(node));

        const claims      = nodes.filter(n => n.type === 'claim');
        const conclusions = nodes.filter(n => n.type === 'conclusion');
        const precedents  = nodes.filter(n => n.type === 'precedent');
        const reasonings  = nodes.filter(n => n.type === 'reasoning');

        // Claims → Conclusions (supports)
        claims.forEach(claim => {
            conclusions.forEach(conclusion => {
                graph.addEdge(new Edge(claim.id, conclusion.id, 'supports'));
            });
        });

        // Claims → Reasoning (raises) [Phase 2 addition]
        claims.forEach(claim => {
            reasonings.forEach(reasoning => {
                graph.addEdge(new Edge(claim.id, reasoning.id, 'raises'));
            });
        });

        // Reasoning → Conclusions (leads_to) [Phase 2 addition]
        reasonings.forEach(reasoning => {
            conclusions.forEach(conclusion => {
                graph.addEdge(new Edge(reasoning.id, conclusion.id, 'leads_to'));
            });
        });

        // Conclusions → Precedents (cites)
        conclusions.forEach(conclusion => {
            precedents.forEach(precedent => {
                graph.addEdge(new Edge(conclusion.id, precedent.id, 'cites'));
            });
        });

        return graph.toJSON();
    }
}

module.exports = new GraphBuilder();
