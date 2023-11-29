'use client';

import React from 'react';
import ComponentThumbnail from '@/components/(youtube)/thumbnail';
import { ComponentTag, ComponentHiddenTag } from '@/components/(youtube)/tag';

import {
  List,
  ListItem,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Collapse,
  Divider,
} from '@mui/material';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import TagIcon from '@mui/icons-material/Tag';

export default function ComponentVideo({
  dataVideo
}: {
  dataVideo: any[]
}) {
  const [descExpanded, setDescExpanded] = React.useState(false);
  const [tagExpanded, setTagExpanded] = React.useState(false);

  const onClickDescExpand = () => {
    setDescExpanded(!descExpanded);
  };

  const onClickTagExpand = () => {
    setTagExpanded(!tagExpanded);
  };

  return (
    <>
      <List>
        {
          dataVideo.map((video, index) => {
            return (
              <div key={index}>
                <ListItem disablePadding>

                  <Card>
                    <CardHeader
                      title={video.snippet.title}
                      subheader={video.snippet.publishedAt}
                    />

                    <CardContent>
                      <div className='flex gap-1 flex-wrap mx-auto'>

                        <ComponentTag tags={video.snippet.tags} />
                        <IconButton onClick={onClickTagExpand} >
                          <TagIcon />
                        </IconButton>
                        <ComponentHiddenTag tags={video.snippet.tags} tagExpanded={tagExpanded} />
                      </div>
                    </CardContent>

                    <CardContent>
                      <ComponentThumbnail
                        dataThumbnail={video.snippet.thumbnails.standard}
                        videoId={video.id}
                      />
                    </CardContent>

                    <CardActions className='justify-between'>
                      <div className='justify-start'>
                        <IconButton>
                          <ThumbUpIcon />
                          <div className='text-sm'>
                            {video.statistics.likeCount}
                          </div>
                        </IconButton>

                        <IconButton>
                        <VisibilityIcon />
                        <div className='text-sm'>
                          {video.statistics.viewCount}
                        </div>
                        </IconButton>

                        <IconButton>
                          <FavoriteIcon />
                          <div className='text-sm'>
                            {video.statistics.commentCount}
                          </div>
                        </IconButton>

                        <IconButton>
                          <CommentIcon />
                          <div className='text-sm'>
                            {video.statistics.favoriteCount}
                          </div>
                        </IconButton>
                      </div>

                      <div className='justify-end'>
                        <IconButton onClick={onClickDescExpand}>
                          {
                            descExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />
                          }
                        </IconButton>
                      </div>
                    </CardActions>

                    <Collapse in={descExpanded} timeout='auto' unmountOnExit>
                      <CardContent>
                        <Typography paragraph>Method:</Typography>
                        <Typography paragraph>
                          {video.snippet.description}
                        </Typography>
                      </CardContent>
                    </Collapse>

                  </Card>

                </ListItem>

                <Divider />
              </div>
            )
          })
        }
      </List>
    </>
  )
}
