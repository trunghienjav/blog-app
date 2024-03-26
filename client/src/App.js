import React from "react";
import { Container } from '@material-ui/core'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails"
const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    return (
        <BrowserRouter>
            {/* /* lg mean large * => change to xl (extra large) to fit more posts on the screen  */}
            <Container maxWidth="xl">
                <Navbar />

                {/* Switch nghĩa là nó sẽ switch theo route, còn navbar để ở ngoài thì nó sẽ luôn hiện ra cố định */}
                <Switch>
                    <Route path="/" exact component={() => <Redirect to="/posts" />} />
                    <Route path="/posts" exact component={Home} />
                    <Route path="/posts/search" exact component={Home} />
                    <Route path="/posts/:id" component={PostDetails} />
                    <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
                </Switch>
            </Container>
        </BrowserRouter>
    );
}

export default App;