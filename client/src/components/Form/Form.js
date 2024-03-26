import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });

    // const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null); //vì là 1 object nên phải viết thêm 1 lần posts.
    const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null)); //khi click vào nút 3 chấm nó sẽ lấy thông tin 1 cái post duy 1 trong 1 đống posts lưu ở store theo currentId

    const user = JSON.parse(localStorage.getItem('profile'));

    const classes = useStyles();

    const dispatch = useDispatch();

    const history = useHistory();

    useEffect(() => {
        if (post) setPostData(post);
        // console.log("useEffect của Form bị gọi lại");
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) { //nếu có current id
            dispatch(updatePost(
                currentId,
                { ...postData, name: user?.result?.name },
                //lấy cái name ở local storage chứ ko phải mình tự viết vào nữa
            ));
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name }, history)); //thêm history để qua file action nó re-navigate 
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null); //set lại currentId thì nó sẽ dùng useEffect ở app.js render lại trang, hiển thị ra thay đổi
        setPostData({
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        })
    }

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant='h6' align='center'>
                    Please Sign In to create your memories and like other's memories.
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            <form
                autoComplete='off'
                noValidate
                className={`${classes.root} ${classes.form}`}
                onSubmit={handleSubmit}
            >
                <Typography
                    variant='h6'
                >
                    {currentId ? 'Editing' : 'Creating'} a Memory
                </Typography>
                <TextField
                    name='title'
                    variant='outlined'
                    label='Title'
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                //phải spread cái postData, vì đây là set 1 object, nếu ko nó sẽ set lại mỗi 1 key - value
                />
                <TextField
                    name='message'
                    variant='outlined'
                    label='Message'
                    fullWidth
                    multiline
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                />
                <TextField
                    name='tags'
                    variant='outlined'
                    label='Tags'
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
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

                <Button
                    className={classes.buttonSubmit}
                    variant='contained'
                    color="secondary"
                    size='small'
                    onClick={clear}
                    fullWidth
                >
                    Clear
                </Button>
            </form>
        </Paper>
    )
}

export default Form