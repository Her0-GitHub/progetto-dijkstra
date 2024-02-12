
const keyActions = {
    13: () => $('#dijkstra').click(), // enter
    46: () => $('#deleteNodesAndLines').click(), // delete
    32: () => $('#placeRandomNodes').click(), // space
};
$(document).keypress(function (e) {
    const action = keyActions[e.which];
    if (action) {
        action();
    }
});