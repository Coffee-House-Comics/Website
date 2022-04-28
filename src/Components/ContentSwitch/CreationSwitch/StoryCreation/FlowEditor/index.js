import ReactFlow, { applyEdgeChanges, applyNodeChanges, MiniMap, Controls, updateEdge, addEdge} from 'react-flow-renderer';
import React, { useCallback, useContext } from 'react';
import {StoryStoreContext} from '../../../../../Store/StoryCreationStore';
import { GlobalStoreContext } from '../../../../../Store';
import { Colors } from '../../../../../Common/Theme';

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
    const { storyStore } = React.useContext(StoryStoreContext)
    const {store} = React.useContext(GlobalStoreContext)

    console.log("storyStore", storyStore)
    console.log("store", store)

    const onNodesChange = useCallback(
      (changes) => {
        console.log("node changes", changes) 
        let processedChanges = []
        changes.forEach(change => {
          if(change.type === 'remove'){
            const metadata = {
              title: "Are you sure that you want to delete the selected page?",
              body: "This action is irreversable",
              action: "Delete"
            };
            
            store.createModal(metadata, function () {
              storyStore.changeNodes((nds) => applyNodeChanges([change], nds))
            });
          }else if(change.type === 'select' && change.selected){
            let node = storyStore.getNode(change.id)
            console.log("found Node: ",node)
            console.log(storyStore.mode)
            storyStore.loadNode(node.id, node.data.label, node.data.payload)
            console.log(storyStore.mode)
            processedChanges.push(change)
          }else{
            processedChanges.push(change)
          }
        })
        storyStore.changeNodes((nds) => applyNodeChanges(processedChanges, nds))
      },
      [storyStore.changeNodes]
    );
    const onEdgesChange = useCallback(
      (changes) => {
        console.log("edge changes",changes)

        changes.forEach(change => {
          if(change.type === 'select' && change.selected){
            let edge = storyStore.getEdge(change.id)
            storyStore.loadEdge(edge.id, edge.label)
          }
        })

        storyStore.changeEdges((eds) => applyEdgeChanges(changes, eds))
      },
      [storyStore.changeEdges]
    );
    const onEdgeUpdate = useCallback(
      (oldEdge, newConnection) => storyStore.changeEdges((eds) => updateEdge(oldEdge, newConnection, eds)),
      [storyStore.changeEdges]
    );
    const onConnect = useCallback(
      (connection) => {
        connection.labelBgPadding = [8, 4]
        connection.labelBgBorderRadius = 4
        connection.style = {strokeWidth: 3}
        connection.labelBgStyle = {fill: Colors.forest_green_crayola}
        storyStore.changeEdges((eds) => addEdge(connection, eds))
      },
      [storyStore.changeEdges]
    );


    //const onNodesChange = (changes) => store.changeNodes(applyNodeChanges(changes, store.nodes));
    //const onEdgesChange = (changes) => store.changeEdges(applyNodeChanges(changes, store.edges));

    //const onEdgeUpdate = (oldEdge, newConnection) => store.changeEdges(updateEdge(oldEdge, newConnection, store.edges));
    //const onConnect = (params) => store.changeEdges(addEdge(params, store.edges));

    return (    
    <ReactFlow
            nodes={storyStore.nodes}
            edges={storyStore.edges}
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