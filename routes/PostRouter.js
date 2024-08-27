const express = require("express");
const Post = require("../db/postModel"); // Import model Post
const router = express.Router();

// Endpoint POST để tạo một bài đăng mới
router.post("/post", async (request, response) => {
    const post = new Post(request.body);
    try {
        await post.save();
        response.send(post);
    } catch (error) {
        response.status(500).send(error);
    }
});

// Endpoint GET để trả về tất cả các bài đăng
router.get("/posts", async (request, response) => {
    try {
        const posts = await Post.find({}); // Lấy tất cả các bài đăng từ MongoDB
        response.send(posts); // Trả về danh sách các bài đăng
    } catch (error) {
        response.status(500).send({ error }); // Trả về lỗi nếu có
    }
});

// Endpoint GET để trả về một bài viết duy nhất dựa trên slug
router.get("/post/:slug", async (request, response) => {
    try {
        const post = await Post.findOne({ slug: request.params.slug }); // Tìm một bài viết với slug tương ứng
        response.send(post); // Trả về bài viết
    } catch (error) {
        response.status(500).send({ error }); // Trả về lỗi nếu có
    }
});

// Endpoint PATCH để cập nhật bài viết dựa trên slug
router.patch("/post/:slug", async (request, response) => {
    try {
        const post = await Post.findOneAndUpdate(
            { slug: request.params.slug }, // Điều kiện tìm kiếm
            request.body, // Dữ liệu để cập nhật
            { new: true } // Tùy chọn để trả về đối tượng đã cập nhật thay vì đối tượng gốc
        );
        if (!post) {
            return response.status(404).send("Post wasn't found");
        }
        response.send(post); // Trả về bài viết đã cập nhật
    } catch (error) {
        response.status(500).send({ error }); // Trả về lỗi nếu có
    }
});

// Endpoint DELETE để xóa một bài viết dựa trên slug
router.delete("/post/:slug", async (request, response) => {
    try {
        const post = await Post.findOneAndDelete({ slug: request.params.slug });
        if (!post) {
            return response.status(404).send("Post wasn't found");
        }
        response.status(204).send(); // Trả về mã trạng thái 204 nếu xóa thành công
    } catch (error) {
        response.status(500).send({ error });
    }
});

module.exports = router;
