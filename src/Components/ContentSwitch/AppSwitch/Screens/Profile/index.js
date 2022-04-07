import { useParams } from 'react-router-dom';

import { useState, useContext } from 'react'

import Forum from './Forum';
import Saved from './Saved';
import View from '../View';
import Settings from './Settings';

function ProfileRouter() {
    const { id } = useParams();

    const PROFILE_TABS = {
        FORUM: 0,
        SAVED: 1,
        SETTINGS: 2,
        VIEW: 3,
    };

    const [profileTab, setProfileTab] = useState(PROFILE_TABS.VIEW); 

    // Get the active Screen
    let activeScreen = <View />;
    if (profileTab === PROFILE_TABS.FORUM)
        activeScreen = <Forum />;
    else if (profileTab === PROFILE_TABS.SAVED)
        activeScreen = <Saved />;
    else if (profileTab === PROFILE_TABS.SETTINGS)
        activeScreen = <Settings />;


    return (
        <div>
            {"View Profile with id: " + id}
            <button onClick={ () => setProfileTab(PROFILE_TABS.VIEW)}>VIEW</button>
            <button onClick={ () => setProfileTab(PROFILE_TABS.SETTINGS)}>SETTINGS</button>
            <button onClick={ () => setProfileTab(PROFILE_TABS.SAVED)}>SAVED</button>
            <button onClick={ () => setProfileTab(PROFILE_TABS.FORUM)}>FORUM</button>
            { activeScreen }
        </div>
    );
}

// LFGGGGGGG one might even say

export default ProfileRouter;