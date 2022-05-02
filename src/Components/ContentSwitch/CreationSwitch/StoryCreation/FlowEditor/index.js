import ReactFlow, { applyEdgeChanges, applyNodeChanges, MiniMap, Controls, updateEdge, addEdge } from 'react-flow-renderer';
import React, { useCallback, useContext, useEffect } from 'react';
import { StoryStoreContext } from '../../../../../Store/StoryCreationStore';
import { GlobalStoreContext } from '../../../../../Store';
import { Colors } from '../../../../../Common/Theme';
import { useParams } from 'react-router-dom';
import API from '../../../../../API';
import { Typography } from '@mui/material';

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
    const { storyStore } = React.useContext(StoryStoreContext);

    const { id } = useParams();

    const { store } = React.useContext(GlobalStoreContext)

    // console.log("storyStore", storyStore)
    // console.log("store", store)


    // Host the nodes and edges locally ------------
    const [nodes, setNodes] = React.useState(null);

    const [edges, setEdges] = React.useState(null);


    // Push changes up to the store ------------
    useEffect(function () {
        storyStore.changeNodes(nodes);
    }, [nodes]);

    useEffect(function () {
        storyStore.changeEdges(edges)
    }, [edges]);

    useEffect(function () {
        console.log("When title/body change:", storyStore.mode, storyStore.elementId, storyStore.elementTitle, storyStore.elementBody);

        if (storyStore.mode === 0 || !storyStore.elementId || storyStore.elementTitle === undefined || storyStore.elementTitle === null)
            return;

        if (storyStore.mode === 2) {
            if (storyStore.elementBody === null || storyStore.elementBody === undefined)
                return;


            setNodes(nodes.map(function (node, index) {
                if (storyStore.elementId === node.id) {
                    return {
                        ...node,
                        data: {
                            label: storyStore.elementTitle,
                            payload: storyStore.elementBody
                        }
                    }
                }

                return node;
            }));
        }
        else if (storyStore.mode === 1) {
            setEdges(edges.map(function (edge, index) {
                if (storyStore.elementId === edge.id) {
                    return {
                        ...edge,
                        label: storyStore.elementTitle
                    }
                }

                return edge;
            }));
        }
    }, [storyStore.elementTitle, storyStore.elementBody]);


    useEffect(function () {
        if (storyStore.triggerNewNode) {
            console.log("MAKING NEW NODE");

            const newNode = {
                id: (storyStore.nodes.length + 1).toString(),
                data: { label: 'Untitled', payload: '' },
                position: {
                    x: 0 + Math.random() * 100,
                    y: 0 + Math.random() * 100,
                },
            };

            storyStore.toggleTrigger();

            setNodes((nodes) => nodes.concat(newNode));
        }
    }, [storyStore.triggerNewNode]);


    // Initial Load
    useEffect(() => {
        async function setup() {
            storyStore.changeStoryId(id);
            console.log("id: ", id)
            let resp = (await API.Story.viewUnpublished(id)).data.content.ReactFlowJSON
            console.log("debug the response: ", resp)

            setNodes(resp.nodes);
            setEdges(resp.edges);
        }
        setup();
    }, []);

    const onNodeClick = function (event, node) {
        // console.log("On node click", node);

        const targetNode = storyStore.getNode(node.id, nodes)

        console.log("On node click", targetNode);

        if (node.id === '1') 
            return storyStore.closeEditing();

        storyStore.loadNode(node.id, targetNode.data.label, targetNode.data.payload);
    }

    const onEdgeClick = function (event, edge) {
        const targetEdge = storyStore.getEdge(edge.id, edges);

        console.log("On edge click:", targetEdge);

        storyStore.loadEdge(edge.id, targetEdge.label);

    }

    const handleSelectionChange = function ({ nds, edgs }) {
        console.log("Selection change?", nds, edgs);

        if (!nds && !edgs)
            storyStore.closeEditing();

        if (nds && nds.length === 0)
            storyStore.closeEditing();

        if (edgs && edgs.length === 0)
            storyStore.closeEditing();
    }

    const onNodesChange = useCallback(
        (changes) => {
            // console.log("node changes", changes)
            // const processedChanges = []
            // changes.forEach(change => {
            //     if (change.type === 'remove') {
            //         const metadata = {
            //             title: "Are you sure that you want to delete the selected page?",
            //             body: "This action is irreversable",
            //             action: "Delete"
            //         };

            //         store.createModal(metadata, function () {
            //             setNodes((nds) => applyNodeChanges([change], nds))
            //         });
            //     } else if (change.type === 'select' && change.selected) {
            //         let node = storyStore.getNode(change.id, nodes)
            //         console.log("found Node: ", node)
            //         // console.log(storyStore.mode)
            //         // storyStore.loadNode(node.id, node.data.label, node.data.payload)
            //         processedChanges.push(change)
            //     } else {
            //         processedChanges.push(change)
            //     }
            // })

            setNodes((nds) => applyNodeChanges(changes, nds));
        },
        [setNodes]
    );

    const onEdgesChange = useCallback(
        (changes) => {
            setEdges((eds) => applyEdgeChanges(changes, eds))
        },
        [setEdges]
    );
    const onEdgeUpdate = useCallback(
        (oldEdge, newConnection) => setEdges((eds) => updateEdge(oldEdge, newConnection, eds)),
        [setEdges]
    );
    const onConnect = useCallback(
        (connection) => {
            connection.labelBgPadding = [8, 4]
            connection.labelBgBorderRadius = 4
            connection.style = { strokeWidth: 3 }
            connection.labelBgStyle = { fill: Colors.forest_green_crayola }
            connection.label = "Continue"
            setEdges((eds) => addEdge(connection, eds))
        },
        [setEdges]
    );

    if (!nodes || !edges)
        return <Typography>Loading...</Typography>

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onEdgeUpdate={onEdgeUpdate}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onEdgeClick={onEdgeClick}
            onSelectionChange={handleSelectionChange}
            fitView
        >
            <Controls />
            <MiniMap />
        </ReactFlow>
    )

}