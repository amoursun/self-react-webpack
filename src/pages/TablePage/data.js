const randomId = () => Math.random().toString(36).substring(2);
const randomNum = (n = 10) => Math.random() * n | 0;// 按位或运算符  xxx | 0  相当于xxx取整

export const dataGenerateBegin = () => {
    return {
        item_id: randomId(),
        stock_num: randomNum(1000),
        sold_num: randomNum(),
        bro_xh: `${randomNum()}/${randomNum()}`
    }
};

export const dataGenerate = () => {
    return {
        id: randomId(),
        name: randomId(),
        age: randomNum(100),
        height: randomNum(1000),
        weight: randomNum(100),
        hobby: {
            movie: {
                name: randomId(),
                director: randomId()
            }
        }
    }
};

export const Data = {
    dataSets: new Array(5).fill(0).map(() => dataGenerate()),
    dataList: new Array(5).fill(0).map(() => dataGenerateBegin())
};
// export const dataSets = new Array(5).fill(0).map(() => dataGenerate());
//
// export const dataList = new Array(5).fill(0).map(() => dataGenerateBegin());
