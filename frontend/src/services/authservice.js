import api from "./api";

// Register
export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// Login - FastAPI OAuth2 expects form data
export const login = async (credentials) => {
  const formData = new URLSearchParams();
  formData.append("username", credentials.email);
  formData.append("password", credentials.password);

  const response = await api.post("/auth/token", formData, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  const { access_token } = response.data;
  localStorage.setItem("access_token", access_token);
  return response.data;
};

// Logout
export const logout = () => {
  localStorage.removeItem("access_token");
};

// Get Current User
export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

// Check if Logged In
export const isAuthenticated = () => {
  return !!localStorage.getItem("access_token");
};
