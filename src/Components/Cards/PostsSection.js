import { Typography } from '@mui/material'
import React from 'react'
import { ScrollMenu, VisibilityContext, } from 'react-horizontal-scrolling-menu';
import PostCard, { PostCardHeight } from './PostCard'

/**
 * Expected props:
 *  posts: [PostMetadata]
 *  name: String
 */

export const PADDING_BTWN_CARDS = 5;
export default function PostsSection(props) {

  //Build PostCards
  const buildCards = function (posts) {
    return posts.map((post, index) => {
      return <div key={index} style={{ paddingInline: PADDING_BTWN_CARDS }}>
        <PostCard itemId={index} key={index} post={post} />
      </div>
    });
  }

  return (
    <div>
      <Typography variant="h4" sx={{ marginBottom: "5px", marginTop: "20px" }}>
        {props.name}
      </Typography>
      <ScrollMenu>
        {buildCards(props.posts)}
      </ScrollMenu>
    </div>
  )
}
