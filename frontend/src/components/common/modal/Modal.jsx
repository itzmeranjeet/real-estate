import React, { useContext, useEffect } from "react"
import { AppContext } from "../../../context/AppContext"
import Toast from "./Toast"
import LoginModal from "./LoginModal"
import PropertyDetailsModal from "./PropertyDetailsModal"
import CheckoutModal from "./CheckoutModal"
import MyListModal from "./MyListModal"
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

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:5000/api/test")
      const data = await res.json()
      console.log(data)
    }

    fetchData()
  }, [])

  if (!activeModal && !toast) return null

  const closeModal = () => {
    setActiveModal(null)
  }

  const renderModalContent = () => {
    switch (activeModal) {
      case "login":
        return <LoginModal closeModal={closeModal} handleLogin={handleLogin} showToast={showToast} />

      case "details":
        return (
          <PropertyDetailsModal
            selectedProperty={selectedProperty}
            currentUser={currentUser}
            closeModal={closeModal}
            showToast={showToast}
          />
        )

      case "checkout":
        return <CheckoutModal selectedPlan={selectedPlan} closeModal={closeModal} showToast={showToast} />

      case "mylist":
        return (
          <MyListModal
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            closeModal={closeModal}
            setSelectedProperty={setSelectedProperty}
            setActiveModal={setActiveModal}
          />
        )

      default:
        return null
    }
  }

  return (
    <>
      <Toast toast={toast} />

      {activeModal && (
        <div
          className="modal-overlay"
          onClick={(e) => e.target.classList.contains("modal-overlay") && closeModal()}
        >
          {renderModalContent()}
        </div>
      )}
    </>
  )
}

export default Modal