class Edge {
    /**
     * @param {string} source - ID of the source node
     * @param {string} target - ID of the target node
     * @param {string} relation - Type of relation (supports, cites, contradicts)
     */
    constructor(source, target, relation) {
        this.source = source;
        this.target = target;
        this.relation = relation;
    }
}

module.exports = Edge;
