import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Dashboard from './Dashboard/Dashboard';
import Authentification from './Authentification/Authentification';
import './App.css';

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
	            <div>
		            <AppBar
			            title="Health ⊕ Line"
			            iconClassNameRight="muidocs-icon-navigation-expand-more" />
		            <Router>
			            <Switch>
				            <Route path="/login" component={Authentification}/>
				            <Route path="/register" render={() => { return (<Authentification isRegistration={true}/>); }}/>
				            <Route exact path="/:userId" component={Dashboard}/>
			            </Switch>
		            </Router>
	            </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
