import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './AnalysisResults.css'

function AnalysisResults() {
  const location = useLocation()
  const navigate = useNavigate()
  
  // Initialize state with data from navigation or default values
  const [analysisData, setAnalysisData] = useState(
    location.state?.analysisData || {
      productName: 'Codedex.io',
      productDescription: 'The "Learn Node.js" course is designed for intermediate learners...',
      demographics: {
        age: '18-32',
        gender: 'Female',
        location: 'English Speaking Countries',
        occupation: 'College Student, Software Engineer',
        interests: 'Computer Science, Full-stack Development'
      }
    }
  )

  const handleChange = (field, value) => {
    if (field.includes('.')) {
      // Handle nested demographics fields
      const [parent, child] = field.split('.')
      setAnalysisData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      // Handle top-level fields
      setAnalysisData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleMatchCreators = async () => {
    try {
      const response = await fetch('/api/match-creators', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(analysisData),
      })
      navigate('/influencer-selection')//, { state: { creators: result } })
      if (response.ok) {
        const result = await response.json()
        // Navigate to the influencer selection page
        //navigate('/influencer-selection', { state: { creators: result } })
      } else {
        console.error('Matching failed')
      }
    } catch (error) {
      console.error('Error matching creators:', error)
    }
  }

  return (
    <div className="results-container">
      <div className="results-content">
        <section className="result-section">
          <h2>Product name</h2>
          <input
            type="text"
            className="info-box editable"
            value={analysisData.productName}
            onChange={(e) => handleChange('productName', e.target.value)}
          />
        </section>

        <section className="result-section">
          <h2>Product description</h2>
          <textarea
            className="info-box description editable"
            value={analysisData.productDescription}
            onChange={(e) => handleChange('productDescription', e.target.value)}
          />
        </section>

        <section className="result-section">
          <h2>Target audience demographics</h2>
          <div className="demographics">
            <div className="demo-row">
              <div className="demo-item">
                <span className="demo-label">Age</span>
                <input
                  type="text"
                  className="demo-value editable"
                  value={analysisData.demographics.age}
                  onChange={(e) => handleChange('demographics.age', e.target.value)}
                />
              </div>
              <div className="demo-item">
                <span className="demo-label">Gender</span>
                <input
                  type="text"
                  className="demo-value editable"
                  value={analysisData.demographics.gender}
                  onChange={(e) => handleChange('demographics.gender', e.target.value)}
                />
              </div>
              <div className="demo-item">
                <span className="demo-label">Location</span>
                <input
                  type="text"
                  className="demo-value editable"
                  value={analysisData.demographics.location}
                  onChange={(e) => handleChange('demographics.location', e.target.value)}
                />
              </div>
            </div>
            
            <div className="demo-item full-width">
              <span className="demo-label">Occupation</span>
              <input
                type="text"
                className="demo-value editable"
                value={analysisData.demographics.occupation}
                onChange={(e) => handleChange('demographics.occupation', e.target.value)}
              />
            </div>
            
            <div className="demo-item full-width">
              <span className="demo-label">Interests</span>
              <input
                type="text"
                className="demo-value editable"
                value={analysisData.demographics.interests}
                onChange={(e) => handleChange('demographics.interests', e.target.value)}
              />
            </div>
          </div>
        </section>

        <button className="match-creators-btn" onClick={handleMatchCreators}>
          Match Creators
        </button>
      </div>
    </div>
  )
}

export default AnalysisResults