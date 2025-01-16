// interface Node<T>{
//     value:T;
//     edges: Edge<T>[];
// }
// interface Edge<T>{
//     from:Node<T>;
//     to: Node<T>;
// }
// interface DAG<T>{
//     addNode(value:T):Node<T>;
//     addEdge(from:Node<T>,to:Node<T>):void;
//     topologicalSort(): T[];
// }

// class dag1<T> implements DAG<T>{
//     private nodes:Map<T,Node<T>>=new Map();

//     addNode(value:T):Node<T>{
//         if(this.nodes.has(value)){
//             throw new Error("sorry already exists");
//         }
//         const node: Node<T>={value,edges : [] };
//         this.nodes.set(value,node);
//         return node;
//     }
    
//     addEdge(from : Node<T>, to: Node<T>) : void {
//         if(!this.nodes.has(from.value) || !this.nodes.has(to.value)){
//             throw new Error("NODES must exist");
//         } 
//         if(this.hasCycle(from,to)){
//             throw new Error("This could create cycle in the graph");
//         }
//         from.edges.push({from,to})
//     }

//     private hasCycle(from : Node<T>, to: Node<T>, visited=new Set<T>()):boolean{
//         if(visited.has(to.value)){
//             return true;
//         }
//         visited.add(to.value);
//         for(const edge of to.edges){
//             if(this.hasCycle(from,edge.to,visited)){
//                 return true;
//             }
            
//         }
//         visited.delete(from.value)
//         return false;
//     }

//     topologicalSort():T[]{
//         const visited=new Set<T>();
//         const result:T[] =[];

//         const visit=(node:Node<T>)=>{
//             if(visited.has(node.value)){
//                 return true;
//             }
//             visited.add(node.value);
//             for(const edge of node.edges){
//                 visit(edge.to)
//             }
//             result.push(node.value)
//         }
//         for(const node of this.nodes.values()){
//             visit(node)
//         }
//         return result.reverse();
        
//     }
    
// }
// const dag = new dag1<string>();

// const nodeA = dag.addNode("A");
// const nodeB = dag.addNode("B");
// const nodeC = dag.addNode("C");
// const nodeD = dag.addNode("D");

// dag.addEdge(nodeA, nodeB);
// dag.addEdge(nodeA, nodeC);
// dag.addEdge(nodeB, nodeD);
// dag.addEdge(nodeC, nodeD);

// console.log("Topological Sort:", dag.topologicalSort());

interface Node<T>{
    value:T;
    edges:Edge<T>[]
}

interface Edge<T>{
    from:Node<T>
    to:Node<T>
}

interface DAG<T>{
    addNode(value:T):Node<T>;
    addEdge(from:Node<T>,to:Node<T>):void;
    topologicalSort(): T[];
}

class dag1<T> implements DAG<T>{

    private nodes : Map<T,Node<T>> = new Map();

    addNode(value: T): Node<T> {
        if(this.nodes.has(value)){
            throw new Error("sorry already exists")
        }

        const node: Node<T>= {value,edges : []}
        this.nodes.set(value,node)
        return node;//nkjaafa
    }

    addEdge(from: Node<T>, to: Node<T>): void {
        if(!this.nodes.has(from.value) || (!this.nodes.has(to.value))){
            throw new Error("Node must exits")
        }

        if(this.hasCycle(from,to)){
            throw new Error("This could create a cycle")
        }
    }

    private hasCycle(from:Node<T>,to:Node<T>, visited = new Set<T>()):boolean {

        if(visited.has(to.value)){
            return true;
        }
        
        visited.add(to.value);
        for(const edge of to.edges){
           if(this.hasCycle(from,edge.to,visited)){
                return true;
         }

         visited.delete(from.value)
         return false;
        }
         
    }

    topologicalSort(): T[] {
        const visited=new Set<T>();
        const result:T[] =[];

        const visit=(node:Node<T>) : any=>{
            if(visited.has(node.value)){
                return true;
            }
            visited.add(node.value);
            for(const edge of node.edges){
                visit(edge.to)
            }
            result.push(node.value)
        }
        for(const node of this.nodes.values()){
            visit(node)
                }
        return result.reverse();
    }
}

    const dag = new dag1<string>();

const nodeA = dag.addNode("A");
const nodeB = dag.addNode("B");
const nodeC = dag.addNode("C");
const nodeD = dag.addNode("D");

dag.addEdge(nodeA, nodeB);
dag.addEdge(nodeA, nodeC);
dag.addEdge(nodeB, nodeD);
dag.addEdge(nodeC, nodeD);

console.log("Topological Sort:", dag.topologicalSort());
