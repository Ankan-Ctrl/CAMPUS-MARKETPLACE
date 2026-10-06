import { PRODUCTS, CONVERSATIONS, PURCHASES, CURRENT_USER } from '../data/mockData.js'

const clone = (value) => {
  try {
    return JSON.parse(JSON.stringify(value))
  } catch {
    return value
  }
}

export const mockApi = {
  auth: {
    getCurrentUser: () => clone(CURRENT_USER),
    login: ({ email } = {}) => ({
      ...clone(CURRENT_USER),
      email: email || CURRENT_USER.email,
    }),
    register: ({ name, email, department } = {}) => ({
      ...clone(CURRENT_USER),
      name: name || CURRENT_USER.name,
      email: email || CURRENT_USER.email,
      department: department || CURRENT_USER.department,
    }),
    logout: () => ({ success: true }),
  },

  listings: {
    getAll: () => clone(PRODUCTS),
    create: (product) => {
      const id = 'p' + Date.now()
      return {
        ...product,
        id,
        status: 'active',
        postedAt: new Date().toISOString(),
      }
    },
    update: (id, patch) => ({ id, ...patch }),
    remove: (id) => ({ id, deleted: true }),
    markAsSold: (id) => ({ id, status: 'sold' }),
  },

  wishlist: {
    getAll: () => ['p2', 'p8'],
    toggle: (currentIds, id) => {
      if (currentIds.includes(id)) {
        return currentIds.filter((entry) => entry !== id)
      }
      return [...currentIds, id]
    },
  },

  messages: {
    getConversations: () => clone(CONVERSATIONS),
    createConversation: ({ product }) => {
      const id = 'c' + Date.now()
      return {
        id,
        withName: product.sellerName,
        productName: product.name,
        messages: [],
      }
    },
    send: ({ conversationId, text }) => ({
      conversationId,
      message: {
        id: 'm' + Date.now(),
        sender: 'me',
        text,
        time: 'Just now',
      },
    }),
  },

  purchases: {
    getAll: () => clone(PURCHASES),
  },
}

export const api = mockApi
