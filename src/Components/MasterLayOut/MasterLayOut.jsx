import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../LayOutComp/Nav/Nav'
// import style from "../../index.css"

export default function MasterLayOut() {
  return (
    <>
   <div className={`vh-100`}>
     <Nav/>
    <Outlet/>
   </div>
      
    </>
  )
}
