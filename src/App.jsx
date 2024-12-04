import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Root from "./components/layout/Root";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import AddressManagement from "./pages/AddressManagement";
import UserSettings from "./pages/UserSettings";
import Profile from "./pages/Profile";
import OrderTracking from "./pages/OrderTracking";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="products" element={<Products />} />
      <Route path="product/:id" element={<ProductDetail />} />
      <Route
        path="cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route path="login" element={<Login />} />
      <Route
        path="profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="profile/addresses"
        element={
          <ProtectedRoute>
            <AddressManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="profile/settings"
        element={
          <ProtectedRoute>
            <UserSettings />
          </ProtectedRoute>
        }
      />
      <Route
        path="profile/orders/:id"
        element={
          <ProtectedRoute>
            <OrderTracking />
          </ProtectedRoute>
        }
      />
      <Route
        path="admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="admin/products"
        element={
          <ProtectedRoute>
            <AdminProducts />
          </ProtectedRoute>
        }
      />
      <Route
        path="admin/orders"
        element={
          <ProtectedRoute>
            <AdminOrders />
          </ProtectedRoute>
        }
      />
      <Route
        path="checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route
        path="wishlist"
        element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        }
      />
    </Route>
  ),
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;
