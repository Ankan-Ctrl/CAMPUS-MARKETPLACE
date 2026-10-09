import { mockApi } from "./mockApi.js";

const API_URL = "https://campus-marketplace-api.vercel.app/api";

const USER_STORAGE_KEY = "campus_marketplace_user";

// =====================================================
// API REQUEST HELPER
// =====================================================

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error("Invalid response from server.");
  }

  if (!response.ok) {
    throw new Error(
      data.message || "Something went wrong."
    );
  }

  return data;
}

// =====================================================
// AUTHENTICATION API
// =====================================================

const realAuthApi = {
  // Return a saved user only if a valid user exists.
  // Never fall back to mock authentication.
  getCurrentUser: () => {
    try {
      const savedUser = localStorage.getItem(
        USER_STORAGE_KEY
      );

      if (!savedUser) {
        return null;
      }

      const parsedUser = JSON.parse(savedUser);

      if (
        parsedUser &&
        typeof parsedUser === "object" &&
        parsedUser.id
      ) {
        return parsedUser;
      }

      localStorage.removeItem(USER_STORAGE_KEY);
      return null;
    } catch {
      localStorage.removeItem(USER_STORAGE_KEY);
      return null;
    }
  },

  // Register a new user.
  register: async ({
    name,
    email,
    department,
    password,
  }) => {
    const response = await request("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        department,
        password,
      }),
    });

    if (!response.user) {
      throw new Error(
        "Registration succeeded without returning user data."
      );
    }

    localStorage.setItem(
      USER_STORAGE_KEY,
      JSON.stringify(response.user)
    );

    return response;
  },

  // Log in an existing user.
  login: async ({ email, password }) => {
    const response = await request("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.user) {
      throw new Error(
        "Login succeeded without returning user data."
      );
    }

    localStorage.setItem(
      USER_STORAGE_KEY,
      JSON.stringify(response.user)
    );

    return response;
  },

  // Log out the current user.
  logout: async () => {
    localStorage.removeItem(USER_STORAGE_KEY);

    return {
      success: true,
    };
  },
};

// =====================================================
// EXPORT API
// =====================================================

export const api = {
  ...mockApi,

  // Use real backend authentication instead of mock auth.
  auth: realAuthApi,
};w
