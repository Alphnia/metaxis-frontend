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
        additionalInfo: {
          "freeTrial": "1 month free trial available after contract signing",
          "videoAssets": {
              "finishedVideoAd": "30 seconds",
              "additionalHooks": [
                  {
                      "duration": "5-7 seconds",
                      "hook": "This app just turned hours of video editing into seconds \u2013 don\u2019t believe me?"
                  },
                  {
                      "duration": "5-7 seconds",
                      "hook": "Imagine editing a video without actually editing."
                  }
              ],
              "rawFiles": "Folder with raw files and B-roll will be provided if possible"
          },
          "videoSpecifications": {
              "length": "45 seconds",
              "language": "English",
              "visualStyle": "Energetic, modern, relatable, visually polished"
          }
      }
      }
    }
  )

  // 格式化 JSON 对象为带有 bullet points 的文本
  const formatJsonToText = (obj, level = 0) => {
    if (typeof obj !== 'object' || obj === null) {
      return obj?.toString() || ''
    }

    return Object.entries(obj).map(([key, value]) => {
      const indent = '  '.repeat(level)
      const bullet = level === 0 ? '• ' : '- '
      
      if (typeof value === 'object' && value !== null) {
        return `${indent}${bullet}${key}:\n${formatJsonToText(value, level + 1)}`
      }
      
      return `${indent}${bullet}${key}: ${value}`
    }).join('\n')
  }

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
      // 打印要发送的数据
      console.log('Sending data to server:', analysisData)

      const response = await fetch('/api/match-creators', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(analysisData),
      })

      // 打印响应状态
      console.log('Server response status:', response.status)

      if (!response.ok) {
        // 尝试读取错误信息
        const errorText = await response.text()
        console.error('Server error response:', errorText)
        throw new Error(`Server responded with status ${response.status}: ${errorText}`)
      }

      const result = await response.json()
      console.log('Server response data:', result)
      
      navigate('/influencer-selection')
    } catch (error) {
      console.error('Error in handleMatchCreators:', error)
      // 这里可以添加错误提示UI
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
                  value={typeof analysisData.campaign.additionalInfo === 'object' 
                    ? formatJsonToText(analysisData.campaign.additionalInfo)
                    : analysisData.campaign.additionalInfo}
                  onChange={(e) => handleChange('campaign.additionalInfo', e.target.value)}
                  placeholder="Enter additional information"
                  readOnly={typeof analysisData.campaign.additionalInfo === 'object'}
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