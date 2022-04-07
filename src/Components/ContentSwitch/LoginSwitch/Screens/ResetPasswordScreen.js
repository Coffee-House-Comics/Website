import { GlobalStoreContext } from '../../../../Store';
import { useContext } from 'react';

function ResetPasswordScreen() {
    const { store } = useContext(GlobalStoreContext);

    const onFinish = function () {
        const modalInfo = {
            title: "Password Reset",
            body: "Are you sure you want to reset your password?",
            action: "Yes, reset it."
        };

        store.createModal(modalInfo, function () {
            console.log("Modal Closed");
        });
    }

    return (
        <div>
            reset password screen
            <button onClick={onFinish} >TEST Reset MODAL</button>
        </div>
    );

}

export default ResetPasswordScreen;