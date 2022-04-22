import SubmitButton from '../../../Buttons/SubmitButton';


export default function StickerCreation({ onDoneHook }) {

    return (
        <div>
            <SubmitButton text={"Return"} onClick={
                function () {
                    onDoneHook();
                }
            } />
            Sticker creation!
        </div>
    );
}