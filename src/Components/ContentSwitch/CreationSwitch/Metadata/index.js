import { useParams } from 'react-router-dom';

export default function MetadataEditor () {
    const { id } = useParams();
    
    return <div>{"Metadata editor page with id " + id}</div>;
}