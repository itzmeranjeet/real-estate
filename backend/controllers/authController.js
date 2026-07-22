import pool from "../config/db.js";

export const register = async (req, res) => {
  try {
    const { full_name, email, password, "0000000000": phone = "" } = req.body;

    console.log("res", req.body);
    // Check if user already exists
    const checkUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (checkUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Insert new user
    const result = await pool.query(
      `INSERT INTO users (full_name, email, password, phone)
       VALUES ($1, $2, $3, $4)
       RETURNING id, full_name, email, phone, role`,
      [full_name, email, password, phone]
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};