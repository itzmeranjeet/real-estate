import React, { createContext, useState, useEffect } from "react"

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("rentup_favorites")
    return saved ? JSON.parse(saved) : []
  })

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("rentup_user")
    return saved ? JSON.parse(saved) : null
  })

  const [filters, setFilters] = useState({
    location: "",
    propertyType: "",
    priceRange: "",
  })

  const [activeModal, setActiveModal] = useState(null) // 'login' | 'details' | 'checkout' | 'mylist'
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [selectedPlan, setSelectedPlan] = useState(null)

  const [toast, setToast] = useState(null) // { message: '', type: 'success' | 'error' | 'info' }

  useEffect(() => {
    localStorage.setItem("rentup_favorites", JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("rentup_user", JSON.stringify(currentUser))
    } else {
      localStorage.removeItem("rentup_user")
    }
  }, [currentUser])

  const showToast = (message, type = "success") => {
    setToast({ message, type })
  }

  // Clear toast after 3 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        showToast("Removed from My List", "info")
        return prev.filter((favId) => favId !== id)
      }

      showToast("Added to My List", "success")
      return [...prev, id]
    })
  }

  const handleLogin = (user) => {
    console.log("user", user)
    const loggedInUser = {
      name: user?.name || "Ikra",
      email: user?.email || "ikra@example.com",
    }



    setCurrentUser(loggedInUser)
    setActiveModal(null)
    showToast(`Welcome back, ${loggedInUser.name}!`, "success")
  }
  const handleLogout = () => {
    setCurrentUser(null)
    showToast("Logged out successfully", "info")
  }

  const resetFilters = () => {
    setFilters({
      location: "",
      propertyType: "",
      priceRange: "",
    })
  }

  return (
    <AppContext.Provider
      value={{
        favorites,
        toggleFavorite,
        currentUser,
        handleLogin,
        handleLogout,
        filters,
        setFilters,
        resetFilters,
        activeModal,
        setActiveModal,
        selectedProperty,
        setSelectedProperty,
        selectedPlan,
        setSelectedPlan,
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
