import React from 'react'
import {
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom'

import { AppProvider, useApp } from './context/AppContext.jsx'
import MainLayout from './components/layout/MainLayout.jsx'

import Home from './pages/Home.jsx'
import Browse from './pages/Browse.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Sell from './pages/Sell.jsx'
import Wishlist from './pages/Wishlist.jsx'
import Messages from './pages/Messages.jsx'
import MyListings from './pages/MyListings.jsx'
import Profile from './pages/Profile.jsx'
import Settings from './pages/Settings.jsx'
import Purchases from './pages/Purchases.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'

// Protect marketplace pages
function ProtectedLayout() {
  const { isAuthenticated } = useApp()
  const location = useLocation()

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    )
  }

  return <Outlet />
}

// Redirect logged-in users away from authentication pages
function PublicOnlyRoute({ children }) {
  const { isAuthenticated } = useApp()

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicOnlyRoute>
            <Register />
          </PublicOnlyRoute>
        }
      />

      <Route
        path="/forgot-password"
        element={
          <PublicOnlyRoute>
            <ForgotPassword />
          </PublicOnlyRoute>
        }
      />

      <Route element={<ProtectedLayout />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route
            path="/category/:category"
            element={<CategoryPage />}
          />
          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />
          <Route path="/sell" element={<Sell />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/my-listings" element={<MyListings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/purchases" element={<Purchases />} />
        </Route>
      </Route>

      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}
