const obj = { a:1,   b:2}
const init = {
    name:'name111',
    obj:{
        a:'a1',
        b:'b1',
        c:'c1',
    }
};
console.log(Object.assign({},init,obj));
// {
//     name: 'name111',
//     obj: {a: 'a1', b: 'b1', c: 'c1'},
//     a: 1,
//     b: 2
// }


const orderData = { a:5, b:6};
const initState = {
    name:'name222',
    orderData: {
        a:'a2',
        b:'b2',
        c:'c2',
    }
};
    //将没有传递过来的数据的默认值加到传过来的state中
const defaultOrderData = Object.assign({},initState.orderData,{orderData});
console.log(Object.assign({},initState,{orderData:defaultOrderData}));
// {
//     name: 'name222',
//     orderData: {
//         a: 'a2',
//         b: 'b2',
//         c: 'c2',
//         orderData: {
//             a: 5,
//             b: 6
//         }
//     }
// }
