<img width="120" height="120" align="left" style="float: left; margin: 0 15px 0 0;" alt="Dijkstra logo" src="https://raw.githubusercontent.com/Her0-GitHub/progetto-dijkstra/master/img/dijkstra-logo.png">

# Dijkstra Project

[Italiano](./README.md)
    
## Project Description
The project aims to develop a software application that implements the Dijkstra's algorithm to determine the shortest path between two nodes in a graph. The app will be designed to be intuitive and user-friendly, with a particular focus on the user interface and clear presentation of the output.

## Main Features
1. **Graph Input:** Allow users to input or generate a graph with nodes and edge weights.
2. **Select Nodes:** Enable users to select two starting and destination nodes.
3. **Shortest Path Calculation:** Implement the Dijkstra's algorithm to determine the shortest path between the selected nodes.
4. **Result Visualization:** Clearly display the calculated shortest path and its length.
5. **Intuitive User Interface:** Create a clear and easy-to-use interface, emphasizing readability and user experience.

### Interface Draft
A very clean interface with various buttons arranged on the sides of the screen to perform various functions within the program. [Example Graph Nodes](https://her0-github.github.io/progetto-dijkstra/)

## Used Resources
### 🔨 Tools
- [MagicPattern](https://www.magicpattern.design/tools/css-backgrounds)
- [GitHub Copilot](https://github.com/features/copilot)

### 📦 Libraries
- [Bootstrap](https://getbootstrap.com/)
- [jQuery](https://jquery.com/)
- [Font Awesome](https://fontawesome.com/)

### 📚 Documentation and Tutorials
- [Very Good YouTube Video](https://youtu.be/EFg3u_E6eHU)
- [Bootstrap Docs](https://getbootstrap.com/docs)
- [JavaScript Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [jQuery Docs](https://api.jquery.com/)

## Pseudocode
```peudocode
for each vertex v:
    dist[v] = Infinity
    prev[v] = none
dist[source] = 0
set all vertices to unexplored
while destination not explored:
    v = least-valued unexplored vertex
    set v to explored
    for each edge (v, w):
        if dist[v] + len(v, w) < dist[w]:
            dist[w] = dist[v] + len(v,w)
            prev[w] = v
```