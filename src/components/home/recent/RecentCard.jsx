import React, { useContext } from "react"
import { AppContext } from "../../../context/AppContext"
import { list } from "../../data/Data"

const RecentCard = ({ filteredList }) => {
  const { favorites, toggleFavorite, setActiveModal, setSelectedProperty } = useContext(AppContext)

  const displayList = filteredList || list

  if (displayList.length === 0) {
    return (
      <div className="no-properties" style={{ textAlign: "center", padding: "50px 20px", color: "#7f8c8d", width: "100%", gridColumn: "1 / -1" }}>
        <i className="fa-regular fa-face-frown" style={{ fontSize: "50px", marginBottom: "15px", display: "block" }}></i>
        <h3>No Properties Found</h3>
        <p>Try resetting or adjusting your search filters to find what you're looking for.</p>
      </div>
    )
  }

  return (
    <>
      <div className='content grid3 mtop'>
        {displayList.map((val, index) => {
          const { id, cover, category, location, name, price, type } = val
          const isFav = favorites.includes(id)
          return (
            <div className='box shadow' key={index} onClick={() => {
              setSelectedProperty(val)
              setActiveModal("details")
            }}>
              <div className='img'>
                <img src={cover} alt='' />
              </div>
              <div className='text'>
                <div className='category flex'>
                  <span style={{ background: category === "For Sale" ? "#25b5791a" : "#ff98001a", color: category === "For Sale" ? "#25b579" : "#ff9800" }}>{category}</span>
                  <i 
                    className={`fa-heart ${isFav ? "fa-solid favorited" : "fa-regular"}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(id)
                    }}
                  ></i>
                </div>
                <h4>{name}</h4>
                <p>
                  <i className='fa fa-location-dot'></i> {location}
                </p>
              </div>
              <div className='button flex'>
                <div>
                  <button className='btn2'>{price}</button> <label htmlFor=''>/sqft</label>
                </div>
                <span>{type}</span>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default RecentCard
