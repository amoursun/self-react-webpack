# JavaScript ES6简写技巧

## 初级

### 1. 三目运算符 不说了

### 2. 循环语句

   - for (let i = 0; i < arr.length; i++)
   - 改为
   - for (let value of arr)

### 3. 声明变量 
   - let x; let y; let z = 3;
   - 改为
   - let x, y, z = 3;

### 4. 十进制数
使用科学计数法来代替较大的数据，如可以将 10000000 简写为 1e7
   - for (let i = 0; i < 1000000; i++)
   - 改为
   - for (let i = 0; i < 1e6; i++)

### 5. 多行字符串
   - '...\n\t' + '...\n\t' + .....
   - 改为
   - `...`

## 高级

### 1. 变量赋值 
当将一个变量的值赋给另一个变量时，首先需要确保原值不是 null、未定义的或空值。
    
   - const obj = obj1 || `new`;













