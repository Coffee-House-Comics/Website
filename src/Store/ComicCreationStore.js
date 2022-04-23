import { createContext, useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import types from '../Common/Types';
import { GlobalStoreContext } from '.';
import API from '../API';

const ComicStoreContext = createContext({});

const ComicStoreActionType = {
    SET_CURRENT_PAGE: "SET_CURRENT_PAGE"
}

const { mainStore } = useContext(GlobalStoreContext);

const ComicAPI = API.Comic;

//Setting up comic store
function ComicStoreContextProvider(props) {

    const [store, setStore] = useState({
        comicId: null,

        currentPage: {
            currentTool: "pen",
            currentTab: "prefab",
            konvaJson: {}
        }
    });

    const storeReducer = (action) => {
        const { type, payload } = action;

        switch (type) {
            case ComicStoreActionType.SET_CURRENT_PAGE: {
                return setStore({
                    comicId: store.comicId,
                    currentPage: payload
                });
            }

            default: return store;
        }
    }

    store.changeCurrentTab = function(newTab) {
        storeReducer({
            type: ComicStoreActionType.SET_CURRENT_PAGE,
            payload: {
                currentTool: store.currentPage.currentTool,
                currentTab: newTab,
                konvaJson: store.currentPage.konvaJson
            }
        });
    }

    store.changeCurrentTool = function(newTool) {
        storeReducer({
            type: ComicStoreActionType.SET_CURRENT_PAGE,
            payload: {
                currentTool: newTool,
                currentTab: store.currentPage.currentTab,
                konvaJson: store.currentPage.konvaJson
            }
        });
    }

    store.updateKonvaJSON = function (json) {
        storeReducer({
            type: ComicStoreActionType.SET_CURRENT_PAGE,
            payload: {
                currentTool: store.currentPage.currentTool,
                currentTab: store.currentPage.currentTab,
                konvaJson: json
            }
        });
    }

    store.loadPage = async function() {

    }

    store.editMetaData = async function(newData) {
        const { name, description, coverPhoto, series } = newData;

        try {
            mainStore.toggleLoading();
            const response = await ComicAPI.editMetaData(store.comicId, name, description, coverPhoto, series);
            mainStore.toggleLoading();

            if(response.status === 200) {
                mainStore.reRoute(types.TabType.CREATION.children.COMIC.fullRoute.slice(0, -3) + store.comicId);
            }
        }

        catch {

        }

        console.log("Couldn't edit metadata :/");
        mainStore.createModal({
            title: "Error editing metadata",
            body: "Comic metadata could not be edited. Please try again.",
            action: ""
        });
    }

    store.undo = async function() {

    }

    store.redo = async function() {

    }

    store.publish = async function(comic) {

    }

    store.save = async function(comic) {

    }


}