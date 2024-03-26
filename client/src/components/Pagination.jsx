import React, { useEffect } from "react";
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { getPosts } from "../actions/posts";

import useStyles from './styles';

const Paginate = ({ page }) => {
    const { numberOfPages } = useSelector((state) => state.posts);
    const classes = useStyles();
    const dispatch = useDispatch();
    // console.log("numberOfPages: ");
    // console.log(numberOfPages);

    useEffect(() => {
        if (page) dispatch(getPosts(page));
    }, [page]);

    return (
        <Pagination
            classes={{ ul: classes.ul }}
            count={numberOfPages} //this is just a static amount, but we'll have to dynamically fetch the number of pages depending on the number of posts we currently have 
            page={Number(page) || 1}
            color='primary'
            variant="outlined"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
            )}
        />
    )
}

export default Paginate;