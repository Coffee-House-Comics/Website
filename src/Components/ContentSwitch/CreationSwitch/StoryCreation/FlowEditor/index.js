import ReactFlow, { applyEdgeChanges, applyNodeChanges, MiniMap, Controls, updateEdge, addEdge } from 'react-flow-renderer';
import React, { useCallback, useContext, useEffect } from 'react';
import { StoryStoreContext } from '../../../../../Store/StoryCreationStore';
import { GlobalStoreContext } from '../../../../../Store';
import { Colors } from '../../../../../Common/Theme';
import { useParams } from 'react-router-dom';
import API from '../../../../../API';
import { Typography } from '@mui/material';


export default function FlowEditor() {
    const { storyStore } = React.useContext(StoryStoreContext);

    const { id } = useParams();

    const { store } = React.useContext(GlobalStoreContext)

    // Host the nodes and edges locally ------------
    const [nodes, setNodes] = React.useState(null);

    const [edges, setEdges] = React.useState(null);

    const transactionTypes = {
        createNode: "createNode",
        createEdge: "createEdge",
        deleteNode: "deleteNode",
        deleteEdge: "deleteEdge",
        renameNode: "renameNode",
        renameEdge: "renameEdge",
        moveNode: "moveNode",
    };

    let transactions = [];
    let transactionIndex = -1;

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
    } 

    function peekTransStack() {
        return transactions[transactionIndex];
    }

    let undoStack = [];

    function clearTransactions() {
        undoStack = [];
        transactions = [];
        transactionIndex = -1;
    }


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

            const id =(storyStore.nodes.length + 1).toString()

            const newNode = {
                id: id,
                data: { label: 'Untitled', payload: '' },
                position: {
                    x: 0 + Math.random() * 100,
                    y: 0 + Math.random() * 100,
                },
            };

            storyStore.toggleTrigger();

            createTransEntry(transactionTypes.createNode, id)
            setNodes((nodes) => nodes.concat(newNode));
        }
    }, [storyStore.triggerNewNode]);

    useEffect(function () {
        if(storyStore.triggerUndo){
            const transaction = peekTransStack();
        
            if (!transaction)
                return;
    
            if (transactions.length === 0 || transactionIndex < 0)
                return
    
            if (transaction.transactionName === transactionTypes.createLine) {
                const last = peekSerial();
    
                if (!last)
                    return;
    
                //console.log("Setting (from undo) to:", undoStack, serialization);
                if (serialization.length === 0) {
                    return;
                }
    
                undoStack = [...undoStack, last];
    
                //console.log("Setting (from undo) to:", undoStack, serialization);
    
                transactionIndex--;
    
                setSerialization(serialization.slice(0, -1));
            }
            else if (transaction.transactionName === transactionTypes.createImage) {
                const last = peekSerial();
    
                if (!last)
                    return
    
                undoStack = [...undoStack, last];
                transactionIndex--;
    
                setSerialization(serialization.slice(0, -1));
            }
            else if (transaction.transactionName === transactionTypes.moveImage) {
                const id = transaction.id;
    
                const before = transaction.before;
                const after = transaction.after;
    
                console.log("before, after:", before, after);
    
                const x = before.x;
                const y = before.y;
    
                // const oldX = after.x;
                // const oldY = after.y;
    
                const elem = serialization[id];
    
                if (elem) {
                    elem.data.x = x;
                    elem.data.y = y;
    
                    serialization.splice(id, 1, elem);
    
                    transactionIndex--;
    
                    setSerialization(serialization.concat());
                }
            }
            else if (transaction.transactionName === transactionTypes.changeBackgroundColor) {
                const before = transaction.before;
                // const after = transaction.after;
    
                transactionIndex--;
    
                setBackgroundColor(before);
            }
            else if (transaction.transactionName === transactionTypes.modifyText) {
                // console.log("Undo modify text with transaction id", transaction.id)
                const id = transaction.id;
    
                const before = transaction.before;
                const after = transaction.after;
    
                console.log("Before: ", before)
    
                const elem = serialization[id];
    
                if (elem) {
                    elem.data = { ...before };
    
                    serialization.splice(id, 1, elem);
                    setFontSize(before.fontSize)
                    setCurrentTextColor(before.color)
    
                    transactionIndex--;
    
                    setSerialization(serialization.concat());
                }
            } else if (transaction.transactionName === transactionTypes.addText) {
                const last = peekSerial();
    
                if (!last)
                    return;
    
                //console.log("Setting (from undo) to:", undoStack, serialization);
                if (serialization.length === 0) {
                    return;
                }
    
                undoStack = [...undoStack, last];
    
                //console.log("Setting (from undo) to:", undoStack, serialization);
    
                transactionIndex--;
    
                setSerialization(serialization.slice(0, -1));
                setTextEditModeOn(false);
            } else if (transaction.transactionName === transactionTypes.moveText) {
                const id = transaction.id;
    
                const before = transaction.before;
                const elem = { ...serialization[id] };
    
                if (elem) {
                    elem.data.x = before.x
                    elem.data.y = before.y
    
                    serialization.splice(id, 1, elem);
    
                    transactionIndex--;
    
                    setSerialization(serialization.concat());
                }
            }
            else {
                console.log("Unsupported transaction");
            }

            storyStore.toggleUndo();
        }
    }, [storyStore.triggerUndo]);


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
        console.log("node Changes", changes)
         changes.forEach(change => {
             if (change.type === 'remove') {
                createTransEntry(transactionTypes.deleteNode, change.id, storyStore.getNode(change.id, nodes))
             } else if(change.type === 'position' && change.dragging){
                const currNode = storyStore.getNode(change.id, nodes);
                const reverseChange = {
                    ...change,
                    position:currNode.position
                }
                createTransEntry(transactionTypes.moveNode, change.id, reverseChange, change)
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
                   createTransEntry(transactionTypes.deleteEdge, change.id, storyStore.getEdge(change.id, edges))
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
            createTransEntry(transactionTypes.createEdge, connection.id)
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