import React, {useContext} from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { StoryStoreContext } from '../../../../../Store/StoryCreationStore';

export const Editor = () => {
    const { storyStore } = useContext(StoryStoreContext);

    const [state, setState] = React.useState({ value: storyStore.elementBody });
    const handleChange = value => {
      console.log("VAAAALLLU", value)
      setState({ value });
      storyStore.updateBody(value)
    };

    return (
    <div className="text-editor">
      <EditorToolbar />
      <ReactQuill
        theme="snow"
        value={state.value}
        onChange={handleChange}
        placeholder={"Type page body here..."}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default Editor;