const router = require("express").Router();
const { Blog, User, Comment } = require("../../models/index");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
    try {
        const blogData = await Blog.findAll();
        res.status(200).json(blogData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: { exclude: ["password"] },
                },
                {
                    model: Comment
                },
            ],
        });

        if (!blogData) {
            res.status(400).json({ message: "No blog with that id found" });
            return;
        }

        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/", async (req, res) => {
    try {
        const blogData = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(blogData);
    } catch (err) {
        res.status(400).json(err);
    }
});

//add withAuth after test
router.put("/:id", withAuth, async (req, res) => {
    try {
        const blogData = await Blog.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        });

        if (!blogData) {
            res.status(400).json({ message: "There is no blog with that id" });
            return;
        }
        res.status(200).json({
            blogData,
            message: "Blog has been successfully updated",
        });

    } catch (err) {
        res.status(500).json(err);
    }
})

//add withAuth after test
router.delete("/:id", withAuth, async (req, res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!blogData) {
            res.status(400).json({ message: "There is no blog with that id" });
            return;
        }
        res.status(200).json({
            blogData,
            message: "Blog has been successfully deleted",
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;