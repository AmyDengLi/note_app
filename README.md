# note_app-Node.js-express-mongoose-
Node.js搭建自己的服务器下的一个note_app（记事本APP）,借助express、EJS框架以及mongDB数据库，实现记事本的功能即添加事件、标注已完成的事件等

Express框架、  EJS模板引擎：

  安装：
npm install express --save-dev

npm install ejs --save-dev

  引用：
 var app=express();
 
 app.set('view engine','ejs')
 
  1、get方法，把data数据传给node.ejs
app.get('/',(req,res)=>{
  res.render('node.ejs',data)
});

  2、post方法，传递前端post过来的数据
 app.post('/node',(req,res)=>{
  //req.body就是传递过来的数据
 })；
 
  3、delete方法，关联ajax中type:"DELETE"



views文件夹中主要用于存储ejs文件，构建app页面，主要靠css样式来搭建整个页面，已完成事件与未完成事件有横杆隔开，且已完成事件的“勾号”标注提亮
点击最右边的勾号，可以将未完成的移到下方已完成列表中，刷新页面不会改变

![image](https://github.com/AmyDengLi/note_app-Node.js-express-mongoose-/blob/master/image/925dad81a40d749824dfcd731083490.png )

