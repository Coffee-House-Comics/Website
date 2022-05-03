import React, { useContext } from "react";
import ReactQuill from "react-quill";
// import EditorToolbar from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { StoryStoreContext } from '../../../../../Store/StoryCreationStore';
import { Quill } from "react-quill";
import { Typography } from "@mui/material";

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
    "arial",
    "comic-sans",
    "courier-new",
    "georgia",
    "helvetica",
    "lucida"
];
Quill.register(Font, true);

const CustomUndo = () => (
    <svg viewBox="0 0 18 18">
        <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
        <path
            className="ql-stroke"
            d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
        />
    </svg>
);

// Redo button icon component for Quill editor
const CustomRedo = () => (
    <svg viewBox="0 0 18 18">
        <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
        <path
            className="ql-stroke"
            d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
        />
    </svg>
);

// Quill Toolbar component
const QuillToolbar = () => {
    // Undo and redo functions for Custom Toolbar
    return (
        <div id="toolbar">
            <span className="ql-formats">
                <select className="ql-font" defaultValue="arial">
                    <option value="arial">Arial</option>
                    <option value="comic-sans">Comic Sans</option>
                    <option value="courier-new">Courier New</option>
                    <option value="georgia">Georgia</option>
                    <option value="helvetica">Helvetica</option>
                    <option value="lucida">Lucida</option>
                </select>
                <select className="ql-size" defaultValue="medium">
                    <option value="extra-small">Size 1</option>
                    <option value="small">Size 2</option>
                    <option value="medium">Size 3</option>
                    <option value="large">Size 4</option>
                </select>
                <select className="ql-header" defaultValue="3">
                    <option value="1">Heading</option>
                    <option value="2">Subheading</option>
                    <option value="3">Normal</option>
                </select>
            </span>
            <span className="ql-formats">
                <button className="ql-bold" />
                <button className="ql-italic" />
                <button className="ql-underline" />
                <button className="ql-strike" />
            </span>
            <span className="ql-formats">
                <button className="ql-list" value="ordered" />
                <button className="ql-list" value="bullet" />
                <button className="ql-indent" value="-1" />
                <button className="ql-indent" value="+1" />
            </span>
            <span className="ql-formats">
                <button className="ql-script" value="super" />
                <button className="ql-script" value="sub" />
                <button className="ql-blockquote" />
                <button className="ql-direction" />
            </span>
            <span className="ql-formats">
                <select className="ql-align" />
                <select className="ql-color" />
                <select className="ql-background" />
            </span>
            <span className="ql-formats">
                <button className="ql-link" />
                <button className="ql-image" />
                <button className="ql-video" />
            </span>
            <span className="ql-formats">
                <button className="ql-formula" />
                <button className="ql-code-block" />
                <button className="ql-clean" />
            </span>
            <span className="ql-formats">
                <button className="ql-undo">
                    <CustomUndo />
                </button>
                <button className="ql-redo">
                    <CustomRedo />
                </button>
            </span>
        </div>
    )
};

export const Editor = () => {
    const { storyStore } = useContext(StoryStoreContext);

    const [state, setState] = React.useState({ value: storyStore.elementBody });

    const reactQuillRef = React.useRef();

    const handleChange = value => {
        console.log("VAAAALLLU", value)
        setState({ value });
        storyStore.updateBody(value)
    };

    const undoChange = function () {
        console.log("Entering undo...");
        console.log("Trying Quill Undo", this.quill.history);
        const myEditor = reactQuillRef.getEditor();
        console.log("MY EDITOR:", myEditor);
        myEditor.history.undo();
    }

    const redoChange = function () {
        console.log("Entering redo...");
        console.log("Trying Quill Redo", this.quill.history);
        const myEditor = reactQuillRef.getEditor();
        myEditor.history.redo();
    }

    if (!state.value)
        return (<Typography>Loading...</Typography>);

    return (
        <div className="text-editor">
            <QuillToolbar />
            <ReactQuill
                // ref={(el) => { reactQuillRef = el }}
                ref={reactQuillRef}
                theme="snow"
                value={state.value}
                onChange={handleChange}
                placeholder={"Type page body here..."}
                modules={{
                    toolbar: {
                        container: "#toolbar",
                        handlers: {
                            undo: undoChange,
                            redo: redoChange
                        }
                    },
                    history: {
                        delay: 500,
                        maxStack: 100,
                        userOnly: true
                    }
                }}
                formats={[
                    "header",
                    "font",
                    "size",
                    "bold",
                    "italic",
                    "underline",
                    "align",
                    "strike",
                    "script",
                    "blockquote",
                    "background",
                    "list",
                    "bullet",
                    "indent",
                    "link",
                    "image",
                    "color",
                    "code-block"
                ]}
            />
        </div>
    );
};

export default Editor;