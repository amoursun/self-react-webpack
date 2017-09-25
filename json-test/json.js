var fs = require('fs');

// var coors = {};
// coors.left_top = {};
// coors.right_top = {};
// coors.left_bottom = {};
// coors.right_bottom = {};
// //填充coors中内容
// var filename = "./0.json";
// fs.writeFileSync(filename, JSON.stringify(coors));

fs.readFile('./0.json',function(err,data){
    var jsonObj=JSON.parse(data);
    var comment = {"name":"bookx","category":"5","quantity":"27","allowlend":"1"};
    jsonObj.push(comment);
    // fs.open('./3.json', 'a+', (res) => {
    //     res.send(jsonObj);
    //     console.log(res)
    // });
    fs.rmdir('./3.json', function (err) {
        console.log(err)
        fs.writeFileSync('./3.json', JSON.stringify(jsonObj));
    });

});


