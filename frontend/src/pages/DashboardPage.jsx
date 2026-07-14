import { useState, useEffect } from 'react'
import axios from 'axios'
import SpriteGrid from '../components/SpriteGrid'
import Stats from '../components/Stats'
import './DashboardPage.css'

function DashboardPage({ user, token, onLogout }) {
  const [sprites, setSprites] = useState([])
  const [collection, setCollection] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ total: 0, owned: 0, percentage: 0 })

  const categories = [
    { value: 'all', label: 'Összes' },
    { value: 'skin', label: 'Skinok' },
    { value: 'back_bling', label: 'Back Blings' },
    { value: 'pickaxe', label: 'Csákányok' },
    { value: 'glider', label: 'Csúszdák' },
    { value: 'emote', label: 'Emojiok' }
  ]

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const spritesRes = await axios.get('/api/sprites')
      setSprites(spritesRes.data)

      const collectionRes = await axios.get('/api/collections', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setCollection(collectionRes.data)

      const statsRes = await axios.get('/api/collections/stats', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setStats(statsRes.data)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleSprite = async (spriteId) => {
    try {
      await axios.post(`/api/collections/toggle/${spriteId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      loadData()
    } catch (error) {
      console.error('Error toggling sprite:', error)
    }
  }

  const filteredSprites = selectedCategory === 'all' 
    ? sprites 
    : sprites.filter(s => s.category === selectedCategory)

  const getOwnedStatus = (spriteId) => {
    const item = collection.find(c => c.spriteId._id === spriteId)
    return item?.owned || false
  }

  if (loading) {
    return (
      <div className="dashboard">
        <div className="nav">
          <div className="nav-container">
            <div className="nav-left"><h1>🎮 Fortnite Sprite Tracker</h1></div>
          </div>
        </div>
        <div className="loading">Betöltés...</div>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <div className="nav">
        <div className="nav-container">
          <div className="nav-left"><h1>🎮 Fortnite Sprite Tracker</h1></div>
          <div className="nav-right">
            <div className="user-info">
              <p>Üdv, <strong>{user.username}</strong>!</p>
            </div>
            <button className="logout-btn" onClick={onLogout}>Kijelentkezés</button>
          </div>
        </div>
      </div>

      <div className="container">
        <Stats stats={stats} />

        <div className="filters">
          <h3>Szűrés:</h3>
          <div className="category-buttons">
            {categories.map(cat => (
              <button
                key={cat.value}
                className={`filter-btn ${selectedCategory === cat.value ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <SpriteGrid 
          sprites={filteredSprites} 
          onToggle={handleToggleSprite}
          isOwned={getOwnedStatus}
        />
      </div>
    </div>
  )
}

export default DashboardPage
