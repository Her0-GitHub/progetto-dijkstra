const noting = function () {}

function disableAll() {
    currentClickAction = noting;
    $('.node').off('click');
    $('.line').off('click');
}

const action = {
    placeNode: "Piazza nodo",
    placeLine: "Piazza linea",
    editNodeLine: "Modifica nodo/linea",
    deleteNodesAndLines: "Cancella nodi e linee",
    placeRandomNode: "Piazza nodi random",
    loadGraph: "Carica grafo",
    Dijkstra: "Dijkstra",
    Noting: ""
};
//let ActiveAction = action.Noting;

function ON(element, elementAction, actionName) {
    console.log("ON");
    disableAll();
    //printInFooter(actionName);
    $(element).off('click').click(elementAction.OFF);
}

function OFF(element, elementAction) {
    console.log("OFF");
    disableAll();
    //printInFooter(action.Noting);
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

$('#placeNodes').click(buttonPlaceNode.ON);

let buttonPlaceLine = {
    ON: function () {
        ON(this, buttonPlaceLine, action.placeLine);

        // TODO: implement line placement
    },
    OFF: function () {
        OFF(this, buttonPlaceLine);
    }
}

$('#placeLines').click(buttonPlaceLine.ON);

let buttonEditNodeLine = {
    ON: function () {
        ON(this, buttonEditNodeLine, action.editNodeLine);

        // TODO: implement node/line edit
    },
    OFF: function () {
        OFF(this, buttonEditNodeLine);
    }
}

$('#editNodeLine').click(buttonEditNodeLine.ON);

let buttonDeleteNodeLine = {
    ON: function () {
        ON(this, buttonDeleteNodeLine, action.deleteNodesAndLines);

        // TODO: implement node/line delete
        $('.node').click(function (){
            $(this).remove();
        });
    },
    OFF: function () {
        OFF(this, buttonDeleteNodeLine);
    }
}

$('#deleteNodesAndLines').click(buttonDeleteNodeLine.ON);
