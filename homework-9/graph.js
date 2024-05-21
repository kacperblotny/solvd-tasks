class Graph {
  constructor() {
    this.vertices = {}
  }

  addVertex(vertex) {
    // check if the vertex is not already in the adjacency list
    if (!this.vertices[vertex]) {
      // add the vertex to the adjacency list with an empty array for its edges
      this.vertices[vertex] = []
    }
  }

  // we are assuming an undirected graph
  addEdge(vertex1, vertex2) {
    if (!this.vertices[vertex1] || !this.vertices[vertex2]) {
      throw new Error('Vertex not found')
    }
    // add vertex2 to the adjacency list of vertex1 and vice versa
    this.vertices[vertex1].push(vertex2)
    this.vertices[vertex2].push(vertex1)
  }

  // method to perform a depth-first search (BFS) to find the shortest path between two vertices
  dfs(startVertex, visited = {}) {
    if (!this.vertices[startVertex]) {
      return
    }

    visited[startVertex] = true
    console.log(startVertex)

    // traverse each adjacent vertex recursively
    for (let neighbor of this.vertices[startVertex]) {
      if (!visited[neighbor]) {
        this.dfs(neighbor, visited)
      }
    }
  }

  // method to perform a breadth-first search (BFS) to find the shortest path between two vertices
  bfs(startVertex) {
    if (!this.vertices[startVertex]) {
      return
    }

    const visited = {} // store visited vertices
    const queue = [startVertex] // queue to store vertices to be visited
    visited[startVertex] = true

    // loop until queue is empty
    while (queue.length) {
      const vertex = queue.shift()
      console.log(vertex)

      // enqueue each unvisited adjacent vertex
      for (let neighbor of this.vertices[vertex]) {
        if (!visited[neighbor]) {
          visited[neighbor] = true
          queue.push(neighbor)
        }
      }
    }
  }

  // dijkstra's algorithm to find the shortest path from startVertex to endVertex
  dijkstra(startVertex, endVertex) {
    const distances = {}
    const visited = {}
    const queue = []

    // initialize distances to all vertices as infinity
    for (let vertex in this.vertices) {
      distances[vertex] = Infinity
    }
    distances[startVertex] = 0

    queue.push({ vertex: startVertex, distance: 0 })

    while (queue.length) {
      // sort the queue based on distances
      queue.sort((a, b) => a.distance - b.distance)
      const { vertex, distance } = queue.shift()

      // skip if the vertex is already visited
      if (visited[vertex]) continue
      visited[vertex] = true

      // update distances to neighboring vertices
      for (let neighbor of this.vertices[vertex]) {
        // here we assume an unweighted graph
        const totalDistance = distance + 1
        if (totalDistance < distances[neighbor]) {
          distances[neighbor] = totalDistance
          queue.push({ vertex: neighbor, distance: totalDistance })
        }
      }
    }

    // return the shortest distance to the endVertex
    return distances[endVertex]
  }
}

// emaple usage:
const graph = new Graph()
graph.addVertex('A')
graph.addVertex('B')
graph.addVertex('C')
graph.addVertex('D')
graph.addVertex('E')

graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('B', 'D')
graph.addEdge('C', 'D')
graph.addEdge('D', 'E')

console.log('DFS:')
graph.dfs('A')
console.log('\nBFS:')
graph.bfs('A')

console.log(
  '\ndijkstra: Shortest distance from A to E:',
  graph.dijkstra('A', 'E')
)
