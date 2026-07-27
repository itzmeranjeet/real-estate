import React, { useState, useEffect } from "react"

const PropertyDetailsModal = ({ selectedProperty, user, closeModal, showToast }) => {
  const [bookingName, setBookingName] = useState("")
  const [bookingEmail, setBookingEmail] = useState("")
  const [bookingDate, setBookingDate] = useState("")
  const [bookingMsg, setBookingMsg] = useState("")
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)

  // Reset form whenever a different property is opened
  useEffect(() => {
    setBookingSuccess(false)
    setIsBookingSubmitting(false)
    setBookingName(user ? user.name : "")
    setBookingEmail(user ? user.email : "")
    setBookingDate("")
    setBookingMsg("")
  }, [selectedProperty, user])

  if (!selectedProperty) return null

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

  return (
    <div className="modal-content wide ">
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
          This beautiful {selectedProperty.type.toLowerCase()} located in the heart of{" "}
          {selectedProperty.location.split(",")[1] || "the city"} offers a modern lifestyle with
          state-of-the-art facilities. Featuring spacious living rooms, gourmet kitchens, and automated
          temperature controls, this property is perfect for families looking for comfort and convenience.
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
            <button
              type="submit"
              className="btn5"
              style={{ width: "100%", background: "#27ae60", color: "#fff", border: "none", padding: "12px", cursor: "pointer" }}
              disabled={isBookingSubmitting}
            >
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
}

export default PropertyDetailsModal