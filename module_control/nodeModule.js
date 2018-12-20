// var data=[]; //数据库保存在此文件内，刷新服务器则数据也会初始化，因此后面可以用mongodb来代替
var mongoose=require('mongoose');
mongoose.connect('mongodb://note:text1234@ds139722.mlab.com:39722/note-app',{useNewUrlParser:true})
//创建mongoose图表
var noteSchema1=new mongoose.Schema({
    item:String , //未完成
    unitem:String  //已完成
})
//1.往mongoose数据库中存储数据datas({item:'hello world'}).save((err,data)=>{})
var datas=mongoose.model('data',noteSchema1);  //note为存储的库名

//2.从数据库中获取数据datas.find({要获取的内容},(err,data)=>{})

var bodyParser=require('body-parser');
var urlencodeParser=bodyParser.urlencoded({extended:false})

module.exports=function (app) {
    //把数据传递给前台
    app.get('/',(req,res)=>{
        // res.render('Node-app',{data:data})//express框架会自动去views文件夹里面找
        datas.find({},(err,data)=>{
            if(err) throw err;
            console.log(data)
            res.render('Node-app',{data:data})
        });
    });
    //接收前端传过来的数据,如果是unitem也就是已完成的就要把它从未完成中item剔除
    app.post('/node',urlencodeParser,(req,res)=>{
        //req.body就是拿到的数据
        // data.unshift(req.body)
        var reData=req.body;   //{item:'hello'}或者{unitem:'hello'}格式
        for(var key in reData){
            //先删除，避免重复或者标注为已完成之前先删除其在未完成的数据库中
            datas.deleteOne({item:reData[key]},(err,data)=>{
                if(err) throw err;
            })
            //再添加前台传过来的（未完成/已完成）数据，好处就是可以把未完成item转变成已完成unitem
            datas(req.body).save((err,data)=>{
                if(err) throw err;
                //为了不手动刷新页面，这里可以返回数据
                res.json(data)
            });
        }


    });
    //拿到要删除的数据内容，匹配过滤掉
    app.delete('/node',(req,res)=>{
        //这里接收到的内容就不是req.body,而是get请求后的路由参数
        // data=data.filter((EachItem)=>{
        //     return req.params.item!==EachItem.item
        // })
        datas.find(req.body).deleteOne((err,data)=>{
            if(err) throw err;
            //为了不用手动刷新页面，这里可以返回data
            res.json(data)
        })
    })

}