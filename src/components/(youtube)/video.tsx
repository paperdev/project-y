'use client';

import React from 'react';
import ComponentThumbnail from '@/components/(youtube)/thumbnail';

import {
  List,
  ListItem,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Chip,
  Collapse,
  Divider,
} from '@mui/material';


import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function ComponentVideo({
  dataVideo
}: {
  dataVideo: any[]
}) {
  return (
    <>
      <List>
        {
          dataVideo.map((video, index) => {
            return (
              <>
                <ListItem key={index} disablePadding>

                  <Card>
                    <CardHeader
                      title={video.snippet.title} description
                      subheader={video.snippet.publishedAt}
                    />

                    <ComponentThumbnail dataThumbnail={video.snippet.thumbnails.standard} videoId={video.id}></ComponentThumbnail>

                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        <div className='flex mt-2 gap-1 flex-wrap mx-auto'>
                          {
                            video.snippet.tags &&
                            video.snippet.tags.map((tag: string, index: number) => {
                              return <Chip key={index} label={`#${tag}`} />
                            })
                          }
                        </div>
                      </Typography>
                    </CardContent>

                    <CardActions disableSpacing>
                      <IconButton>
                        <ThumbUpIcon />
                        <div>{video.statistics.likeCount}</div>
                      </IconButton>
                      <IconButton>
                        <VisibilityIcon />
                        <div>{video.statistics.viewCount}</div>
                      </IconButton>
                      <IconButton>
                        <FavoriteIcon />
                        <div>{video.statistics.commentCount}</div>
                      </IconButton>
                      <IconButton>
                        <CommentIcon />
                        <div>{video.statistics.favoriteCount}</div>
                      </IconButton>
                    </CardActions>

                    {/* <Collapse in={true} timeout="auto" unmountOnExit>
                      <CardContent>
                        <Typography paragraph>Method:</Typography>
                        <Typography paragraph>
                          {video.snippet.description}
                        </Typography>
                      </CardContent>
                    </Collapse> */}

                  </Card>

                </ListItem>

                <Divider />
              </>
            )
          })
        }
      </List>
    </>
  )
}
