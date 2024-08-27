const mongoose = require("mongoose");
require("dotenv").config(); // Đọc các biến môi trường từ file .env

async function dbConnect() {
    mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("Successfully connected to MongoDB Atlas!");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB Atlas!", error);
    });
}

module.exports = dbConnect;

dbConnect();

// Định nghĩa schema và mô hình Post
const PostSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: [true, "Please provide slug"],
        unique: true,
    },
    title: {
        type: String,
        required: [true, "Please provide a title!"],
    },
    description: {
        type: String,
        required: [true, "Please provide a description!"],
    },
});

const Post = mongoose.models.Posts || mongoose.model("Posts", PostSchema);

// Tạo và lưu tài liệu mới
const createPost = async () => {
  try {
    const newPost = new Post({
      slug: 'example-slug', // Thay đổi thành giá trị slug thực tế
      title: 'Example Title', // Thay đổi thành tiêu đề thực tế
      description: 'This is an example description' // Thay đổi thành mô tả thực tế
    });

    const savedPost = await newPost.save();
    console.log('Post saved successfully:', savedPost);
  } catch (err) {
    console.error('Error saving post:', err);
  }
};

createPost();

