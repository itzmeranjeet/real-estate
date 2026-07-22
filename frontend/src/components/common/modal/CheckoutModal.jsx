import React, { useState, useEffect } from "react"

const CheckoutModal = ({ selectedPlan, closeModal, showToast }) => {
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvc, setCardCvc] = useState("")
  const [isPaymentSubmitting, setIsPaymentSubmitting] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  // Reset form whenever a different plan is opened
  useEffect(() => {
    setPaymentSuccess(false)
    setIsPaymentSubmitting(false)
    setCardNumber("")
    setCardExpiry("")
    setCardCvc("")
  }, [selectedPlan])

  if (!selectedPlan) return null

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

  return (
    <div className="modal-content narrow">
      <button className="modal-close" onClick={closeModal}>
        <i className="fa fa-times"></i>
      </button>
      <div className="modal-body">
        <h3 style={{ marginBottom: "15px", color: "#2d3436" }}>Subscribe to Plan</h3>
        <div style={{ background: "#f8f9fa", padding: "15px", borderRadius: "8px", marginBottom: "20px", textAlign: "center" }}>
          <h4 style={{ color: "#27ae60", fontSize: "20px", marginBottom: "5px" }}>{selectedPlan.plan} Plan</h4>
          <p style={{ fontSize: "28px", fontWeight: "700", color: "#2d3436" }}>
            ${selectedPlan.price}
            <span style={{ fontSize: "14px", fontWeight: "normal", color: "#7f8c8d" }}>/month</span>
          </p>
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
            <button
              type="submit"
              className="btn1"
              style={{ width: "100%", marginTop: "15px", padding: "12px", border: "none" }}
              disabled={isPaymentSubmitting}
            >
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
}

export default CheckoutModal