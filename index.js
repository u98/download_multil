const fs = require('fs-extra');
const download = require('download');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const host = `http://www.toyota.com.vn`;
let rootDT = null;

fs.readFile('data.json', {encoding: 'utf-8'}, function(err, data) {
    let list = JSON.parse(data)
    rootDT = list.data
    downloadImg(0);
});

let downloadImg = function(i) {
    let img = '/data/news/' + rootDT[i].id + '/' + rootDT[i].newS_IMAGE2;
    let saveImg = img.substr(1);
    console.log(host + img)
    download(host + img)
            .then(data => {
                fs.outputFile(saveImg, data);
            }).then(() => {
                if (i <= rootDT.length -1)
                    downloadImg(++i);
                    
                console.log('Downloaded ' + saveImg)
            });
}