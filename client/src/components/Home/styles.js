import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    // display: 'flex',
    padding: '16px',
  },
  pagination: {
    borderRadius: 4,
    margin: '1rem 0',
    padding: '16px',
  },
  gridContainer: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  paper: {
    position: 'absolute',
    width: 360,
    height: 100,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: '20px'
  },
}));