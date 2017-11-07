# react 学习总结

    import React, { Component } from 'react';
    class App extends Component {}
    
    如果没有{ Component } ,需要如下写法:
    import React from 'react';
    class App extends React.Component {}
    
## JSX

- JSX 只是为 React.createElement(component, props, ...children) 方法提供的语法糖
        
        <MyButton color="blue" shadowSize={2}>
          Click Me
        </MyButton>
        编译为:
        React.createElement(
          MyButton,
          {color: 'blue', shadowSize: 2},   //无时为null
          'Click Me'                        // 无时为null
        )
        
- 指定 React 元素类型: JSX的标签名决定了 React 元素的类型,大写开头的 JSX 标签表示一个 React 组件
    - 这些标签将会被编译为同名变量并被引用，所以如果你使用了 <Foo /> 表达式，则必须在作用域中先声明 Foo 变量
    - React 必须声明: SX 编译后会调用 React.createElement 方法，所以在你的 JSX 代码中必须首先声明 React 变量
    - 点表示法
    
            import React from 'react';
            const MyComponents = {
              DatePicker: function DatePicker(props) {
                return <div>Imagine a {props.color} datepicker here.</div>;
              }
            }
            function BlueDatePicker() {
              return <MyComponents.DatePicker color="blue" />;
            }
    - 首字母大写
    
            import React from 'react';
            // 正确！组件名应该首字母大写:
            function Hello(props) {
              // 正确！div 是有效的 HTML 标签:
              return <div>Hello {props.toWhat}</div>;
            }
            function HelloWorld() {
              // 正确！React 能够将大写开头的标签名认为是 React 组件。
              return <Hello toWhat="World" />;
            }
            
     - 在运行时选择类型 : 不能使用表达式来作为 React 元素的标签
     
            import React from 'react';
            import { PhotoStory, VideoStory } from './stories';
            const components = {
              photo: PhotoStory,
              video: VideoStory
            };
            function Story(props) {
              // 错误！JSX 标签名不能为一个表达式。
              return <components[props.storyType] story={props.story} />;
            }
            //需要先将类型赋值给大写开头的变量
            function Story(props) {
              // 正确！JSX 标签名可以为大写开头的变量。
              const SpecificStory = components[props.storyType];
              return <SpecificStory story={props.story} />;
            }
            
      - 属性: JSX 中有几种不同的方式来指定属性
         - 使用 JavaScript 表达式
         
                if 语句和 for 循环在 JavaScript 中不是表达式，因此它们不能直接在 JSX 中使用，所以你可以将它们放在周围的代码中
                function NumberDescriber(props) {
                  let description;
                  if (props.number % 2 == 0) {
                    description = <strong>even</strong>;
                  } else {
                    description = <i>odd</i>;
                  }
                  return <div>{props.number} is an {description} number</div>;
                }
            
         - 字符串常量
                    
                 //等价
                 <MyComponent message="hello world" />
                 <MyComponent message={'hello world'} />
                 
         - 默认为 True
         
                <MyTextBox autocomplete />
                <MyTextBox autocomplete={true} />
         - 扩展属性: props 对象，并且想在 JSX 中传递它，你可以使用 ... 作为扩展操作符来传递整个属性对象。下面两个组件是等效的
         
                function App1() {
                  return <Greeting firstName="Ben" lastName="Hector" />;
                }
                function App2() {
                  const props = {firstName: 'Ben', lastName: 'Hector'};
                  return <Greeting {...props} />;
                }
                
      - 子代: 在包含开始和结束标签的 JSX 表达式中，标记之间的内容作为特殊的参数传递：props.children
          - 字符串常量
          - JSX
          
                你可以通过子代嵌入更多的 JSX 元素，这对于嵌套显示组件非常有用：
                <MyContainer>
                  <MyFirstComponent />
                  <MySecondComponent />
                </MyContainer>
          - JavsScript 表达式
          
                你可以将任何 {} 包裹的 JavaScript 表达式作为子代传递: 
                <MyComponent>foo</MyComponent>
                <MyComponent>{'foo'}</MyComponent>
                
                这对于渲染任意长度的 JSX 表达式的列表很有用。例如，下面将会渲染一个 HTML 列表：
                function Item(props) {
                  return <li>{props.message}</li>;
                }
                function TodoList() {
                  const todos = ['finish doc', 'submit pr', 'nag dan to review'];
                  return (
                    <ul>
                      {todos.map((message) => <Item key={message} message={message} />)}
                    </ul>
                  );
                }
                
                JavsScript 表达式可以与其他类型的子代混合使用: 
                function Hello(props) {
                  return <div>Hello {props.addressee}!</div>;
                }
                
          - 函数
          
                通常情况下，插入 JSX 中的 JavsScript 表达式将被认作字符串、React 元素或这些内容的列表。
                然而，props.children 可以像其它属性一样传递任何数据，而不仅仅是 React 元素。
                例如，如果你使用自定义组件，则可以将调用 props.children 来获得传递的子代：
                
                function Repeat(props) {
                  let items = [];
                  for (let i = 0; i < props.numTimes; i++) {
                    items.push(props.children(i));
                  }
                  return <div>{items}</div>;
                }
                
                function ListOfTenThings() {
                  return (
                    <Repeat numTimes={10}>
                      {(index) => <div key={index}>This is item {index} in the list</div>}
                    </Repeat>
                  );
                }
                
                传递给自定义组件的子代可以是任何元素，只要该组件在 React 渲染前将其转换成 React 能够理解的东西
                
          - 布尔值、Null 和 Undefined 被忽略
            
               - false、null、undefined 和 true 都是有效的子代，但它们不会直接被渲染.下面的表达式是等价的：
                
                <div />
                <div></div>
                <div>{false}</div>
                <div>{null}</div>
                <div>{undefined}</div>
                <div>{true}</div>
                
                当showHeader 为true时,只渲染<Header />
                <div>
                  {showHeader && <Header />}
                  <Content />
                </div>
                
               - React 提供了一些 "falsy" 值 （即， 除了false 外，0，“”，null，undefined 和 NaN），它们依然会被渲染)
                
                <div>
                  {props.messages.length &&
                    <MessageList messages={props.messages} />
                  }
                </div>
                要解决这个问题，请确保 && 前面的表达式始终为布尔值：
                
                <div>
                  {props.messages.length > 0 &&
                    <MessageList messages={props.messages} />
                  }
                </div>
                
               - 相反，如果你想让类似 false、true、null 或 undefined 出现在输出中，你必须先把它转[换成字符串]=[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#String_conversion]
                    String(myVariable)
                    
                    
## 元素渲染
- 将元素渲染到 DOM 中
    - ReactDOM.render()
- 更新元素渲染
    - React 元素都是immutable 不可变的。当元素被创建之后，你是无法改变其内容或属性的
- React 只会更新必要的部分
    - React DOM 首先会比较元素内容先后的不同，而在渲染过程中只会更新改变了的部分
    
## 组件 & Props
   - 组件可以将UI切分成一些的独立的、可复用的部件
   - 组件可以接收任意的输入值（props），并返回一个需要在页面上展示的React元素

#### - 函数定义/类定义组件
   - 使用JavaScript函数 : 
            
            function Welcome(props) { return <h1>Hello, {props.name}</h1>;}
   - 使用 ES6 class 来定义一个组件 : 
        
            class Welcome extends React.Component { 
                render() { return <h1>Hello, {this.props.name}</h1>;}
            }
            
#### - 组件渲染
   - 当React遇到的元素是用户自定义的组件，它会将JSX属性作为单个对象传递给该组件,这个对象称之为“props”
#### - 组合组件
   - 组件可以在它的输出中引用其它组件, React应用中，按钮、表单、对话框、整个屏幕的内容等，这些通常都被表示为组件
#### - 提取组件 => 提取更小的组件方便复用
   - 这个组件接收author(对象)、text(字符串)、以及date(Date对象)作为props
    
            function Comment(props) {
              return (
                <div className="Comment">
                  <div className="UserInfo">
                    <img className="Avatar"
                      src={props.author.avatarUrl}
                      alt={props.author.name}
                    />
                    <div className="UserInfo-name">
                      {props.author.name}
                    </div>
                  </div>
                  <div className="Comment-text">
                    {props.text}
                  </div>
                  <div className="Comment-date">
                    {formatDate(props.date)}
                  </div>
                </div>
              );
            }
            
#### - Props的性质
   - 只读性
        - 无论是使用函数或是类来声明一个组件，它决不能修改它自己的props


## State & 生命周期
链接[https://fraserxu.me/2014/08/31/react-component-lifecycle/]
  - componentWillMount 会在组件render之前执行，并且永远都只执行一次
  - componentDidMount 会在组件加载完毕之后立即执行。在这个时候之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问
  - 组件更新: componentWillReceiveProps
    - componentWillReceiveProps(object nextProps)在组件接收到一个新的prop时被执行。这个方法在初始化render时不会被调用。
  - 组件更新: shouldComponentUpdate
    - boolean shouldComponentUpdate(object nextProps, object nextState)
    - 返回一个布尔值。在组件接收到新的props或者state时被执行。在初始化时或者使用forceUpdate时不被执行
    - 如果shouldComponentUpdate返回false, render()则会在下一个state change之前被完全跳过。
    - (另外componentWillUpdate和 componentDidUpdate也不会被执行)
    - 默认情况下shouldComponentUpdate会返回true







   - 将函数转换为类
     - Clock 现在被定义为一个类而不只是一个函数
     - 使用类就允许我们使用其它特性，例如局部状态、生命周期钩子
      
      你可以通过5个步骤将函数组件 Clock 转换为类
        - 创建一个名称扩展为 React.Component(Component) 的ES6 类
        - 创建一个叫做render()的空方法
        - 将函数体移动到 render() 方法中
        - 在 render() 方法中，使用 this.props 替换 props
        - 删除剩余的空函数声明
        
                class Clock extends React.Component {
                  render() {
                    return (
                      <div>
                        <h1>Hello, world!</h1>
                        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
                      </div>
                    );
                  }
                }
                
#### - 为一个类添加局部状态
   1) 在 render() 方法中使用 this.state.date 替代 this.props.date
   
            class Clock extends React.Component {
              render() {
                return (
                  <div>
                    <h1>Hello, world!</h1>
                    <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
                  </div>
                );
              }
            }
   2) 添加一个类构造函数来初始化状态 this.state
   
            class Clock extends React.Component {
              constructor(props) {
                super(props);
                this.state = {date: new Date()};
              }
            
              render() {
                return (
                  <div>
                    <h1>Hello, world!</h1>
                    <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
                  </div>
                );
              }
            }
            
            传递 props 到基础构造函数的：
            
              constructor(props) {
                super(props);
                this.state = {date: new Date()};
              }
            类组件应始终使用props调用基础构造函数
   3) 从 <Clock /> 元素移除 date 属性
   
