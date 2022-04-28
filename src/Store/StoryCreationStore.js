import { createContext, useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import types from '../Common/Types';
import { GlobalStoreContext } from '.';
import API from '../API';
import {MarkerType } from 'react-flow-renderer';
import { Colors } from '../Common/Theme';


const StoryStoreContext = createContext({});

const StoryStoreActionType = {
    SET_STORY_ID: "SET_STORY_ID",
    SET_NODES: "SET_NODES",
    SET_EDGES: "SET_EDGES",
    SET_MODE: "SET_MODE",
}

const StoryAPI = API.Story;

//Setting up story storyStore
function StoryStoreContextProvider(props) {
    const { store } = useContext(GlobalStoreContext);

    const [storyStore, setStore] = useState({
        storyId: null,
        mode: 0,
        elementId: null,
        elementTitle: null,
        elementBody: null,
        nodes: [
            {
              id: '1',
              type: 'input',
              data: { label: 'Start', payload: 'Payload1'},
              position: { x: 0, y: 0 },
            },
            {
                id: '2',
                data: { label: 'Page 1', payload: 'Payload2'},
                position: { x: -100, y: 90 },
            },
            {
                id: '3',
                data: { label: 'Page 2', payload: 'Payload3'},
                position: { x: 100, y: 90 },
            },
            {
                id: '4',
                data: { label: 'Page 3', payload: 'Payload4'},
                position: { x: 0, y: 170 },
            },
            {
              id: '5',
              type: 'output',
              data: { label: 'End', payload: 'Payload5'},
              position: { x: 0, y: 250 },
            },
        ],
        edges: [
    
            { id: 'e1-3', 
                label: 'Choice 2', 
                source: '1', 
                target: '3',    
                labelBgPadding: [8, 4],
                labelBgBorderRadius: 4,
                style: {strokeWidth: 3},
                labelBgStyle: {fill: Colors.forest_green_crayola}
            },

            { id: 'e2-4', 
                label: 'Continue', 
                source: '2', 
                target: '4',
                labelBgPadding: [8, 4],
                labelBgBorderRadius: 4,
                style: {strokeWidth: 3},
                labelBgStyle: {fill: Colors.forest_green_crayola}
            },


            { id: 'e3-4', 
                label: 'Continue', 
                source: '3', 
                target: '4',
                labelBgPadding: [8, 4],
                labelBgBorderRadius: 4,
                style: {strokeWidth: 3},
                labelBgStyle: {fill: Colors.forest_green_crayola}
            },

            { id: 'e4-5', 
                label: 'Continue', 
                source: '4', 
                target: '5',
                labelBgPadding: [8, 4],
                labelBgBorderRadius: 4,
                style: {strokeWidth: 3},
                labelBgStyle: { fill: Colors.forest_green_crayola}
            },
        ],
    });

    const storeReducer = (action) => {
        const { type, payload } = action;

        switch (type) {
            case StoryStoreActionType.SET_STORY_ID: {
                return setStore({
                    storyId: payload,
                    mode: storyStore.mode,
                    elementId: storyStore.elementId,
                    elementTitle: storyStore.elementTitle,
                    elementBody: storyStore.elementBody,
                    nodes: storyStore.nodes,
                    edges: storyStore.edges,
                })
            }

            case StoryStoreActionType.SET_NODES: {
                return setStore({
                    storyId: storyStore.storyId,
                    mode: storyStore.mode,
                    elementId: storyStore.elementId,
                    elementTitle: storyStore.elementTitle,
                    elementBody: storyStore.elementBody,
                    nodes: payload,
                    edges: storyStore.edges,
                })
            }

            case StoryStoreActionType.SET_EDGES: {
                return setStore({
                    storyId: storyStore.storyId,
                    mode: storyStore.mode,
                    elementId: storyStore.elementId,
                    elementTitle: storyStore.elementTitle,
                    elementBody: storyStore.elementBody,
                    nodes: storyStore.nodes,
                    edges: payload,
                })
            }

            case StoryStoreActionType.SET_MODE: {
                return setStore({
                    storyId: storyStore.storyId,
                    mode: payload,
                    elementId: storyStore.elementId,
                    elementTitle: storyStore.elementTitle,
                    elementBody: storyStore.elementBody,
                    nodes: storyStore.nodes,
                    edges: storyStore.edges,
                })
            }

            default: return storyStore;
        }
    }

    storyStore.changeStoryId = function(id) {
        storeReducer({
            type: StoryStoreActionType.SET_STORY_ID,
            payload: id
        });
    }

    storyStore.changeNodes = function(nodes) {
        console.log("nodes ", nodes)
        let newNodes = nodes
        if (typeof nodes === 'function') {
            newNodes = nodes(storyStore.nodes)
        }
        console.log("newNodes ", newNodes)
        
        storeReducer({
            type: StoryStoreActionType.SET_NODES,
            payload: newNodes
        });
    }

    storyStore.changeEdges = function(edges) {
        console.log("edges ", edges)
        let newEdges = edges
        if (typeof edges === 'function') {
            newEdges = edges(storyStore.edges)
        }
        console.log("newEdges ", newEdges)
        storeReducer({
            type: StoryStoreActionType.SET_EDGES,
            payload: newEdges
        });
    }

    storyStore.changeMode = function(newMode, newId, newTitle, newBody) {
        let newPage = {
            mode: newMode,
            elementId: newId,
            elementTitle: newTitle,
            elementBody: newBody
        }
        
        console.log("newPage", newPage)
        storeReducer({
            type: StoryStoreActionType.SET_MODE,
            payload: newMode
        });
        console.log("afterReducer ", storyStore.mode)
    }

    storyStore.loadNode = function(id, title, body) {
        storyStore.changeMode(2, id, title, body);
    }

    storyStore.loadEdge = function(id, title) {
        storyStore.changeMode(1, id, title, null);
    }

    storyStore.closeEditing = function() {
        storyStore.changeMode(0, null, null, null);
    }

    storyStore.getNode = function(id) {
        let result = storyStore.nodes.filter(item => item.id === id)
        if(result.length != 0) 
            return result[0]
        else
            return null
    }

    storyStore.getEdge = function(id) {
        let result = storyStore.edges.filter(item => item.id === id)
        if(result.length != 0)
            return result[0]
        else
            return null
    }

    storyStore.fetchData = async function() {
        try {
            store.toggleLoading();
            const response = await StoryAPI.viewUnpublished(storyStore.storyId);
            store.toggleLoading();

            if(response.status === 200) {
                console.log("Data successfully fetched");
                storyStore.changeNodes(response.data.content.ReactFlowJSON.nodes);
                storyStore.changeEdges(response.data.content.ReactFlowJSON.edges);
                return;
            }
        }

        catch (err) {

        }

        console.log("Couldn't fetch story :/");
        store.createModal({
            title: "Error fetching story data",
            body: "Story could not be retrieved. Please try again.",
            action: ""
        });
    }

    storyStore.editMetaData = async function(newData) {
        const { name, description, coverPhoto, series } = newData;

        try {
            store.toggleLoading();
            const response = await StoryAPI.editMetaData(storyStore.storyId, name, description, coverPhoto, series);
            store.toggleLoading();

            if(response.status === 200) {
                store.reRoute(types.TabType.CREATION.children.STORY.fullRoute.slice(0, -3) + storyStore.storyId);
            }
        }

        catch (err) {

        }

        console.log("Couldn't edit metadata :/");
        store.createModal({
            title: "Error editing metadata",
            body: "Comic metadata could not be edited. Please try again.",
            action: ""
        });
    }

    storyStore.publish = async function() {
        //TODO get series somehow
        const series =  "";

        try {
            store.toggleLoading();
            const response = await StoryAPI.publish(storyStore.storyId, series);
            store.toggleLoading();

            if(response.status === 200) {
                store.reRoute(types.TabType.APP.children.PROFILE.fullRoute.slice(0, -3) + store.user);
                store.createModal({
                    title: "Story published",
                    body: "Your story has been succesfully published!",
                    action: ""
                });
                return;
            }
        }

        catch (err) {

        }

        console.log("Couldn't publish story :/");
        store.createModal({
            title: "Error publishing story",
            body: "Story could not be published. Please try again.",
            action: ""
        });
    }

    storyStore.save = async function() {
        try {
            store.toggleLoading();
            const response = await StoryAPI.saveContent(storyStore.storyId, [], {nodes : storyStore.nodes, edges : storyStore.edges});
            store.toggleLoading();

            if(response.status === 200) {
                await storyStore.fetchData();
                return;
            }
        }

        catch (err) {

        }

        console.log("Couldn't save story :/");
        store.createModal({
            title: "Error saving story",
            body: "Story could not be saved. Please try again.",
            action: ""
        });
    }

    storyStore.create = async function(storyInfo) {
        const { name, description } = storyInfo;

        try {
            store.toggleLoading();
            const response = await StoryAPI.create(name, description);
            store.toggleLoading();

            if(response.status === 200) {
                storyStore.changeStoryId(response.data.id);
                storyStore.fetchData();
                store.reRoute(types.TabType.CREATION.children.STORY.fullRoute.slice(0, -3) + storyStore.storyId);
                return;
            }
        }

        catch (err) {

        }

        console.log("Couldn't create story :/");
        store.createModal({
            title: "Error creating story",
            body: "Story could not be created. Please try again.",
            action: ""
        });
    }

    //const getNodeId = () => `randomnode_${+new Date()}`;

    storyStore.addNode = function() {
        const newNode = {
            id: (storyStore.nodes.length + 1).toString(),
            data: { label: 'Untitled', payload: '' },
            position: {
                x: 0 + Math.random() * 100,
                y: 0 + Math.random() * 100,
            },
          };
          storyStore.changeNodes((nodes) => nodes.concat(newNode));
    }


    return (
        <StoryStoreContext.Provider
            value={{ storyStore }}
        >
            {props.children}
        </StoryStoreContext.Provider>
    );
}

export{
    StoryStoreContext,
    StoryStoreContextProvider
}