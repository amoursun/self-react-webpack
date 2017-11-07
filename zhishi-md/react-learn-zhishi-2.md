# react 学习总结

    import React, { Component } from 'react';
    class App extends Component {}
    
    如果没有{ Component } ,需要如下写法:
    import React from 'react';
    class App extends React.Component {}
    
## 列表  vs  Keys
   - 通过使用{}在JSX内构建一个元素集合
   - 当你创建一个元素时，必须包括一个特殊的key属性
   
#### - Keys
   - Keys可以在DOM中的某些元素被增加或删除的时候帮助React识别哪些元素发生了变化
   - 一个元素的key最好是这个元素在列表中拥有的一个独一无二的字符串,使用来自数据的id作为元素的key
   - 当元素没有确定的id时，你可以使用他的序列号索引index作为key
   - 如果列表可以重新排序，我们不建议使用索引来进行排序，因为这会导致渲染变得很慢
   - Keys应该是稳定的，可预测的，且唯一的。不稳定的key（类似由Math.random()生成的）将使得大量组件实例和DOM节点进行不必要的重建，使得性能下降并丢失子组件的状态
#### - 用keys提取组件
   - 当你在map()方法内部调用的元素时，你最好随时记得为每一个元素加上一个独一无二的key
    
            function ListItem(props) {
              // 对啦！这里不需要明确出key:
              return <li>{props.value}</li>;
            }
            
            function NumberList(props) {
              const numbers = props.numbers;
              const listItems = numbers.map((number) =>
                // 又对啦！key应该在数组中被明确出来
                <ListItem key={number.toString()}
                          value={number} />
              );
              return (
                <ul>
                  {listItems}
                </ul>
              );
            }

