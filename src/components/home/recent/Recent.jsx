import React, { useContext } from "react"
import Heading from "../../common/Heading"
import { AppContext } from "../../../context/AppContext"
import { list } from "../../data/Data"
import RecentCard from "./RecentCard"
import "./recent.css"

const Recent = () => {
  const { filters, resetFilters } = useContext(AppContext)

  const isFiltered = filters.location || filters.propertyType || filters.priceRange

  const filteredList = list.filter((val) => {
    if (filters.location && !val.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false
    }
    if (filters.propertyType && val.type !== filters.propertyType) {
      return false
    }
    if (filters.priceRange) {
      const numericPrice = parseInt(val.price.replace(/[^0-9]/g, ""), 10)
      if (filters.priceRange === "under-4000" && numericPrice >= 4000) return false
      if (filters.priceRange === "4000-7000" && (numericPrice < 4000 || numericPrice > 7000)) return false
      if (filters.priceRange === "over-7000" && numericPrice <= 7000) return false
    }
    return true
  })

  return (
    <>
      <section className='recent padding'>
        <div className='container'>
          <Heading title='Recent Property Listed' subtitle='Find detailed listings of real estate properties matching standard amenities, pricing plans, and locations.' />
          
          {isFiltered && (
            <div className="filter-info-badge">
              <p>Showing <span>{filteredList.length}</span> properties matching your search.</p>
              <button className="btn-clear-filters" onClick={resetFilters}>
                <i className="fa-solid fa-xmark"></i> Clear Filters
              </button>
            </div>
          )}

          <RecentCard filteredList={filteredList} />
        </div>
      </section>
    </>
  )
}

export default Recent
