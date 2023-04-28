const addCommentHandler = async (event) => {
    const content = document.querySelector("#comment-content").value.trim();
    const blog_id = event.target.getAttribute("data-blog-id");

    if (content) {
        const response = await fetch("/api/comments", {
            method: "POST",
            body: JSON.stringify({ content, blog_id }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace(`/blog/${blog_id}`);
        } else {
            alert("Failed to post a new comment");
        }
    }
};

document.querySelector(".comment-btn").addEventListener("click", addCommentHandler);

const deleteCommentHandler = async (event) => {
    if (event.target.hasAttribute("data-comment-id")) {
        const id = event.target.getAttribute("data-comment-id");
        const response = await fetch(`/api/comments/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            document.location.replace(`/`);
        } else {
            alert("Not authorized to delete this comment");
        }
    }
};

document.querySelector(".comment-list").addEventListener("click", deleteCommentHandler);