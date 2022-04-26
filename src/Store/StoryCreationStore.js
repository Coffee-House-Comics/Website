import { createContext, useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import types from '../Common/Types';
import { GlobalStoreContext } from '.';
import API from '../API';

const StoryStoreContext = createContext({});

const StoryStoreActionType = {
    SET_STORY_ID: "SET_STORY_ID",
    SET_NODES: "SET_NODES",
    SET_EDGES: "SET_EDGES",
    SET_CURRENT_PAGE: "SET_CURRENT_PAGE"
}

const StoryAPI = API.Story;

//Setting up story store
function StoryStoreContextProvider(props) {
    const { mainStore } = useContext(GlobalStoreContext);

    const [store, setStore] = useState({
        storyId: null,
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
    
            { id: 'e1-3', label: 'Choice 2', source: '1', target: '3' },
            { id: 'e2-4', label: 'Continue', source: '2', target: '4' },
            { id: 'e3-4', label: 'Continue', source: '3', target: '4' },
            { id: 'e4-5', label: 'Continue', source: '4', target: '5' },
          ],

        //mode: 0 - no editing, 1 - editing node, 2 - editing edge
        currentPage: {
            mode: 0,
            id: null,
            title: null,
            body: null,
        }
    });

    const storeReducer = (action) => {
        const { type, payload } = action;

        switch (type) {
            case StoryStoreActionType.SET_STORY_ID: {
                return setStore({
                    storyId: payload,
                    nodes: store.nodes,
                    edges: store.edges,
                    currentPage: store.currentPage
                })
            }

            case StoryStoreActionType.SET_NODES: {
                return setStore({
                    storyId: store.storyId,
                    nodes: payload,
                    edges: store.edges,
                    currentPage: store.currentPage
                })
            }

            case StoryStoreActionType.SET_EDGES: {
                return setStore({
                    storyId: store.storyId,
                    nodes: store.nodes,
                    edges: payload,
                    currentPage: store.currentPage
                })
            }

            case StoryStoreActionType.SET_CURRENT_PAGE: {
                return setStore({
                    storyId: store.storyId,
                    nodes: store.nodes,
                    edges: store.edges,
                    currentPage: payload
                });
            }

            default: return store;
        }
    }

    store.changeStoryId = function(id) {
        storeReducer({
            type: StoryStoreActionType.SET_STORY_ID,
            payload: id
        });
    }

    store.changeNodes = function(nodes) {
        console.log("nodes ", nodes)
        let newNodes = nodes
        if (typeof nodes === 'function') {
            newNodes = nodes(store.nodes)
        }
        console.log("newNodes ", newNodes)
        storeReducer({
            type: StoryStoreActionType.SET_NODES,
            payload: newNodes
        });
    }

    store.changeEdges = function(edges) {
        console.log("edges ", edges)
        let newEdges = edges
        if (typeof edges === 'function') {
            newEdges = edges(store.edges)
        }
        console.log("newEdges ", newEdges)
        storeReducer({
            type: StoryStoreActionType.SET_EDGES,
            payload: newEdges
        });
    }

    store.changeMode = function(newMode, newId, newTitle, newBody) {
        storeReducer({
            type: StoryStoreActionType.SET_CURRENT_PAGE,
            payload: {
                mode: newMode,
                id: newId,
                title: newTitle,
                body: newBody
            }
        });
    }

    store.loadNode = function(id, title, body) {
        return store.changeMode(1, id, title, body);
    }

    store.loadEdge = function(id, title) {
        return store.changeMode(2, id, title, null);
    }

    store.closeEditing = function() {
        return store.changeMode(0, null, null, null);
    }

    store.fetchData = async function() {
        try {
            mainStore.toggleLoading();
            const response = await StoryAPI.viewUnpublished(store.storyId);
            mainStore.toggleLoading();

            if(response.status === 200) {
                console.log("Data successfully fetched");
                store.changeNodes(response.data.content.ReactFlowJSON.nodes);
                store.changeEdges(response.data.content.ReactFlowJSON.edges);
                return;
            }
        }

        catch (err) {

        }

        console.log("Couldn't fetch story :/");
        mainStore.createModal({
            title: "Error fetching story data",
            body: "Story could not be retrieved. Please try again.",
            action: ""
        });
    }

    store.editMetaData = async function(newData) {
        const { name, description, coverPhoto, series } = newData;

        try {
            mainStore.toggleLoading();
            const response = await StoryAPI.editMetaData(store.storyId, name, description, coverPhoto, series);
            mainStore.toggleLoading();

            if(response.status === 200) {
                mainStore.reRoute(types.TabType.CREATION.children.STORY.fullRoute.slice(0, -3) + store.storyId);
            }
        }

        catch (err) {

        }

        console.log("Couldn't edit metadata :/");
        mainStore.createModal({
            title: "Error editing metadata",
            body: "Comic metadata could not be edited. Please try again.",
            action: ""
        });
    }

    store.publish = async function() {
        //TODO get series somehow
        const series =  "";

        try {
            mainStore.toggleLoading();
            const response = await StoryAPI.publish(store.storyId, series);
            mainStore.toggleLoading();

            if(response.status === 200) {
                mainStore.reRoute(types.TabType.APP.children.PROFILE.fullRoute.slice(0, -3) + mainStore.user);
                mainStore.createModal({
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
        mainStore.createModal({
            title: "Error publishing story",
            body: "Story could not be published. Please try again.",
            action: ""
        });
    }

    store.save = async function() {
        try {
            mainStore.toggleLoading();
            const response = await StoryAPI.saveContent(store.storyId, [], {nodes : store.nodes, edges : store.edges});
            mainStore.toggleLoading();

            if(response.status === 200) {
                await store.fetchData();
                return;
            }
        }

        catch (err) {

        }

        console.log("Couldn't save story :/");
        mainStore.createModal({
            title: "Error saving story",
            body: "Story could not be saved. Please try again.",
            action: ""
        });
    }

    store.create = async function(storyInfo) {
        const { name, description } = storyInfo;

        try {
            mainStore.toggleLoading();
            const response = await StoryAPI.create(name, description);
            mainStore.toggleLoading();

            if(response.status === 200) {
                store.changeStoryId(response.data.id);
                store.fetchData();
                mainStore.reRoute(types.TabType.CREATION.children.STORY.fullRoute.slice(0, -3) + store.storyId);
                return;
            }
        }

        catch (err) {

        }

        console.log("Couldn't create story :/");
        mainStore.createModal({
            title: "Error creating story",
            body: "Story could not be created. Please try again.",
            action: ""
        });
    }

    //const getNodeId = () => `randomnode_${+new Date()}`;

    store.addNode = function() {
        const newNode = {
            id: (store.nodes.length + 1).toString(),
            data: { label: 'Untitled', payload: '' },
            position: {
              x: 0,
              y: 0,
            },
          };
          store.changeNodes((nodes) => nodes.concat(newNode));
    }


    return (
        <StoryStoreContext.Provider
            value={{ store }}
        >
            {props.children}
        </StoryStoreContext.Provider>
    );
}

export{
    StoryStoreContext,
    StoryStoreContextProvider
}