import React, { useContext, useState, useEffect } from "react"
import Heading from "../../common/Heading"
import { AppContext } from "../../../context/AppContext"
import "./hero.css"

const Hero = () => {
  const { filters, setFilters, resetFilters } = useContext(AppContext)

  // Local state for dropdown selects
  const [location, setLocation] = useState(filters.location)
  const [propertyType, setPropertyType] = useState(filters.propertyType)
  const [priceRange, setPriceRange] = useState(filters.priceRange)

  // Keep local state in sync when global filters reset
  useEffect(() => {
    setLocation(filters.location)
    setPropertyType(filters.propertyType)
    setPriceRange(filters.priceRange)
  }, [filters])

  const handleSearch = (e) => {
    e.preventDefault()
    setFilters({
      location,
      propertyType,
      priceRange,
    })

    // Scroll to the recent properties section
    const recentSection = document.querySelector(".recent")
    if (recentSection) {
      recentSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleReset = () => {
    resetFilters()
  }

  const isFiltered = filters.location || filters.propertyType || filters.priceRange

  return (
    <>
      <section className='hero'>
        <div className='container'>
          <Heading title='Search Your Next Home ' subtitle='Find new & featured property located in your local city.' />

          <form className='flex' onSubmit={handleSearch}>
            <div className='box'>
              <span>City/Country</span>
              <select value={location} onChange={(e) => setLocation(e.target.value)}>
                <option value="">All Locations</option>
                <option value="Canada">Canada</option>
                <option value="NewYork">New York</option>
                <option value="USA">USA</option>
                <option value="London">London</option>
              </select>
            </div>
            <div className='box'>
              <span>Property Type</span>
              <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                <option value="">All Types</option>
                <option value="Apartment">Apartment</option>
                <option value="Condos">Condos</option>
                <option value="Offices">Offices</option>
                <option value="Homes & Villas">Homes & Villas</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>
            <div className='box'>
              <span>Price Range</span>
              <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                <option value="">All Prices</option>
                <option value="under-4000">Under $4,000</option>
                <option value="4000-7000">$4,000 - $7,000</option>
                <option value="over-7000">Over $7,000</option>
              </select>
            </div>
            <div className='box' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {isFiltered ? (
                <h4 onClick={handleReset} style={{ color: "#e74c3c", cursor: "pointer" }}>
                  <i className="fa-solid fa-arrow-rotate-left" style={{ marginRight: '5px' }}></i> Reset
                </h4>
              ) : (
                <h4 style={{ color: "#7f8c8d", cursor: "default" }}>Advance Filter</h4>
              )}
            </div>
            <button type="submit" className='btn1' style={{ border: "none" }}>
              <i className='fa fa-search'></i>
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Hero
