import React from 'react'
import CreatorCard from './CreatorCard'
import './InfluencerSelection.css'

// Mock data for demonstration
const mockCreators = [
  {
    id: 1,
    username: '@morilliu',
    avatar: '/default-avatar.png',
    stats: {
      instagram: '30.0k',
      tiktok: '30.0k'
    },
    contentTopics: ['Computer Science', 'Full-stack', 'JavaScript', 'Node.js', 'Python'],
    demographics: {
      age: '18-25',
      gender: '67% female',
      location: 'United States'
    },
    contact: {
      email: 'morilliu@example.com',
      telegram: '@morilliu_tg',
      whatsapp: '+1234567890'
    }
  },
  // Add more mock creators here...
  {
    id: 1,
    username: '@morilliu',
    avatar: '/default-avatar.png',
    stats: {
      instagram: '30.0k',
      tiktok: '30.0k'
    },
    contentTopics: ['Computer Science', 'Full-stack', 'JavaScript', 'Node.js', 'Python'],
    demographics: {
      age: '18-25',
      gender: '67% female',
      location: 'United States'
    },
    contact: {
      email: 'morilliu@example.com',
      telegram: '@morilliu_tg',
      whatsapp: '+1234567890'
    }
  },
  {
    id: 1,
    username: '@morilliu',
    avatar: '/default-avatar.png',
    stats: {
      instagram: '30.0k',
      tiktok: '30.0k'
    },
    contentTopics: ['Computer Science', 'Full-stack', 'JavaScript', 'Node.js', 'Python'],
    demographics: {
      age: '18-25',
      gender: '67% female',
      location: 'United States'
    },
    contact: {
      email: 'morilliu@example.com',
      telegram: '@morilliu_tg',
      whatsapp: '+1234567890'
    }
  },
]

function InfluencerSelection() {
  return (
    <div className="influencer-container">
      <h1 className="influencer-title">Influencer Selection</h1>
      <div className="creator-grid">
        {mockCreators.map((creator) => (
          <CreatorCard key={creator.id} creator={creator} />
        ))}
      </div>
    </div>
  )
}

export default InfluencerSelection