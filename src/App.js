import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import GatherPages from "./Pages/GatherPages.js";
import ScrollToTop from "./ScrollToTop.js";
import Home from "./Pages/Home.js";
import NavBar from "./NavBar.js";


function App() {
  return (
    <div className="App">
        <Router>
          <ScrollToTop>
            <NavBar/>
            <div className = "content">
              <GatherPages/>
              <Route exact path = "/" component = {Home}/>
            </div>
          </ScrollToTop>
        </Router>
    </div>
  );
}

export default App;
