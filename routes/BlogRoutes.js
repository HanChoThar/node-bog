const express = require('express');
const router = express.Router();
const BlogController = require('../Controllers/BlogController');

router.get('/blogs', BlogController.blog_index);
router.get('/blogs/:id', BlogController.fetch_blog_by_id);
router.delete('/blogs/:id', BlogController.delete_blog)
router.get('/create-blog-page', BlogController.create_blog_page);
router.post('/add-blog', BlogController.add_blog);

module.exports = router;

