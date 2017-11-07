import React, { Component } from 'react';

export default class PropTypesContent extends Component {
    constructor(props) {
        super(props);

    };

    render() {
        return (
            <div className="main-proptype">
                <h4>
                    propTypes 属性：
                </h4>
                <ul>
                    <li>引入: import PropTypes from 'prop-types'</li>
                    <li>PropTypes 包含一整套验证器，可用于确保你接收的数据是有效的,并且propTypes 只在开发模式下进行检查</li>
                </ul>
                <h5>不同验证器的例子:</h5>
                <div className="gatsby-highlight">
                  <pre className="gatsby-code-jsx">
                      <code>
                          <div className="content">
                             <span className="token keyword">import</span> PropTypes <span className="token keyword">from</span> <span className="token string">'prop-types'</span><span className="token punctuation">;</span>
                          </div>
                          <div  className="content">
                             MyComponent<span className="token punctuation">.</span>propTypes <span className="token operator">=</span> <span className="token punctuation">&#123;</span>
                          </div>
                          <div className="content-one">
                              <div  className="content"><span className="token zhu-shi">// 你可以将属性声明为以下 JS 原生类型</span></div>
                              <div  className="content">optionalArray<span className="token punctuation">:</span> PropTypes<span className="token punctuation">.</span>array<span className="token punctuation">,</span></div>
                              <div  className="content">optionalBool<span className="token punctuation">:</span> PropTypes<span className="token punctuation">.</span>bool<span className="token punctuation">,</span></div>
                              <div  className="content">optionalFunc<span className="token punctuation">:</span> PropTypes<span className="token punctuation">.</span>func<span className="token punctuation">,</span></div>
                              <div  className="content">optionalNumber<span className="token punctuation">:</span> PropTypes<span className="token punctuation">.</span>number<span className="token punctuation">,</span></div>
                              <div  className="content">optionalObject<span className="token punctuation">:</span> PropTypes<span className="token punctuation">.</span>object<span className="token punctuation">,</span></div>
                              <div  className="content">optionalString<span className="token punctuation">:</span> PropTypes<span className="token punctuation">.</span>string<span className="token punctuation">,</span></div>
                              <div  className="content">optionalSymbol<span className="token punctuation">:</span> PropTypes<span className="token punctuation">.</span>symbol<span className="token punctuation">,</span></div>

                              <div  className="content"><span className="token zhu-shi" >// 任何可被渲染的元素（包括数字、字符串、子元素或数组）。</span></div>
                              <div  className="content">optionalNode<span className="token punctuation">:</span> PropTypes<span className="token punctuation">.</span>node<span className="token punctuation">,</span></div>
                              <div  className="content"><span className="token zhu-shi" >// 一个 React 元素</span></div>
                              <div  className="content">optionalElement<span className="token punctuation">:</span> PropTypes<span className="token punctuation">.</span>element<span className="token punctuation">,</span></div>
                              <div  className="content"><span className="token zhu-shi" >// 你也可以声明属性为某个类的实例，这里使用 JS 的</span></div>
                              <div  className="content"><span className="token zhu-shi" >// instanceof 操作符实现。</span></div>
                              <div  className="content">optionalMessage<span className="token punctuation">:</span> PropTypes<span className="token punctuation">.</span><span className="token function">instanceOf</span><span className="token punctuation">(</span>Message<span className="token punctuation">)</span><span className="token punctuation">,</span></div>
                              <div  className="content"><span className="token zhu-shi" >// 你也可以限制你的属性值是某个特定值之一</span></div>
                              <div  className="content">optionalEnum<span className="token punctuation">:</span> PropTypes<span className="token punctuation">.</span><span className="token function">oneOf</span><span className="token punctuation">(</span><span className="token punctuation">[</span><span className="token string">'News'</span><span className="token punctuation">,</span> <span className="token string">'Photos'</span><span className="token punctuation">]</span><span className="token punctuation">)</span><span className="token punctuation">,</span></div>
                              <div  className="content"><span className="token zhu-shi" >// 限制它为列举类型之一的对象</span></div>
                              <div  className="content">optionalUnion<span className="token punctuation">:</span> PropTypes<span className="token punctuation">.</span><span className="token function">oneOfType</span><span className="token punctuation">(</span><span className="token punctuation">[</span></div>
                              <div className="content-two">
                                  <div  className="content">PropTypes<span className="token punctuation">.</span>string<span className="token punctuation">,</span></div>
                                  <div  className="content">PropTypes<span className="token punctuation">.</span>number<span className="token punctuation">,</span></div>
                                  <div  className="content">PropTypes<span className="token punctuation">.</span><span className="token function">instanceOf</span><span className="token punctuation">(</span>Message<span className="token punctuation">)</span></div>
                              </div>
                              <div  className="content"><span className="token punctuation">]</span><span className="token punctuation">)</span><span className="token punctuation">,</span></div>
                                  <div  className="content"><span className="token zhu-shi" >// 一个指定元素类型的数组</span></div>
                              <div  className="content">optionalArrayOf<span className="token punctuation">:</span> PropTypes<span className="token punctuation">.</span><span className="token function">arrayOf</span><span className="token punctuation">(</span>PropTypes<span className="token punctuation">.</span>number<span className="token punctuation">)</span><span className="token punctuation">,</span></div>
                              <div  className="content"><span className="token zhu-shi" >// 一个指定类型的对象</span></div>
                               <div  className="content">optionalObjectOf<span className="token punctuation">:</span> PropTypes<span className="token punctuation">.</span><span className="token function">objectOf</span><span className="token punctuation">(</span>PropTypes<span className="token punctuation">.</span>number<span className="token punctuation">)</span><span className="token punctuation">,</span></div>
                              <div  className="content"><span className="token zhu-shi" >// 一个指定属性及其类型的对象</span></div>
                              <div  className="content">optionalObjectWithShape<span className="token punctuation">:</span> PropTypes<span className="token punctuation">.</span><span className="token function">shape</span><span className="token punctuation">(</span><span className="token punctuation">&#123;</span></div>
                              <div className="content-two">
                                  <div  className="content">color<span className="token punctuation">:</span> PropTypes<span className="token punctuation">.</span>string<span className="token punctuation">,</span></div>
                                  <div  className="content">fontSize<span className="token punctuation">:</span> PropTypes<span className="token punctuation">.</span>number</div>
                              </div>
                              <div  className="content"><span className="token punctuation">}</span><span className="token punctuation">)</span><span className="token punctuation">,</span></div>

                              <div  className="content"><span className="token zhu-shi" >// 你也可以在任何 PropTypes 属性后面加上 `isRequired` </span></div>
                                  <div  className="content"><span className="token zhu-shi" >// 后缀，这样如果这个属性父组件没有提供时，会打印警告信息</span></div>
                                  <div  className="content">requiredFunc<span className="token punctuation">:</span> PropTypes<span className="token punctuation">.</span>func<span className="token punctuation">.</span>isRequired<span className="token punctuation">,</span></div>

                                  <div  className="content"><span className="token zhu-shi" >// 任意类型的数据</span></div>
                                  <div  className="content">requiredAny<span className="token punctuation">:</span> PropTypes<span className="token punctuation">.</span>any<span className="token punctuation">.</span>isRequired<span className="token punctuation">,</span></div>

                                  <div  className="content"><span className="token zhu-shi" >// 你也可以指定一个自定义验证器。它应该在验证失败时返回</span></div>
                                  <div  className="content"><span className="token zhu-shi" >// 一个 Error 对象而不是 `console.warn` 或抛出异常。</span></div>
                                  <div  className="content"><span className="token zhu-shi" >// 不过在 `oneOfType` 中它不起作用。</span></div>
                                  <div  className="content">customProp<span className="token punctuation">:</span> <span className="token keyword">function</span><span className="token punctuation">(</span>props<span className="token punctuation">,</span> propName<span className="token punctuation">,</span> componentName<span className="token punctuation">)</span> <span className="token punctuation">&#123;</span></div>
                                  <div className="content-two">
                                      <div  className="content"><span className="token keyword">if</span> <span className="token punctuation">(</span><span className="token operator">!</span><span className="token regex">/matchme/</span><span className="token punctuation">.</span><span className="token function">test</span><span className="token punctuation">(</span>props<span className="token punctuation">[</span>propName<span className="token punctuation">]</span><span className="token punctuation">)</span><span className="token punctuation">)</span> <span className="token punctuation">&#123;</span></div>
                                      <div className="content-three">
                                          <div  className="content"><span className="token keyword">return</span> <span className="token keyword">new</span> <span className="token className-name">Error</span><span className="token punctuation">(</span></div>
                                          <div className="content-four">
                                              <div  className="content">'Invalid prop <span className="token template-string"><span className="token string">`' + propName + '`</span></span> supplied to' <span className="token operator">+</span></div>
                                              <div  className="content">' <span className="token template-string"><span className="token string">`' + componentName + '`</span></span><span className="token punctuation">.</span> Validation failed<span className="token punctuation">.</span>'</div>
                                          </div>
                                          <div  className="content"><span className="token punctuation">)</span><span className="token punctuation">;</span></div>
                                      </div>
                                      <div  className="content"><span className="token punctuation">}</span></div>
                                  </div>
                                  <div  className="content"><span className="token punctuation">}</span><span className="token punctuation">,</span></div>

                                      <div  className="content"> <span className="token zhu-shi" >// 不过你可以提供一个自定义的 `arrayOf` 或 `objectOf` </span></div>
                                 <div  className="content"><span className="token zhu-shi" >// 验证器，它应该在验证失败时返回一个 Error 对象。 它被用</span></div>
                                  <div  className="content"><span className="token zhu-shi" >// 于验证数组或对象的每个值。验证器前两个参数的第一个是数组</span></div>
                                  <div  className="content"><span className="token zhu-shi" >// 或对象本身，第二个是它们对应的键。</span></div>
                                  <div  className="content">customArrayProp<span className="token punctuation">:</span> PropTypes<span className="token punctuation">.</span><span className="token function">arrayOf</span><span className="token punctuation">(</span><span className="token keyword">function</span><span className="token punctuation">(</span>propValue<span className="token punctuation">,</span> key<span className="token punctuation">,</span> componentName<span className="token punctuation">,</span> location<span className="token punctuation">,</span> propFullName<span className="token punctuation">)</span> <span className="token punctuation">&#123;</span></div>
                                  <div className="content-two">
                                      <div  className="content"><span className="token keyword">if</span> <span className="token punctuation">(</span><span className="token operator">!</span><span className="token regex">/matchme/</span><span className="token punctuation">.</span><span className="token function">test</span><span className="token punctuation">(</span>propValue<span className="token punctuation">[</span>key<span className="token punctuation">]</span><span className="token punctuation">)</span><span className="token punctuation">)</span> <span className="token punctuation">&#123;</span></div>
                                      <div className="content-three">
                                          <div  className="content"><span className="token keyword">return</span> <span className="token keyword">new</span> <span className="token className-name">Error</span><span className="token punctuation">(</span></div>
                                          <div className="content-four">
                                              <div  className="content">'Invalid prop <span className="token template-string"><span className="token string">`' + propFullName + '`</span></span> supplied to' <span className="token operator">+</span></div>
                                              <div  className="content">' <span className="token template-string"><span className="token string">`' + componentName + '`</span></span><span className="token punctuation">.</span> Validation failed<span className="token punctuation">.</span>'</div>
                                              <div  className="content"><span className="token punctuation">)</span><span className="token punctuation">;</span></div>
                                          </div>
                                          <div  className="content"><span className="token punctuation">}</span></div>
                                      </div>
                                  </div>
                                  <div  className="content"><span className="token punctuation">}</span><span className="token punctuation">;</span></div>
                          </div>
                      </code>
                  </pre>
                </div>
                <h5>限制单个子代:</h5>
                <ul>
                    <li>使用 PropTypes.element 你可以指定只传递一个子代</li>
                    <li>MyComponent.propTypes = &#123;</li>
                    <li className="ml_25">children: PropTypes.element.isRequired</li>
                    <li>};</li>
                </ul>
                <h5>属性默认值:</h5>
                <ul>
                    <li>你可以通过配置 defaultProps 为 props定义默认值：</li>
                    <li>class Greeting extends React.Component &#123; ... };</li>
                    <li>为属性指定默认值: Greeting.defaultProps = &#123; name: 'Stranger' };</li>
                    <li>defaultProps 在class 组件外</li>
                </ul>
            </div>

        )
    }
}



