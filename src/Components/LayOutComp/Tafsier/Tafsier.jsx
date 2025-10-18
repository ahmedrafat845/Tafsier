import React, { useEffect, useState } from "react";
import tafseerData from "../../../assets/tafseer.json"
import axios from "axios";


// https://api.alquran.cloud/v1/surah/${sura}/ar
export default function Tafsier() {

  const [surah, setSurah] = useState([]);

  let fetchData= async ()=>{
    let res= await axios.get("https://api.alquran.cloud/v1/surah/1/ar")
    setSurah(res.data.data.ayahs)
    console.log(res.data.data);
    
  }
  useEffect(() => {
    fetchData()
  }, []);
 

  
  return (
   <>


   </>

    

       
      
  );
}
