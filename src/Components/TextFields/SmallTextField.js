import { Colors } from '../../Common/Theme';
import { styled } from '@mui/material/styles';
import {
    TextField
} from '@mui/material';

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: Colors.coffee,
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: Colors.cg_blue,
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: Colors.olive_drab_7,
        },
        '&:hover fieldset': {
            borderColor: Colors.coffee,
        },
        '&:hover': {
            backgroundColor: Colors.ivory,
        },
        '&.Mui-focused fieldset': {
            borderColor: Colors.coffee,
        },
    },
});

export default function smallTextField(props) {

    const { fieldName, helperText, onChange, sx } = props;

    return (
        <CssTextField
            label={fieldName}
            helperText={helperText}
            onChange={onChange}
            sx={sx}
        ></CssTextField>
    );
}