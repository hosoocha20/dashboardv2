import React from 'react'
import Cards from './Cards'
import WelcomeCard from './WelcomeCard'
import './MainDash.css'

function MainDash() {
  return (
    <div className="MainDash">
        <h1>Dashboard</h1>
        <WelcomeCard />
        <Cards/>
    </div>
  )
}

export default MainDash