#### - 将生命周期方法添加到类中
   - componentDidMount() 钩子建立定时器
   - componentWillUnmount（）生命周期钩子中卸载计时器
   - 它将使用 this.setState() 来更新组件局部状态
   
            class App extends Component {
                constructor(props) {//构造函数是唯一能够初始化 this.state 的地方
                    super(props);
                    this.state = {date: new Date()}
                }
            
                componentDidMount() {
                    this.timerID = setInterval(
                        () => this.tick(),
                        1000
                    );
                }
            
                componentWillUnmount() {
                    clearInterval(this.timerID);
                }
            
                tick() {
                    this.setState({
                        date: new Date()
                    });
                }
            
                render() {
                    return (
                        <div className="App">
                            <AppHeader/>
                            <h1>Hello, world! It is {this.state.date.toLocaleTimeString()}</h1>
                            <h1> Hello, {formatName(user)}!</h1>
                            <Welcome name="this is first props"/>
                            <Welcome name="this is second props"/>
                            <Welcome name="this is third props"/>
                            <Comment date={comment.date} text={comment.text} author={comment.author}/>
                        </div>
                    );
                }
            }
            
#### - 正确地使用状态
   - setState()
        - 不要直接更新状态
            - this.state.comment = 'Hello'; //不会重新渲染组件
            - this.setState({comment: 'Hello'});//应当使用 setState() 会
        - 状态更新可能是异步的
            - React 可以将多个setState() 调用合并成一个调用来提高性能
            - this.props 和 this.state 可能是异步更新的
                - 无法更新
                
                      this.setState({
                        counter: this.state.counter + this.props.increment,
                      });
                - 要修复它，请使用第二种形式的 setState() 来接受一个函数而不是一个对象。
                    - 参数1: 接收先前的状态
                    - 参数2: 需要更新的值
                      
                          this.setState((prevState, props) => ({
                            counter: prevState.counter + props.increment
                          }));
        - 状态更新合并
            - 当你调用 setState() 时，React 将你提供的对象合并到当前状态
            
            
