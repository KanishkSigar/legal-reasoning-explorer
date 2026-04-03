class CaseGraph {
    constructor() {
        this.nodes = [];
        this.edges = [];
    }

    addNode(node) {
        this.nodes.push(node);
    }

    addEdge(edge) {
        this.edges.push(edge);
    }

    toJSON() {
        return {
            nodes: this.nodes,
            edges: this.edges
        };
    }
}

module.exports = CaseGraph;
