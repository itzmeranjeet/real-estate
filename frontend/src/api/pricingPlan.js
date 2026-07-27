const BASE_URL = "http://localhost:5000/api/pricing-plans";

export const getPricingPlans = async () => {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch pricing plans");
  }

  return await response.json();
};