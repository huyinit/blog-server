// const express = require('express');
// const app = express();
// const cors = require('cors');
// app.use(cors());

// const BlogPosts = require('./BlogPosts');

// app.get('/', function(red, res){
//     res.send("Server is working!");
// })
// app.get('/posts', function (req, res){
//     res.send(JSON.stringify(BlogPosts.BlogPosts));
// })

// app.listen(8080, function(){
//     console.log("Server is running on 8080!");
// });

const express = require("express");
const PostRouter = require("./routes/PostRouter"); // Đường dẫn tới file PostRouter.js
const dbConnect = require("./db/dbConnect"); // Đảm bảo đã kết nối với MongoDB

const app = express();

dbConnect(); // Kết nối đến MongoDB

app.use(express.json()); // Middleware để parse JSON trong request body
app.use("/api", PostRouter); // Sử dụng PostRouter cho các yêu cầu tới /api

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
