import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Home} from "./pages/Home/Home";
import {RecipePage} from "./pages/RecipePage/RecipePage";
import {Header} from "./components/Header/Header";
import {Container} from "@material-ui/core";

export const ApplicationRouter = () => {
    return (
        <BrowserRouter>
            <Container maxWidth="lg">
                <Header />
                <Switch>
                    <Route path="/recipes/:id" component={RecipePage}/>
                    <Route path="/" component={Home}/>
                </Switch>
            </Container>
        </BrowserRouter>
    )
}
