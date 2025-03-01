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
      },
      campaign: {
        goal: '',
        timeline: '',
        budget: '',
        keyMessage: 'College Student, Software Engineer',
        additionalInfo: 'Computer Science, Full-stack Development'
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
          <div className="result-section-content">
            <input
              type="text"
              className="info-box editable"
              value={analysisData.productName}
              onChange={(e) => handleChange('productName', e.target.value)}
            />
          </div>
        </section>

        <section className="result-section">
          <h2>Product description</h2>
          <div className="result-section-content">
            <textarea
              className="info-box description editable"
              value={analysisData.productDescription}
              onChange={(e) => handleChange('productDescription', e.target.value)}
            />
          </div>
        </section>
        
        <section className="result-section">
          <h2>Campaign Analysis</h2>
          <div className="result-section-content">
            <div className="campaign-analysis">
              <div className="campaign-row">
                <div className="campaign-item">
                  <span className="campaign-label">Goal</span>
                  <input
                    type="text"
                    className="campaign-value editable"
                    value={analysisData.campaign.goal}
                    onChange={(e) => handleChange('campaign.goal', e.target.value)}
                    placeholder="Enter campaign goal"
                  />
                </div>
                <div className="campaign-item">
                  <span className="campaign-label">Timeline</span>
                  <input
                    type="text"
                    className="campaign-value editable"
                    value={analysisData.campaign.timeline}
                    onChange={(e) => handleChange('campaign.timeline', e.target.value)}
                    placeholder="Enter campaign timeline"
                  />
                </div>
                <div className="campaign-item">
                  <span className="campaign-label">Budget</span>
                  <input
                    type="text"
                    className="campaign-value editable"
                    value={analysisData.campaign.budget}
                    onChange={(e) => handleChange('campaign.budget', e.target.value)}
                    placeholder="Enter campaign budget"
                  />
                </div>
              </div>
              
              <div className="campaign-item full-width">
                <span className="campaign-label">Key Message</span>
                <input
                  type="text"
                  className="campaign-value editable"
                  value={analysisData.campaign.keyMessage}
                  onChange={(e) => handleChange('campaign.keyMessage', e.target.value)}
                  placeholder="Enter key message"
                />
              </div>
              
              <div className="campaign-item full-width">
                <span className="campaign-label">Additional Information</span>
                <textarea
                  className="campaign-value editable campaign-textarea"
                  value={analysisData.campaign.additionalInfo}
                  onChange={(e) => handleChange('campaign.additionalInfo', e.target.value)}
                  placeholder="Enter additional information"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="result-section">
          <h2>Target audience demographics</h2>
          <div className="result-section-content">
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