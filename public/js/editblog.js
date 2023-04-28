const updateBlogHandler = async (event) => {
    if (event.target.hasAttribute("data-edit-id")) {
        const title = document.querySelector("#blog-title").value.trim();
        const content = document.querySelector("#blog-content").value.trim();
        const id = event.target.getAttribute("data-edit-id");

        if (title && content && id) {
            const response = await fetch(`/api/blogs/${id}`, {
                method: "PUT",
                body: JSON.stringify({ title, content }),
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                document.location.replace(`/blog/${id}`);
            } else {
                alert("Not authorized to edit this post");
            }
        }
    }

};

document.querySelector(".blog-edit-button").addEventListener("click", updateBlogHandler);