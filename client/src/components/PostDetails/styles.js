import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '600px',
    marginBottom: '6px'

  },
  card: {
    display: 'flex',
    width: '100%',
    // justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  figcaption: {
    textAlign: 'center',
  },
  recommendedPosts: {
    display: 'flex',
    overflowX: 'auto',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  recommendedPost: {
    margin: '20px',
    cursor: 'pointer',
    border: '2px solid #ccc',
    borderRadius: '25px',
    padding: '20px',
  },
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '15px',
    height: '39vh',
  },
  commentsOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  commentsInnerContainer: {
    // height: '150px',
    overflowY: 'auto',
    marginRight: '30px',
  },
  ckContent: {
    '& img': {
      /* Điều chỉnh các thuộc tính CSS cho thẻ <img> trong .ckContent */
      maxWidth: '100%', /* Giới hạn kích thước tối đa của hình ảnh */
      borderRadius: '25px',
    },
    '& figcaption': {
      /* CSS cho phần tử figcaption */
      textAlign: 'center',
      fontSize: 'small',
    },
  }
}));