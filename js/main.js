
let x = 0;
let y = 0;
let nNode = 0;
let nDeletedNode = [];
let selectedNode = null;

const debug = false;
const offset = 100; // 100px
const nodeSize = 100; // 100px
const WIDTH = innerWidth - offset * 2;
const HEIGHT = innerHeight - offset * 2;

let currentClickAction = function(){}//placeNode;

$(window).mouseup(() => {
    if ((x > offset && y > offset) && (x + offset < innerWidth && y + offset < innerHeight)){
        if (debug) console.log(`"x": ${x}, "y": ${y}`);
        currentClickAction(x, y);
    }
});

$(window).mousemove((e) => {
    x = e.pageX; y = e.pageY;
    if (debug) console.log(x, y);
});

function placeNode(x, y) { // ok
    if(nNode - nDeletedNode.length >= 26 * 2) return;
    let name = nDeletedNode.length > 0 ? nDeletedNode.pop() : nNode < 26 ? String.fromCharCode(65 + nNode++) : String.fromCharCode(71 + nNode++);
    $("body").append(
        $("<div>")
            .addClass("node")
            .text(name)
            .attr('id', name)
            .css({left: (x - (nodeSize / 2)) + "px", top: (y - (nodeSize / 2)) + "px"})
            .draggable({
                stop: function () {
                    let node = this.id;
                    let connects = [];
                    $(`.${node}-line`).each((i, line) => {
                        connects.push([... line.id.split('-'), $(line).children('div').children('input').val()]);
                    }).remove();
                    connects.forEach(connectedNode => {
                        placeLine(node, connectedNode[0] === node ? connectedNode[1] : connectedNode[0], connectedNode[2]);
                    });
                },
                disabled: true
            })
    );
}

function placeLine(from, to, weight=(Math.floor(Math.random() * 15)+1)) { // ok
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
        .addClass(`line ${from}-line ${to}-line`)
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

function isOverlap(cord1, cord2) {
    return Math.abs(cord1[0] - cord2[0]) < nodeSize * 2 &&
        Math.abs(cord1[1] - cord2[1]) < nodeSize * 2;
}

function getRandomCord() {
    return [
        Math.floor(Math.random() * WIDTH) + offset,
        Math.floor(Math.random() * HEIGHT) + offset + 20
    ];
}

function placeRandomNode(nRandNode = 10) {
    const randomCord = [];

    for (let i = 0; i < nRandNode; i++) {
        let newRandomCord, attempt = 0;
        do {
            newRandomCord = getRandomCord();
            if (++attempt > 3) break;
        } while (randomCord.some(cord => isOverlap(cord, newRandomCord)));
        if(attempt > 3) continue;
        randomCord.push(newRandomCord);
        placeNode(newRandomCord[0], newRandomCord[1]);
    }
}
