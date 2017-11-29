module.exports = function(){
    var faker = require("faker");
    var _lodash = require("lodash");
    return {
        people: _lodash.times(100,function (n) {
            return {
                id: n,
                name: faker.name.findName(),
                avatar: faker.internet.avatar()
            }
        })
    }
};
