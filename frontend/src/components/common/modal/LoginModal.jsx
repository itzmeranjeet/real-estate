import React, { useState } from "react"
import { loginUser, registerUser } from "../../../api/auth"

const LoginModal = ({ closeModal, handleLogin, showToast }) => {
  const [loginTab, setLoginTab] = useState("login") // 'login' | 'register'
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [registerName, setRegisterName] = useState("")

 const handleAuthSubmit = async (e) => {
  e.preventDefault();

  try {
    if (loginTab === "login") {
      if (!username || !password) {
        showToast("Please enter email and password", "error");
        return;
      }

      const response = await loginUser({
        email: username,
        password,
      });

      if (!response.success) {
        showToast(response.message, "error");
        return;
      }

      localStorage.setItem("user", JSON.stringify(response.user));

      handleLogin(response.user.full_name);

      showToast("Login Successful", "success");

      closeModal();
    } else {
      if (!registerName || !email || !password) {
        showToast("Please fill in all registration fields", "error");
        return;
      }

      const response = await registerUser({
        full_name: registerName,
        email,
        password,
        phone: "", // add phone later if needed
      });

      if (response.success) {
        showToast(response.message, "success");
        setLoginTab("login");

        // Clear fields
        setRegisterName("");
        setEmail("");
        setPassword("");
      } else {
        showToast(response.message, "error");
      }
    }
  } catch (error) {
    console.error(error);
    showToast("Something went wrong", "error");
  }
};

  return (
    <div className="modal-content narrow">
      <button className="modal-close" onClick={closeModal}>
        <i className="fa fa-times"></i>
      </button>
      <div className="modal-body">
        <div className="modal-tabs">
          <button
            type="button"
            className={`tab-btn ${loginTab === "login" ? "active" : ""}`}
            onClick={() => setLoginTab("login")}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`tab-btn ${loginTab === "register" ? "active" : ""}`}
            onClick={() => setLoginTab("register")}
          >
            Register
          </button>
        </div>
        <form onSubmit={handleAuthSubmit}>
          {loginTab === "login" ? (
            <>
              <div className="form-group">
                <label>Username / Email</label>
                <input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className="btn1"
            style={{ width: "100%", marginTop: "15px", padding: "12px", border: "none" }}
          >
            {loginTab === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginModal