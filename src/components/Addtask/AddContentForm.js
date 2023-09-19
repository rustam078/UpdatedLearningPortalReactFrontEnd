import React, { useState } from "react";
import classes from "./addcontent.module.css";
import { getUser } from "../../service/LoginService";
import { loadSuccessPopup,loadPopup } from "../../service/ToastifyPopup";
import { useNavigate } from "react-router-dom";

function AddContentForm() {
  const [contentType, setContentType] = useState("VIDEO");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");
  const [imageType, setImageType] = useState("upload"); // Added state for image type
  const [image, setImage] = useState(null); // New state for the uploaded image file
  const [imageUrl, setImageUrl] = useState(""); // New state for image URL
  const navigate = useNavigate();
  const user = getUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContent = {
      id: Date.now(),
      contentType,
      title,
      url,
      categoryId: category,
      imageUrl:imageUrl,
    };

    let urls = "http://localhost:8080/api/categories/add";
    console.log(newContent);
    const token = user.token;
    fetch(urls, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newContent),
    })
      .then((response) => response.json())
      .then((data) => {
        loadSuccessPopup("Record added successful...");
        console.log("Response from server:", data);
        navigate("/dashboard");
      })
      .catch((error) => {
        loadPopup("some thing went worng ....");
        console.error("Error:", error);
      });

    setTitle("");
    setUrl("");
    setCategory("");
    setImage(null);
    setImageUrl("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className={classes.formcontainer}>
      <form onSubmit={handleSubmit}>
        <div className={classes.type}>
          <label>
            Content Type:
            <input
              type="radio"
              name="contentType"
              value="VIDEO"
              checked={contentType === "VIDEO"}
              onChange={() => setContentType("VIDEO")}
            />
            Video
          </label>
          <label>
            <input
              type="radio"
              name="contentType"
              value="ARTICLE"
              checked={contentType === "ARTICLE"}
              onChange={() => setContentType("ARTICLE")}
            />
            Article
          </label>
        </div>
        <div>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => {
                if (e.target.value.length <= 100) {
                  setTitle(e.target.value);
                }
              }
            }
            />
          </label>
        </div>
        <div>
          <label>
            URL:
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Category:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              <option value="1">Java</option>
              <option value="2">HTML</option>
              <option value="3">React</option>
              <option value="4">Spring</option>
            </select>
          </label>
        </div>
       {contentType === "ARTICLE"&&( <div>
          <label>
            Image Type:
            <input
              type="radio"
              name="imageType"
              value="upload"
              checked={imageType === "upload"}
              onChange={() => setImageType("upload")}
            />
            Upload Image
            <input
  type="radio"
  name="imageType"
  value={`https://picsum.photos/300/${Math.floor(Math.random() * 900) + 100}`}
  checked={imageType === "link"}
  onChange={(e) => {
    setImageType("link");
    setImageUrl(e.target.value);
  }}
/>

            Image URL
          </label>
        </div>
        )}
        {/* Conditionally render the image input based on the selected image type */}
        {contentType === "ARTICLE"&& imageType === "upload" && (
          <div>
            <label>
              Image:
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>
        )}
        {contentType === "ARTICLE"&& imageType === "link" && (
          <div>
            <label>
              Image URL:
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </label>
          </div>
        )}
        <button type="submit">Add Content</button>
      </form>
    </div>
  );
}

export default AddContentForm;