## 事件处理
   - React事件绑定属性的命名采用驼峰式写法，而不是小写。
   - 如果采用 JSX 的语法你需要传入一个函数作为事件处理函数，而不是一个字符串(DOM元素的写法)
   - 方法必须: this.handleClick = this.handleClick.bind(this);
        
            constructor(props) {
                super(props);
                this.state = {isToggleOn: true};
            
                // This binding is necessary to make `this` work in the callback
                this.handleClick = this.handleClick.bind(this);
              }
              
## 条件渲染
- React 中的条件渲染和 JavaScript 中的一致，使用 JavaScript 操作符 if 或条件运算符来创建表示
当前状态的元素，然后让 React 根据它们来更新 UI
        
            function Greeting(props) {
              const isLoggedIn = props.isLoggedIn;
              if (isLoggedIn) {
                return <UserGreeting />;
              }
              return <GuestGreeting />;
            }
            
#### - 元素变量

         class LoginControl extends React.Component {
           constructor(props) {
             super(props);
             this.handleLoginClick = this.handleLoginClick.bind(this);
             this.handleLogoutClick = this.handleLogoutClick.bind(this);
             this.state = {isLoggedIn: false};
           }
         
           handleLoginClick() {
             this.setState({isLoggedIn: true});
           }
         
           handleLogoutClick() {
             this.setState({isLoggedIn: false});
           }
         
           render() {
             const isLoggedIn = this.state.isLoggedIn;
         
             let button = null;
             if (isLoggedIn) {
               button = <LogoutButton onClick={this.handleLogoutClick} />;//button
             } else {
               button = <LoginButton onClick={this.handleLoginClick} />;
             }
         
             return (
               <div>
                 <Greeting isLoggedIn={isLoggedIn} />
                 {button}
               </div>
             );
           }
         }

