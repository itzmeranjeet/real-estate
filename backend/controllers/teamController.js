import pool from "../config/db.js";

export const getAllAgents = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM agents ORDER BY id ASC"
    );
    console.log(result)
    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch agents",
    });
  }
};