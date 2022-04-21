import { createContext, useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import types from '../Common/Types';

const ComicStoreContext = createContext({});

const ComicStoreActionType = {
    SET_CURRENT_PAGE: "SET_CURRENT_PAGE"
}

//Setting up comic store
function ComicStoreContextProvider(props) {

    const [store, setStore] = useState({
        comic: null,

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
                    comic: store.comic,
                    currentPage: payload
                });
            }

            default: return store;
        }
    }

    store.updateKonvaJSON = async function (json) {

    }

    store.changeCurrentTab = function() {

    }

    store.changeCurrentTool = function(newTool) {

    }

    store.loadPage = async function() {

    }

    store.updateMetaData = async function(newData) {

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