# Redux 基本部分

## Actions 
  Actions 将数据信息从应用程序(application)到商店(store)的有效载荷,是store唯一的信息来源,
  使用store.dispatch()  发送到store
  
### Action Creators : 
 在Redux中，动作创建者(Action Creators)只需返回一个动作, 将结果传递给dispatch()函数
 
         function addTodo(text) {
           return {
             type: ADD_TODO,
             text
           }
         }
         
         dispatch(addTodo(text))
         
         const boundAddTodo = text => dispatch(addTodo(text))
         boundAddTodo(text)
         
         
         该dispatch()功能可以直接从store访问store.dispatch()，但更可能你会使用像一个助手来访问它的反应，终极版的connect()。
         您可以使用bindActionCreators()自动将许多动作创建者绑定到一个dispatch()函数
         
 源代码
 actions.js
 
     /*
      * action types
      */
     
     export const ADD_TODO = 'ADD_TODO'
     export const TOGGLE_TODO = 'TOGGLE_TODO'
     export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
     
     /*
      * other constants
      */
     
     export const VisibilityFilters = {
       SHOW_ALL: 'SHOW_ALL',
       SHOW_COMPLETED: 'SHOW_COMPLETED',
       SHOW_ACTIVE: 'SHOW_ACTIVE'
     }
     
     /*
      * action creators
      */
     
     export function addTodo(text) {
       return { type: ADD_TODO, text }
     }
     
     export function toggleTodo(index) {
       return { type: TOGGLE_TODO, index }
     }
     
     export function setVisibilityFilter(filter) {
       return { type: SET_VISIBILITY_FILTER, filter }
     }
     
## Reducers
  Actions描述事情发生，但不指定应用程序的状态如何响应。这是Reducers的工作
  
  ### Handling Actions : 行动处理
    我们已经决定了我们的状态对象，准备为它编写一个reducer。reducer是一个纯函数，它采用先前的状态和一个动作，并返回下一个状态
    (previousState, action) => newState
    它被称为reducer，因为它是您传递给的函数的类型Array.prototype.reduce(reducer, ?initialValue)
    
  永远reducers做到: 
    
      突变其论据
      执行API调用和路由转换等副作用;
      调用非纯函数，例如Date.now()或Math.random()。
      
  源代码: 
  reducers.js
  
      import { combineReducers } from 'redux'
      import {
        ADD_TODO,
        TOGGLE_TODO,
        SET_VISIBILITY_FILTER,
        VisibilityFilters
      } from './actions'
      const { SHOW_ALL } = VisibilityFilters
      
      function visibilityFilter(state = SHOW_ALL, action) {
        switch (action.type) {
          case SET_VISIBILITY_FILTER:
            return action.filter
          default:
            return state
        }
      }
      
      function todos(state = [], action) {
        switch (action.type) {
          case ADD_TODO:
            return [
              ...state,
              {
                text: action.text,
                completed: false
              }
            ]
          case TOGGLE_TODO:
            return state.map((todo, index) => {
              if (index === action.index) {
                return Object.assign({}, todo, {
                  completed: !todo.completed
                })
              }
              return todo
            })
          default:
            return state
        }
      }
      
      const todoApp = combineReducers({
        visibilityFilter,
        todos
      })
      
      export default todoApp
          
## Store 商店
   事实的actions以及根据这些动作来更新状态的reducers,store是带来他们的对象 
   - 持有申请状态;
   - 允许访问状态通过getState();
   - 允许状态通过更新dispatch(action);
   - 注册听众通过subscribe(listener);
   - 处理通过返回的函数取消注册监听器subscribe(listener)
   
   Redux应用程序中只能有一个存储。当您要拆分数据处理逻辑时，您将使用reducer组合而不是许多存储
   
        如果你有一个reducers，那么很容易创建一个store。在上一节中，我们combineReducers()将几个reducers组合成一个。我们现在将导入它，并将其传递给createStore()。
        
        import { createStore } from 'redux'
        import todoApp from './reducers'
        let store = createStore(todoApp)
        
        您可以选择将初始状态指定为第二个参数createStore()。这有助于保持客户端的状态以匹配在服务器上运行的Redux应用程序的状态。
        let store = createStore(todoApp, window.STATE_FROM_SERVER)

   源代码: index.js
   
       import { createStore } from 'redux'
       import todoApp from './reducers'
       
       let store = createStore(todoApp)
       
