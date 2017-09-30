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

//通过hashHistory 路由 history={hashHistory}
// ReactDOM.render(
//     <Router history={hashHistory}>
//         <Route path="/" component={App}>
//             <IndexRoute component={Home} />
//             <Route path="/user/:name" component={User} />
//             <Route path="/about" component={About} />
//             <Route path="/contacts" component={Contacts} />
//             <Route path="/cast" component={Cast} />
//             <Route path="/concept" component={Concept}>
//                 {/*<Route path="/message/:id" component={Message} />*/}
//                 {/*/!* 跳转 /inbox/messages/:id 到 /messages/:id *!/*/}
//                 {/*<Redirect from="messages/:id" to="/messages/:id" />*/}
//             </Route>
//             <Route path="/comments" component={Comments} />
//         </Route>
//     </Router>,
//     document.getElementById('root')
// );

//通过hashHistory 路由 history={hashHistory}
// ReactDOM.render((
//     <Router history={hashHistory}>
//         <Route path="/" component={App}>
//             <IndexRoute component={Home} />
//             <Route path="/user/:name" component={User} />
//             <Route path="/about" component={About} />
//             <Route path="/contacts" component={Contacts} />
//             <Route path="/cast" component={Cast} />
//             <Route path="/concept" component={Concept}>
//                 {/*<Route path="/message/:id" component={Message} />*/}
//                 {/*/!* 跳转 /inbox/messages/:id 到 /messages/:id *!/*/}
//                 {/*<Redirect from="messages/:id" to="/messages/:id" />*/}
//             </Route>
//             <Route path="/comments" component={Comments} />
//         </Route>
//     </Router>
//     ),
//     document.getElementById('root')
// );

//通过hashHistory 路由 history={hashHistory}
// const routeConfig = [
//     { path: '/',
//         component: App,
//         indexRoute: { component: Home },
//         childRoutes: [
//             { path: 'user/:name', component: User },
//             { path: 'about', component: About },
//             { path: 'contacts', component: Contacts },
//             { path: 'cast', component: Cast },
//             { path: 'concept',
//                 component: Concept,
//                 childRoutes: [
//                     { path: '/messages/:id', component: Message },
//                     { path: 'messages/:id',
//                         onEnter: function (nextState, replaceState) {
//                             replaceState(null, '/messages/' + nextState.params.id)
//                         }
//                     }
//                 ]
//             },
//             { path: 'comments', component: Comments },
//         ]
//     }
// ];

const routeConfig = [
    { path: '/',
        component: App,
        indexRoute: { component: Home },
        childRoutes: [
            { path: 'user/:name', component: User },
            { path: 'about', component: About },
            { path: 'contacts', component: Contacts },
            { path: 'cast', component: Cast },
            { path: 'concept', component: Concept },
            { path: 'comments', component: Comments }
        ]
    }
];


ReactDOM.render(<Router history={hashHistory} routes={routeConfig} />, document.getElementById('root'));