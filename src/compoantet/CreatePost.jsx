import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CreatePost.css";
import loader from "../assets/Loading circles.gif";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [price, setPrice] = useState(""); 
  const [preview, setPreview] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const editId = location.state?.id || null;

  // ================= LOAD DATA =================
  useEffect(() => {
    const rawCats = JSON.parse(localStorage.getItem("AddCategory")) || [];
    const validCats = rawCats.filter(
      (cat) => typeof cat === "object" && cat.name
    );

    setCategories(validCats);
    
    if (!editId) {
        setCategory(validCats[0]?.name || "");
    }

    if (editId) {
      const posts = JSON.parse(localStorage.getItem("postData")) || [];
      const post = posts.find((p) => String(p.id) === String(editId));

      if (post) {
        setTitle(post.title);
        setBody(post.body);
        setPrice(post.price || ""); 
        setPreview(post.image);
        setCategory(post.category);
      }
    }
  }, [editId]);

  // ================= IMAGE =================
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // ================= SUBMIT =================
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    const existingPosts = JSON.parse(localStorage.getItem("postData")) || [];

    const payload = {
      title,
      body,
      price, 
      image: preview,
      category,
    };

    setTimeout(() => {
      if (editId) {
        const updatedPosts = existingPosts.map((p) =>
          String(p.id) === String(editId) ? { ...p, ...payload } : p
        );
        localStorage.setItem("postData", JSON.stringify(updatedPosts));
      } else {
        localStorage.setItem(
          "postData",
          JSON.stringify([
            ...existingPosts,
            { id: Date.now(), ...payload },
          ])
        );
      }

      setLoading(false);
      navigate("/product");
    }, 1000);
  };

  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <img src={loader} alt="Loading..." />
        </div>
      )}

      <div className="create-post-container">
        <form onSubmit={submitHandler} className="form">
          <h2>{editId ? "Edit Product" : "Add Product"}</h2>

          <div className="input-group">
            <input
              type="text"
              placeholder="Product Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="number"
              placeholder="Price ($)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <textarea
              placeholder="Description"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>Select Category</option>
              {categories.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="file-input-wrapper">
            <label>Product Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          {preview && (
            <div className="image-preview">
              <img src={preview} alt="preview" />
            </div>
          )}

          <div className="btn-group">
            <button type="submit" className="login-btn">
              {editId ? "Update Product" : "Add Product"}
            </button>

            {editId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/product")}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default CreatePost;