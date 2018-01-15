import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute, Redirect } from 'react-router';
import './index.less';
import App from './App';

import Home from './pages/Home/Home';
import User from './pages/User/User';
import About from './pages/About/About';
import Contacts from './pages/Contacts/Contacts';
import Cast from './pages/Cast/Cast';
import  Concept from './pages/Concept/Concept';
import Comments from './pages/Comments/MainComments';
import BrotherNews from './pages/BrotherNews/BrotherNews';
import NewShopTable from './pages/NewShopTable/NewShopTable';
import Markdown from './pages/Markdown/Markdown';
import Inmap from './pages/Inmap/index';


const routeConfig = [
    { path: '/',
        component: App,
        indexRoute: { component: Home },
        childRoutes: [
            {
                path: 'user',
                component: User
            },
            {
                path: 'about',
                component: About
            },
            {
                path: 'contacts',
                component: Contacts
            },
            {
                path: 'cast',
                component: Cast
            },
            {
                path: 'concept',
                component: Concept,
                childRoutes: [
                    { path: '/concept/:title', component: Concept }
                ]
            },
            // {
            //     path: 'concept/:title',
            //     component: Concept
            // },
            {
                path: 'comments',
                component: Comments,
                childRoutes: [
                    { path: '/comments/:name', component: Comments }
                ]
            },
            {
                path: 'brotherNews',
                component: BrotherNews,
                childRoutes: [
                    { path: '/brotherNews/:name', component: BrotherNews }
                ]
            },
            {
                path: 'newShopTable',
                component: NewShopTable
            },
            {
                path: 'markdown',
                component: Markdown,
                childRoutes: [
                    { path: '/markdown/:name', query: {page: ''}, component: Comments }
                ]
            },
            {
                path: 'inmap',
                component: Inmap,
                childRoutes: [
                    { path: '/inmap/:name', query: {page: ''}, component: Comments }
                ]
            }
        ]
    }
];

// react-router 3.0.5
ReactDOM.render(<Router history={hashHistory} routes={routeConfig} />, document.getElementById('root'));
