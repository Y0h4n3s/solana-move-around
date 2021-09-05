import React, { Component } from 'react';
import {Navigation} from "./components/navigationBar/navigation";

class App extends Component {
  
  render() {
    return (
        <div className="flexible-content">
            <Navigation/>
        </div>
    );
  }
}

export default App;
