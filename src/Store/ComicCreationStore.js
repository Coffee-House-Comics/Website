import { createContext, useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import types from '../Common/Types';
import { GlobalStoreContext } from '.';
import API from '../API';

const ComicStoreContext = createContext({});

const ComicStoreActionType = {
    SET_COMIC_ID: "SET_COMIC_ID",
    SET_COMIC_PAGES: "SET_COMIC_PAGES",
    SET_CURRENT_PAGE: "SET_CURRENT_PAGE"
}

const ComicAPI = API.Comic;

//Setting up comic store
function ComicStoreContextProvider(props) {

    const { mainStore } = useContext(GlobalStoreContext);

    const [store, setStore] = useState({
        comicId: null,

        comicPages: [],

        currentPage: {
            currentTool: "pen",
            currentTab: "prefab",
            index: 0
        }
    });

    const storeReducer = (action) => {
        const { type, payload } = action;

        switch (type) {
            case ComicStoreActionType.SET_COMIC_ID: {
                return setStore({
                    comicId: payload,
                    comicPages: store.comicPages,
                    currentPage: store.currentPage
                })
            }

            case ComicStoreActionType.SET_COMIC_PAGES: {
                return setStore({
                    comicId: store.comicId,
                    comicPages: payload,
                    currentPage: store.currentPage
                })
            }

            case ComicStoreActionType.SET_CURRENT_PAGE: {
                return setStore({
                    comicId: store.comicId,
                    comicPages: store.comicPages,
                    currentPage: payload
                });
            }

            default: return store;
        }
    }

    store.changeComicId = function(id) {
        storeReducer({
            type: ComicStoreActionType.SET_COMIC_ID,
            payload: {
                comicId: id
            }
        });
    }

    store.changeComicPages = function(comicPages) {
        storeReducer({
            type: ComicStoreActionType.SET_COMIC_PAGES,
            payload: {
                comicPages: comicPages
            }
        });
    }

    store.changeCurrentTab = function(newTab) {
        storeReducer({
            type: ComicStoreActionType.SET_CURRENT_PAGE,
            payload: {
                currentTool: store.currentPage.currentTool,
                currentTab: newTab,
                index: store.currentPage.index
            }
        });
    }

    store.changeCurrentTool = function(newTool) {
        storeReducer({
            type: ComicStoreActionType.SET_CURRENT_PAGE,
            payload: {
                currentTool: newTool,
                currentTab: store.currentPage.currentTab,
                index: store.currentPage.index
            }
        });
    }

    store.changePageIndex = function(index) {
        storeReducer({
            type: ComicStoreActionType.SET_CURRENT_PAGE,
            payload: {
                currentTool: store.currentPage.currentTool,
                currentTab: store.currentPage.currentTab,
                index: index
            }
        });
    }

    store.fetchPages = async function() {
        try {
            mainStore.toggleLoading();
            const response = await ComicAPI.viewUnpublished(store.comicId);
            mainStore.toggleLoading();

            if(response.status === 200) {
                console.log("Pages successfully fetched");
                store.changeComicPages(response.data.content);
                return;
            }
        }

        catch (err) {

        }

        console.log("Couldn't fetch comic :/");
        mainStore.createModal({
            title: "Error fetching comic pages",
            body: "Comic could not be retrieved. Please try again.",
            action: ""
        });
    }

    store.loadPage = function() {
        return store.comicPages[store.currentPage.index];
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
            const response = await ComicAPI.publish(store.comicId, series);
            mainStore.toggleLoading();

            if(response.status === 200) {
                mainStore.reRoute(types.TabType.APP.children.PROFILE.fullRoute.slice(0, -3) + mainStore.user);
                mainStore.createModal({
                    title: "Comic published",
                    body: "Your comic has been succesfully published!",
                    action: ""
                });
                return;
            }
        }

        catch (err) {

        }

        console.log("Couldn't publish comic :/");
        mainStore.createModal({
            title: "Error publishing comic",
            body: "Comic could not be published. Please try again.",
            action: ""
        });
    }

    store.save = async function(currentPageJSON) {
        newComicPages = store.comicPages.map((page, i) => {
            store.currentPage.index == i? currentPageJSON : page
        })

        try {
            mainStore.toggleLoading();
            const response = await ComicAPI.saveContent(store.comicId, newComicPages);
            mainStore.toggleLoading();

            if(response.status === 200) {
                return;
            }
        }

        catch (err) {

        }

        console.log("Couldn't save comic :/");
        mainStore.createModal({
            title: "Error saving comic",
            body: "Comic could not be saved. Please try again.",
            action: ""
        });
    }

    store.create = async function(comicInfo) {
        const { name, description } = comicInfo;

        try {
            mainStore.toggleLoading();
            const response = await ComicAPI.create(name, description);
            mainStore.toggleLoading();

            if(response.status === 200) {
                store.changeComicId(response.data.id);
                store.fetchPages(id);
                mainStore.reRoute(types.TabType.CREATION.children.COMIC.fullRoute.slice(0, -3) + store.comicId);
                return;
            }
        }

        catch (err) {

        }

        console.log("Couldn't create comic :/");
        mainStore.createModal({
            title: "Error creating comic",
            body: "Comic could not be created. Please try again.",
            action: ""
        });
    }

    store.saveSticker = async function(stickerJson) {
        try {
            mainStore.toggleLoading();
            const response = await ComicAPI.saveSticker(stickerJson);
            mainStore.toggleLoading();

            if(response.status === 200) {
                return;
            }
        }

        catch (err) {

        }

        console.log("Couldn't save sticker :/");
        mainStore.createModal({
            title: "Error saving sticker",
            body: "Sticker could not be saved. Please try again.",
            action: ""
        });
    }


}