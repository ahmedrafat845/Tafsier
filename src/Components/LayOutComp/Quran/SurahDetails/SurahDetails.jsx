import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./SurahDetails.module.css";
import tafseerData from "../../../../assets/tafseer.json"; // ✅ تأكد إن المسار صحيح

export default function SurahDetails() {
  const { num } = useParams();
  const [surah, setSurh] = useState(null);
  const [bookmarkedAyah, setBookmarkedAyah] = useState(null);
  const [openTafseer, setOpenTafseer] = useState(null);

  const getSurahDetails = async () => {
    try {
      const res = await axios.get(`https://api.alquran.cloud/v1/surah/${num}/ar`);
      setSurh(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSurahDetails();

    const saved = JSON.parse(localStorage.getItem("lastReadAyah"));
    if (saved && saved.surahNum === Number(num)) {
      setBookmarkedAyah(saved.ayahNumber);
    }
  }, [num]);

  useEffect(() => {
    if (surah && bookmarkedAyah) {
      const element = document.getElementById(`ayah-${bookmarkedAyah}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.classList.add(style.highlight);
        setTimeout(() => element.classList.remove(style.highlight), 3000);
      }
    }
  }, [surah, bookmarkedAyah]);

  const toggleBookmark = (ayahNumber) => {
    if (bookmarkedAyah === ayahNumber) {
      localStorage.removeItem("lastReadAyah");
      setBookmarkedAyah(null);
    } else {
      setBookmarkedAyah(ayahNumber);
      const bookmarkData = { surahNum: Number(num), ayahNumber };
      localStorage.setItem("lastReadAyah", JSON.stringify(bookmarkData));
    }
  };

  const showTafseer = (ayahNumber) => {
    setOpenTafseer(openTafseer === ayahNumber ? null : ayahNumber);
  };

  if (!surah) {
    return (
      <div className="spin d-flex justify-content-center align-items-center mt-5 pt-5">
        <i className="fa-solid fa-mosque fa-spin fa-5x mt-5 pt-5"></i>
      </div>
    );
  }

  return (
    <div className={style.surahDetailes}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className={`${style.head} p-3 rounded-3 text-center`}>
              <h5>{surah.name}</h5>
              <div className={style.ayahDecor}>
                <span className={style.decor}>۞</span>
                <h4>بسم الله الرحمن الرحيم</h4>
                <span className={style.decor}>۞</span>
              </div>
            </div>

            {surah.ayahs.map((ayah) => {
              const tafseerItem = tafseerData.find(
                (t) =>
                  Number(t.number) === Number(num) &&
                  Number(t.aya) === ayah.numberInSurah
              );

              return (
                <div key={ayah.number} className="">
                  <div
                    id={`ayah-${ayah.number}`}
                    className={`${style.surah} rounded-2 p-2 ${
                      bookmarkedAyah === ayah.number ? style.activeAyah : ""
                    }`}
                  >
                    <div className="d-flex justify-content-between align-items-center px-2">
                      <div
                        className={`${style.right}`}
                        onClick={() => showTafseer(ayah.numberInSurah)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className={style.num}>
                          <h5>{ayah.numberInSurah}</h5>
                        </div>
                        <div className="text">
                          <h5 className={`${style.aya} me-1`}>{ayah.text}</h5>
                        </div>
                      </div>

                      <div className="left me-3">
                        <div
                          className="bookmark"
                          onClick={() => toggleBookmark(ayah.number)}
                          style={{ cursor: "pointer" }}
                        >
                          <i
                            className={
                              bookmarkedAyah === ayah.number
                                ? "fa-solid fa-bookmark text-warning"
                                : "fa-regular fa-bookmark"
                            }
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ✅ التفسير يظهر بانتقال ناعم */}
                  <div
                    className={`${style.tafseerWrapper} ${
                      openTafseer === ayah.numberInSurah
                        ? style.showTafseer
                        : ""
                    }`}
                  >
                    <div className={style.tafseerBox}>
                      {tafseerItem
                        ? tafseerItem.text
                        : "لا يوجد تفسير متاح لهذه الآية."}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
