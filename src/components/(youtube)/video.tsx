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
  Link,
  Collapse,
  Divider,
} from '@mui/material';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';

export default function ComponentVideo({
  dataVideo
}: {
  dataVideo: any[]
}) {
  const [descExpanded, setDescExpanded] = React.useState(false);

  const onClickDescExpand = (event: React.SyntheticEvent) => {
    if (!event || !event.currentTarget) {
      return;
    }

    const currentDescElement = event.currentTarget.parentElement?.parentElement?.parentElement?.getElementsByClassName('hiddenDescClass')[0];
    const isHidden = currentDescElement?.classList.contains('hidden');
    if (isHidden) {
      currentDescElement?.classList.remove('hidden');
    }
    else {
      currentDescElement?.classList.add('hidden');
    }

    setDescExpanded(!descExpanded);
  };

  const onClickTagExpand = (event: React.SyntheticEvent) => {
    if (!event || !event.currentTarget) {
      return;
    }

    const currentTagElement = event.currentTarget.parentElement?.getElementsByClassName('hiddenTagClass')[0];
    const isHidden = currentTagElement?.classList.contains('hidden');
    if (isHidden) {
      currentTagElement?.classList.remove('hidden');
    }
    else {
      currentTagElement?.classList.add('hidden');
    }
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

                    <CardContent className='flex'>
                      <div>Channel : </div>
                      <Link href={process.env.YOUTUBE_URL_CHANNEL + video.snippet.channelId}>
                        {video.snippet.channelTitle}
                      </Link>
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
                        <IconButton onClick={onClickDescExpand} >
                          {
                            descExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />
                          }
                        </IconButton>
                      </div>
                    </CardActions>

                    
                    <CardContent className='hiddenDescClass hidden'>
                      <Typography paragraph>
                        {video.snippet.description}
                      </Typography>
                    </CardContent>
                    

                    <CardContent className='flex gap-1 flex-wrap mx-auto'>
                      <ComponentTag tags={video.snippet.tags} />
                      <IconButton onClick={onClickTagExpand} size='small'>
                        <UnfoldMoreIcon fontSize='inherit' />
                      </IconButton>
                      <ComponentHiddenTag className={'hiddenTagClass hidden'} tags={video.snippet.tags} />
                    </CardContent>

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
