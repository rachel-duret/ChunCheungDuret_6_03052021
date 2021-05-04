const express = require ('express');
const app = express();
const db = require('./models');
const part = require('path')
const cors = require('cors')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json());
app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(session({
    key:"username",
    secret:"hello",
    resave:false,
    saveUninitialized: false,
    cookie:{
        expires:60*60*24,
    }

}))

//Routers
const PostsRouter = require('./routes/Posts');
app.use('/Posts', PostsRouter);
const CommentsRouter = require('./routes/Comments');
app.use('/Comments', CommentsRouter);
const UsersRouter = require('./routes/Users');
app.use('/auth', UsersRouter);
const LikesRouter = require('./routes/Likes');
app.use('/likes', LikesRouter);



db.sequelize.sync().then(()=>{
    app.listen(8000, ()=>{
        console.log('server running on port 8000');
    });
})


