import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
// Material UI dependency
injectTapEventPlugin();
// React dependency
registerServiceWorker();
