import React from "react";
import { Container, Button } from '@material-ui/core'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails"
import PostCreate from "./components/PostCreate/PostCreate"
import PostUpdate from "./components/PostUpdate/PostUpdate"
const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    // console.log("user at app.js");
    // console.log(user);
    return (
        <BrowserRouter>
            {/* /* lg mean large * => change to xl (extra large) to fit more posts on the screen  */}
            <Container maxWidth="xl">
                <Navbar />
                {/* Switch nghĩa là nó sẽ switch theo route, còn navbar để ở ngoài thì nó sẽ luôn hiện ra cố định */}
                <Switch>
                    {/* exact tức là các đường dẫn cố định ko có tham số thay đổi */}
                    {/* Redirect chuyển hướng từ "/" đến "/posts" */}
                    <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
                    <Route path="/" exact component={() => <Redirect to="/posts" />} />
                    <Route path="/posts" exact component={Home} />
                    <Route path="/posts/search" exact component={Home} />
                    <Route path="/posts/create" exact component={PostCreate} />
                    {/* nhớ phải để cái route create trên route id, nếu ko nó nhảy vào tìm cái id trước, route nó chạy theo thứ tự từ trên xuống dưới í */}
                    <Route path="/posts/update/:id" component={PostUpdate} />
                    <Route path="/posts/:id" component={PostDetails} />
                </Switch>
            </Container>
        </BrowserRouter>
    );
}

export default App;