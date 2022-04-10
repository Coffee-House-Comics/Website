import { Typography } from '@mui/material'
import React from 'react'
import HorizontalScroll from 'react-scroll-horizontal'
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
        <PostCard key={index} post={post} />
      </div>
    });
  }

  return (
    <div>
      <Typography variant="h4" sx={{ marginBottom: "5px", marginTop: "20px" }}>
        {props.name}
      </Typography>
      <HorizontalScroll reverseScroll={true} style={{ width: "100%", height: PostCardHeight * 1.1 }}>
        {buildCards(props.posts)}
      </HorizontalScroll>
    </div>
  )
}
