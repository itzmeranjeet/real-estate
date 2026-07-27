import pool from "../config/db.js";

export const getPricingPlans = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM pricing_plans ORDER BY id ASC"
    );

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch pricing plans",
    });
  }
};