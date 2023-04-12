import React, { useEffect, useState } from "react";
import "../App.css"
const Blog = () => {
    const [Data, setData] = useState({
        title: "",
        coverImage: "",
        content: "",
        authorName: "",
        seoDescription: ""
    });
    const handleInputChange = (event) => {
        const { name, value, files } = event.target;
        if (name === "coverImage" && files.length > 0) {
            setData((prevData) => ({
                ...prevData,
                coverImage: files[0]
            }));
        } else {
            setData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };
    const handleSubmit =async (event) => {
        debugger
        event.preventDefault();
        const { title, coverImage, content, authorName, seoDescription } = Data;
        if (title.trim().length === 0 || title.length > 50) {
            alert("Title should be between 1 to 50 characters");
            return;
        }
        if (!coverImage || (coverImage.type !== "image/png" && coverImage.type !== "image/jpeg")) {
            alert("Please upload a valid cover image (PNG or JPEG only)");
            return;
        }
        if (content.trim().length === 0) {
            alert("Please enter some content for the blog");
            return;
        }
        if (authorName.trim().length === 0 || authorName.length > 20) {
            alert("Author name should be between 1 to 20 characters");
            return;
        }
        if (seoDescription.trim().length === 0 || seoDescription.length > 200) {
            alert("SEO description should be between 1 to 200 characters");
            return;
        }
        let localdata=[...JSON.parse(localStorage.getItem("blogData"))]
        localdata=[...localdata,Data]
        localStorage.setItem("blogData", JSON.stringify(localdata));
        alert("Blog created successfully!");
        setData({
            title: "",
            coverImage: null,
            content: "",
            authorName: "",
            seoDescription: ""
        })
        document.getElementById("coverImage").value = "";
    };


    return (
        <div className="container blog ">
            <h1 className="text-center title">Write Blog</h1>
            <div className="row">
                <div >
                    <form onSubmit={handleSubmit} className=" ">
                        <div >
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                name="title"
                                value={Data.title}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <div >
                            <label htmlFor="cover-image">Cover Image:</label>
                            <input
                                type="file"
                                name="coverImage"
                                id="coverImage"
                                accept=".png,.jpeg,.jpg"
                                onChange={handleInputChange}
                                className="form-control-file form-control"
                                required
                            />
                        </div>

                        <div >
                            <label htmlFor="content">Content:</label>
                            <textarea
                                name="content"
                                value={Data.content}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div >
                            <label htmlFor="author-name">Author Name:</label>
                            <input
                                type="text"
                                name="authorName"
                                value={Data.authorName}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div >
                            <label htmlFor="seo-description">SEO Description:</label>
                            <textarea
                                name="seoDescription"
                                value={Data.seoDescription}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className=" text-center mt-3">
                            <button type="submit" className="btn btn-primary">Create Blog</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Blog;