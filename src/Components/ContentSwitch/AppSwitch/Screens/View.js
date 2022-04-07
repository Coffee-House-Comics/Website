import { useParams } from 'react-router-dom';

function View() {
    // Get the id that we want to view
    const { id } = useParams();

    return (<div>{"Trying to view content with id: " + id}</div>);

}

export default View;