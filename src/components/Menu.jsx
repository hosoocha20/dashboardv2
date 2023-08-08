import React from 'react'
import { SidebarData } from '../Data/Data'

const Menu = ({handleTabChange, selected}) => {
  return (
        <div className="menu">
            {SidebarData.map((item, index)=>{
                return (
                    <div className={selected===index? 'menuItem active': 'menuItem'}
                    key={index}
                    onClick={()=>handleTabChange(index)}
                    >
                        {/* <item.icon  color={selected===index? 'black': 'white'}/> */}
                        <item.icon  color={'#4169a2'}/>
                        {/* <span className={selected ===index? "tabHeading activeHeading" : "tabHeading"}>
                            {item.heading}
                        </span> */}
                        <span className="tabHeading">
                            {item.heading}
                        </span>
                    </div>
                )
            })}
        </div>
  )
}

export default Menu