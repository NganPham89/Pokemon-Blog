const addBlogHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector("#blog-title").value.trim();
    const content = document.querySelector("#blog-content").value.trim();

    if (title&& content) {
        const response = await fetch("/api/blogs", {
            method: "POST",
            body: JSON.stringify({ title, content }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert("Failed to create new blog post");
        }
    }
};

const deleteHandler = async (event) => {
    if (event.target.hasAttribute("data-id")) {
        const id = event.target.getAttribute("data-id");

        const response = await fetch(`/api/projects/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            document.location.replace("/profile");
        } else {
            alert("Failed to delete project");
        }
    }
};

document.querySelector(".new-blog-form").addEventListener("submit", addBlogHandler);
document.querySelector(".project-list").addEventListener("click", deleteHandler);