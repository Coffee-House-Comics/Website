import ReactFlow, { applyEdgeChanges, applyNodeChanges, MiniMap, Controls, updateEdge, addEdge } from 'react-flow-renderer';
import { useCallback, useContext } from 'react';
import {StoryStoreContext} from '../../../../../Store/StoryCreationStore';

/*
const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
  },

  {
    id: '2',
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3', animated: true },
];
*/


export default function FlowEditor() {  
    const { store } = useContext(StoryStoreContext);

    console.log("store", store)

    const onNodesChange = useCallback(
      (changes) => store.changeNodes((nds) => applyNodeChanges(changes, nds)),
      [store.changeNodes]
    );
    const onEdgesChange = useCallback(
      (changes) => store.changeEdges((eds) => applyEdgeChanges(changes, eds)),
      [store.changeEdges]
    );
    const onEdgeUpdate = useCallback(
      (oldEdge, newConnection) => store.changeEdges((eds) => updateEdge(oldEdge, newConnection, eds)),
      [store.changeEdges]
    );
    const onConnect = useCallback(
      (connection) => store.changeEdges((eds) => addEdge(connection, eds)),
      [store.changeEdges]
    );

    //const onNodesChange = (changes) => store.changeNodes(applyNodeChanges(changes, store.nodes));
    //const onEdgesChange = (changes) => store.changeEdges(applyNodeChanges(changes, store.edges));

    //const onEdgeUpdate = (oldEdge, newConnection) => store.changeEdges(updateEdge(oldEdge, newConnection, store.edges));
    //const onConnect = (params) => store.changeEdges(addEdge(params, store.edges));

    return (    
    <ReactFlow
            nodes={store.nodes}
            edges={store.edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onEdgeUpdate={onEdgeUpdate}
            onConnect={onConnect}
            fitView
        >
            <Controls />
            <MiniMap />
        </ReactFlow>   
  )
 
}