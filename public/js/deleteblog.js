const deleteBlogHandler = async (event) => {
    if (event.target.hasAttribute("data-delete-id")) {
        const id = event.target.getAttribute("data-delete-id");
        console.log(id);
        const response = await fetch(`/api/blogs/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert("Failed to delete blog");
        }
    }
};

document.querySelector(".blog-button-list").addEventListener("click", deleteBlogHandler);