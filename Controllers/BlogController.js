const Blog = require('../Models/blog');

const blog_index = (req, res) => {
    Blog.find().sort({createdAt: -1})
    .then((result) => {
        res.render('index', {title: 'Home', blogs: result});
    })
    .catch(err => console.log(err));
}

const fetch_blog_by_id = (req, res) => {
    const id = req.params.id;

    Blog.findById(id).then((result) => {
        res.render('details', {title: 'Blog Detail', blog: result});
    }).catch(err => console.log(err));
}

const create_blog_page = (req, res) => {
    res.render('create', {title: 'Create A New Blog'});
}

const add_blog = (req, res) => {
    const blog = new Blog(req.body);
    blog.save().then(() => { res.redirect('/') })
    .catch(err => console.log(err));
}

const delete_blog = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then(() => {
        res.json({redirect: '/'})
    })
    .catch(err => console.log(err));
}


module.exports = {
    blog_index,
    fetch_blog_by_id,
    create_blog_page,
    add_blog,
    delete_blog
}   