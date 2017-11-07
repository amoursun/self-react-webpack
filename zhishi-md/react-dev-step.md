# react 学习总结

## 第一步：把 UI 划分出组件层级
## 第二步：用 React 创建一个静态版本
## 第三步：定义 UI 状态的最小(但完整)表示
        
        让我们来看看每一条，找出哪一个是 state。每个数据只要考虑三个问题：
        
        它是通过 props 从父级传来的吗？如果是，他可能不是 state。
        它随着时间推移不变吗？如果是，它可能不是 state。
        你能够根据组件中任何其他的 state 或 props 把它计算出来吗？如果是，它不是 state。
        原产品列表被作为 props 传入，所以它不是 state。搜索文本和复选框似乎是 state，
        因为它们随时间改变并且不能由其他任何值计算出来。最后，产品的筛选列表不是 state，
        因为它可以通过将原始产品列表与搜索文本和复选框的值组合计算出来。
        
        最后，我们的 state 有：
        
        用户输入的搜索文本
        复选框的值
## 第四步：确定你的 State 应该位于哪里

        对你应用的每一个 state：
        
        确定每一个需要这个 state 来渲染的组件。
        找到一个公共所有者组件(一个在层级上高于所有其他需要这个 state 的组件的组件)
        这个公共所有者组件或另一个层级更高的组件应该拥有这个 state。
        如果你没有找到可以拥有这个 state 的组件，创建一个仅用来保存状态的组件并把它加入比这个公共所有者组件层级更高的地方。
        让我们用这个策略分析我们的应用：
        
        ProductTable 需要根据 state 过滤产品列表，SearchBar 需要展示搜索文本和复选框状态。
        公共所有者组件是 FilterableProductTable。
        筛选文本和复选框的值应该放在 FilterableProductTable。
        很酷，所以我们决定把 state 放在 FilterableProductTable。
        首先，为 FilterableProductTable 的 constructor 添加一个实例属性 this.state = {filterText: '', inStockOnly: false} 来表示我们应用的初始状态。
        接下来，把 filterText 和 inStockOnly 作为 prop 传入 ProductTable 和 SearchBar。最后在 ProductTable 中使用这些 props 来筛选每行产品信息，在 SearchBar 中设置表单域的值
## 第五步：添加反向数据流




# React高级指引
## 使用PropTypes检查数据类型
## Refs VS DOM
- 某些情况下你需要在典型数据流外强制修改子代。要修改的子代可以是 React 组件实例，也可以是 DOM 元素
- 何时使用 Refs,下面是几个适合使用 refs 的情况：
  - 处理焦点、文本选择或媒体控制。
  - 触发强制动画。
  - 集成第三方 DOM 库
  
  如果可以通过声明式实现，则尽量避免使用 refs。
  
  例如，不要在 Dialog 组件上直接暴露 open() 和 close() 方法，最好传递 isOpen 属性
  
