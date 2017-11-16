# Redux 高级部分

## Usage with React Router: 使用反应路由器

### 安装React Router:  
   
    npm install --save react-router-dom

### 配置URL:
### 配置Express:
    index.html from Express
    
    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, 'index.html'))
    })

### 配置WebpackDevServer:
    index.html从WebpackDevServer 提供服务：您可以添加到webpack.config.dev.js：
    
    devServer: {
      historyApiFallback: true
    }
### 连接 React Router 与 Redux App:
    import { BrowserRouter as Router, Route } from 'react-router-dom'
    
    const Root = () => (
      <Router>
        <Route path="/" component={App} />
      </Router>
    )
然而，在我们的Redux App中，我们仍然需要。是React Redux提供的高阶组件，
可让您将Redux绑定到React
    
    <Provider /><Provider />

然后我们将从React Redux 导入：
    
    <Provider />

import { Provider } from 'react-redux'
我们将包装，以便路由处理程序可以访问。

    <Router /><Provider /> store:       
    ====>

    const Root = ({ store }) => (
      <Provider store={store}>
        <Router>
          <Route path="/" component={App} />
        </Router>
      </Provider>
    )
如果URL匹配“/”，则会显示该组件。另外，我们将添加可选参数，因为当我们尝试从URL中读取参数时，我们将需要更多的参数。

    <App />:filter?/:filter

    <Route path="/:filter?" component={App} />

components/Root.js

    import React from 'react'
    import PropTypes from 'prop-types'
    import { Provider } from 'react-redux'
    import { BrowserRouter as Router, Route } from 'react-router-dom'
    import App from './App'
    
    const Root = ({ store }) => (
      <Provider store={store}>
        <Router>
          <Route path="/:filter?" component={App} />
        </Router>
      </Provider>
    )
    
    Root.propTypes = {
      store: PropTypes.object.isRequired
    }
    
    export default Root
我们还需要重构index.js以将组件呈现给DOM。

    <Root />

index.js

    import React from 'react'
    import { render } from 'react-dom'
    import { createStore } from 'redux'
    import todoApp from './reducers'
    import Root from './components/Root'
    
    let store = createStore(todoApp)
    
    render(
      <Root store={store} />,
      document.getElementById('root')
    )

### 用React Router导航

containers/FilterLink.js
    
    import React from 'react'
    import { NavLink } from 'react-router'
    
    const FilterLink = ({ filter, children }) => (
      <NavLink
        to={filter === 'SHOW_ALL' ? '/' : `/${ filter }`}
        activeStyle={{
          textDecoration: 'none',
          color: 'black'
        }}
      >
        {children}
      </NavLink>
    )
    
    export default FilterLink
components/Footer.js

    import React from 'react'
    import FilterLink from '../containers/FilterLink'
    
    const Footer = () => (
      <p>
        Show:
        {' '}
        <FilterLink filter="SHOW_ALL">
          All
        </FilterLink>
        {', '}
        <FilterLink filter="SHOW_ACTIVE">
          Active
        </FilterLink>
        {', '}
        <FilterLink filter="SHOW_COMPLETED">
          Completed
        </FilterLink>
      </p>
    )
    
    export default Footer

现在，如果你点击，你会看到你的网址会之间切换，即使您要使用浏览器返回，它将使用浏览器的历史记录，并有效地转到您以前的URL。

    <FilterLink />'/SHOW_COMPLETED''/SHOW_ACTIVE''/'


### 从URL读取
containers/VisibleTodoList.js

    const mapStateToProps = (state, ownProps) => {
      return {
        todos: getVisibleTodos(state.todos, ownProps.filter) // previously was getVisibleTodos(state.todos, state.visibilityFilter)
      }
    }
现在我们没有传递任何东西，所以是一个空的对象。要根据URL过滤我们的todos，我们要传递URL参数。

    <App />ownProps<VisibleTodoList />

    以前我们写道： 它在一个属性内可用。<Route path="/:filter?" component={App} />Appparams

params属性是与对象的url中指定的每个参数的match对象。例如：如果我们正在导航，match.params将等于 (正则match)

    我们现在可以读取URL 。{ filter: 'SHOW_COMPLETED' }localhost:3000/SHOW_COMPLETED<App />

请注意，我们使用ES6解构的性质传递params到。

    <VisibleTodoList />

components/App.js

    const App = ({ match: { params } }) => {
      return (
        <div>
          <AddTodo />
          <VisibleTodoList filter={params.filter || 'SHOW_ALL'} />
          <Footer />
        </div>
      )
    }









