import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute, Redirect } from 'react-router';
import './index.css';
import App from './App';

import Home from './pages/Home/Home';
import User from './pages/User/User';
import About from './pages/About/About';
import Contacts from './pages/Contacts/Contacts';
import Cast from './pages/Cast/Cast';
import  Concept from './pages/Concept/Concept';
import Comments from './pages/Comments/MainComments';
import TablePage from './pages/TablePage/TablePage';
import NewShopTable from './pages/NewShopTable/NewShopTable';


const routeConfig = [
    { path: '/',
        component: App,
        indexRoute: { component: Home },
        childRoutes: [
            { path: 'user', component: User },
            { path: 'about', component: About },
            { path: 'contacts', component: Contacts },
            { path: 'cast', component: Cast },
            { path: 'concept', component: Concept },
            { path: 'concept/:title', component: Concept },
            { path: 'comments', component: Comments },
            { path: 'table', component: TablePage },
            { path: 'newShopTable', component: NewShopTable }
        ]
    }
];


ReactDOM.render(<Router history={hashHistory} routes={routeConfig} />, document.getElementById('root'));
