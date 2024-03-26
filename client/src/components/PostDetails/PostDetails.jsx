import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core';
import { CardMedia } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import { getPost, getPostsBySearch } from '../../actions/posts';
import CommentSection from './CommentSection';
import useStyles from './styles';

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();
  // console.log("post tai Post Details lay tu reducer");
  //=> ko phải lấy từ reducer mà là chạy dispatch ở dưới thì mới lấy được, chỗ useSelector mình chỉ khai báo biến ra trước thôi
  console.log("in ra posts đầu tiên");
  console.log(posts);
  console.log("in ra post đầu tiên");
  console.log(post);

  useEffect(() => {
    dispatch(getPost(id));
    console.log("Bắt đầu chạy dispatch get Post ở PostDetail");
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') })); //cho search = none vì ta đang tìm các bài liên quan theo cái tags
      console.log("Bắt đầu chạy dispatch getPostsBySearch ở PostDetail");
    }
  }, [post]);

  if (!post) return null; //nếu cái post nó fetch chưa kịp thì mình phải viết vầy để nó đồng bộ

  if (isLoading) {
    console.log("Chạy Loading");
    return (
      <Paper elevation={6} className={classes.isLoading}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }
  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id).slice(0, 4) //ko đc recommend chính nó. Hiện tại cắt mảng chỉ lấy 4 bài post liên quan, sắp tới sẽ làm tính năng in hết tất cả và có thanh trượt ngang
  console.log("recommendedPosts");
  console.log(recommendedPosts);

  const openPost = (_id) => history.push(`/posts/${_id}`);

  return (
    <Paper
      style={{ padding: '20px', borderRadius: '15px' }}
      elevation={6}
      sx={{
        width: {
          xs: '356px', //xs: extra small devices
          sm: '338px',
          md: '500px',
        },
      }}
    >
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="subtitle1" gutterBottom>{moment(post.createAt).fromNow()}</Typography>
          <Typography gutterBottom variant="body1" component="p" style={{ whiteSpace: 'pre-line' }} >{post.message}</Typography>
          {/* Paper component does not recognize new line character */}

          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div
          className={classes.imageSection}
        >
          <CardMedia
            className={classes.media}
            image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
            component='img'
            alt={post.title}
            sx={{
              width: {
                xs: '300px', //xs: extra small devices
                sm: '338px',
                md: '500px',
              }
            }}
          />
        </div>
      </div>
      {recommendedPosts?.length > 0 && (
        <div className={classes.section}>
          <Typography
            gutterBottom
            variant='h5'
          >
            You might also like:
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts} border={1}>
            {recommendedPosts.map(({ title, message, name, likes, selectedFile, _id }) => (
              <div
                key={_id}
                style={{ margin: '20px', cursor: 'pointer' }}
                onClick={() => openPost(_id)}
              >
                <Typography gutterBottom variant='h6'>{title}</Typography>
                <Typography gutterBottom variant='subtitle2'>{name}</Typography>
                <Typography gutterBottom variant='subtitle2'>{(message.length > 150) ? message.substring(0, 150) + '...' : message}</Typography>
                <Typography gutterBottom variant='h6'>Like: {likes.length}</Typography>
                <img src={selectedFile} width="200px" />
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  )
}

export default PostDetails