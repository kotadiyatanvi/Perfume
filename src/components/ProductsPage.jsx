import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import ConformationModal from "./ConformationModal";
import Pagination from "./Pagination"; 
import "./ProductsPage.css";
import heroImg from "../assets/image/per5.jpg";

export const ProductsPage = () => {
  const [allPostData, setAllPostData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // ✅ Pagination States - itemsPerPage ને સ્ટેટમાં રાખ્યું છે જેથી ડ્રોપડાઉન કામ કરે
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6); 

  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteType, setDeleteType] = useState("");

  const navigate = useNavigate();

  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const isAdmin = loginData?.role === "admin";
  const userId = loginData?.id;

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("postData")) || [];
    const cats = JSON.parse(localStorage.getItem("AddCategory")) || [];

    const validCategories = cats.filter(
      (cat) => typeof cat === "object" && cat.name && cat.image
    );

    setAllPostData(posts);
    setCategories(validCategories);
    setSelectedCategory("");
  }, []);

  // Filtered logic
  const filteredPosts =
    selectedCategory === ""
      ? allPostData
      : allPostData.filter((item) => item.category === selectedCategory);

  // ✅ Pagination Logic
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPosts.slice(indexOfFirstItem, indexOfLastItem);

  // જ્યારે કેટેગરી બદલાય અથવા પેજ સાઈઝ બદલાય ત્યારે પેજ 1 પર આવી જવું
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, itemsPerPage]);

  const clickHandler = (id) => {
    navigate(`/post/${id}`);
  };

  const handleAddToCart = (product) => {
    const cartKey = userId ? `cartData_${userId}` : "cartData";
    let cartData = JSON.parse(localStorage.getItem(cartKey)) || [];
    const existingIndex = cartData.findIndex((item) => item.id === product.id);

    if (existingIndex !== -1) {
      cartData[existingIndex].quantity += 1;
    } else {
      cartData.push({ ...product, quantity: 1 });
    }

    localStorage.setItem(cartKey, JSON.stringify(cartData));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleDeleteCategory = (name) => {
    setDeleteType("category");
    setDeleteId(name);
    setShowModal(true);
  };

  const handleDeleteProduct = (id) => {
    setDeleteType("product");
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (deleteType === "category") {
      const updatedCats = categories.filter((cat) => cat.name !== deleteId);
      localStorage.setItem("AddCategory", JSON.stringify(updatedCats));
      setCategories(updatedCats);
    }

    if (deleteType === "product") {
      const updatedPosts = allPostData.filter(
        (post) => String(post.id) !== String(deleteId)
      );
      localStorage.setItem("postData", JSON.stringify(updatedPosts));
      setAllPostData(updatedPosts);
    }

    setShowModal(false);
    setDeleteId(null);
    setDeleteType("");
  };

  const closeModal = () => {
    setShowModal(false);
    setDeleteId(null);
    setDeleteType("");
  };

  const handleEditCategory = (cat) => {
    navigate(`/addcategory/edit/${cat.name}`);
  };

  return (
    <>
      <section className="home-section">
        <div className="home-bg"></div>
        <div className="home-wrapper">
          <span className="home-tag">Our Collection</span>
          <h1>
            Discover <span>All Products</span>
            <br /> At One Place
          </h1>
          <p>
            Explore premium perfumes curated from all categories, crafted to
            define elegance, confidence, and timeless luxury.
          </p>
        </div>
      </section>

      {/* CATEGORY CARDS */}
      <div className="category-card-wrapper">
        <div
          className={`category-card ${selectedCategory === "" ? "active" : ""}`}
          onClick={() => setSelectedCategory("")}
        >
          <img src={heroImg} alt="All" className="sharp-img" />
          <div className="category-label">ALL</div>
        </div>

        {categories.map((cat) => (
          <div
            key={cat.name}
            className={`category-card ${
              selectedCategory === cat.name ? "active" : ""
            }`}
          >
            <img src={cat.image} alt={cat.name} className="sharp-img" />
            <div
              className="category-label"
              onClick={() => setSelectedCategory(cat.name)}
            >
              {cat.name.toUpperCase()}
            </div>

            {isAdmin && (
              <div className="category-actions">
                <button className="edit-btn3" onClick={() => handleEditCategory(cat)}>
                  Edit
                </button>
                <button className="delete-btn3" onClick={() => handleDeleteCategory(cat.name)}>
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* PRODUCTS */}
      <div className="container">
        {currentItems.length === 0 ? (
          <p className="no-data">No Data Found</p>
        ) : (
          currentItems.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              title1={item.title}
              desc={item.body}
              img={item.image}
              price={item.price}
              onRedirect={() => clickHandler(item.id)}
              onAddToCart={() => handleAddToCart(item)}
              isAdmin={isAdmin}
              onEdit={() => navigate("/newpost", { state: { id: item.id } })}
              onDelete={() => handleDeleteProduct(item.id)}
            />
          ))
        )}
      </div>

      {/* ✅ PAGINATION COMPONENT - itemsPerPage અને setter ફંક્શન પાસ કર્યા */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        onNext={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        pageSize={itemsPerPage}
        onPageSizeChange={(newSize) => setItemsPerPage(newSize)}
      />

      {/* SCROLL TO TOP */}
      <div
        className="scroll-wrapper"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <span className="arrow-up"></span>
      </div>

      {showModal && (
        <ConformationModal
          title={deleteType === "category" ? "Delete Category?" : "Delete Product?"}
          disc="Are you sure you want to delete this? This action cannot be undone."
          onClose={closeModal}
          onConfirm={confirmDelete}
          confirmBtnText="Yes, Delete"
        />
      )}
    </>
  );
};

export default ProductsPage;