import React, { useState, useEffect } from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core'
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from 'react-router-dom';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import Pagination from '../Pagination';
import Posts from '../../components/Posts/Posts';
import Form from '../../components/Form/Form';
import useStyles from './styles';

function useQuery() { //set up url seach params, to know on which page we currently on and what search items we looking for
    return new URLSearchParams(useLocation().search);
}
//component Home này sẽ có phần searching
const Home = () => {
    const [currentId, setCurrentId] = useState(null)
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState('');

    useEffect(() => {
        dispatch(getPosts());
        // console.log("render lại getPosts");
    }, [currentId, dispatch]);

    const handleOnKeyDown = (e) => {
        if (e.keyCode === 13) {
            //search post
            searchPost();
        }
    }

    const searchPost = () => {
        if (search.trim() || tags) { //trim make sure there are no empty spaces ở 2 đầu
            dispatch(getPostsBySearch({ search, tags: tags.replace(/ /g, "") }));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.replace(/ /g, "")}`);//bỏ khoảng trắng khi search theo tag
        } else {
            history.push('/');
        }
    }

    // const handleAdd = (tag) => setTags([...tags, tag]);

    // const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

    return (
        <Grow in>
            {/* grow là hiệu ứng hiện ra https://mui.com/material-ui/transitions/ */}
            <Container maxWidth="xl">
                <Grid
                    className={classes.gridContainer}
                    container
                    justifyContent="space-between"
                    alignItems="stretch"
                    spacing={4}
                >
                    {/* spacing nghĩa là khoảng cách giữa các thẻ nằm cạnh nhau */}
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                            <TextField
                                name="search"
                                variant="outlined"
                                label="Search Memories"
                                onKeyDown={handleOnKeyDown}
                                fullWidth
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            {/* <ChipInput
                                style={{ margin: '10px 0' }}//top bot 10, left right 0
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label="Search Tags"
                                variant='outlined'
                            /> */}
                            <TextField
                                name="tags"
                                style={{ margin: '10px 0' }}//top bot 10, left right 0
                                variant='outlined'
                                label="Search Tags"
                                value={tags}
                                fullWidth
                                // onChange={handleAdd}
                                onChange={(e) => setTags(e.target.value)}
                            />
                            <Button
                                className={classes.searchButton}
                                onClick={searchPost}
                                variant='outlined'
                                color="primary"
                            >
                                Search
                            </Button>
                        </AppBar>
                        <Form
                            currentId={currentId}
                            setCurrentId={setCurrentId}
                        />
                        {(!searchQuery && !tags.length) && (
                            <Paper elevation={6} className={classes.pagination}>
                                <Pagination page={page} />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home