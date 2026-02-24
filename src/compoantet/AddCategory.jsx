import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ConformationModal from "./ConformationModal";
import "./AddCategory.css";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [preview, setPreview] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const navigate = useNavigate();
  const { categoryName } = useParams();

  useEffect(() => {
    const existingCategories =
      JSON.parse(localStorage.getItem("AddCategory")) || [];

    if (categoryName) {
      const catIndex = existingCategories.findIndex(
        (c) => c.name === categoryName.toLowerCase()
      );

      if (catIndex !== -1) {
        const cat = existingCategories[catIndex];
        setName(cat.name);
        setPreview(cat.image);
        setImageFile(cat.image);
        setIsEditMode(true);
        setEditIndex(catIndex);
      }
    }
  }, [categoryName]);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setImageFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addCategoryHandler = () => {
    if (!name || !imageFile) return;

    const existing = JSON.parse(localStorage.getItem("AddCategory")) || [];

    const newCategory = {
      name: name.toLowerCase(),
      image: imageFile,
    };

    localStorage.setItem(
      "AddCategory",
      JSON.stringify([...existing, newCategory])
    );

    navigate("/product");
  };

  const updateCategoryHandler = () => {
    if (!name || !imageFile) return;

    const existing = JSON.parse(localStorage.getItem("AddCategory")) || [];

    existing[editIndex] = {
      name: name.toLowerCase(),
      image: imageFile,
    };

    localStorage.setItem("AddCategory", JSON.stringify(existing));
    navigate("/product");
  };

  return (
    <div className="add-category-page">
      <div className="category-form-wrapper">
        <h2>{isEditMode ? "Edit Category ✨" : "Add New Category ✨"}</h2>

        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input type="file" accept="image/*" onChange={imageHandler} />

        {preview && (
          <div className="preview-wrapper">
            <img src={preview} alt="preview" />
          </div>
        )}

        <div className="btn-group">
          <button
            className={isEditMode ? "update-btn" : "add-btn"}
            onClick={isEditMode ? updateCategoryHandler : addCategoryHandler}
          >
            {isEditMode ? "Update Category" : "Add Category"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
