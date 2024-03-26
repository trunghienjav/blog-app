import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
// import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';

import moment from 'moment';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();
  // console.log(`In ra Post`);
  // console.log(post.creator);

  // const handleCardClick = (e) => {
  //   if (!e.target.closest(`.${classes.overlay2}`) && !e.target.closest(`.${classes.cardActions}`)) {
  //     alert("Sẽ làm 1 cái show khi ấn vào")
  //   }
  // }
  //tạo sub component Likes
  const Likes = () => {
    if (post.likes.length > 0) { //tìm like thuộc bài đăng của mình
      return post.likes.find((like) => like === (user?.result?.sub || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize='small' />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
        ) : (
          <><ThumbUpOutlinedIcon fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        )
    }
    return <><ThumbUpOutlinedIcon fontSize="small" />&nbsp;Like</>;
  }

  const openPost = () => history.push(`/posts/${post._id}`);

  return (
    <Card
      className={classes.card}
      // onClick={handleCardClick}
      raised
      elevation={6}
    >
      {/* <ButtonBase
        component="span"
        className={classes.cardAction}
        onClick={openPost}
      > */}
      <CardMedia
        className={classes.media}
        image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createAt).fromNow()}</Typography>
      </div>

      {/* nút 3 chấm */}

      {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
        <div className={classes.overlay2}>
          <Button
            style={{ color: 'white' }}
            size="small"
            onClick={() => {
              setCurrentId(post._id);
            }}
          >
            <MoreHorizIcon fontSize="medium" />
          </Button>
        </div>
      )}
      <ButtonBase
        component="span"
        className={classes.cardAction}
        onClick={openPost}
      >
        <div className={classes.details}>
          <Typography
            variant="body2"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography
          className={classes.title}
          gutterBottom //If true, the text will have a bottom margin.
          variant="h5"
          component="h2"
        >
          {post.title}
        </Typography>

        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {/* {post.message} */}
            {(post.message.length > 200) ? post.message.substring(0, 200) + '...' : post.message}
          </Typography>
        </CardContent>
      </ButtonBase>

      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          // disabled={!user?.result}
          onClick={() => dispatch(likePost(post._id, history))}
        >
          <Likes />
        </Button>
        {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
          <Button
            size="small"
            color="primary"
            onClick={() => { dispatch(deletePost(post._id)) }}
          >
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

export default Post