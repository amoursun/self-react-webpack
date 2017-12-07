module.exports = {
    deepCopy: function (obj) {
        var newObj = obj.constructor === Array ? [] : {};

        for (var key in obj) {
            newObj[key] = typeof obj[key] === "object" ? deepCopy(obj[key]) : obj[key];
        }

        return newObj;
    },

    isRotateStr: function (bar, foo) {
        if (bar.length != foo.length) {
            return false;
        }

        var baz = bar + bar;

        if (baz.indexOf(foo) != -1) {
            return true
        } else {
            return false
        }
    },

    strSort: function (str) {
        return str.split("").sort((a, b) => a.charCodeAt() > b.charCodeAt()).join("");
    },
    split: function (str, boz) {
        var arr = [];
        var bozLength = boz.length;
        var pointer = 0;

        while (str.indexOf(boz) != -1) {
            var index = str.indexOf(boz);
            arr.push(str.substr(pointer, index));
            str = str.slice(index + bozLength);
        }

        arr.push(str);

        return arr;
    },

    searchClass: function (element) {
        let classes = [];

        if (element.getAttribute('class')) {
            arr = arr.concat(element.getAttribute('class').split(' '));
        }

        Array.prototype.slice.call(element.children).forEach((elem) => {
            searchClass(elem);
        });

        return new Set(arr);
    },

    ChangeTime: function (time) {
        let showTime = '';

        showTime = time > 86400
            ? `${Math.round(time / 86400)} 天前`
            : ( time > 3600
                ? `${Math.round(time / 3600)} 小时前`
                : ( time > 60
                        ? `${Math.round(time / 60)} 分钟前`
                        : `${Math.round(Math.max(time, 1))} 秒前`
                )
            );

        return showTime;
    },

    // 数据分割成小分  分页展示
    filterData: function (res, number, digit) {
        // var data = arguments[0];
        var totalNum = parseInt(res.length / number) + (res.length % number > 0 ? 1 : 0);
        var data = [];
        if (totalNum > digit) {
            data = res.slice((digit - 1) * number, digit * number);
        }
        else {
            data = res.slice((digit - 1) * number);
        }
        return data;
    },

    filterTotalNum: function (res, number) {
        return parseInt(res.length / number) + (res.length % number > 0 ? 1 : 0);
    }

};

