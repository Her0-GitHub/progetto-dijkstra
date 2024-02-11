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

initGraph = ()=>{
    let graph = new Graph();
    $('.node').each(function () {
        graph.addNode(new Node(this.id));
    });
    $('.line').each(function () {
        let nodes = this.id.split("-");
        let weight = parseInt($(this).find('input').val());
        graph.getNodeByName(nodes[0]).addPath([nodes[1], weight]);
        graph.getNodeByName(nodes[1]).addPath([nodes[0], weight]);
    });
    return graph;
}

let dijkstra = {
    FIST: function () {
        let nodes = $('.node');
        if (nodes.length < 2) {
            printInFooter("Nodi insufficienti per eseguire l'algoritmo.");
            return;
        }
        disableAll();
        offAll();
        disableInput();
        printInFooter(action.dijkstra1);
        nodes.click(function () {
            if (selectedNode === null) {
                selectedNode = [this, null];
                $(this).addClass('selected');
            }
            else if (selectedNode[0] === this) {
                $(this).removeClass('selected');
                selectedNode = null;
            }
            else {
                $(selectedNode[0]).removeClass('selected');
                selectedNode[0] = this;
                $(this).addClass('selected');
            }
        });
        $('#dijkstra')
            .off('click').click(dijkstra.SECOND)
            .children('i').removeClass('fa-play').addClass('fa-check');
    },
    SECOND: function () {
        printInFooter(action.dijkstra2);
        $('.node').off('click').click(function (){
            if(selectedNode[1] === null) {
                selectedNode[1] = this;
                $(this).addClass('selected');
            }
            else if(selectedNode[1] === this) {
                $(this).removeClass('selected');
                selectedNode[1] = null;
            }
            else {
                $(selectedNode[1]).removeClass('selected');
                selectedNode[1] = this;
                $(this).addClass('selected');
            }
        });

        $('#dijkstra')
            .off('click').click(dijkstra.EXECUTE)
            .children('i').removeClass('fa-check').addClass('fa-play');
    },
    EXECUTE: function () {
        let graph = initGraph();
        let result = graph.doDijkstraFromTo(selectedNode[0].id, selectedNode[1].id);
        printInFooter(result.join(" -> "));
        result.forEach(node => {
            $('#' + node).addClass('minimum-path');
        });
        for (let i = 0; i < result.length; i++) {
            $(`#${result[i]}`).addClass('minimum-path');
            $(`#${result[i]}-${result[i + 1]},#${result[i+1]}-${result[i]}`).addClass('minimum-path');
        }
        $(selectedNode[0]).removeClass('selected');
        $(selectedNode[1]).removeClass('selected');
        selectedNode = null;
        $('#dijkstra')
            .off('click').click(dijkstra.CLEAR)
            .children('i').removeClass('fa-play').addClass('fa-rotate-right');
    },
    CLEAR: function () {
        $('.node').removeClass('minimum-path');
        $('.line').removeClass('minimum-path');
        printInFooter(action.noting);
        setButtons();
        enableInput();
        $('#dijkstra')
            .off('click').click(dijkstra.FIST)
            .children('i').removeClass('fa-rotate-right').addClass('fa-play');
    }
}

$('#dijkstra').click(dijkstra.FIST);
