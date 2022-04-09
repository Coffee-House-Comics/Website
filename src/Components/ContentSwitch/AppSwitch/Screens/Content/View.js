import { useParams } from 'react-router-dom';
import { Grid, Image, Typography, ThemeProvider, Avatar } from '@mui/material';

function View() {
    // Get the id that we want to view
    const { id } = useParams();

    let tab = "content"; //TODO content or comments depending on store
    let  mode = "comic"; // TODO comic or story depending on store

    return (<div>
        <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
            <Grid item>
                {mode == "content"? <MetadataPanel id={id}/>: <CommentsPanel id={id}/>}
            </Grid>
            <Grid item>
                <ContentPanel id={id}></ContentPanel>
            </Grid>
        </Grid>
    </div>);

}

export default View;