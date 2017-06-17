import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import './App.css';

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
	            <AppBar
		            title="HackHPI 2017"
		            iconClassNameRight="muidocs-icon-navigation-expand-more"
	            />

            </MuiThemeProvider>
        );
    }
}

export default App;
