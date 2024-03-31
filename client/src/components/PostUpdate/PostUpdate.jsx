import React, { useEffect, useState } from 'react';
import { Paper, Typography, Divider, CardMedia, Grid, Button, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getPost } from '../../actions/posts';
import { updatePost } from '../../actions/posts';
import FileBase from 'react-file-base64'
import useStyles from './styles';

const PostUpdate = () => {
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });
    const { post } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('profile'));
    // console.log(post);
    console.log(`post ở update`);
    console.log(postData);

    useEffect(() => {
        dispatch(getPost(id));
    }, [id]);


    useEffect(() => {
        if (post) setPostData({
            title: post.title,
            message: post.message,
            tags: post.tags,
            selectedFile: post.selectedFile
        });
        // console.log("useEffect của Form bị gọi lại");
    }, [post]);
    if (!post) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (id) {
            dispatch(updatePost(
                id,
                { ...postData, name: user?.result?.name },
                //lấy cái name ở local storage chứ ko phải mình tự viết vào nữa
                history
            ));
        }
    }

    return (
        <div>
            <Paper
                style={{ padding: '20px', borderRadius: '15px' }}
                elevation={6}
            >
                <div className={classes.card}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <div className={classes.section}>
                            <form
                                autoComplete='off'
                                noValidate
                                className={`${classes.root} ${classes.form}`}
                                onSubmit={handleSubmit}
                            >
                                <Typography
                                    variant='h6'
                                >
                                    {id ? 'Editing' : 'Creating'} a Memory
                                </Typography>
                                <TextField
                                    name='title'
                                    variant='outlined'
                                    label='Title'
                                    fullWidth
                                    required
                                    value={postData.title}
                                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                                //phải spread cái postData, vì đây là set 1 object, nếu ko nó sẽ set lại mỗi 1 key - value
                                />
                                <TextField
                                    name='tags'
                                    variant='outlined'
                                    label='Tags'
                                    fullWidth
                                    value={postData.tags}
                                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
                                />
                                <TextField
                                    name='message'
                                    variant='outlined'
                                    label='Message'
                                    fullWidth
                                    multiline
                                    required
                                    value={postData.message}
                                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                                />
                                <div className={classes.fileInput}>
                                    <FileBase
                                        type="file"
                                        multiple={false}
                                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                                    />
                                </div>
                                <Button
                                    className={classes.buttonSubmit}
                                    variant='contained'
                                    color='primary'
                                    size='large'
                                    type='submit'
                                    fullWidth
                                >
                                    Submit
                                </Button>
                            </form>
                            <Divider style={{ margin: '20px 0' }} />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <div className={classes.imageSection}>
                            <CardMedia
                                className={classes.media}
                                image={postData.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
                                component='img'
                                alt={postData.title}
                                style={{ marginBottom: '20px' }}
                            />
                        </div>
                    </Grid>
                </div>
            </Paper>
        </div>
    )
}

export default PostUpdate