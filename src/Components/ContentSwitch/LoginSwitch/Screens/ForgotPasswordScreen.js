import { GlobalStoreContext } from '../../../../Store';
import { useContext } from 'react';

function ForgotPasswordScreen() {
    const { store } = useContext(GlobalStoreContext);

    const onFinish = function () {
        const modalInfo = {
            title: "New Password Sent!",
            body: "The new password should arrive to your account's email in a few minutes.",
            action: null
        };

        store.createModal(modalInfo);
    }

    return (
        <div>
            forgot password screen
            <button onClick={onFinish} >TEST MODAL</button>
        </div>
    );
}

export default ForgotPasswordScreen;