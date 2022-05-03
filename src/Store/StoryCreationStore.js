import { createContext, useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import types from '../Common/Types';
import { GlobalStoreContext } from '.';
import API from '../API';
import { MarkerType } from 'react-flow-renderer';
import { Colors } from '../Common/Theme';


const StoryStoreContext = createContext({});

const StoryStoreActionType = {
    SET_STORY_ID: "SET_STORY_ID",
    SET_NODES: "SET_NODES",
    SET_EDGES: "SET_EDGES",
    SET_MODE: "SET_MODE",
    SET_PAGE: "SET_PAGE",
    SET_TRIGGER: "SET_TRIGGER",
    SET_UNDO: "SET_UNDO",
    SET_REDO: "SET_REDO"
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
        nodes: null,
        edges: null,
        triggerNewNode: false,
        triggerUndo: false,
        triggerRedo: false
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
                    triggerNewNode: false,
                    triggerUndo: false,
                    triggerRedo: false
                })
            }

            case StoryStoreActionType.SET_NODES: {
                // console.log("nodes payload: ", payload)
                return setStore({
                    storyId: storyStore.storyId,
                    mode: storyStore.mode,
                    elementId: storyStore.elementId,
                    elementTitle: storyStore.elementTitle,
                    elementBody: storyStore.elementBody,
                    nodes: payload,
                    edges: storyStore.edges,
                    triggerNewNode: false,
                    triggerUndo: false,
                    triggerRedo: false
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
                    triggerNewNode: false,
                    triggerUndo: false,
                    triggerRedo: false
                })
            }

            case StoryStoreActionType.SET_PAGE: {
                return setStore({
                    storyId: storyStore.storyId,
                    mode: payload.mode,
                    elementId: payload.elementId,
                    elementTitle: payload.elementTitle,
                    elementBody: payload.elementBody,
                    nodes: storyStore.nodes,
                    edges: storyStore.edges,
                    triggerNewNode: false,
                    triggerUndo: false,
                    triggerRedo: false
                })
            }

            case StoryStoreActionType.SET_TRIGGER: {
                return setStore({
                    storyId: storyStore.storyId,
                    mode: storyStore.mode,
                    elementId: storyStore.elementId,
                    elementTitle: storyStore.elementTitle,
                    elementBody: storyStore.elementBody,
                    nodes: storyStore.nodes,
                    edges: storyStore.edges,
                    triggerNewNode: payload,
                    triggerUndo: false,
                    triggerRedo: false
                })
            }

            case StoryStoreActionType.SET_UNDO: {
                return setStore({
                    storyId: storyStore.storyId,
                    mode: storyStore.mode,
                    elementId: storyStore.elementId,
                    elementTitle: storyStore.elementTitle,
                    elementBody: storyStore.elementBody,
                    nodes: storyStore.nodes,
                    edges: storyStore.edges,
                    triggerNewNode: false,
                    triggerUndo: payload,
                    triggerRedo: false
                })
            }

            case StoryStoreActionType.SET_REDO: {
                return setStore({
                    storyId: storyStore.storyId,
                    mode: storyStore.mode,
                    elementId: storyStore.elementId,
                    elementTitle: storyStore.elementTitle,
                    elementBody: storyStore.elementBody,
                    nodes: storyStore.nodes,
                    edges: storyStore.edges,
                    triggerNewNode: false,
                    triggerUndo: false,
                    triggerRedo: payload
                })
            }

            default: return storyStore;
        }
    }

    storyStore.toggleTrigger = function () {
        storeReducer({
            type: StoryStoreActionType.SET_TRIGGER,
            payload: !storyStore.triggerNewNode
        });
    }

    storyStore.toggleUndo = function () {
        storeReducer({
            type: StoryStoreActionType.SET_UNDO,
            payload: !storyStore.triggerUndo
        });
    }

    storyStore.toggleRedo = function () {
        storeReducer({
            type: StoryStoreActionType.SET_REDO,
            payload: !storyStore.triggerRedo
        });
    }

    storyStore.updateTitle = function (title) {
        const newPage = {
            mode: storyStore.mode,
            elementId: storyStore.elementId,
            elementTitle: title,
            elementBody: storyStore.elementBody
        }

        console.log("newPage", newPage)
        storeReducer({
            type: StoryStoreActionType.SET_PAGE,
            payload: newPage
        });
    };

    storyStore.updateBody = function (body) {
        const newPage = {
            mode: storyStore.mode,
            elementId: storyStore.elementId,
            elementTitle: storyStore.elementTitle,
            elementBody: body
        }

        console.log("newPage", newPage)
        storeReducer({
            type: StoryStoreActionType.SET_PAGE,
            payload: newPage
        });
    };

    storyStore.changeStoryId = function (id) {
        storeReducer({
            type: StoryStoreActionType.SET_STORY_ID,
            payload: id
        });
    }

    storyStore.changeNodes = function (nodes) {
        if (!nodes)
            return;

        // console.log("nodes ", nodes)
        let newNodes = nodes
        if (typeof nodes === 'function') {
            newNodes = nodes(storyStore.nodes)
        }
        // console.log("newNodes ", newNodes)

        storeReducer({
            type: StoryStoreActionType.SET_NODES,
            payload: [...newNodes]
        });
    }

    storyStore.changeEdges = function (edges) {
        if (!edges)
            return;

        // console.log("edges ", edges)
        let newEdges = edges
        if (typeof edges === 'function') {
            newEdges = edges(storyStore.edges)
        }
        // console.log("newEdges ", newEdges)
        storeReducer({
            type: StoryStoreActionType.SET_EDGES,
            payload: newEdges
        });
    }

    storyStore.changeMode = function (newMode, newId, newTitle, newBody) {
        let newPage = {
            mode: newMode,
            elementId: newId,
            elementTitle: newTitle,
            elementBody: newBody
        }

        console.log("newPage", newPage)
        storeReducer({
            type: StoryStoreActionType.SET_PAGE,
            payload: newPage
        });
        console.log("afterReducer ", storyStore.mode)
    }

    storyStore.loadNode = function (id, title, body) {
        storyStore.changeMode(2, id, title, body);
    }

    storyStore.loadEdge = function (id, title) {
        storyStore.changeMode(1, id, title, null);
    }

    storyStore.closeEditing = function () {
        storyStore.changeMode(0, null, null, null);
    }

    storyStore.getNode = function (id, nodes) {
        if (!nodes)
            return null;

        let result = nodes.filter(item => item.id === id)
        if (result.length != 0)
            return result[0]
        else
            return null
    }

    storyStore.getNodeIndex = function (id, nodes) {
        if (!nodes)
            return -1;

        nodes.forEach((element, index) => {
            if (element.id === id) return index;
        });

        return -1;
    };

    storyStore.getEdge = function (id, edges) {
        if (!edges)
            return null;

        let result = edges.filter(item => item.id === id)
        if (result.length != 0)
            return result[0]
        else
            return null
    }

    storyStore.getEdgeIndex = function (id, edges) {
        if (!edges)
            return -1;

        edges.forEach((element, index) => {
            if (element.id === id) return index;
        });

        return -1;
    };

    storyStore.fetchData = async function () {
        let response
        try {
            store.toggleLoading();
            response = await StoryAPI.viewUnpublished(storyStore.storyId);
            store.toggleLoading();

            if (response.status === 200) {
                console.log("Data successfully fetched");
                storyStore.changeNodes(response.data.content.ReactFlowJSON.nodes);
                storyStore.changeEdges(response.data.content.ReactFlowJSON.edges);
                return;
            }
        }

        catch (err) {

        }

        console.log("Couldn't fetch story :/");
        console.log(response);
        store.createModal({
            title: "Error fetching story data",
            body: "Story could not be retrieved. Please try again.",
            action: ""
        });
    }

    storyStore.editMetaData = async function (newData) {
        const { name, description, coverPhoto, series } = newData;

        try {
            store.toggleLoading();
            const response = await StoryAPI.editMetaData(storyStore.storyId, name, description, coverPhoto, series);
            store.toggleLoading();

            if (response.status === 200) {
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

    storyStore.publish = async function () {
        //TODO get series somehow
        const series = "";

        try {
            store.toggleLoading();
            const response = await StoryAPI.publish(storyStore.storyId, series);
            store.toggleLoading();

            if (response.status === 200) {
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

    storyStore.save = async function () {
        try {
            store.toggleLoading();
            const response = await StoryAPI.saveContent(storyStore.storyId, [], { nodes: storyStore.nodes, edges: storyStore.edges });
            store.toggleLoading();

            if (response.status === 200) {
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

    storyStore.create = async function (storyInfo) {
        const { name, description } = storyInfo;

        try {
            store.toggleLoading();
            const response = await StoryAPI.create(name, description);
            store.toggleLoading();

            if (response.status === 200) {
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

    storyStore.addNode = function () {
        const newNode = {
            id: (storyStore.nodes.length + 1).toString(),
            data: { label: 'Untitled', payload: '' },
            position: {
                x: 0 + Math.random() * 100,
                y: 0 + Math.random() * 100,
            },
        };
        storyStore.changeNodes();
    }


    return (
        <StoryStoreContext.Provider
            value={{ storyStore }}
        >
            {props.children}
        </StoryStoreContext.Provider>
    );
}

export {
    StoryStoreContext,
    StoryStoreContextProvider
}