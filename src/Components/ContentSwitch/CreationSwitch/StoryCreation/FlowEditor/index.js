import ReactFlow, { applyEdgeChanges, applyNodeChanges, MiniMap, Controls, updateEdge, addEdge } from 'react-flow-renderer';
import React, { useCallback, useEffect, useRef } from 'react';
import { StoryStoreContext } from '../../../../../Store/StoryCreationStore';
import { GlobalStoreContext } from '../../../../../Store';
import { Colors } from '../../../../../Common/Theme';
import { useParams } from 'react-router-dom';
import API from '../../../../../API';
import { Typography } from '@mui/material';


let transactions = [];
let transactionIndex = -1;
let transactionsLastIndex = -1;

export default function FlowEditor() {
    const { storyStore } = React.useContext(StoryStoreContext);

    const { id } = useParams();

    const { store } = React.useContext(GlobalStoreContext)

    const default_nodes = (id !== "SHOW_EDITOR_WITH_ERROR_FOR_DEMO") ? null : [
        {
            id: '1',
            type: 'input',
            data: { label: 'Start' },
            position: { x: 0, y: 0 },
        },
        {
            id: '2',
            data: { label: 'Page 1', payload: 'This is a template page. Edit as you see fit.' },
            position: { x: 0, y: 90 },
        }
    ];

    const default_edges = (id !== "SHOW_EDITOR_WITH_ERROR_FOR_DEMO") ? null : [
        {
            id: 'e1-2',
            label: 'Begin',
            source: '1',
            target: '2',
            labelBgPadding: [8, 4],
            labelBgBorderRadius: 4,
            style: { strokeWidth: 3 },
            labelBgStyle: { fill: "#72AD7D" }
        }
    ];

    // Host the nodes and edges locally ------------
    const [nodes, setNodes] = React.useState(default_nodes);
    const nodesRef = useRef(nodes);

    const [edges, setEdges] = React.useState(default_edges);
    const edgesRef = useRef(edges);

    let startDrag = false;
    let lastPosition;
    let firstPosition;

    const transactionTypes = {
        createNode: "createNode",
        createEdge: "createEdge",
        deleteNode: "deleteNode",
        deleteEdge: "deleteEdge",
        moveNode: "moveNode",
    };

    function createTransEntry(name, id, before, after) {
    const entry = {
        transactionName: name,
        before: before,
        after: after,
        id: id
    };

    if ((transactionIndex < 0) || (transactionIndex < (transactions.length - 1))) {
        for (let i = transactions.length - 1; i > transactionIndex; i--) {
            transactions.splice(i, 1);
        }
    }

    transactions[++transactionIndex] = entry;
    transactionsLastIndex = transactionIndex;
    } 

    function peekTransStack() {
        return transactions[transactionIndex];
    }

    function clearTransactions() {
        transactions = [];
        transactionIndex = -1;
        transactionsLastIndex = -1;
    }


    // Push changes up to the store ------------
    useEffect(function () {
        storyStore.changeNodes(nodes);
        nodesRef.current = nodes
    }, [nodes]);

    useEffect(function () {
        storyStore.changeEdges(edges)
        edgesRef.current = edges
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

            const id =(storyStore.nodes.length + 1).toString()

            const newNode = {
                id: id,
                data: { label: 'Untitled', payload: '<p></p>' },
                position: {
                    x: 0 + Math.random() * 100,
                    y: 0 + Math.random() * 100,
                },
            };

            storyStore.toggleTrigger();

            createTransEntry(transactionTypes.createNode, id, newNode)
            setNodes((nodes) => nodes.concat(newNode));
        }
    }, [storyStore.triggerNewNode]);

    useEffect(function () {
        if(storyStore.triggerUndo){
            console.log("UNDOING");
            console.log(transactions)
            const transaction = peekTransStack();
        
            if (!transaction)
                return;
    
            if (transactions.length === 0 || transactionIndex < 0)
                return
    
            if (transaction.transactionName === transactionTypes.createNode) {
                const change = {
                    id: transaction.id,
                    type: 'remove'
                };
    
                setNodes((nds) => applyNodeChanges([change], nds));
                transactionIndex--;
            } else if (transaction.transactionName === transactionTypes.createEdge){
                const change = {
                    id: transaction.id,
                    type: 'remove'
                };
    
                setEdges((eds) => applyEdgeChanges([change], eds))
                transactionIndex--;
            }
            else if (transaction.transactionName === transactionTypes.deleteNode){
                console.log("transaction", transaction)
                console.log("nodes", nodes)
                setNodes((nodes) => nodes.concat(transaction.before));
                transactionIndex--;
            }
            else if (transaction.transactionName === transactionTypes.deleteEdge){
                setEdges((eds) => addEdge(transaction.before, eds))
                transactionIndex--;
            }
            else if (transaction.transactionName === transactionTypes.moveNode){
                setNodes((nds) => applyNodeChanges([transaction.before], nds));
                transactionIndex--;
            }
            else {
                console.log("Unsupported transaction");
            }

            storyStore.toggleUndo();
        }
    }, [storyStore.triggerUndo]);


    useEffect(function () {
        if(storyStore.triggerRedo){
            console.log("REDOING");
            console.log(transactions)

            if (transactionIndex >= transactionsLastIndex)
                return;

            transactionIndex++;
            const transaction = peekTransStack();

            if (!transaction)
                return;
    
            if (transactions.length === 0 || transactionIndex < 0)
                return  
    
            if (transaction.transactionName === transactionTypes.createNode) {
                setNodes((nodes) => nodes.concat(transaction.before));
            } else if (transaction.transactionName === transactionTypes.createEdge){
                setEdges((eds) => addEdge(transaction.before, eds))
            }
            else if (transaction.transactionName === transactionTypes.deleteNode){
                const change = {
                    id: transaction.id,
                    type: 'remove'
                };

                setNodes((nds) => applyNodeChanges([change], nds));
            }
            else if (transaction.transactionName === transactionTypes.deleteEdge){
                const change = {
                    id: transaction.id,
                    type: 'remove'
                };

                setEdges((eds) => applyEdgeChanges([change], eds))
            }
            else if (transaction.transactionName === transactionTypes.moveNode){
                setNodes((nds) => applyNodeChanges([transaction.after], nds));
            }
            else {
                console.log("Unsupported transaction");
            }

            storyStore.toggleRedo();
        }
    }, [storyStore.triggerRedo]);


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

    const onNodeClick = async function (event, node) {
        // console.log("On node click", node);

        const targetNode = storyStore.getNode(node.id, nodes)

        console.log("On node click", targetNode);
        await storyStore.closeEditing()

        if (node.id === '1') 
            return

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
        console.log("node Changes", changes)
         changes.forEach(change => {
             if (change.type === 'remove') {
                createTransEntry(transactionTypes.deleteNode, change.id, storyStore.getNode(change.id, nodesRef.current))
             } else if(change.type === 'position'){
                
                if(change.dragging && !startDrag){
                    startDrag = true;
                    const currNode = storyStore.getNode(change.id, nodesRef.current);
                    firstPosition = {
                        ...change,
                        position:currNode.position
                    }
                } else if (!change.dragging && startDrag){
                    startDrag = false;
                    createTransEntry(transactionTypes.moveNode, change.id, firstPosition, {
                        ...change,
                        position:lastPosition
                    })
                }
                lastPosition = change.position
             }
          })

            setNodes((nds) => applyNodeChanges(changes, nds));
        },
        [setNodes]
    );

    const onEdgesChange = useCallback(
        (changes) => {
        console.log("edge Changes", changes)
        changes.forEach(change => {
                if (change.type === 'remove') {
                   createTransEntry(transactionTypes.deleteEdge, change.id, storyStore.getEdge(change.id, edgesRef.current))
                }
           })
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
            connection.id = 'e' + connection.source + '-' + connection.target
            createTransEntry(transactionTypes.createEdge, connection.id, connection)
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