import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Dashboard from 'Dashboard/Dashboard';
import './App.css';

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
	            <div>
		            <AppBar
			            title="HackHPI 2017"
			            iconClassNameRight="muidocs-icon-navigation-expand-more"
		            />
		            <Router>
			            <Route exact path="/" component={Dashboard}/>
		            </Router>
	            </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
