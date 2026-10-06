import React, { createContext, useContext, useState, useCallback } from 'react'
import { api } from '../api/index.js'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  // --- auth ---
  const [user, setUser] = useState(() => api.auth.getCurrentUser())
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!api.auth.getCurrentUser()
  )

  const login = useCallback(async (email, password) => {
    const response = await api.auth.login({
      email,
      password,
    })

    setUser(response.user)
    setIsAuthenticated(true)

    return response.user
  }, [])

  const register = useCallback(
    async (name, email, department, password) => {
      const response = await api.auth.register({
        name,
        email,
        department,
        password,
      })

      setUser(response.user)
      setIsAuthenticated(true)

      return response.user
    },
    []
  )

  const logout = useCallback(async () => {
    await api.auth.logout()
    setUser(null)
    setIsAuthenticated(false)
  }, [])

  const updateUser = useCallback((patch) => {
    setUser((currentUser) =>
      currentUser ? { ...currentUser, ...patch } : currentUser
    )
  }, [])

  // --- listings ---
  const [products, setProducts] = useState(() => api.listings.getAll())

  const addProduct = useCallback(async (product) => {
    const created = await api.listings.create(product)
    setProducts((prev) => [created, ...prev])
    return created.id
  }, [])

  const updateProduct = useCallback(async (id, patch) => {
    const payload = await api.listings.update(id, patch)

    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, ...payload }
          : p
      )
    )
  }, [])

  const deleteProduct = useCallback(async (id) => {
    await api.listings.remove(id)

    setProducts((prev) =>
      prev.filter((p) => p.id !== id)
    )
  }, [])

  const markAsSold = useCallback(async (id) => {
    const payload = await api.listings.markAsSold(id)

    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              ...payload,
              status:
                p.status === 'sold'
                  ? 'active'
                  : 'sold',
            }
          : p
      )
    )
  }, [])

  // --- wishlist ---
  const [wishlist, setWishlist] = useState(() =>
    api.wishlist.getAll()
  )

  const toggleWishlist = useCallback((id) => {
    setWishlist((prev) =>
      api.wishlist.toggle(prev, id)
    )
  }, [])

  const isWishlisted = useCallback(
    (id) => wishlist.includes(id),
    [wishlist]
  )

  // --- messages ---
  const [conversations, setConversations] = useState(() =>
    api.messages.getConversations()
  )

  const sendMessage = useCallback(
    async (conversationId, text) => {
      const payload = await api.messages.send({
        conversationId,
        text,
      })

      setConversations((prev) =>
        prev.map((c) =>
          c.id === conversationId
            ? {
                ...c,
                messages: [
                  ...c.messages,
                  payload.message,
                ],
              }
            : c
        )
      )
    },
    []
  )

  const startConversationForProduct = useCallback(
    async (product) => {
      const existing = conversations.find(
        (c) =>
          c.productName === product.name &&
          c.withName === product.sellerName
      )

      if (existing) {
        return existing.id
      }

      const newConversation =
        await api.messages.createConversation({
          product,
        })

      setConversations((prev) => [
        newConversation,
        ...prev,
      ])

      return newConversation.id
    },
    [conversations]
  )

  // --- purchases ---
  const [purchases] = useState(() =>
    api.purchases.getAll()
  )

  // --- toast ---
  const [toast, setToast] = useState(null)

  const showToast = useCallback((message) => {
    setToast(message)

    setTimeout(() => {
      setToast(null)
    }, 2600)
  }, [])

  const value = {
    // auth
    isAuthenticated,
    user,
    login,
    register,
    logout,
    updateUser,

    // listings
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    markAsSold,

    // wishlist
    wishlist,
    toggleWishlist,
    isWishlisted,

    // messages
    conversations,
    sendMessage,
    startConversationForProduct,

    // purchases
    purchases,

    // toast
    toast,
    showToast,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)

  if (!ctx) {
    throw new Error(
      'useApp must be used within AppProvider'
    )
  }

  return ctx
}