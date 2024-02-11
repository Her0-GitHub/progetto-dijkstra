let x = 0;
let y = 0;
let nNode = 0;
let nDeletedNode = [];

const debug = false;
const offset = 100; // 100px
const nodeSize = 100; // 100px
const WIDTH = innerWidth - offset * 2;
const HEIGHT = innerHeight - offset * 2;

let currentClickAction = function(){}//placeNode;

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


/*function checkOverlap(node, x, y) {
    $(".node").each(function (node2) {
        if (Math.abs(node2.offsetLeft - x) < nodeSize && Math.abs(node2.offsetTop - y) < nodeSize) {
            node.style.left = (node2.offsetLeft + nodeSize) + "px";
            node.style.top = (node2.offsetTop + nodeSize) + "px";
        }
    });
}*/

function placeNode(x, y) { // ok
    if(nNode - nDeletedNode.length >= 26 * 2) return;
    let name = nDeletedNode.length > 0 ? nDeletedNode.pop() : nNode < 26 ? String.fromCharCode(65 + nNode++) : String.fromCharCode(71 + nNode++);
    $("body").append(
        $("<div>")
            .addClass("node")
            .text(name)
            .attr('id', name)
            .css({left: (x - (nodeSize / 2)) + "px", top: (y - (nodeSize / 2)) + "px"})
    );
}

function placeLine(from, to, weight=(Math.floor(Math.random() * 15))) { // ok
    if (from === to || $(`#${from}-${to},#${to}-${from}`).length === 1) return;
    let fromNode = $(`#${from}`);
    let toNode = $(`#${to}`);
    let y = [fromNode.offset().top + nodeSize / 2, toNode.offset().top + nodeSize / 2];
    let x = [fromNode.offset().left + nodeSize / 2, toNode.offset().left + nodeSize / 2];
    if (debug) console.log(x, y);
    if (x[0] > x[1]){ // swap
        [x[0], x[1]] = [x[1], x[0]];
        [y[0], y[1]] = [y[1], y[0]];
        if (debug) console.log(x, y);
    }
    let angle = Math.atan2(y[1] - y[0], x[1] - x[0]);
    $("body").append($("<div>")
        .addClass("line")
        .attr('id', from + "-" + to)
        .css({
            left: x[0] + "px", top: y[0] + "px",
            width: Math.hypot(x[1] - x[0], y[1] - y[0]) + "px",
            transform: "rotate(" + angle + "rad)"
        })
        .append($("<div>")
            .addClass("line-text")
            .append($("<input>")
                .css({width: ((weight.toString().length) * 12) + 5 + 'px'})
                .attr('type', 'number')
                .val(weight)
                .on('input', function() {
                    this.style.width = ((this.value.length) * 12) + 5 + 'px';
                })
            )
        )
    );
}


placeNode(200, 500)
placeNode(800, 500)
placeNode(500, 200)
placeNode(800, 200)
placeLine("B", "A")
placeLine("A", "C")
placeLine("C", "D")
placeLine("B", "D")

function isOverlap(cord1, cord2) {
    return Math.abs(cord1[0] - cord2[0]) < nodeSize * 2 &&
        Math.abs(cord1[1] - cord2[1]) < nodeSize * 2;
}

function getRandomCord() {
    return [
        Math.floor(Math.random() * WIDTH) + offset,
        Math.floor(Math.random() * HEIGHT) + offset
    ];
} // ok

function placeRandomNode(nRandNode) { // TODO: fix this
    const randomCord = [];

    for (let i = 0; i < nRandNode; i++) {
        let newRandomCord, attempt = 0;
        do {
            newRandomCord = getRandomCord();
            if (++attempt > 3) break;
        } while (randomCord.some(cord => isOverlap(cord, newRandomCord)));
        if(attempt > 3) continue;
        randomCord.push(newRandomCord);
        // console.log(newRandomCord.join(","));
        placeNode(newRandomCord[0], newRandomCord[1]);
    }
}
// TODO: load preset nodes and lines
// TODO: make preset graph
