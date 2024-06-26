import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import useStyles from './styles';

import Post from './Post/Post';
import { useSelector } from 'react-redux';

const Posts = ({ setCurrentId }) => {

    const { posts, isLoading } = useSelector((state) => state.posts) //fetch ra dữ liệu (trạng thái state được lưu ở reducer)
    // console.log("posts tại component posts");
    // console.log(posts);

    const classes = useStyles();

    if (!posts.length && !isLoading) return "No posts";
    return (
        isLoading ? <CircularProgress /> : (
            <Grid
                className={classes.container}
                container
                alignItems='stretch'
                spacing={3}
            >
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
                    {/* nếu là xs hay sm thì 1 cái post hiển thị full 12 col, md thì chiếm 6 col, lg chiếm 3 col */}
                        <Post
                            post={post}
                            setCurrentId={setCurrentId}
                        />
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default Posts