import React, { useEffect, useState } from 'react';
import style from "./Quran.module.css";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Quran() {
  const [surah, setSurah] = useState([]);
  const navigate = useNavigate();

  const getSurah = async () => {
    let res = await axios.get(`https://api.alquran.cloud/v1/surah`);
    setSurah(res.data.data);
  };

  useEffect(() => {
    getSurah();
  }, []);

  // 🟢 Navigate to last bookmarked ayah
  const goToBookmark = () => {
    const saved = JSON.parse(localStorage.getItem("lastReadAyah"));
    if (saved) {
      navigate(`/surahDetails/${saved.surahNum}#ayah-${saved.ayahNumber}`);
    } else {
      alert("لا توجد مرجعية محفوظة بعد 🌙");
    }
  };

   if (!surah) {
    return (
      <div className="spin d-flex justify-content-center align-items-center mt-5 pt-5">
        <i className="fa-solid fa-mosque fa-spin fa-5x mt-5 pt-5"></i>
      </div>
    );
  }

  return (
    <div className={style.allSection}>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-md-12  m-auto text-center">
            <div className={`${style.head} p-3 rounded-3`}>
              <h3>بسم الله الرحمن الرحيم</h3>
              <div className={style.ayahDecor}>
                <span className={style.decor}>۞</span>
                <h1>ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ</h1>
                <span className={style.decor}>۞</span>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div
              className="reference d-flex justify-content-end align-items-center mt-3"
              style={{ cursor: "pointer" }}
              onClick={goToBookmark}
            >
              <h3>
                <i className="fa-solid fa-bookmark text-success"></i>
              </h3>
              <h3 className="">الذهاب إلى آخر آية تمت قراءتها</h3>
            </div>

            {surah.map((surahItem) => (
              <Link
                key={surahItem.number}
                className="text-decoration-none"
                to={`/surahDetails/${surahItem.number}`}
              >
                <div className={`${style.surah} rounded-2`}>
                  <div className="d-flex justify-content-end">
                    <h4>
                      {surahItem.numberOfAyahs > 9 ? "آية" : "آيات"}{" "}
                      {surahItem.numberOfAyahs}
                    </h4>
                  </div>

                  <div className="d-flex justify-content-end">
                    <h4 className="me-3">{surahItem.name}</h4>
                    <h4>{surahItem.number}</h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
