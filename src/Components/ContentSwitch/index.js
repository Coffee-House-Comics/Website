import { Route, Routes, Outlet } from 'react-router-dom';
import { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../../Store'
import types from '../../Common/Types'

import {
    LoginScreen,
    ForgotPasswordScreen,
    RegisterScreen,
    ResetPasswordScreen
} from './LoginSwitch';

import {
    Explore,
    Profile,
    Subscriptions,
    Search,
    View
} from './AppSwitch';

import {
    StoryCreation,
    ComicCreation,
    MetadataEditor
} from './CreationSwitch'

function ContentSwitch() {
    const authChildren = types.TabType.AUTH.children;
    const appChildren = types.TabType.APP.children;
    const createChildren = types.TabType.CREATION.children;

    return (
        <div id="Content-Switch">
            <Routes>
                <Route path="/" element={<Explore />} />
                <Route path={types.TabType.AUTH.route}>
                    <Route path={authChildren.REGISTER.route} element={<RegisterScreen />} />
                    <Route path={authChildren.LOGIN.route} element={<LoginScreen />} />
                    <Route path={authChildren.FORGOTPASSWORD.route} element={<ForgotPasswordScreen />} />
                    <Route path={authChildren.RESETPASSWORD.route} element={<ResetPasswordScreen />} />
                </Route>
                <Route path={types.TabType.APP.route}>
                    <Route path={appChildren.EXPLORE.route} element={<Explore />} />
                    <Route path={appChildren.SUBSCRIPTIONS.route} element={<Subscriptions />} />
                    <Route path={appChildren.SEARCH.route} element={<Search/>}/>
                    <Route path={appChildren.VIEW.route} element={<View />} />
                    <Route path={appChildren.PROFILE.route} element={<Profile />} />
                </Route>
                <Route path={types.TabType.CREATION.route}>
                    <Route path={createChildren.METADATA.route} element={<MetadataEditor />} />
                    <Route path={createChildren.COMIC.route} element={<ComicCreation />} />
                    <Route path={createChildren.STORY.route} element={<StoryCreation />} />
                </Route>
            </Routes>
        </div>
    );

}

export default ContentSwitch;