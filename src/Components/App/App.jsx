import React from 'react'
import Nav from '../LayOutComp/Nav/Nav'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MasterLayOut from '../MasterLayOut/MasterLayOut'
import Home from '../LayOutComp/Home/Home'
import Tafsier from './../LayOutComp/Tafsier/Tafsier';
import Quran from '../LayOutComp/Quran/Quran'
import SurahDetails from '../LayOutComp/Quran/SurahDetails/SurahDetails'


export default function App() {

  let routes=createBrowserRouter([
    {path:'/',element:<MasterLayOut/>,children:[
      {index:true,element:<Home/>},
      {path:"quran",element:<Quran/>},
      {path:"surahDetails/:num",element:<SurahDetails/>},
      {path:"tafsier",element:<Tafsier/>},

    ]}
  ])




  return (
    <>
    <RouterProvider router={routes}/>
      
    </>
  )
}
