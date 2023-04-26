const router = require("express").Router();
const { Comment } = require("../../models/index");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
    try {
        const commentData = await Comment.findAll();
        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

//add withAuth after test
router.post("/", async (req, res) => {
    try {
        const commentData = await Comment.create({
            ...req.body,
            // user_id: req.session.user_id,
        })

        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

//add withAuth after test
router.put("/:id", async (req, res) => {
    try {
        const commentData = await Comment.update(req.body, {
            where: {
                id: req.params.id,
                // user_id: req.session.user_id,
            }
        });

        if (!commentData) {
            res.status(400).json({ message: "There is no comment with that id" });
            return;
        }
        res.status(200).json({
            commentData,
            message: "Comment has been successfully updated",
        });

    } catch (err) {
        res.status(500).json(err);
    }
})

//add withAuth after test
router.delete("/:id", async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                // blog_id: blabllalala,
                // user_id: req.session.user_id,
            },
        });

        if (!commentData) {
            res.status(400).json({ message: "There is no comment with that id" });
            return;
        }
        res.status(200).json({
            commentData,
            message: "Comment has been successfully deleted",
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;