const updateCommentHandler = async (event) => {
    if (event.target.hasAttribute("data-edit-id")) {
        const content = document.querySelector("#comment-content").value.trim();
        const id = event.target.getAttribute("data-edit-id");

        if (content && id) {
            const response = await fetch(`/api/comments/${id}`, {
                method: "PUT",
                body: JSON.stringify({ content }),
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                document.location.replace("/");
            } else {
                alert("Not authorized to edit this comment");
            }
        }
    }

};

document.querySelector(".comment-edit-button").addEventListener("click", updateCommentHandler);