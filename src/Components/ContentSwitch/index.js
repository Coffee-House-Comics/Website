import { Route, Routes, Outlet } from 'react-router-dom';
import { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../../Store'
import types from '../../Common/Types'

import LoginSwitch from './LoginSwitch';
import AppSwitch from './AppSwitch';

function ContentSwitch() {
    // Global Store 
    //const { store } = useContext(GlobalStoreContext);

    console.log("OOFIES");


    return (
        <div id="Content-Switch">
            <Routes>
                <Route path="/" element={<AppSwitch />}>
                    <Route path={types.TabType.AUTH} element={<LoginSwitch />} />
                    <Route path={types.TabType.APP} element={<AppSwitch />} />
                </Route>
            </Routes>
        </div>
    );

}

export default ContentSwitch;