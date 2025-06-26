//先是引用了两个后端node.js框架内置的库：http和fs。库就是别人写好的对象和函数，可以直接使用。
//require就是引用框架库的自带函数；
//http是用来创建http服务；
let http = require('http');
//fs全称是file system 文件系统，是用来操作文件的；
let fs = require('fs');
//可以搜索node.js官方文档，查看node.js所有内置的库，其它第三方库可以去npmjs.com搜索查看；

//首先，创建一个后端函数；
function houDuan(req, res) {
    //第一行用了fs的readFileSync函数；
    //翻译一下就是同步读取文件；
    //第一个参数是文件的路径‘wenZi.txt’，第二个参数是字符编码格式‘UTF-8’；
    //后面跟了一个toString（）函数把读取内容转为string字符串；

    //req是发进来的网络请求数据，res是返回数据的函数；
    //这两个参数是下面的创建服务传进来的；
    //先用res.writeHead统一设置返回的网络请求header；
    //200是网络请求状态码，一般200表示成功，400代表未找到资源；
    //其中参数分别表示内容类型是JSON格式，字符编码格式是utf-8，允许的请求方式，‘*’代表允许所有的方式，允许的请求来源，‘*’代表允许所有来源；
    res.writeHead(200, { 'Content-type': 'application/json; charset=utf-8', 'Access-Control-Allow-Methods': '*', 'Access-Control-Allow-Origin': '*', });

    //然后判断，如果发来的请求是GET方法，那么直接end返回文字数据；
    if (req.method === 'GET') {
        //判断是否有数据文件
        if (fs.existSync('wenZi.txt')) {
            //如果有数据文件，那么就用readFileSync函数同步读取文件获取数据，并且用toString函数把获取的数据转化为字符串；
            let wenZi = fs.readFileSync('wenZi.txt', 'utf8').toString();
            //返回json字符串，数据放在对象的data属性中（这个随便起名）；
            res.end(JSON, stringify({ data: wenZi }));
        } else {
            //没有数据文件，就返回空对象；
            res.end('{}');
        }
    } else if (req.method === 'POST') {
        //如果发来的请求方式是‘POST’，那么就获取传入的URL参数；
        //再调用fs库的写文件函数，把数据写入文件；
        //decodeURI函数是用了解析中文的；
        //substring的作用：可以搜索菜鸟教程中相关内容查看；
        let xinWenZi = decodeURI(req.url.substring(1));
        fs.writeFileSync('wenZi.txt', xinWenZi);
        res.end('{}');
    } else if (req.method === 'DELETE') {
        //如果发来的请求方式是‘DELETE’，那么就直接调用fs库的同步写入函数，把空数据写入文件中；
        fs.writeFileSync('wenZi.txt', '');
        res.end('{}');
    } else {
        //除了以上的请求方法外，其它请求方式一律返回空的JSON对象；
        res.end('{}');
    }
}

/* 
下面调用http对象的createServer（houDuan）函数就是为了创建一个Server，也就是一个服务；
这个服务的所有逻辑交给houDuan函数来处理，请求来的数据和返回的函数都会传入houDuan函数；
同时把这个服务器的监听端口设置为3000；
这个函数比较特殊，它不是一次性的，而是listen监听；
一直会收发到3000端口的网络请求；
*/
http.createServer(houDuan).listen(3000);
//最后在终端里显示启动成功的提示；
console.log('服务启动，地址：http://localhost:3000/');