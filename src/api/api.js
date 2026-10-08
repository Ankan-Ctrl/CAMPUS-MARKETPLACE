import { mockApi } from "./mockApi.js";

const API_URL = "https://campus-marketplace-api.vercel.app/api";
async function request(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

const realAuthApi = {
  getCurrentUser: () => {
    try {
      const savedUser = localStorage.getItem("campus_marketplace_user");
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);

        if (parsedUser && typeof parsedUser === "object") {
          return parsedUser;
        }
      }
    } catch {
      // Ignore malformed localStorage data and fall back to mock auth state.
    }

    return mockApi.auth.getCurrentUser();
  },

  register: async ({ name, email, department, password }) => {
    const response = await request("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        department,
        password,
      }),
    });

    localStorage.setItem(
      "campus_marketplace_user",
      JSON.stringify(response.user)
    );

    return response;
  },

  login: async ({ email, password }) => {
    const response = await request("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    localStorage.setItem(
      "campus_marketplace_user",
      JSON.stringify(response.user)
    );

    return response;
  },

  logout: () => {
    localStorage.removeItem("campus_marketplace_user");

    return {
      success: true,
    };
  },
};

export const api = {
  ...mockApi,

  auth: realAuthApi,
};
