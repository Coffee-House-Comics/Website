import { Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import AddCommentCard from "./AddCommentCard";
import { Colors } from "../../Common/Theme";
import SubmitButton from "../Buttons/SubmitButton";



export default function CreateForumPost({ hook }) {

    const [currentTitle, setCurrentTitle] = useState("");
    const [currentText, setCurrentText] = useState("");

    const handleSubmit =  function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        }

        if (hook) {
            hook(currentTitle, currentText);
        }

        console.log("RESET NEW FORUM POST")
        setCurrentTitle("")
        setCurrentText("")
    }

    return (
        <div
            style={{
                width: "calc(100% - 50px)",
                border: "4px solid " + Colors.coffee,
                borderRadius: "10px",
                padding: "20px",
                backgroundColor: "rgba(119, 89, 64, 0.75)",
                marginTop: "20px"
            }}
        >
            <Grid container spacing={3}
                sx={{
                    width: "calc(100% - 50px)",
                }}
            >
                <Grid item xs={12}>
                    <Typography variant="h4">Create a Forum Post:</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField multiline={true}
                        placeholder={"Enter your title here..."}
                        onChange={(e) => { setCurrentTitle(e.target.value) }}
                        sx={{
                            bgcolor: "white",
                            borderRadius: 1,
                            width: "35%",
                            mr: 1,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField multiline={true}
                        placeholder={"Enter your body here..."}
                        onChange={(e) => { setCurrentText(e.target.value) }}
                        sx={{
                            bgcolor: "white",
                            borderRadius: 1,
                            width: "85%",
                            mr: 1,
                        }}
                    />
                    <Grid item xs={12}>
                        <SubmitButton
                            text="Submit"
                            onClick={handleSubmit}
                            sx={{ marginTop: "30px", marginBottom: "10px" }}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}