const randomId = () => Math.random().toString(36).substring(2);
const randomNum = (n = 10) => Math.random() * n | 0;// 按位或运算符  xxx | 0  相当于xxx取整

export const dataGenerate = () => {
    return {
        item_id: randomId(),
        stock_num: randomNum(1000),
        sold_num: randomNum(),
        bro_xh: `${randomNum()}/${randomNum()}`
    }
};

export const dataList = new Array(10).fill(0).map(() => dataGenerate());