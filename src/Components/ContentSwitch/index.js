import { Route, Routes } from 'react-router-dom';
import { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../../Store'
import types from '../../Common/Types'

import LoginSwitch from './LoginSwitch';
import AppSwitch from './AppSwitch';

function ContentSwitch() {
    // Global Store 
    //const { store } = useContext(GlobalStoreContext);


    return (
        <div id="Content-Switch">
            <Routes>
                <Route path={types.TabType.AUTH} exact component={LoginSwitch} />
                <Route path={types.TabType.APP} exact component={AppSwitch} />
            </Routes>
        </div>
    );

}

export default ContentSwitch;