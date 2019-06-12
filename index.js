let express = require("express");
let cors = require('cors');
let bodyParser = require('body-parser');
const app = express();

app.use(cors({
  origin: ['http://localhost:8000'],
  methods: ['GET', 'POST']
}))

// false 返回任何数据类型;请求体中解码body
app.use(express.urlencoded({extended: false})) //处理get方式 req.query;
app.use(express.json()) //post方式 req.body 方式;
// 等同于 bodyParser
// app.use(express.urlencoded({extended: false}))

let server = app.listen(3000, ()=>{
  console.log('服务器已开启')
})

let io = require('socket.io').listen(server);

io.sockets.on('connection', (socket)=>{
  console.log('链接成功');
  socket.on('jj', (res)=>{
    console.log(res) //2
  })
  socket.emit('kk',0);
})
app.get('/',(req,res)=>{
  res.send('链接成功')
})
app.post('/count', (req, res)=>{
  console.log('req', req.body.count);

  res.send({code:req.body.count});
})

