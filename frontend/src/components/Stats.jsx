import './Stats.css'

function Stats({ stats }) {
  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="stat-label">Összes</div>
        <div className="stat-value">{stats.total}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Megvan</div>
        <div className="stat-value">{stats.owned}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Végzettség</div>
        <div className="stat-value">{stats.percentage}%</div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${stats.percentage}%` }}></div>
        </div>
      </div>
    </div>
  )
}

export default Stats