## 数据流
  Redux架构围绕严格的单向数据流,意味着应用程序中的所有数据都遵循相同的生命周期模式，使您的应用程序的逻辑更加可预测和更容易理解
  
  任何Redux应用程序中的数据生命周期都遵循以下4个步骤：
  - store.dispatch(action)
    - 一个action是描述发生了什么的简单对象
  - Redux商店调用您提供的reducer功能
  - root reducers 可以将多个reducers的输出组合成单个状态树 
    - Redux具有combineReducers()辅助功能，有助于将根减速器“分割”为各自管理状态树的一个分支的单独函数
   
            假设您有两个减速器，一个用于todos列表，另一个用于当前选择的过滤器设置：
            
             function todos(state = [], action) {
               // Somehow calculate it...
               return nextState
             }
            
             function visibleTodoFilter(state = 'SHOW_ALL', action) {
               // Somehow calculate it...
               return nextState
             }
            
             let todoApp = combineReducers({
               todos,
               visibleTodoFilter
             })
            当您发出一个动作时，todoApp返回值combineReducers将调用reducer：
            
             let nextTodos = todos(state.todos, action)
             let nextVisibleTodoFilter = visibleTodoFilter(state.visibleTodoFilter, action)
            然后它将两组结果组合成一个状态树：
            
             return {
               todos: nextTodos,
               visibleTodoFilter: nextVisibleTodoFilter
             }
  - Redux存储保存root reducers 返回的完整状态树
   
