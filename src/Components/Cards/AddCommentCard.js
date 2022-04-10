import { TextField, Box, Typography } from '@mui/material';
import React from 'react';
import SubmitButton from '../Buttons/SubmitButton';


/**
 * Card for forum posts
 * 
 * Expected props:
 *  author: {
 *      _id: IdObject
 *      name: String,
 *  },
 * 
 *  beanCount: Number,
 *  currentVote: Number,
 *  body: String
 */
export default function CommentCard() {

  const addComment = function () {
      console.log("Add Comment");
  }

  return (<Box>
      <Typography variant="h5" sx={{mt:1}}>Add Comments:</Typography>

      <TextField multiline={true} sx={{
            bgcolor:"ivory.main",
            borderRadius: 1,
            opacity: .75,
            width:"90%",
            mr:1
        }}/>

        <SubmitButton text="Submit" onClick={addComment} sx={{}}></SubmitButton>
      </Box>
      )
}
