import React, { useState, useContext } from "react"
import img from "../images/pricing.jpg"
import Back from "../common/Back"
import { AppContext } from "../../context/AppContext"
import "./contact.css"

const Contact = () => {
  const { showToast } = useContext(AppContext)
  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !subject || !message) {
      showToast("Please fill in all fields", "error")
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      showToast("Request submitted successfully!", "success")
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
    }, 1500)
  }

  return (
    <>
      <section className='contact mb'>
        <Back name='Contact Us' title='Get Helps & Friendly Support' cover={img} />
        <div className='container'>
          <form className='shadow' onSubmit={handleSubmit}>
            <h4>Fillup The Form</h4> <br />
            <div>
              <input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required />
              <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <input type='text' placeholder='Subject' value={subject} onChange={(e) => setSubject(e.target.value)} required />
            <textarea cols='30' rows='10' placeholder='Your message...' value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
            <button type="submit" disabled={submitting}>
              {submitting ? (
                <>
                  <span className="spinner"></span> Submitting...
                </>
              ) : (
                "Submit Request"
              )}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Contact
