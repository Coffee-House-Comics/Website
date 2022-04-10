import ReactFlow, { applyEdgeChanges, applyNodeChanges, MiniMap, Controls } from 'react-flow-renderer';
import { useCallback, useState } from 'react';

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

const initialNodes = [
    {
      id: '1',
      type: 'input',
      data: { label: 'Start' },
      position: { x: 0, y: 0 },
    },
    {
        id: '2',
        data: { label: 'Page 1' },
        position: { x: -100, y: 90 },
    },
    {
        id: '3',
        data: { label: 'Page 2' },
        position: { x: 100, y: 90 },
    },
    {
        id: '4',
        data: { label: 'Page 3' },
        position: { x: 0, y: 170 },
    },
    {
      id: '5',
      type: 'output',
      data: { label: 'End' },
      position: { x: 0, y: 250 },
    },
  ];
  
  const initialEdges = [
    { id: 'e1-2', label: 'Choice 1', source: '1', target: '2' },
    { id: 'e1-3', label: 'Choice 2', source: '1', target: '3' },
    { id: 'e2-4', label: 'Continue', source: '2', target: '4' },
    { id: 'e3-4', label: 'Continue', source: '3', target: '4' },
    { id: 'e4-5', label: 'Continue', source: '4', target: '5' },
  ];


export default function FlowEditor() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
  
    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
      );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );

    return (    
    <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
        >
            <Controls />
            <MiniMap />
        </ReactFlow>   
  )
 
}