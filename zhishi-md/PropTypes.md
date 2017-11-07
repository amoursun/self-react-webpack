##使用 PropTypes

 - 必须写PropTypes，不要为了省事而不写
 - React.PropTypes主要用来验证组件接收到的props是否为正确的数据类型，如果不正确，console中就会出现对应的warning。出于性能方面的考虑，这个API只在开发环境下使用。

基本使用方法

        import PropTypes from 'prop-types';
        ComponentName.propTypes = {
            myArray: PropTypes.array,
            myBool: PropTypes.bool,
            myFunc: PropTypes.func,
            myNumber: PropTypes.number,
            myString: PropTypes.string,
            requiredFunc: PropTypes.func
        }

props不是以上类型，而是拥有复杂结构的对象或数组:

    直接用React.PropTypes.object 或 React.PropTypes.array,但是对象或数组内部的数据我们却无法验证
    使用方法：shape() 和 arrayOf()
        shape(): 处理对象
        arrayOf(): 处理数组
1. 例1:

        {
            text: 'hello world',
            numbers: [5, 2, 7, 9]
        }
        
      不能处理对象内部: 
      
        xxx.propTypes: {
            myObject: PropTypes.object
        }
      可以处理内部:
      
        xxx.propTypes: {
            myObject: PropTypes.shape({
                text: PropTypes.string,
                numbers: PropTypes.arrayOf(PropTypes.number),
            })
        }
2. 下面是一个更复杂的Props：

        [
            {
                name: 'Zachary He',
                age: 13,
                married: true,
            },
            {
                name: 'Alice Yo',
                name: 17,
            },
            {
                name: 'Jonyu Me',
                age: 20,
                married: false,
            }
        ]
    处理内部:
    
        xxx.propTypes: {
            myArray: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string,
                    age: PropTypes.number,
                    married: PropTypes.bool
                })
            )
        }
