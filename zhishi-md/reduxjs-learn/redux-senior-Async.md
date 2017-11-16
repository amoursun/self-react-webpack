# Redux 高级部分

## Async Actions; 异步操作
在基础指南中，我们构建了一个简单的todo应用程序。它是完全同步的。每次派遣一个动作，状态立即更新
在高级指南中，我们将构建一个不同的异步应用程序。它将使用Reddit API来显示所选子列表的当前标题
 
  ### 操作
  ### 处理行动
  reducers.js
  
      import { combineReducers } from 'redux'
      import {
        SELECT_SUBREDDIT,
        INVALIDATE_SUBREDDIT,
        REQUEST_POSTS,
        RECEIVE_POSTS
      } from '../actions'
      
      function selectedSubreddit(state = 'reactjs', action) {
        switch (action.type) {
          case SELECT_SUBREDDIT:
            return action.subreddit
          default:
            return state
        }
      }
      
      function posts(
        state = {
          isFetching: false,
          didInvalidate: false,
          items: []
        },
        action
      ) {
        switch (action.type) {
          case INVALIDATE_SUBREDDIT:
            return Object.assign({}, state, {
              didInvalidate: true
            })
          case REQUEST_POSTS:
            return Object.assign({}, state, {
              isFetching: true,
              didInvalidate: false
            })
          case RECEIVE_POSTS:
            return Object.assign({}, state, {
              isFetching: false,
              didInvalidate: false,
              items: action.posts,
              lastUpdated: action.receivedAt
            })
          default:
            return state
        }
      }
      
      function postsBySubreddit(state = {}, action) {
        switch (action.type) {
          case INVALIDATE_SUBREDDIT:
          case RECEIVE_POSTS:
          case REQUEST_POSTS:
            return Object.assign({}, state, {
              [action.subreddit]: posts(state[action.subreddit], action)
            })
          default:
            return state
        }
      }
      
      const rootReducer = combineReducers({
        postsBySubreddit,
        selectedSubreddit
      })
      
      export default rootReducer
      
  在这段代码中，有两个有趣的部分：
  
    我们使用ES6计算属性语法，所以我们可以state[action.subreddit]用Object.assign()简洁的方式更新。这个：
  
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action)
      })
      相当于：
      
      let nextState = {}
      nextState[action.subreddit] = posts(state[action.subreddit], action)
      return Object.assign({}, state, nextState)
  

## Async Action Creators: 异步动作创作者
- 我们如何使用我们之前定义的同步动作创建者以及网络请求？Redux的标准方法是使用Redux Thunk中间件。它有一个单独的包装叫做redux-thunk。
- 通过使用这个特定的中间件，一个Action Creators可以返回一个函数而不是一个动作对象。这样，动作创建者变成了一个thunk
- 当一个动作创建者返回一个函数时，该函数将被Redux Thunk中间件执行。这个功能允许其具有副作用，包括执行异步API调用。

actions.js （异步）

    import fetch from 'isomorphic-fetch'
    
    export const REQUEST_POSTS = 'REQUEST_POSTS'
    function requestPosts(subreddit) {
      return {
        type: REQUEST_POSTS,
        subreddit
      }
    }
    
    export const RECEIVE_POSTS = 'RECEIVE_POSTS'
    function receivePosts(subreddit, json) {
      return {
        type: RECEIVE_POSTS,
        subreddit,
        posts: json.data.children.map(child => child.data),
        receivedAt: Date.now()
      }
    }
    
    export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'
    export function invalidateSubreddit(subreddit) {
      return {
        type: INVALIDATE_SUBREDDIT,
        subreddit
      }
    }
    
    export function fetchPosts(subreddit) {
    
      return function (dispatch) {
        
        dispatch(requestPosts(subreddit))
    
        return fetch(`https://www.reddit.com/r/${subreddit}.json`)
          .then(
            response => response.json(),
         
            error => console.log('An error occured.', error)
          )
          .then(json =>
            
            dispatch(receivePosts(subreddit, json))
          )
      }
    }
注意 fetch: 

    我们在示例中使用fetchAPI。它是一种新的API，用于制作网络请求，以替代XMLHttpRequest最常见的需求。
    因为大多数浏览器本身还不支持，我们建议您使用isomorphic-fetch库：

    import fetch from 'isomorphic-fetch'
    在内部，它在客户端和服务器上使用whatwg-fetchpolyfillnode-fetch，因此如果将应用更改为通用，则不需要更改API调用。

    请注意，任何fetchpolyfill假定Promise polyfill已经存在。确保您拥有Promise polyfill的最简单方法是在任何其他代码运行之前，在您的入口点启用Babel的ES6 polyfill：

    import 'babel-polyfill'
    
我们如何在调度机制中包含Redux Thunk中间件？我们使用applyMiddleware()Redux 的商店增强器，如下所示：

index.js

    import thunkMiddleware from 'redux-thunk'
    import { createLogger } from 'redux-logger'
    import { createStore, applyMiddleware } from 'redux'
    import { selectSubreddit, fetchPosts } from './actions'
    import rootReducer from './reducers'
    
    const loggerMiddleware = createLogger()
    
    const store = createStore(
      rootReducer,
      applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
      )
    )
    
    store.dispatch(selectSubreddit('reactjs'))
    store
      .dispatch(fetchPosts('reactjs'))
      .then(() => console.log(store.getState()))

actions.js（含fetch）
    
    import fetch from 'isomorphic-fetch'
    
    export const REQUEST_POSTS = 'REQUEST_POSTS'
    function requestPosts(subreddit) {
      return {
        type: REQUEST_POSTS,
        subreddit
      }
    }
    
    export const RECEIVE_POSTS = 'RECEIVE_POSTS'
    function receivePosts(subreddit, json) {
      return {
        type: RECEIVE_POSTS,
        subreddit,
        posts: json.data.children.map(child => child.data),
        receivedAt: Date.now()
      }
    }
    
    export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'
    export function invalidateSubreddit(subreddit) {
      return {
        type: INVALIDATE_SUBREDDIT,
        subreddit
      }
    }
    
    function fetchPosts(subreddit) {
      return dispatch => {
        dispatch(requestPosts(subreddit))
        return fetch(`https://www.reddit.com/r/${subreddit}.json`)
          .then(response => response.json())
          .then(json => dispatch(receivePosts(subreddit, json)))
      }
    }
    
    function shouldFetchPosts(state, subreddit) {
      const posts = state.postsBySubreddit[subreddit]
      if (!posts) {
        return true
      } else if (posts.isFetching) {
        return false
      } else {
        return posts.didInvalidate
      }
    }
    
    export function fetchPostsIfNeeded(subreddit) {
      
      return (dispatch, getState) => {
        if (shouldFetchPosts(getState(), subreddit)) {
          return dispatch(fetchPosts(subreddit))
        } else {
          return Promise.resolve()
        }
      }
    }
这样我们可以逐步编写更复杂的异步控制流程，而消费代码可以保持不变：

index.js

    store
      .dispatch(fetchPostsIfNeeded('reactjs'))
      .then(() => console.log(store.getState()))

### Thunk中间件不是在Redux中编排异步操作的唯一方法：
 - 您可以使用redux-promise或redux-promise-middleware发出Promises而不是功能。
 - 您可以使用redux-observable来发送Observables。
 - 您可以使用redux-saga中间件来构建更复杂的异步操作。
 - 您可以使用redux-pack中间件发布基于promise的异步操作。
 - 您甚至可以编写一个自定义中间件来描述对API的调用，就像现实世界中的示例一样



# Async Flow: 异步流

例子: http://redux.js.org/docs/advanced/ExampleRedditAPI.html





