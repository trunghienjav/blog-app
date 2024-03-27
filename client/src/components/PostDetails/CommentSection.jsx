import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { commentPost } from '../../actions/posts';

import useStyles from './styles';
const CommentSection = ({ post }) => {
    console.log("in ra post ở comment section");
    console.log(post);
    const classes = useStyles();
    const [comments, setComments] = useState(post.comments);
    const [comment, setComment] = useState("");
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const commentsRef = useRef();

    const handleComment = async () => {
        const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));

        setComment('');
        setComments(newComments);

        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className={classes.commentsOuterContainer}>
            <div className={classes.commentsInnerContainer}>
                <Typography gutterBottom variant="h6">Comments</Typography>
                {comments?.map((c, i) => (
                    <Typography key={i} gutterBottom variant="subtitle1">
                        <strong>{c.split(': ')[0]}</strong>
                        {c.split(':')[1]}
                    </Typography>
                ))}
                <div ref={commentsRef} />
            </div>
            {user?.result?.name ? (
                <div style={{ width: '70%' }}>
                    <Typography gutterBottom variant='h6'>
                        Write a comment
                    </Typography>
                    <TextField
                        fullWidth
                        minRows={4}
                        variant='outlined'
                        label='comment'
                        multiline
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Button
                        style={{ marginTop: '10px' }}
                        fullWidth
                        disabled={!comment.length}
                        variant="contained"
                        color="primary"
                        onClick={handleComment}
                    >
                        Comment
                    </Button>
                </div>
            ) : (
                <div style={{ width: '70%', marginTop: '80px' }}>
                <Typography>No comments yet</Typography>
                </div>
            )}
        </div>
    )
}

export default CommentSection;