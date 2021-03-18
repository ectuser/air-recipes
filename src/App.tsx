import React from 'react';
import {Home} from "./pages/Home/Home";
import {Header} from "./components/Header/Header";
import {ApplicationRouter} from "./ApplicationRouter";
require('dotenv').config();

const App = () => {
    return (
      <ApplicationRouter/>
    );
}

export default App;
