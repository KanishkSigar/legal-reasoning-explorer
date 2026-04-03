class Node {
    /**
     * @param {string} id - Unique identifier for the node
     * @param {string} type - Type of the node (claim, precedent, conclusion)
     * @param {string} text - The text content of the node
     * @param {object} metadata - Additional metadata
     */
    constructor(id, type, text, metadata = {}) {
        this.id = id;
        this.type = type;
        this.text = text;
        this.metadata = metadata;
    }
}

module.exports = Node;
