import React from 'react';
import {Container, MuiThemeProvider} from "@material-ui/core";
import {theme} from "./application-theme";
import {Header} from "./components/Header/Header";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {RecipePage} from "./pages/RecipePage/RecipePage";
import {Home} from "./pages/Home/Home";
require('dotenv').config();

const App = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <BrowserRouter>
                <Container maxWidth="lg">
                    <Header />
                    <Switch>
                        <Route path="/recipes/:id" component={RecipePage}/>
                        <Route exact path="/" component={Home}/>
                    </Switch>
                </Container>
            </BrowserRouter>
        </MuiThemeProvider>
    );
}

export default App;