## Usage with React   
   Redux与React无关。您可以使用React，Angular，Ember，jQuery或者vanilla JavaScript编写Redux应用程序
   
   安装 npm install --save react-redux
   
   ### 设计演示组件
   
   - TodoList 是显示可见的东西的列表。
      - todos: Array是一系列具有{ id, text, completed }形状的待办事项。
      - onTodoClick(id: number) 是一个回调，当一个todo被点击时调用。
   - Todo 是一个单一的待办事项。
      - text: string 是要显示的文字。
      - completed: boolean 是否应该出现交叉。
      - onClick() 是一个回调，当一个todo被点击时调用。
   - Link 是一个回调链接。
      - onClick() 是当点击链接时调用的回调。
   - Footer 是我们让用户更改当前可见的todos的地方。
   - App 是渲染一切的根组件。
   
   ### 设计集装箱组件
   
   我们还需要一些容器组件将演示组件连接到Redux。
   例如，该表示TodoList组件需要一个类似的容器VisibleTodoList，并且知道如何应用当前可见性过滤器。
   要更改可见性过滤器，我们将提供一个FilterLink容器组件，用于呈现一个Link针对点击分发相应操作的容器组件：
   
   - VisibleTodoList根据当前可见性过滤器过滤todos，并呈现a TodoList。
   - FilterLink获取当前的可见性过滤器并呈现一个 Link。
       - filter: string 是它所代表的可见性过滤器。
   
   ### 设计其他组件
   - AddTodo 是一个带有“添加”按钮的输入字段
   
   ### 实现演示组件   
   components/Todo.js
       
       import React from 'react'
       import PropTypes from 'prop-types'
       
       const Todo = ({ onClick, completed, text }) => (
         <li
           onClick={onClick}
           style={{
             textDecoration: completed ? 'line-through' : 'none'
           }}
         >
           {text}
         </li>
       )
       
       Todo.propTypes = {
         onClick: PropTypes.func.isRequired,
         completed: PropTypes.bool.isRequired,
         text: PropTypes.string.isRequired
       }
       
       export default Todo
   components/TodoList.js
       
       import React from 'react'
       import PropTypes from 'prop-types'
       import Todo from './Todo'
       
       const TodoList = ({ todos, onTodoClick }) => (
         <ul>
           {todos.map((todo, index) => (
             <Todo key={index} {...todo} onClick={() => onTodoClick(index)} />
           ))}
         </ul>
       )
       
       TodoList.propTypes = {
         todos: PropTypes.arrayOf(
           PropTypes.shape({
             id: PropTypes.number.isRequired,
             completed: PropTypes.bool.isRequired,
             text: PropTypes.string.isRequired
           }).isRequired
         ).isRequired,
         onTodoClick: PropTypes.func.isRequired
       }
       
       export default TodoList
   components/Link.js
   
       import React from 'react'
       import PropTypes from 'prop-types'
       
       const Link = ({ active, children, onClick }) => {
         if (active) {
           return <span>{children}</span>
         }
       
         return (
           <a
             href="#"
             onClick={e => {
               e.preventDefault()
               onClick()
             }}
           >
             {children}
           </a>
         )
       }
       
       Link.propTypes = {
         active: PropTypes.bool.isRequired,
         children: PropTypes.node.isRequired,
         onClick: PropTypes.func.isRequired
       }
       
       export default Link
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
       
   ### 实施集装箱组件
   
   - 容器组件只是一个React组件，用于store.subscribe()读取Redux状态树的一部分，并为其呈现的演示组件提供道具。
   您可以手动编写一个容器组件，[但]建议使用React Redux库的connect()功能来生成容器组件，它提供了许多有用的优化，
   以防止不必要的重新呈现。（其中一个结果是你不必担心实施自己的反应性能建议shouldComponentUpdate。）
   
   - 要使用connect()，您需要定义一个名为“特殊功能”的函数mapStateToProps，
   告诉您如何将当前Redux存储状态转换为要传递给正在包装的演示组件的道具。
   - 例如:
    VisibleTodoList需要计算todos传递给TodoList，所以我们定义了过滤器的功能state.todos根据state.visibilityFilter，并在其使用它mapStateToProps：
   
           const getVisibleTodos = (todos, filter) => {
             switch (filter) {
               case 'SHOW_ALL':
                 return todos
               case 'SHOW_COMPLETED':
                 return todos.filter(t => t.completed)
               case 'SHOW_ACTIVE':
                 return todos.filter(t => !t.completed)
             }
           }
           
           const mapStateToProps = state => {
             return {
               todos: getVisibleTodos(state.todos, state.visibilityFilter)
             }
           }
   除了读取状态之外，容器组件也可以调度动作。以类似的方式，您可以定义一个称为mapDispatchToProps()接收dispatch()方法的函数，
   并返回要注入到表示组件中的回调道具。
   例如，我们想要VisibleTodoList将一个prop被onTodoClick注入到TodoList组件中，并且我们要onTodoClick发送一个TOGGLE_TODO动作：
   
       const mapDispatchToProps = dispatch => {
         return {
           onTodoClick: id => {
             dispatch(toggleTodo(id))
           }
         }
       }
   最后，我们创建VisibleTodoList通过调用connect()并传递这两个函数：
   
       import { connect } from 'react-redux'
       
       const VisibleTodoList = connect(
         mapStateToProps,
         mapDispatchToProps
       )(TodoList)
   
        export default VisibleTodoList
   
   ##### 找到下面定义的其余容器组件：
   
   containers/FilterLink.js
   
       import { connect } from 'react-redux'
       import { setVisibilityFilter } from '../actions'
       import Link from '../components/Link'
       
       const mapStateToProps = (state, ownProps) => {
         return {
           active: ownProps.filter === state.visibilityFilter
         }
       }
       
       const mapDispatchToProps = (dispatch, ownProps) => {
         return {
           onClick: () => {
             dispatch(setVisibilityFilter(ownProps.filter))
           }
         }
       }
       
       const FilterLink = connect(
         mapStateToProps,
         mapDispatchToProps
       )(Link)
       
       export default FilterLink
   containers/VisibleTodoList.js
       
       import { connect } from 'react-redux'
       import { toggleTodo } from '../actions'
       import TodoList from '../components/TodoList'
       
       const getVisibleTodos = (todos, filter) => {
         switch (filter) {
           case 'SHOW_ALL':
             return todos
           case 'SHOW_COMPLETED':
             return todos.filter(t => t.completed)
           case 'SHOW_ACTIVE':
             return todos.filter(t => !t.completed)
         }
       }
       
       const mapStateToProps = state => {
         return {
           todos: getVisibleTodos(state.todos, state.visibilityFilter)
         }
       }
       
       const mapDispatchToProps = dispatch => {
         return {
           onTodoClick: id => {
             dispatch(toggleTodo(id))
           }
         }
       }
       
       const VisibleTodoList = connect(
         mapStateToProps,
         mapDispatchToProps
       )(TodoList)
       
       export default VisibleTodoList
   ### 实施其他组件
   
   containers/AddTodo.js
   
       import React from 'react'
       import { connect } from 'react-redux'
       import { addTodo } from '../actions'
       
       let AddTodo = ({ dispatch }) => {
         let input
       
         return (
           <div>
             <form
               onSubmit={e => {
                 e.preventDefault()
                 if (!input.value.trim()) {
                   return
                 }
                 dispatch(addTodo(input.value))
                 input.value = ''
               }}
             >
               <input
                 ref={node => {
                   input = node
                 }}
               />
               <button type="submit">
                 Add Todo
               </button>
             </form>
           </div>
         )
       }
       AddTodo = connect()(AddTodo)
       
       export default AddTodo
   
   在一个组件内将容器绑在一起
   
       components/App.js
       
       import React from 'react'
       import Footer from './Footer'
       import AddTodo from '../containers/AddTodo'
       import VisibleTodoList from '../containers/VisibleTodoList'
       
       const App = () => (
         <div>
           <AddTodo />
           <VisibleTodoList />
           <Footer />
         </div>
       )
       
       export default App
   ### 通过store
   
   - 所有容器组件都需要访问Redux存储, 一个选择是将其作为支柱传递给每个容器组件,
     必须通过store连接组件，因为它们恰好在组件树中呈现一个容器。
   
   - 建议使用的选项是使用一个特殊的React Redux组件，可以将应用程序的所有容器组件都可使用，而不会明确地传递给应用程序的所有容器组件
     渲染根组件时只需要使用它一次：<Provider>
   
   index.js
   
       import React from 'react'
       import { render } from 'react-dom'
       import { Provider } from 'react-redux'
       import { createStore } from 'redux'
       import todoApp from './reducers'
       import App from './components/App'
       
       let store = createStore(todoApp)
       
       render(
         <Provider store={store}>
           <App />
         </Provider>,
         document.getElementById('root')
       )
       
