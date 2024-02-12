const noting = function () {}

function disableAll() {
    currentClickAction = noting;
    $('.node').off('click');
    $('.line').off('click');
}
function removeAll() {
    $('.line').remove();
    $('.node').remove();
    nNode = 0;
}
function setButtons(){
    $('#placeNodes').off('click').click(buttonPlaceNode.ON);
    $('#placeLines').off('click').click(buttonPlaceLine.ON);
    $('#moveNodes').off('click').click(buttonMoveNode.ON);
    $('#deleteNodesAndLines').off('click').click(buttonDeleteNodeLine.ON);
    $('#loadGraph').off('click').click(loadGraph);
    $('#placeRandomNodes').off('click').click(placeRandomNodes);
}

function onAll(){
    setButtons();
    $('.nav-buttons').removeClass('disabled');
    $('#loadGraph').removeClass('disabled')
    $('#placeRandomNodes').removeClass('disabled');
}

function offAll() {
    $('.nav-buttons').off('click').addClass('disabled');
    $('#loadGraph').off('click').addClass('disabled');
    $('#placeRandomNodes').off('click').addClass('disabled');
}
function disableInput() {
    $('input').prop('disabled', true);
}

function enableInput() {
    $('input').prop('disabled', false);
}

const action = {
    placeNode: "Inserisci nodo",
    placeLine: "Inserisci linea",
    moveNode: "Muovi un nodo",
    deleteNodesAndLines: "Cancella nodi e linee",
    placeRandomNode: "Inserisci nodi random",
    loadGraph: "Carica grafo",
    dijkstra1: "Seleziona nodo di partenza",
    dijkstra2: "Seleziona nodo di arrivo",
    noting: ""
};

function printInFooter(actionName) {
    if(actionName === action.noting) $('#footer-content').hide(); // optimizable
    else $('#footer-content').show();
    $('#footer-text').text(actionName);
}

function loadGraph() {
    removeAll();
    // Carica il file JSON
    fetch('template-graph.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data = data[Math.floor(Math.random() * data.length)];

            for (let nodeName in data) {
                let node = data[nodeName];
                placeNode(node.x, node.y);
            }
            for (let nodeName in data) {
                let node = data[nodeName];
                for (let i = 0; i < node.paths.length; i++) {
                    placeLine(nodeName, node.paths[i]);
                }
            }



        })
        .catch(error => console.error('Errore nel caricamento del file JSON:', error));
}

function placeRandomNodes() {
    removeAll();
    placeRandomNode(30);
}

function ON(element, elementAction, actionName) {
    console.log("ON");
    disableAll();
    printInFooter(actionName);
    setButtons();
    $(element).off('click').click(elementAction.OFF);
}

function OFF(element, elementAction) {
    console.log("OFF");
    disableAll();
    printInFooter(action.noting);
    $(element).off('click').click(elementAction.ON);
}

let buttonPlaceNode = {
    ON: function () {
        ON(this, buttonPlaceNode, action.placeNode);

        // Implement node placement
        currentClickAction = placeNode;
    },
    OFF: function () {
        OFF(this, buttonPlaceNode);
    }

}

let buttonPlaceLine = {
    ON: function () {
        ON(this, buttonPlaceLine, action.placeLine);

        // Implement line placement
        $('.node').click(function () {
            if (selectedNode === null) {
                selectedNode = this;
                $(this).addClass('selected')
            } else {
                placeLine(selectedNode.id, this.id);
                $(selectedNode).removeClass('selected');
                selectedNode = null;
            }
        });
    },
    OFF: function () {
        OFF(this, buttonPlaceLine);
    }
}

let buttonMoveNode = {
    ON: function () {
        ON(this, buttonMoveNode, action.moveNode);

        // implement node/line move
        $('.node').draggable({
            stop: function () {
                let node = this.id;
                let connects = [];
                $(`.${node}-line`).each((i, line) => {
                    connects.push(line.id.split('-'));
                }).remove();
                connects.forEach(connectedNode => {
                    placeLine(node, connectedNode[0] === node ? connectedNode[1] : connectedNode[0]);
                });
            },
            disabled: false
        });
    },
    OFF: function () {
        OFF(this, buttonMoveNode);
        $('.node').draggable('disable');
    }
}

let buttonDeleteNodeLine = {
    ON: function () {
        ON(this, buttonDeleteNodeLine, action.deleteNodesAndLines);

        // implement node/line delete
        $('.node').click(function () {
            $(this).remove();
            nDeletedNode.push(this.id);
            $(`.${this.id}-line`).remove();
        });
        $('.line').click(function () {
            $(this).remove();
        });
    },
    OFF: function () {
        OFF(this, buttonDeleteNodeLine);
    }
}

setButtons();