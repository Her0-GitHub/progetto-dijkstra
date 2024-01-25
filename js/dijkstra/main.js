class Node {
    constructor(name, paths) {
        this.name = name;
        this.known = false;
        this.paths = paths || [];
        this.shortestPath = ["", null];
    }
    addPath(path) {
        this.paths.push(path);
    }
    setToStart() {
        this.known = true;
        this.shortestPath = [this.name, 0];
        console.log("Setting start to " + this.name + " with path " + this.shortestPath + " and known " + this.known + ".");
        return this;
    }
    goTo() {
        // this.shortestPath = path;
        this.known = true;
        console.log("Visiting " + this.name + " with path " + this.shortestPath + " and known " + this.known + ".");
        return this;
    }
}

class Graph {
    constructor() {
        this.nodes = [];
    }
    addNode(node) {
        this.nodes.push(node);
    }
    getNodeByName(name) {
        return this.nodes.find(node => node.name === name);
    }
    doDijkstraFrom(start) {
        // ottiene il nodo di partenza dato il nome "string"
        let startNode = this.getNodeByName(start);
        // setta il nodo come partenza quindi known = true e shortestPath = [name, 0]
        let currentNode = startNode.setToStart();
        // inizializza a null
        let nextNode = null;
        do {
            // per ogni path del nodo corrente
            currentNode.paths.forEach(path => { // example path = ["B", 3]
                // ottiene il nodo corrente
                let visitingNode = this.getNodeByName(path[0]);
                // se il nodo non è conosciuto
                if (!visitingNode.known) {
                    // if not set short path        or      if the old path is bigger than the new path (pathToCurrent + path)
                    if (visitingNode.shortestPath[1] === null || visitingNode.shortestPath[1] > currentNode.shortestPath[1] + path[1]) {
                        // set shortestPath to [name, pathToCurrent + path]
                        visitingNode.shortestPath = [currentNode.name, currentNode.shortestPath[1] + path[1]];
                    }
                    // if is null        or the nextNode is bigger than the visitingNode
                    if(nextNode === null || nextNode.shortestPath[1] > visitingNode.shortestPath[1]) {
                        nextNode = visitingNode;
                    }
                }
            });
            if (nextNode === null) {
                nextNode = this.nodes.find(node => !node.known);
            }
            currentNode = nextNode.goTo();
            nextNode = null;
        } while (this.nodes.some(node => !node.known));
    }
    doDijkstraFromTo(start, end) {
        this.doDijkstraFrom(start);
        let endNode = this.getNodeByName(end);
        let path = [];
        let currentNode = endNode;
        do {
            path.push(currentNode.name);
            currentNode = this.getNodeByName(currentNode.shortestPath[0]);
            if (currentNode == null) {
                console.log("No path found.");
                return;
            }
        } while (currentNode.name !== start);
        path.push(start);
        console.log(path.reverse().join(" -> "));
        console.log("Weight: " + endNode.shortestPath[1]);
    }

    static randomGraph(nNodes) {
        let graph = new Graph();

        for (let i = 0; i < nNodes; i++) {
            // letters from A to Z
            graph.addNode(new Node(String.fromCharCode(65 + i)));
        }
        graph.nodes.forEach(node => {
            let nPaths = Math.floor(Math.random() * (nNodes / 2)); // from 1 to nNodes, non 0 per ora
            for (let i = 0; i < nPaths; i++) {
                let randNode = graph.nodes[Math.floor(Math.random() * nNodes)];

                if (randNode.name !== node.name && !node.paths.some(path => path[0] === randNode.name)) {
                    let randWeight = Math.floor(Math.random() * 10) + 1;
                    node.addPath([randNode.name, randWeight]);

                    randNode.addPath([node.name, randWeight]);
                }
            }
        });
        graph.nodes.forEach(node => console.log(node.name + ": " + node.paths));
        return graph;
    }
}

let graph = Graph.randomGraph(10);
graph.doDijkstraFromTo('A', 'F');
/*graph.addNode(new Node('A', [["B", 3], ["C", 2], ["D", 6]]));
graph.addNode(new Node('B', [["A", 3], ["D", 2], ["E", 2]]));
graph.addNode(new Node('C', [["A", 2], ["D", 1], ["F", 3]]));
graph.addNode(new Node('D', [["A", 6], ["B", 2], ["C", 1], ["E", 4], ["F", 2]]));
graph.addNode(new Node('E', [["B", 2], ["D", 4], ["F", 1]]));
graph.addNode(new Node('F', [["C", 3], ["D", 2], ["E", 1]]));
graph.doDijkstraFrom('A', 'F');*/
