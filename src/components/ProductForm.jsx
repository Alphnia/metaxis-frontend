import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ProductForm.css'

function ProductForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    productLink: '',
    additionalDetail: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/submit-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      // if (response.ok) {
        // const data = await response.json()
        // Navigate to results page with the analysis data
        navigate('/results')//, { state: { analysisData: data } }
      // } else {
      //   console.error('Submission failed')
      // }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <h2>Enter your product link :</h2>
          <input
            type="url"
            name="productLink"
            placeholder="Paste link"
            value={formData.productLink}
            onChange={handleChange}
            required
            className="link-input"
          />
        </div>
        
        <div className="form-group">
          <label>Additional Detail (optional)</label>
          <textarea
            name="additionalDetail"
            placeholder="Enter text"
            value={formData.additionalDetail}
            onChange={handleChange}
            className="detail-input"
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  )
}

export default ProductForm