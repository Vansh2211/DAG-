"use strict";
class dag1 {
    constructor() {
        this.nodes = new Map();
    }
    addNode(value) {
        if (this.nodes.has(value)) {
            throw new Error("sorry already exists");
        }
        const node = { value, edges: [] };
        this.nodes.set(value, node);
        return node;
    }
    addEdge(from, to) {
        if (!this.nodes.has(from.value) || !this.nodes.has(to.value)) {
            throw new Error("NODES must exist");
        }
        if (this.hasCycle(from, to)) {
            throw new Error("This could create cycle in the graph");
        }
        from.edges.push({ from, to });
    }
    hasCycle(from, to, visited = new Set()) {
        if (visited.has(to.value)) {
            return true;
        }
        visited.add(to.value);
        for (const edge of to.edges) {
            if (this.hasCycle(from, edge.to, visited)) {
                return true;
            }
        }
        visited.delete(from.value);
        return false;
    }
    topologicalSort() {
        const visited = new Set();
        const result = [];
        const visit = (node) => {
            if (visited.has(node.value)) {
                return true;
            }
            visited.add(node.value);
            for (const edge of node.edges) {
                visit(edge.to);
            }
            result.push(node.value);
        };
        for (const node of this.nodes.values()) {
            visit(node);
        }
        return result.reverse();
    }
}
const dag = new dag1();
const nodeA = dag.addNode("A");
const nodeB = dag.addNode("B");
const nodeC = dag.addNode("C");
const nodeD = dag.addNode("D");
dag.addEdge(nodeA, nodeB);
dag.addEdge(nodeA, nodeC);
dag.addEdge(nodeB, nodeD);
dag.addEdge(nodeC, nodeD);
console.log("Topological Sort:", dag.topologicalSort());
