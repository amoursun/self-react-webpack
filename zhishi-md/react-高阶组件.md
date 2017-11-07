# react-高阶组件

高阶组件就是一个函数,传给他一个组件,他返回一个新的组件:  参数: 组件   返回: 新组件
传的参数(组件)作为返回(新组件)的子组件
    
   const NewComponent = higherOrderComponent(OldComponent)
        
        例如:
   -- wrappedComponent.js: 
        
        import React, { Component } from 'react'; 
        
        export default (WrappedComponent, name) => {
          class NewComponent extends Component {
            constructor () {
              super()
              this.state = { data: null }
            }
        
            componentWillMount () {
              let data = localStorage.getItem(name)
              this.setState({ data })
            }
        
            render () {
              return <WrappedComponent data={this.state.data} />
            }
          }
          return NewComponent
        }
        
        NewComponent 会根据第二个参数 name 在挂载阶段从 LocalStorage 加载数据，
        并且 setState 到自己的 state.data 中，而渲染的时候将 state.data 通过 props.data 传给 WrappedComponent
        
   -- inputWithUserName.js: 
        
        import wrapWithLoadData from './wrapWithLoadData'
        
        class InputWithUserName extends Component {
          render () {
            return <input value={this.props.data} />
          }
        }
        
        InputWithUserName = wrapWithLoadData(InputWithUserName, 'username');
        export default InputWithUserName
        
        定义 InputWithUserName，它会把 props.data 作为 <input /> 的 value 值。
        然把这个组件和 'username' 传给 wrapWithLoadData，wrapWithLoadData 会返回一个新的组件，
        我们用这个新的组件覆盖原来的 InputWithUserName，然后再导出去模块
        
  
   -- TextareaWithContent.js:
   
        import wrapWithLoadData from './wrapWithLoadData'
        
        class TextareaWithContent extends Component {
          render () {
            return <textarea value={this.props.data} />
          }
        }
        
        TextareaWithContent = wrapWithLoadData(TextareaWithContent, 'content')
        export default TextareaWithContent


   -- inputIndex.js:
              
        import InputWithUserName from './InputWithUserName'
        import TextareaWithContent from './InputWithUserName'
                           
        class InputIndex extends Component {
          render () {
            return (
              <div>
                用户名：<InputWithUserName />
                内 容: <TextareaWithContent />
              </div>
            )
          }
        }  
        
## 高阶组件的灵活性
   现在要的是通过 Ajax 加载数据而不是从 LocalStorage 加载数据。我们只需要新建一个 wrapWithAjaxData 高阶组件：
   
   -- wrapWithAjaxData.js:
   
        import React, { Component } from 'react'
        
        export default (WrappedComponent, name) => {
          class NewAjaxComponent extends Component {
            constructor () {
              super()
              this.state = { data: null }
            }
        
            componentWillMount () {
              ajax.get('/data/' + name, (data) => {
                this.setState({ data })
              })
            }
        
            render () {
              return <WrappedComponent data={this.state.data} />
            }
          }
          return NewAjaxComponent
        }
        
        
      其实就是改了一下 wrapWithLoadData 的 componentWillMount 中的逻辑，改成了从服务器加载数据。
      现在只需要把 InputWithUserName 稍微改一下：
      
      -- inputWithUserName.js: 
              import wrapWithAjaxData from './wrapWithAjaxData'
              
              ...
              ...
              
              InputWithUserName = wrapWithAjaxData(InputWithUserName, 'username')
              export default InputWithUserName
              
      -- TextareaWithContent.js: 
              import wrapWithAjaxData from './wrapWithAjaxData'
              
              ...
              ...
              
              InputWithUserName = wrapWithAjaxData(TextareaWithContent, 'username')
              export default TextareaWithContent
              
## 多层高阶组件
   
              
              
         
     