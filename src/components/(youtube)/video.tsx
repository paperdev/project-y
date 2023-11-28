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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function ComponentVideo({
  dataVideo
}: {
  dataVideo: any[]
}) {
  const [expanded, setExpanded] = React.useState(false);

  const onClickExpand = () => {
    setExpanded(!expanded);
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
                        {
                          video.snippet.tags &&
                          video.snippet.tags.map((tag: string, index: number) => {
                            return <Chip key={index} label={`#${tag}`} />
                          })
                        }
                      </div>
                      <MoreVertIcon />
                    </CardContent>

                    <CardContent>
                      <ComponentThumbnail
                        dataThumbnail={video.snippet.thumbnails.standard}
                        videoId={video.id}
                      />
                    </CardContent>

                    <CardActions >
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

                      <IconButton onClick={onClickExpand}>
                        {
                          expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />
                        }
                      </IconButton>
                    </CardActions>

                    <Collapse in={expanded} timeout='auto' unmountOnExit>
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