- 不要过度使用 Refs
  - 首先会想到在你的应用程序中使用 refs 来更新组件,在组件层中，通常较高级别的 state 更为清晰
  - 示例请看 [##状态提升##]

- 为 DOM 元素添加 Ref
  - React 支持给任意组件添加特殊属性。ref 属性接受一个回调函数，它在组件被加载或卸载时会立即执行
  - 当给 HTML 元素添加 ref 属性时，ref 回调接收了底层的 DOM 元素作为参数
  - React 组件在加载时将 DOM 元素传入 ref 的回调函数，在卸载时则会传入 null
  
        例如，下面的代码使用 ref 回调来存储 DOM 节点的引用
        class CustomTextInput extends React.Component {
          constructor(props) {
            super(props);
            this.focus = this.focus.bind(this);
          }
        
          focus() {
            // 直接使用原生 API 使 text 输入框获得焦点
            this.textInput.focus();
          }
        
          render() {
            // 使用 `ref` 的回调将 text 输入框的 DOM 节点存储到 React 
            // 实例上（比如 this.textInput）
            return (
              <div>
                <input
                  type="text"
                  ref={(input) => { this.textInput = input; }} />
                <input
                  type="button"
                  value="Focus the text input"
                  onClick={this.focus}
                />
              </div>
            );
          }
        }

- 为类组件添加 Ref
  - 当 ref 属性用于使用 class 声明的自定义组件时，ref 的回调接收的是已经加载的 React 实例
  - 需要注意的是，这种方法仅对 class 声明的 CustomTextInput 有效
  
        例如，如果我们想修改 CustomTextInput 组件，实现它在加载后立即点击的效果：
        class AutoFocusTextInput extends React.Component {
          componentDidMount() {
            this.textInput.focus();
          }
        
          render() {
            return (
              <CustomTextInput
                ref={(input) => { this.textInput = input; }} />
            );
          }
        }

- Refs 与函数式组件
  - 你不能在函数式组件上使用 ref 属性，因为它们没有实例
  - 如果你想使用 ref，就像你想使用生命周期方法或者 state 一样，应该将其转换为 class 组件
  - 你可以在函数式组件内部使用 ref，只要它指向一个 DOM 元素或者 class 组件
  
        function CustomTextInput(props) {
          // 这里必须声明 textInput，这样 ref 回调才可以引用它
          let textInput = null;
        
          function handleClick() {
            textInput.focus();
          }
        
          return (
            <div>
              <input
                type="text"
                ref={(input) => { textInput = input; }} />
              <input
                type="button"
                value="Focus the text input"
                onClick={handleClick}
              />
            </div>
          );  
        }
        
        无效的:
        function MyFunctionalComponent() {
          return <input />;
        }
        
        class Parent extends React.Component {
          render() {
            // 这里 `ref` 无效！
            return (
              <MyFunctionalComponent
                ref={(input) => { this.textInput = input; }} />
            );
          }
        }

- 对父组件暴露 DOM 节点
  - 向子组件添加 ref,不好，因为你只能获取组件实例而不是 DOM 节点,它还在函数式组件上无效
  - 建议在子节点上暴露一个特殊的属性。子节点将会获得一个函数属性，并将其作为 ref 属性附加到 DOM 节点。
    这允许父代通过中间件将 ref 回调给子代的 DOM 节点(适用于类组件和函数式组件)
    
        function CustomTextInput(props) {
          return (
            <div>
              <input ref={props.inputRef} />
            </div>
          );
        }
        
        class Parent extends React.Component {
          render() {
            return (
              <CustomTextInput
                inputRef={el => this.inputElement = el}
              />
            );
          }
        }
        在上面的例子中，Parent 将它的 ref 回调作为一个特殊的 inputRef 传递给 CustomTextInput，
        然后 CustomTextInput 通过 ref 属性将其传递给 <input>。最终，Parent 中的 this.inputElement 
        将被设置为与 CustomTextInput 中的 <input> 元素相对应的 DOM 节点。
        请注意，上述示例中的 inputRef 属性没有特殊的含义，它只是一般的组件属性。然而，使用 <input> 本身的 ref 属性很重要
        ,因为它告诉 React 将 ref 附加到它的 DOM 节点。
        即使 CustomTextInput 是一个函数式组件，它也同样有效。与只能为 DOM 元素和 class 组件指定的 ref 不同，
        诸如 inputRef 这种自定义的组件属性则没有限制。
        这种模式的另一个好处是它能作用很深。假如有个 Parent 组件不需要 DOM 节点 A，但是某个渲染 Parent 的组件（我们称之为 Grandparent）需要通过它访问.
        
        这时我们可以让 Grandparent 传递 inputRef 给 Parent 组件，然后让 Parent 组件将其转发给 CustomTextInput:
        
        function CustomTextInput(props) {
          return (
            <div>
              <input ref={props.inputRef} />
            </div>
          );
        }
        
        function Parent(props) {
          return (
            <div>
              My input: <CustomTextInput inputRef={props.inputRef} />
            </div>
          );
        }
        
        
        class Grandparent extends React.Component {
          render() {
            return (
              <Parent
                inputRef={el => this.inputElement = el}
              />
            );
          }
        }
        上面的例子中，Grandparent 首先指定了 ref 回调函数。它通过一个常规的 inputRef 属性被传递到 Parent，Parent 也同样把它传递给了 CustomTextInput。
        最后 CustomTextInput 读取了 inputRef 属性并将传递的函数作为 ref 属性附加到 <input>。
        最终，Grandparent 中的 this.inputElement 被设置为 CustomTextInput 的 input 对应的 DOM 节点
     
  - 总而言之，我们建议尽可能不暴露 DOM 节点，但这是一个有用的解决方式。
  - 请注意，此方法要求您向子组件添加一些代码，如果你无法完全控制子组件，最后的办法是使用 findDOMNode()，但是不推荐这样做
  



















































