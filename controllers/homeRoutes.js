const router = require("express").Router();
const { Blog, User, Comment } = require("../models/index");
const withAuth = require("../utils/auth");
const authCheck = require("../utils/auth");

router.get("/", async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ["password"],
                    }
                },
            ]
        })

        const blogs = blogData.map((blog) => blog.get({ plain: true }));
        res.render("homepage", {
            blogs,
            logged_in: req.session.logged_in,
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/blog/:id", async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ["password"],
                    }
                },
            ]
        })
        const commentData = await Comment.findAll({
            where: {
                blog_id: req.params.id,
            },
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ["password"],
                    }
                }
            ]
        })

        const blog = blogData.get({ plain: true });
        const comments = commentData.map((comment) => comment.get({ plain: true }));
        res.render("blog", {
            ...blog,
            comments,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get("/dashboard", withAuth, async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                id: req.session.user_id,
            },
            attributes: {
                exclude: ["password"],
            }
        });
        const blogData = await Blog.findAll({
            where: {
                user_id: req.session.user_id,
            }
        });
        const user = userData.get({ plain: true });
        const blogs = blogData.map((blog) => blog.get({ plain: true }));
        res.render("dashboard", {
            user,
            blogs,
            logged_in: req.session.logged_in,
        })
    } catch (err) {
        res.status(400).json(err);
    }
})

router.get("/blog-edit/:id", async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id)
        const blog = blogData.get({ plain: true });
        res.render("blog-edit", {
            ...blog,
        })
    } catch (err) {
        res.status(400).json(err);
    }
})

router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/dashboard");
        return;
    }

    res.render("login");
});

module.exports = router;