## 示例: 

 ### Entry Point: 入口点
index.js
    
    import React from 'react'
    import { render } from 'react-dom'
    import { Provider } from 'react-redux'
    import { createStore } from 'redux'
    import todoApp from './reducers'
    import App from './components/App'
    
    let store = createStore(todoApp)
    
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root')
    )
 ### Action Creators
 actions/index.js
    
    let nextTodoId = 0
    export const addTodo = text => {
      return {
        type: 'ADD_TODO',
        id: nextTodoId++,
        text
      }
    }
    
    export const setVisibilityFilter = filter => {
      return {
        type: 'SET_VISIBILITY_FILTER',
        filter
      }
    }
    
    export const toggleTodo = id => {
      return {
        type: 'TOGGLE_TODO',
        id
      }
    }
 ### Reducers
 reducers/todos.js
    
    const todos = (state = [], action) => {
      switch (action.type) {
        case 'ADD_TODO':
          return [
            ...state,
            {
              id: action.id,
              text: action.text,
              completed: false
            }
          ]
        case 'TOGGLE_TODO':
          return state.map(todo =>
            (todo.id === action.id) 
              ? {...todo, completed: !todo.completed}
              : todo
          )
        default:
          return state
      }
    }
    
    export default todos
 reducers/visibilityFilter.js
    
    const visibilityFilter = (state = 'SHOW_ALL', action) => {
      switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
          return action.filter
        default:
          return state
      }
    }
    
    export default visibilityFilter
    reducers/index.js
    
    import { combineReducers } from 'redux'
    import todos from './todos'
    import visibilityFilter from './visibilityFilter'
    
    const todoApp = combineReducers({
      todos,
      visibilityFilter
    })
    
    export default todoApp
 ### Presentational Components
 components/Todo.js
    
    import React from 'react'
    import PropTypes from 'prop-types'
    
    const Todo = ({ onClick, completed, text }) => (
      <li
        onClick={onClick}
        style={{
          textDecoration: completed ? 'line-through' : 'none'
        }}
      >
        {text}
      </li>
    )
    
    Todo.propTypes = {
      onClick: PropTypes.func.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }
    
    export default Todo
 components/TodoList.js
    
    import React from 'react'
    import PropTypes from 'prop-types'
    import Todo from './Todo'
    
    const TodoList = ({ todos, onTodoClick }) => (
      <ul>
        {todos.map(todo => (
          <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
        ))}
      </ul>
    )
    
    TodoList.propTypes = {
      todos: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          completed: PropTypes.bool.isRequired,
          text: PropTypes.string.isRequired
        }).isRequired
      ).isRequired,
      onTodoClick: PropTypes.func.isRequired
    }
    
    export default TodoList
  components/Link.js
    
    import React from 'react'
    import PropTypes from 'prop-types'
    
    const Link = ({ active, children, onClick }) => {
      if (active) {
        return <span>{children}</span>
      }
    
      return (
        <a
          href="#"
          onClick={e => {
            e.preventDefault()
            onClick()
          }}
        >
          {children}
        </a>
      )
    }
    
    Link.propTypes = {
      active: PropTypes.bool.isRequired,
      children: PropTypes.node.isRequired,
      onClick: PropTypes.func.isRequired
    }
    
    export default Link
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
  components/App.js
    
    import React from 'react'
    import Footer from './Footer'
    import AddTodo from '../containers/AddTodo'
    import VisibleTodoList from '../containers/VisibleTodoList'
    
    const App = () => (
      <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
      </div>
    )
    
    export default App
 ### Container Components
 containers/VisibleTodoList.js
    
    import { connect } from 'react-redux'
    import { toggleTodo } from '../actions'
    import TodoList from '../components/TodoList'
    
    const getVisibleTodos = (todos, filter) => {
      switch (filter) {
        case 'SHOW_ALL':
          return todos
        case 'SHOW_COMPLETED':
          return todos.filter(t => t.completed)
        case 'SHOW_ACTIVE':
          return todos.filter(t => !t.completed)
      }
    }
    
    const mapStateToProps = state => {
      return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
      }
    }
    
    const mapDispatchToProps = dispatch => {
      return {
        onTodoClick: id => {
          dispatch(toggleTodo(id))
        }
      }
    }
    
    const VisibleTodoList = connect(
      mapStateToProps,
      mapDispatchToProps
    )(TodoList)
    
    export default VisibleTodoList
 containers/FilterLink.js
    
    import { connect } from 'react-redux'
    import { setVisibilityFilter } from '../actions'
    import Link from '../components/Link'
    
    const mapStateToProps = (state, ownProps) => {
      return {
        active: ownProps.filter === state.visibilityFilter
      }
    }
    
    const mapDispatchToProps = (dispatch, ownProps) => {
      return {
        onClick: () => {
          dispatch(setVisibilityFilter(ownProps.filter))
        }
      }
    }
    
    const FilterLink = connect(
      mapStateToProps,
      mapDispatchToProps
    )(Link)
    
    export default FilterLink
### Other Components
 containers/AddTodo.js
    
    import React from 'react'
    import { connect } from 'react-redux'
    import { addTodo } from '../actions'
    
    let AddTodo = ({ dispatch }) => {
      let input
    
      return (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault()
              if (!input.value.trim()) {
                return
              }
              dispatch(addTodo(input.value))
              input.value = ''
            }}
          >
            <input
              ref={node => {
                input = node
              }}
            />
            <button type="submit">
              Add Todo
            </button>
          </form>
        </div>
      )
    }
    AddTodo = connect()(AddTodo)
    
    export default AddTodo
    
   