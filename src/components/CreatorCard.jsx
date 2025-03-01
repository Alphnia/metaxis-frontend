import React, { useState } from 'react'
import { Plus, Instagram, TwitterIcon as TikTok, Mail, MessageCircle, Phone } from 'lucide-react'
import './CreatorCard.css'

function CreatorCard({ creator }) {
  const [showContact, setShowContact] = useState(false)

  return (
    <div className="creator-card">
      <button 
        className="contact-button"
        onClick={() => setShowContact(!showContact)}
      >
        <span className="plus-icon">
          <Plus size={28} color="black" />
        </span>
      </button>
      
      {showContact && (
        <div className="contact-dropdown">
          <div className="contact-item">
            <Mail size={16} />
            <span>{creator.contact.email}</span>
          </div>
          <div className="contact-item">
            <MessageCircle size={16} />
            <span>{creator.contact.telegram}</span>
          </div>
          <div className="contact-item">
            <Phone size={16} />
            <span>{creator.contact.whatsapp}</span>
          </div>
        </div>
      )}

      <div className="creator-header">
        <img 
          src={creator.avatar || "/avatar.png"} 
          alt={creator.username}
          className="creator-avatar"
        />
        <div className="creator-info">
          <span className="creator-username">{creator.username}</span>
          <div className="creator-stats">
            <div className="stat">
              <Instagram size={16} />
              <span>{creator.stats.instagram}</span>
            </div>
            <div className="stat">
              <TikTok size={16} />
              <span>{creator.stats.tiktok}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="creator-section">
        <h3>Content Topics</h3>
        <div className="topics-list">
          {creator.contentTopics.map((topic, index) => (
            <span key={index} className="topic-tag">
              {topic}
            </span>
          ))}
        </div>
      </div>

      <div className="creator-section">
        <h3>Audience Demographics</h3>
        <div className="demographics-list">
          <div className="demographic-item">
            <span>Age: {creator.demographics.age}</span>
          </div>
          <div className="demographic-item">
            <span>Gender: {creator.demographics.gender}</span>
          </div>
          <div className="demographic-item">
            <span>Location: {creator.demographics.location}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatorCard