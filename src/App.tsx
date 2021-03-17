import React from 'react';
import {Home} from "./pages/Home/Home";
import {Header} from "./components/Header/Header";
require('dotenv').config();

const App = () => {
  return (
      <div>
        <Header />
        <Home />
      </div>
  );
}

export default App;
