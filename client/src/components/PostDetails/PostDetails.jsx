import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider, CardMedia, Grid, Button } from '@material-ui/core';
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
  const user = JSON.parse(localStorage.getItem('profile'));
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
      <div elevation={6} className={classes.isLoading}>
        <CircularProgress size="7em" />
      </div>
    );
  }
  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id).slice(0, 4) //ko đc recommend chính nó. Hiện tại cắt mảng chỉ lấy 4 bài post liên quan, sắp tới sẽ làm tính năng in hết tất cả và có thanh trượt ngang
  console.log("recommendedPosts");
  console.log(recommendedPosts);

  const openPost = (_id) => history.push(`/posts/${_id}`);
  const openUpdatePost = (id) => history.push(`/posts/update/${id}`);

  return (
    <div>
      {user && (
        <div>
          <Button
            // className={}
            variant='contained'
            color='primary'
            size='large'
            type='submit'
            style={{ marginBottom: '10px', marginLeft: '4px' }}
            onClick={() => { openUpdatePost(id) }}
          >
            Update
          </Button>
        </div>
      )}
      <Paper
        style={{ padding: '20px', borderRadius: '15px' }}
        elevation={6}
      >
        <div className={classes.card}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <div className={classes.section}>
              <Typography variant="h3" component="h2">{post.title}</Typography>
              <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
              <Typography variant="h6">Created by: {post.name}</Typography>
              <Typography variant="subtitle1" gutterBottom>{moment(post.createAt).fromNow()}</Typography>
              <Typography gutterBottom variant="body1" component="p" style={{ whiteSpace: 'pre-line' }} >{post.message}</Typography>
              <Divider style={{ margin: '20px 0' }} />
              {/* whiteSpace: 'pre-line : fix lỗi Paper component does not recognize new line character */}

              {/* <Divider style={{ margin: '20px 0' }} />
            <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
            <Divider style={{ margin: '20px 0' }} />
            <CommentSection post={post} />
            <Divider style={{ margin: '20px 0' }} /> */}
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <div className={classes.imageSection}>
              <CardMedia
                className={classes.media}
                image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
                component='img'
                alt={post.title}
                style={{ marginBottom: '20px' }}
              />
            </div>
          </Grid>
        </div>
        <div>
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ width: '50%', margin: '20px 0' }} />
          <CommentSection post={post} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        {
          recommendedPosts?.length > 0 && (
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
                  <div className={classes.recommendedPost}
                    key={_id}
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
          )
        }
      </Paper>
    </div>
  )
}

export default PostDetails