import pool from "../config/db.js";

export const getAllProperties = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM properties ORDER BY id ASC"
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
      message: "Failed to fetch properties",
    });
  }
};