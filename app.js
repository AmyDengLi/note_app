var express=require('express');
//自定义模块
var nodeModule=require('./module_control/nodeModule');

var app=express();
app.set('view engine','ejs')
// app.get('/',(req,res)=>{
//     res.send('This is home Page');
// });
// app.get('/contact/:id',(req,res)=>{
//     // res.send('This is contact Page')
//     res.send('你所访问的路由参数：'+req.params.id)
// });
// app.get('/profile',(req,res)=>{
//     var data=[{name:'dl',age:23},{name:'dc',age:17},{name:'dh',age:25}];
//     res.render(__dirname+'/views/profile.ejs',{data:data})
// })
app.use(express.static('./public'))

nodeModule(app)
app.listen(8888,'127.0.0.1')