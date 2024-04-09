import React, { useState } from 'react';
import { Paper, Typography, TextField, CardMedia, Grid, Button } from '@material-ui/core';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { useHistory } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CustomUploadApdapter from '../../helpers/customUpload';

const PostCreate = ({ currentId, setCurrentId }) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('profile'));

  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
  });
  console.log("in postData");
  console.log(postData);

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
    // setCurrentId(null);
    setPostData({
      title: '',
      message: '',
      tags: '',
      selectedFile: ''
    })
  };

  const config = {
    toolbar: {
      items: [
        'bold', 'italic',
        '|', 'undo', 'redo',
        '|', 'link', 'imageUpload',
      ],
      shouldNotGroupWhenFull: true
    },
    extraPlugins: [MyCustomUploadAdapterPlugin],
  };

  const [editorData, setEditorData] = useState('');

  const handleChange = (event, editor) => {

    const data = editor.getData();
    console.log("editorData là: ");
    console.log(editorData);

    setEditorData(data);
    setPostData({ ...postData, message: data })
  };
  console.log("in ra editorData");
  console.log(editorData);

  function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      // Configure the URL to the upload script in your backend here!
      return new CustomUploadApdapter(loader);
    };
  }

  return (
    <div>
      <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
        <div className={classes.card}>
          <form
            autoComplete='off'
            noValidate
            className={`${classes.root} ${classes.form}`}
            onSubmit={handleSubmit}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <div className={classes.section}>
                <Typography
                  variant='h6'
                  gutterBottom
                >
                  Creating a Memory
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
                {/* <TextField
                  name='message'
                  minRows={5}
                  required
                  variant='outlined'
                  label='Content'
                  fullWidth
                  multiline
                  value={postData.message}
                  onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                /> */}
                <CKEditor
                  // className={classes.ckeditor}
                  editor={ClassicEditor}
                  data={editorData}
                  config={config}
                  onChange={handleChange}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    // console.log("Editor is ready to use!", editor);
                    editor.editing.view.change((writer) => {
                      writer.setStyle(
                        "min-height",
                        "250px",
                        editor.editing.view.document.getRoot(),
                      );
                      writer.setStyle(
                        "word-break",
                        "break-word",
                        editor.editing.view.document.getRoot(),
                      );
                    });
                  }}
                />

                <TextField
                  name='tags'
                  variant='outlined'
                  label='Tags'
                  fullWidth
                  value={postData.tags}
                  onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
                />
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
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <div className={classes.imageSection}>
                <p>Choose Thumbnail</p>
                <CardMedia
                  className={classes.media}
                  image={postData.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
                  component='img'
                  alt={postData.title}
                  style={{ marginBottom: '20px' }}
                />
                <div className={classes.fileInput}>
                  <FileBase
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                  />
                </div>
              </div>
            </Grid>
          </form>
        </div>
      </Paper>
    </div>
  )
}

export default PostCreate