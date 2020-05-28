import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import GatherPages from "./Pages/GatherPages.js";
import ScrollToTop from "./ScrollToTop.js";
import Home from "./Pages/Home.js";

import NavBar from "./Components/NavBar.js";
import Footer from "./Components/Footer.js";

import ExampleGet from "./Fetch/ExampleGet.js";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart, faLightbulb, faHourglass} from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faInstagramSquare, faTwitter} from '@fortawesome/free-brands-svg-icons'

library.add(faHourglass, faFacebookSquare, faInstagramSquare, faTwitter);

class App extends React.Component {
  constructor(){
    super();
    this.state = {

    }
  }
  async componentDidMount(){
    const codingIntro = await (await (fetch("/example.json"))).json();
  }
  render(){
    return (
      <div className="App">
          <Router>
            <ScrollToTop>
              <NavBar/>
              <div className = "content">
                <GatherPages/>
                <ExampleGet/>
                <Route exact path = "/" component = {Home}/>
              </div>
              <Footer/>
            </ScrollToTop>
          </Router>
      </div>
    );
  }
}

export default App;
