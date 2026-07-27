const BASE_URL = "http://localhost:5000/api/agents";

export const getAgents = async () => {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch agents");
  }

  return await response.json();
};