class Node {
    constructor(name, paths) {
        this.name = name;
        this.known = false;
        this.paths = paths || [];
        this.shortestPath = ["", Infinity];
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
                let node = this.getNodeByName(path[0]);
                if (node.known) return;
                if(currentNode.shortestPath[1] + path[1] < node.shortestPath[1]) {
                    node.shortestPath = [currentNode.name, currentNode.shortestPath[1] + path[1]];
                }
            });
            // per ogni nodo non visitato
            this.nodes.forEach(node => {
                if (node.known) return;
                if (nextNode == null || node.shortestPath[1] < nextNode.shortestPath[1]) nextNode = node;
            });
            if (nextNode == null) return;
            currentNode = nextNode.goTo();
            nextNode = null;
        } while (this.nodes.some(node => !node.known)); // finché esiste un nodo non visitato
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
        return path;
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
