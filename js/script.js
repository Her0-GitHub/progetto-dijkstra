
let x = 0;
let y = 0;

const debug = false;
const offset = 100; // 100px
const nodeSize = 100; // 100px
const WIDTH = innerWidth - offset * 2;
const HEIGHT = innerHeight - offset * 2;
let nNode = 0;

let currentClickAction = function (){}//placeNode;

$(window).mouseup(() => {
    if ((x > offset && y > offset) && (x + offset < innerWidth && y + offset < innerHeight)){
        if (debug) console.log("QUI " + x, y);
        currentClickAction(x, y);
    }
});

$(window).mousemove((e) => {
    x = e.pageX; y = e.pageY;
    if (debug) console.log(x, y);
});


function checkOverlap(node, x, y) {
    $(".node").each(function (node2) {
        if (Math.abs(node2.offsetLeft - x) < nodeSize && Math.abs(node2.offsetTop - y) < nodeSize) {
            node.style.left = (node2.offsetLeft + nodeSize) + "px";
            node.style.top = (node2.offsetTop + nodeSize) + "px";
        }
    });
}

function placeNode(x, y) {
    if(nNode >= 26 * 2) return;
    let name = nNode < 26 ? String.fromCharCode(65 + nNode++) : String.fromCharCode(71 + nNode++);
    $("body").append(
        $("<div>")
            .addClass("node")
            .text(name)
            .attr('id', name)
            .css({left: (x - (nodeSize / 2)) + "px", top: (y - (nodeSize / 2)) + "px"})
    );
}
function placeLine(x, y, toX, toY, weight) {
    // TODO: set id to line node-node (es. A-B)
    let angle = Math.atan2(toY - y, toX - x);
    $("body").append($("<div>")
        .addClass("line")
        .css({
            left: x + "px", top: y + "px",
            width: Math.hypot(toX - x, toY - y) + "px",
            transform: "rotate(" + angle + "rad)"
        })
        .append($("<div>")
                .addClass("line-text")
                .text(weight || "")
                /*.css({transform: "rotate(" +  + "rad)"})*/)
    );
}

function isOverlap(coord1, coord2) {
    return Math.abs(coord1[0] - coord2[0]) < nodeSize * 2 &&
        Math.abs(coord1[1] - coord2[1]) < nodeSize * 2;
}

function generateRandomCoord() {
    return [
        Math.floor(Math.random() * WIDTH) + offset,
        Math.floor(Math.random() * HEIGHT) + offset
    ];

}

// TODO: fix this
function placeRandomNode(nRandNode) {
    const randomCord = [];

    for (let i = 0; i < nRandNode; i++) {
        let newRandomCord, attempt = 0;
        do {
            newRandomCord = generateRandomCoord();
            if (++attempt > 3) break;
        } while (randomCord.some(cord => isOverlap(cord, newRandomCord)));
        if(attempt > 3) continue;
        randomCord.push(newRandomCord);
        console.log(newRandomCord.join(","));
        placeNode(newRandomCord[0], newRandomCord[1]);
    }
}
// TODO: load preset nodes and lines
// TODO: make preset graph


//placeRandomNode(10);
const noting = function () {}

let tempNode = undefined;

$('#placeNodes').click(() => {
    currentClickAction = currentClickAction === placeNode ? noting : placeNode;
    $('.node').click(noting);
    console.log("placeNodes");
});

let toggleButton = [false, false]; // TODO: change method to do this


$('#placeLines').click(() => {
    if(toggleButton[0]) {
        $('.node').off('click');
        console.log("placeLines off");
        toggleButton[0] = false;
    }
    else {
        currentClickAction = noting;
        $('.node').click(function () {
            if (tempNode === undefined) {
                tempNode = this;
            } else if (tempNode === this) {
                tempNode = undefined;
            } else {
                placeLine(  parseInt(tempNode.style.left) + (nodeSize/2),
                            parseInt(tempNode.style.top) + (nodeSize/2),
                            parseInt(this.style.left) + (nodeSize/2),
                            parseInt(this.style.top) + (nodeSize/2));
            }
        });
        console.log("placeLines on");
        toggleButton[0] = true;
    }
});


$('#deleteNodesAndLines').click(() => {
    if(!toggleButton[0]){
        currentClickAction = noting;
        $('.node').click(function () {nNode--; $(this).remove();});
        $('.line').click(function () {$(this).remove();});
    }

    console.log("deleteNodesAndLines");
});