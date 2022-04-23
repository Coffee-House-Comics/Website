import SubmitButton from '../../../Buttons/SubmitButton';
import { Divider, Grid, IconButton, Typography, Box, Slider } from '@mui/material'

export default function StickerCreation({ onDoneHook }) {

    return (
        <div style={{

        }}>
            <div>
                <SubmitButton text={"Return"} onClick={
                    function () {
                        onDoneHook();
                    }
                } />
            </div>
        </div>
    );
}