import React, { useContext, useState, useEffect } from "react"
import { AppContext } from "../../../context/AppContext"
import { list } from "../../data/Data"
import "./modal.css"

const Modal = () => {
  const {
    favorites,
    toggleFavorite,
    currentUser,
    handleLogin,
    activeModal,
    setActiveModal,
    selectedProperty,
    setSelectedProperty,
    selectedPlan,
    toast,
    showToast,
  } = useContext(AppContext)

  // Local state for forms
  const [loginTab, setLoginTab] = useState("login") // 'login' | 'register'
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [registerName, setRegisterName] = useState("")

  // Tour Booking Form State
  const [bookingName, setBookingName] = useState("")
  const [bookingEmail, setBookingEmail] = useState("")
  const [bookingDate, setBookingDate] = useState("")
  const [bookingMsg, setBookingMsg] = useState("")
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)

  // Payment Form State
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvc, setCardCvc] = useState("")
  const [isPaymentSubmitting, setIsPaymentSubmitting] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  // Sync state if user changes modal or opens a property
  useEffect(() => {
    setBookingSuccess(false)
    setPaymentSuccess(false)
    setIsBookingSubmitting(false)
    setIsPaymentSubmitting(false)
    setBookingName(currentUser ? currentUser.name : "")
    setBookingEmail(currentUser ? currentUser.email : "")
    setBookingDate("")
    setBookingMsg("")
  }, [activeModal, selectedProperty, currentUser])

  if (!activeModal && !toast) return null

  // Closures
  const closeModal = () => {
    setActiveModal(null)
  }

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    if (!bookingName || !bookingEmail || !bookingDate) {
      showToast("Please fill in all required fields", "error")
      return
    }
    setIsBookingSubmitting(true)
    setTimeout(() => {
      setIsBookingSubmitting(false)
      setBookingSuccess(true)
      showToast("Tour scheduled successfully!", "success")
    }, 1500)
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    if (!cardNumber || !cardExpiry || !cardCvc) {
      showToast("Please fill in all payment fields", "error")
      return
    }
    setIsPaymentSubmitting(true)
    setTimeout(() => {
      setIsPaymentSubmitting(false)
      setPaymentSuccess(true)
      showToast("Plan subscribed successfully!", "success")
      setTimeout(() => {
        closeModal()
      }, 2000)
    }, 2000)
  }

  const handleAuthSubmit = (e) => {
    e.preventDefault()
    if (loginTab === "login") {
      if (!username || !password) {
        showToast("Please enter username and password", "error")
        return
      }
      handleLogin(username)
    } else {
      if (!registerName || !email || !password) {
        showToast("Please fill in all registration fields", "error")
        return
      }
      handleLogin(registerName)
    }
  }

  const renderModalContent = () => {
    switch (activeModal) {
      case "login":
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
                <button type="submit" className="btn1" style={{ width: "100%", marginTop: "15px", padding: "12px", border: "none" }}>
                  {loginTab === "login" ? "Sign In" : "Create Account"}
                </button>
              </form>
            </div>
          </div>
        )

      case "details":
        if (!selectedProperty) return null
        return (
          <div className="modal-content wide">
            <button className="modal-close" onClick={closeModal}>
              <i className="fa fa-times"></i>
            </button>
            <div className="modal-body">
              <img src={selectedProperty.cover} alt={selectedProperty.name} className="prop-modal-cover" />
              <div className="prop-modal-meta">
                <span
                  className="prop-modal-category"
                  style={{
                    background: selectedProperty.category === "For Sale" ? "#25b5791a" : "#ff98001a",
                    color: selectedProperty.category === "For Sale" ? "#25b579" : "#ff9800",
                  }}
                >
                  {selectedProperty.category}
                </span>
                <span className="prop-modal-price">{selectedProperty.price}</span>
              </div>
              <h3 className="prop-modal-title">{selectedProperty.name}</h3>
              <p className="prop-modal-address">
                <i className="fa fa-location-dot"></i> {selectedProperty.location}
              </p>

              <div className="prop-modal-specs">
                <div className="spec-item">
                  <i className="fa fa-bed"></i>
                  <span>Bedrooms</span>
                  <strong>{selectedProperty.id % 2 === 0 ? "3 Beds" : "4 Beds"}</strong>
                </div>
                <div className="spec-item">
                  <i className="fa fa-bath"></i>
                  <span>Bathrooms</span>
                  <strong>{selectedProperty.id % 2 === 0 ? "2 Baths" : "3 Baths"}</strong>
                </div>
                <div className="spec-item">
                  <i className="fa fa-ruler-combined"></i>
                  <span>Area</span>
                  <strong>{selectedProperty.id % 2 === 0 ? "1,200 sqft" : "1,850 sqft"}</strong>
                </div>
                <div className="spec-item">
                  <i className="fa-solid fa-calendar-days"></i>
                  <span>Year Built</span>
                  <strong>2021</strong>
                </div>
              </div>

              <h4 className="prop-modal-section-title">Description</h4>
              <p className="prop-modal-desc">
                This beautiful {selectedProperty.type.toLowerCase()} located in the heart of {selectedProperty.location.split(",")[1] || "the city"} offers a modern lifestyle with state-of-the-art facilities. Featuring spacious living rooms, gourmet kitchens, and automated temperature controls, this property is perfect for families looking for comfort and convenience.
              </p>

              <h4 className="prop-modal-section-title">Amenities</h4>
              <div className="amenities-grid">
                <span className="amenity-tag"><i className="fa fa-wifi"></i> High-Speed WiFi</span>
                <span className="amenity-tag"><i className="fa fa-snowflake"></i> Air Conditioning</span>
                <span className="amenity-tag"><i className="fa-solid fa-square-parking"></i> Dedicated Parking</span>
                <span className="amenity-tag"><i className="fa-solid fa-water-ladder"></i> Swimming Pool</span>
                <span className="amenity-tag"><i className="fa-solid fa-dumbbell"></i> In-house Gym</span>
                <span className="amenity-tag"><i className="fa-solid fa-shield-halved"></i> 24/7 Security</span>
              </div>

              <h4 className="prop-modal-section-title">Schedule a Visit</h4>
              {bookingSuccess ? (
                <div className="success-msg">
                  <i className="fa-solid fa-circle-check success-icon" style={{ display: "block" }}></i>
                  <h3>Tour Scheduled!</h3>
                  <p>Our representative will contact you at {bookingEmail} within 24 hours.</p>
                </div>
              ) : (
                <form className="booking-form" onSubmit={handleBookingSubmit}>
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={bookingEmail}
                      onChange={(e) => setBookingEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Preferred Date *</label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Custom Message</label>
                    <textarea
                      rows="3"
                      placeholder="Ask the agent a question..."
                      value={bookingMsg}
                      onChange={(e) => setBookingMsg(e.target.value)}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn5" style={{ width: "100%", background: "#27ae60", color: "#fff", border: "none", padding: "12px", cursor: "pointer" }} disabled={isBookingSubmitting}>
                    {isBookingSubmitting ? (
                      <>
                        <span className="spinner"></span> Booking Tour...
                      </>
                    ) : (
                      "Book Free Tour Visit"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        )

      case "checkout":
        if (!selectedPlan) return null
        return (
          <div className="modal-content narrow">
            <button className="modal-close" onClick={closeModal}>
              <i className="fa fa-times"></i>
            </button>
            <div className="modal-body">
              <h3 style={{ marginBottom: "15px", color: "#2d3436" }}>Subscribe to Plan</h3>
              <div style={{ background: "#f8f9fa", padding: "15px", borderRadius: "8px", marginBottom: "20px", textAlign: "center" }}>
                <h4 style={{ color: "#27ae60", fontSize: "20px", marginBottom: "5px" }}>{selectedPlan.plan} Plan</h4>
                <p style={{ fontSize: "28px", fontWeight: "700", color: "#2d3436" }}>${selectedPlan.price}<span style={{ fontSize: "14px", fontWeight: "normal", color: "#7f8c8d" }}>/month</span></p>
              </div>

              {paymentSuccess ? (
                <div className="success-msg">
                  <i className="fa-solid fa-circle-check success-icon" style={{ display: "block" }}></i>
                  <h3>Subscription Complete!</h3>
                  <p>Welcome to {selectedPlan.plan} plan. Your receipt has been sent to your email.</p>
                </div>
              ) : (
                <form onSubmit={handlePaymentSubmit}>
                  <div className="form-group">
                    <label>Cardholder Name</label>
                    <input type="text" placeholder="Enter name on card" required />
                  </div>
                  <div className="form-group">
                    <label>Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9101 1121"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      maxLength="19"
                      required
                    />
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label>Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        maxLength="5"
                        required
                      />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label>CVC / CVV</label>
                      <input
                        type="password"
                        placeholder="123"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        maxLength="3"
                        required
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn1" style={{ width: "100%", marginTop: "15px", padding: "12px", border: "none" }} disabled={isPaymentSubmitting}>
                    {isPaymentSubmitting ? (
                      <>
                        <span className="spinner"></span> Processing...
                      </>
                    ) : (
                      `Pay $${selectedPlan.price} & Subscribe`
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        )

      case "mylist":
        const favoritedProps = list.filter((item) => favorites.includes(item.id))
        return (
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              <i className="fa fa-times"></i>
            </button>
            <div className="modal-body">
              <h3 style={{ marginBottom: "20px", color: "#2d3436" }}><i className="fa-solid fa-heart" style={{ color: "#ff385c", marginRight: "10px" }}></i>My Bookmarks / Favorites</h3>
              {favoritedProps.length === 0 ? (
                <div style={{ textAlign: "center", padding: "30px 10px", color: "#7f8c8d" }}>
                  <i className="fa-regular fa-folder-open" style={{ fontSize: "50px", marginBottom: "15px", display: "block" }}></i>
                  <p>You haven't favorited any properties yet.</p>
                </div>
              ) : (
                <div className="mylist-grid">
                  {favoritedProps.map((item) => (
                    <div className="mylist-item" key={item.id}>
                      <img src={item.cover} alt={item.name} className="mylist-img" />
                      <div className="mylist-details">
                        <h4>{item.name}</h4>
                        <p><i className="fa fa-location-dot" style={{ color: "#27ae60" }}></i> {item.location}</p>
                        <span>{item.price}</span>
                      </div>
                      <div className="mylist-actions">
                        <button
                          type="button"
                          className="btn-view"
                          onClick={() => {
                            setSelectedProperty(item)
                            setActiveModal("details")
                          }}
                        >
                          View
                        </button>
                        <button type="button" className="btn-remove" onClick={() => toggleFavorite(item.id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <>
      {/* Toast Alert */}
      {toast && (
        <div className="toast-container">
          <div className={`toast-alert ${toast.type}`}>
            <span className="toast-icon">
              {toast.type === "success" && <i className="fa-solid fa-circle-check"></i>}
              {toast.type === "info" && <i className="fa-solid fa-circle-info"></i>}
              {toast.type === "error" && <i className="fa-solid fa-circle-exclamation"></i>}
            </span>
            <span className="toast-msg">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Modal Overlay */}
      {activeModal && (
        <div className="modal-overlay" onClick={(e) => e.target.classList.contains("modal-overlay") && closeModal()}>
          {renderModalContent()}
        </div>
      )}
    </>
  )
}

export default Modal
