import SpriteCard from './SpriteCard'
import './SpriteGrid.css'

function SpriteGrid({ sprites, onToggle, isOwned }) {
  if (sprites.length === 0) {
    return <div className="empty-state">Nincs megjeleníthető sprite</div>
  }

  return (
    <div className="sprite-grid">
      {sprites.map(sprite => (
        <SpriteCard
          key={sprite._id}
          sprite={sprite}
          onToggle={() => onToggle(sprite._id)}
          owned={isOwned(sprite._id)}
        />
      ))}
    </div>
  )
}

export default SpriteGrid
