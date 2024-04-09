import React, { useState } from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

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

  const [likes, setLikes] = useState(post?.likes);

  const userId = user?.result?.sub || user?.result?._id;
  const hasLikedPost = post?.likes.find((like) => like === userId);

  let convertedMessage;
  if (post.message.length > 200) {
    convertedMessage = post.message.substring(0, 200) + '...';
  } else {
    convertedMessage = post.message;
  }
  // post.message.length > 200) ? post.message.substring(0, 200) + '...' : post.message

  const handleLike = async () => {
    dispatch(likePost(post._id))

    if (hasLikedPost) {
      setLikes(post?.likes.filter((like) => like !== userId));
    } else {
      setLikes([...post?.likes, userId]); //spread all of current likes, and add new ones
    };
  };


  // console.log(`In ra Post`);
  // console.log(post.creator);

  // const handleCardClick = (e) => {
  //   if (!e.target.closest(`.${classes.overlay2}`) && !e.target.closest(`.${classes.cardActions}`)) {
  //     alert("Sẽ làm 1 cái show khi ấn vào")
  //   }
  // }
  //tạo sub component Likes
  const Likes = () => {
    if (likes.length > 0) { //tìm like thuộc bài đăng của mình
      return likes.find((like) => like === userId)
        ? (
          <><ThumbUpAltIcon fontSize='small' />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
        ) : (
          <><ThumbUpOutlinedIcon fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
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
      <ButtonBase
        component="span"
        className={classes.cardAction}
        onClick={openPost}
      >
        <CardMedia
          className={classes.media}
          image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
          title={post.title}
        />
        <div className={classes.overlay}>
          {/* <Typography variant="body2">{post.name}</Typography> */}
          {/* <Typography variant="body2">{moment(post.createAt).fromNow()}</Typography> */}
        </div>

        {/* nút 3 chấm */}

        {/* {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
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
      )} */}
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
            component="span"
            //thêm comp span để ko hiển thị lỗi
          >
            <div dangerouslySetInnerHTML={{ __html: convertedMessage }}></div>
          </Typography>
        </CardContent>
      </ButtonBase>

      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleLike}
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