#### - 与运算符 &&

        function Mailbox(props) {
          const unreadMessages = props.unreadMessages;
          return (
            <div>
              <h1>Hello!</h1>
              {unreadMessages.length > 0 &&
                <h2>
                  You have {unreadMessages.length} unread messages.
                </h2>
              }
            </div>
          );
        }
        
#### - 三目运算符 : 条件运算符 condition ? true : false

        render() {
          const isLoggedIn = this.state.isLoggedIn;
          return (
            <div>
              The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
            </div>
          );
        }
        
#### - 阻止组件渲染
   - 组件的 render 方法返回 null 并不会影响该组件生命周期方法的回调。
   例如，componentWillUpdate 和 componentDidUpdate 依然可以被调用
   
            function WarningBanner(props) {
              if (!props.warn) {
                return null;
              }
            
              return (
                <div className="warning">
                  Warning!
                </div>
              );
            }
            
            class Page extends React.Component {
              constructor(props) {
                super(props);
                this.state = {showWarning: true}
                this.handleToggleClick = this.handleToggleClick.bind(this);
              }
            
              handleToggleClick() {
                this.setState(prevState => ({
                  showWarning: !prevState.showWarning
                }));
              }
            
              render() {
                return (
                  <div>
                    <WarningBanner warn={this.state.showWarning} />
                    <button onClick={this.handleToggleClick}>
                      {this.state.showWarning ? 'Hide' : 'Show'}
                    </button>
                  </div>
                );
              }
            }



    


 

                
                

      
      
      
      
      
      
      
      
      
      
      
      
      
