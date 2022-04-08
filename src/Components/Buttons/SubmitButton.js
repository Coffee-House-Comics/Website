import { Colors } from '../../Common/Theme';
import { styled } from '@mui/material/styles';
import {
    Button
} from '@mui/material';

const ColorButton = styled(Button)(({ theme }) => ({
    color: Colors.ivory,
    backgroundColor: Colors.olive_drab_7,
    '&:hover': {
        backgroundColor: Colors.coffee,
    },
}));

export default function SubmitButton(props) {
    const { text, onClick, sx } = props;

    return (
        <ColorButton variant="contained" onClick={onClick} sx={sx}>{text}</ColorButton>
    );
}