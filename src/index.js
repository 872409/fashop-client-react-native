import React from 'react'
import dva from './utils/dva'
import App from './containers/index'
import models from './models'

const app = dva({
    initialState: {},
    models,
    onError(e) {
        console.log('onError', e)
    },
})

export default app.start(<App />)

// import React, { Component } from 'react';
// import App from "./containers/index";
// import { Provider } from "react-redux";
// import store from "./store/index";
 
// export default class Index extends Component {
//     render() {
//         return <Provider store={store}>
//             <App />
//         </Provider>;
//     }
// }