#### - 元素的key在他的兄弟元素之间应该唯一,然而，它们不需要是全局唯一的
   - 当我们生成两个不同的数组时，我们可以使用相同的键
   
            function Blog(props) {
              const sidebar = (
                <ul>
                  {props.posts.map((post) =>
                    <li key={post.id}>
                      {post.title}
                    </li>
                  )}
                </ul>
              );
              const content = props.posts.map((post) =>
                <div key={post.id}>
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                </div>
              );
              return (
                <div>
                  {sidebar}
                  <hr />
                  {content}
                </div>
              );
            }
            
            const posts = [
              {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
              {id: 2, title: 'Installation', content: 'You can install React from npm.'}
            ];
            ReactDOM.render(
              <Blog posts={posts} />,
              document.getElementById('root')
            );
   - key会作为给React的提示，但不会传递给你的组件。如果您的组件中需要使用和key相同的值，请将其作为属性传递：

            const content = posts.map((post) =>
              <Post
                key={post.id}
                id={post.id}
                title={post.title} />
            );
            
            Post组件可以读出props.id，但是不能读出props.key
            
#### - 在jsx中嵌入map()
        
        function NumberList(props) {
          const numbers = props.numbers;
          const listItems = numbers.map((number) =>
            <ListItem key={number.toString()}
                      value={number} />
          );
          return (
            <ul>
              {listItems}
            </ul>
          );
        }
   - JSX允许在大括号中嵌入任何表达式，所以我们可以在map()中这样使用
        
            function NumberList(props) {
              const numbers = props.numbers;
              return (
                <ul>
                  {numbers.map((number) =>
                    <ListItem key={number.toString()}
                              value={number} />
                  )}
                </ul>
              );
            }
            
   - 两种写法
            
            return (
                    <div>
                        {colors.map((number, index) =>
                            <ListItem key={index} value={number} />
                        )}
                    </div>
                );
                {/*两种写法
                    const ListItems = colors.map((color,index) =>
                        <ListItem key={index} value={color} />
                    );
                    return (
                        <ul>
                            {ListItems}
                        </ul>
                    );
                */}
            
## 表单
    当用户提交表单时，HTML的默认行为会使这个表单会跳转到一个新页面。
    在React中亦是如此。但大多数情况下，我们都会构造一个处理提交表单并可访问用户输入表单数据的函数。
    实现这一点的标准方法是使用一种称为“受控组件”的技术
    
#### - 受控组件
   - 在HTML当中，像input,textarea, 和select这类表单元素会维持自身状态，并根据用户输入进行更新
   - 在React中，可变的状态通常保存在组件的状态属性中，并且只能用 setState(),方法进行更新
   - React负责渲染表单的组件仍然控制用户后续输入时所发生的变化,其值由React控制的输入表单元素称为“受控组件”
   
###### textarea标签
   - 在React中，textarea会用value属性来代替。这样的话，表单中的textarea非常类似于使用单行输入的表单
   
###### select标签
   - Coconut选项最初由于selected属性是被选中的。在React中，会在根select标签上而不是在当前的selected属性上使用value属性
   
####### 总之，input, textarea, 和 <select> 都十分类似,他们都通过传入一个value属性来实现对组件的控制

#### - 多个输入的解决方法
   - 当你有处理多个受控的input元素时，你可以通过给每个元素添加一个name属性，来让处理函数根据 event.target.name
        
            class Reservation extends React.Component {
              constructor(props) {
                super(props);
                this.state = {
                  isGoing: true,
                  numberOfGuests: 2
                };
            
                this.handleInputChange = this.handleInputChange.bind(this);
              }
            
              handleInputChange(event) {
                const target = event.target;
                const value = target.type === 'checkbox' ? target.checked : target.value;
                const name = target.name;
            
                this.setState({
                  [name]: value
                });
              }
            
              render() {
                return (
                  <form>
                    <label>
                      Is going:
                      <input
                        name="isGoing"
                        type="checkbox"
                        checked={this.state.isGoing}
                        onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label>
                      Number of guests:
                      <input
                        name="numberOfGuests"
                        type="number"
                        value={this.state.numberOfGuests}
                        onChange={this.handleInputChange} />
                    </label>
                  </form>
                );
              }
            }
            
 - 如果我们想要使用ES6当中的computed property name语法来更新与给定输入名称相对应的状态键：
 
         this.setState({
           [name]: value
         });
 
 同样由于setState()自动将部分状态合并到当前状态,因此我们只需要在已经更改的部分调用它
 
 ### 表单相关(设置,提交校验 etc.)文档链接 
 ##### [https://segmentfault.com/a/1190000011135259]
 
## 状态提升
    使用 react 经常会遇到几个组件需要共用状态数据的情况。这种情况下，我们最好将这部分共享的状态提升至他们最近的父组件当中进行管理
    
        Cast.js
        
        - React在DOM原生组件<input>上调用指定的onChange函数。在本例中，指的是TemperatureInput组件上的handleChange函数。
        - TemperatureInput组件的handleChange函数会在值发生变化时调用this.props.onTemperatureChange()函数。这些props属性，
          像onTemperatureChange都是由父组件Calculator提供的。
        - 当最开始渲染时，Calculator组件把内部的handleCelsiusChange方法指定给摄氏输入组件TemperatureInput的onTemperatureChange方法，
          并且把handleFahrenheitChange方法指定给华氏输入组件TemperatureInput的onTemperatureChange。两个Calculator内部的方法都会在相应输入框被编辑时被调用。
        - 在这些方法内部，Calculator组件会让React使用编辑输入的新值和当前输入框的温标来调用this.setState()方法来重渲染自身。
        - React会调用Calculator组件的render方法来识别UI界面的样子。基于当前温度和温标，两个输入框的值会被重新计算。温度转换就是在这里被执行的。
        - 接着React会使用Calculator指定的新props来分别调用TemperatureInput组件.React也会识别出子组件的UI界面。
        - React DOM 会更新DOM来匹配对应的值。我们编辑的输入框获取新值，而另一个输入框则更新经过转换的温度值。
    
##### - 经验教训
        
        在React应用中，对应任何可变数据理应只有一个单一“数据源”。通常，状态都是首先添加在需要渲染数据的组件中。
        此时，如果另一个组件也需要这些数据，你可以将数据提升至离它们最近的父组件中。
        你应该在应用中保持 自上而下的数据流，而不是尝试在不同组件中同步状态。
        
        
        当你在开发UI界面遇到问题时，你可以使用  React开发者工具[https://github.com/facebook/react-devtools]来检查props属性，
        并且可以点击查看组件树，直到你找到负责目前状态更新的组件

## 组合 vs 继承
   React具有强大的组合模型，我们建议使用组合而不是继承来复用组件之间的代码
   
#### - 包含关系
   - 一些组件不能提前知道它们的子组件是什么,建议这些组件使用 children 属性将子元素直接传递到输出
   
            function FancyBorder(props) {
              return (
                <div className={'FancyBorder FancyBorder-' + props.color}>
                  {props.children}
                </div>
              );
            }
            
            function WelcomeDialog() {
              return (
                <FancyBorder color="blue">
                  <h1 className="Dialog-title">
                    Welcome
                  </h1>
                  <p className="Dialog-message">
                    Thank you for visiting our spacecraft!
                  </p>
                </FancyBorder>
              );
            }





 

                
                

      
      
      
      
      
      
      
      
      
      
      
      
      
