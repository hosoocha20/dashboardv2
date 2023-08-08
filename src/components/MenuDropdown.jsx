import React from 'react'
import { SidebarData } from '../Data/Data'

const MenuDropdown = ({handleTabChange, selected, openDropdownMenu, handleHamburgerOnClick, imptTaskCount, taskCount}) => {
  return (
    <div className={openDropdownMenu ? "menu-dropdown dropdown-toggle" : "menu-dropdown"}>
        <div className="hamburger" onClick={()=>handleHamburgerOnClick()}>
        
                <div className="hamburger-line line1"></div>
                <div className="hamburger-line line2"></div>
                <div className="hamburger-line line3"></div>
        </div>
    {SidebarData.map((item, index)=>{
        return (
            <div className={selected===index? 'menuItem-dropdown active-dropdown': 'menuItem-dropdown'}
            key={index}
            onClick={()=>handleTabChange(index, item.bg)}
            >
                {/* <item.icon  color={selected===index? 'black': 'white'}/> */}
                <item.icon  color={'#4169a2'}/>
                {/* <span className={selected ===index? "tabHeading activeHeading" : "tabHeading"}>
                    {item.heading}
                </span> */}
                <span className="tabHeading-dropdown">
                    {item.heading}
                </span>
            </div>
        )
    })}
</div>
  )
}

export default MenuDropdown