import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { NewPost } from "../pages/NewPost";
import { LoginPage } from "../pages/LoginPage";
import RootLayout from "../pages/RootLayout";
import PostDetail from "./PostDetail";
import Authguard from "../guard/Authguard";
import NotFound from "./NotFound";
import { ExplorePostPage } from "../pages/ExplorePostPage";
import { Registrationpage } from "../pages/Registrationpage";
import AddCategory from "./AddCategory";
import AboutUs from "../components/AboutUs";
import Contact from "../components/Contact";
import ProductsPage from "../components/ProductsPage";
import Cart from "../components/Cart";
import Checkout from "../components/Checkout";
import Invoice from "./Invoice";
import ViewOrder from "../components/ViewOrder";
import ManageUsers from "./ManageUsers";
import Feedback from "./Feedback";
import ViewFeedback from "./ViewFeedback";
import ViewContact from "./ViewContact";

export const router = createBrowserRouter([
  {
    path: "/loginpage",
    element: <LoginPage />,
  },
  {
    path: "/registerpage",
    element: <Registrationpage />,
  },
  {
    path: "/",
    element: <Authguard />, // 🔒 LOGIN REQUIRED
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/viewcontact",
        element: <ViewContact />,
      },
      {
        path: "/product",
        element: <ProductsPage />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/ManageUsers",
        element: <ManageUsers />,
      },
      {
        path: "/Feedback",
        element: <Feedback />,
      },
      {
        path: "/ViewFeedback",
        element: <ViewFeedback />,
      },

      // ✅ CHECKOUT
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/invoice",
        element: <Invoice />,
      },

      // 🛠 ADMIN ROUTES
      {
        path: "/newpost",
        element: <NewPost />,
      },
      {
        path: "/addcategory",
        element: <AddCategory />,
      },

      // ✨ EDIT CATEGORY ROUTE
      {
        path: "/addcategory/edit/:categoryName",
        element: <AddCategory />,
      },

      // ✅ ADMIN ONLY – VIEW ORDERS
      {
        path: "/vieworder",
        element: <ViewOrder />,
      },

      {
        path: "/post/:postId",
        element: <PostDetail />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
