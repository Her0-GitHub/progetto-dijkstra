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

function printInFooter(actionName) {
    if(actionName === action.Noting) $('#footer-content').hide(); // optimizable
    else $('#footer-content').show();
    $('#footer-text').text(actionName);
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
    printInFooter(action.Noting);
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
let selectedNode = null;

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

let buttonEditNodeLine = {
    ON: function () {
        ON(this, buttonEditNodeLine, action.editNodeLine);

        // TODO: implement node/line edit
    },
    OFF: function () {
        OFF(this, buttonEditNodeLine);
    }
}

let buttonDeleteNodeLine = {
    ON: function () {
        ON(this, buttonDeleteNodeLine, action.deleteNodesAndLines);

        // implement node/line delete
        $('.node').click(function () {
            $(this).remove();
            nDeletedNode.push(this.id);
            $('.line').each((line) => {
                if (line.id.includes(this.id)) $(line).remove();
            });
        });
        $('.line').click(function () {
            $(this).remove();
        });
    },
    OFF: function () {
        OFF(this, buttonDeleteNodeLine);
    }
}

function setButtons(){
    $('#placeNodes').off('click').click(buttonPlaceNode.ON);
    $('#placeLines').off('click').click(buttonPlaceLine.ON);
    $('#editNodeLine').off('click').click(buttonEditNodeLine.ON);
    $('#deleteNodesAndLines').off('click').click(buttonDeleteNodeLine.ON);
}

setButtons();