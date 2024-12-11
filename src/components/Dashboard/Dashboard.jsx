import React from 'react';
import '../../index.css'; 

const Dashboard = ({ user }) => {
  return (
    <main className="main-content">
      <div className="card">
        <h1>🌸 Welcome, {user.username}! 🌸</h1>
        <p>
          Welcome to your dashboard, where you and only you can easily keep 
          track of all your favorite scents and collections.
        </p>
      </div>
    </main>
  )
}

export default Dashboard
