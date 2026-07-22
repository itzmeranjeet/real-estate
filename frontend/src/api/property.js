const BASE_URL = "http://localhost:5000/api/properties";

export const getProperties = async () => {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch properties");
  }

  return await response.json();
};