# react 组件生命周期

## constructor 
  - 所有关于组件自身的状态的初始化工作都会放在 constructor 里面去做

## componentWillMount 和 componentDidMount 
  - 都是可以像 render 方法一样自定义在组件的内部
    ### componentWillMount
      - React.js 会在组件的 render 之前调用 componentWillMount
      
            一些组件启动的动作，包括像 Ajax 数据的拉取操作、一些定时器的启动等，就可以放在 componentWillMount 里面进行
    ### componentDidMount
      - 在 DOM 元素塞入页面以后调用 componentDidMount
      
## componentWillUnmount
   - React.js 也控制了这个组件的删除过程。在组件删除之前 React.js 会调用组件定义的 componentWillUnmount
   
            componentWillUnmount 就可以派上用场了，它的作用就是在组件销毁的时候，做这种清场的工作。
            例如清除该组件的定时器和其他的数据清理工作。我们给 Clock 添加 componentWillUnmount，
            在组件销毁的时候清除该组件的定时器


## ** 更新阶段的组件生命周期

### shouldComponentUpdate(nextProps, nextState)：
  - 你可以通过这个方法控制组件是否重新渲染。如果返回 false 组件就不会重新渲染。这个生命周期在 React.js 性能优化上非常有用。
### componentWillReceiveProps(nextProps)：
  - 组件从父组件接收到新的 props 之前调用。
### componentWillUpdate()：
  - 组件开始重新渲染之前调用。
### componentDidUpdate()：
  - 组件重新渲染并且把更改变更到真实的 DOM 以后调用。










## 总结 

  - componentWillMount：组件挂载开始之前，也就是在组件调用 render 方法之前调用。
  - componentDidMount：组件挂载完成以后，也就是 DOM 元素已经插入页面后调用。
  - componentWillUnmount：组件对应的 DOM 元素从页面中删除之前调用。
  
          把组件的 state 的初始化工作放在 constructor 里面去做；
          在 componentWillMount 进行组件的启动工作，例如 Ajax 数据拉取、定时器的启动；
          组件从页面上销毁的时候，有时候需要一些数据的清理，例如定时器的清理，就会放在 componentWillUnmount 里面去做
          
  - shouldComponentUpdate(nextProps, nextState)：你可以通过这个方法控制组件是否重新渲染
     - 如果返回 false 组件就不会重新渲染。这个生命周期在 React.js 性能优化上非常有用。
  - componentWillReceiveProps(nextProps)：组件从父组件接收到新的 props 之前调用。
  - componentWillUpdate()：组件开始重新渲染之前调用。
  - componentDidUpdate()：组件重新渲染并且把更改变更到真实的 DOM 以后调用。






 