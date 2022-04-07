import { Typography } from '@mui/material'
import React from 'react'
import HorizontalScroll from 'react-scroll-horizontal'
import { PostCardHeight } from './PostCard'

/**
 * Expected props:
 *  posts: [PostMetadata]
 *  name: String
 */
export default function PostsSection(props) {
  return (
    <div>
        <Typography variant="h4">
            {props.name}
        </Typography>
        <HorizontalScroll style={{ width: "100%", height: PostCardHeight * 1.1 }}>
            {props.posts}
        </HorizontalScroll>
    </div>
  )
}
