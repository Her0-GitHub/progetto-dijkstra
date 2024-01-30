
let x = 0;
let y = 0;
const offset = 100;
const nodeSize = 100;
let nNode = 0;

let azioneAttuale = createNode;

window.addEventListener("mouseup", (e) => {
    if ((x > offset && y > offset) && (x + offset < innerWidth && y + offset < innerHeight)){
        console.log("QUI " + x, y);
        azioneAttuale(x, y);
    }
});

window.addEventListener("mousemove", (e) => {
    x = e.x; y = e.y;
    console.log(x, y);
});

function createNode(x , y){
    let node = document.createElement("div");
    node.classList.add("node");
    node.textContent = String.fromCharCode(65 + nNode++);
    node.style.left = (x - (nodeSize / 2)) + "px"; // x - 50 per centro nodo
    node.style.top = (y - (nodeSize / 2)) + "px";  // y - 50 per centro nodo
    document.body.appendChild(node);
}

function posizionaRandomNode(nRandNode){
    let randomCoord = [];
    for (let i = 0; i < nRandNode; i++) {
        let newRandomCoord = [
            Math.floor(Math.random() * (innerWidth - offset * 2)) + offset,
            Math.floor(Math.random() * (innerHeight - offset * 2)) + offset
        ];
        if(randomCoord.includes(newRandomCoord) || randomCoord.filter((coord) => {
            return Math.abs(coord[0] - newRandomCoord[0]) < nodeSize*2 &&
                Math.abs(coord[1] - newRandomCoord[1]) < nodeSize*2;
        }).length > 0){
            i--;
            continue;
        }
        randomCoord.push(newRandomCoord);
        createNode(newRandomCoord[0], newRandomCoord[1]);
    }
}

posizionaRandomNode(10)

document.querySelector('#collegamenti-mode')
