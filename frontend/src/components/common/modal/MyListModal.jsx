import React from "react"
import { list } from "../../data/Data"

const MyListModal = ({ favorites, toggleFavorite, closeModal, setSelectedProperty, setActiveModal }) => {
  const favoritedProps = list.filter((item) => favorites.includes(item.id))

  return (
    <div className="modal-content">
      <button className="modal-close" onClick={closeModal}>
        <i className="fa fa-times"></i>
      </button>
      <div className="modal-body">
        <h3 style={{ marginBottom: "20px", color: "#2d3436" }}>
          <i className="fa-solid fa-heart" style={{ color: "#ff385c", marginRight: "10px" }}></i>
          My Bookmarks / Favorites
        </h3>
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
                  <p>
                    <i className="fa fa-location-dot" style={{ color: "#27ae60" }}></i> {item.location}
                  </p>
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
}

export default MyListModal