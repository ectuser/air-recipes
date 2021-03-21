import React from 'react';
import {ApplicationRouter} from "./ApplicationRouter";
import {MuiThemeProvider} from "@material-ui/core";
import {theme} from "./application-theme";
require('dotenv').config();

const App = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <ApplicationRouter/>
        </MuiThemeProvider>
    );
}

export default App;
