import React from "react";
import { useNavigate } from "react-router-dom";

export default function BookmarkButton() {
  const navigate = useNavigate();

  const handleGoToBookmark = () => {
    const savedBookmark = JSON.parse(localStorage.getItem("bookmark"));
    if (savedBookmark) {
      navigate(`/surah/${savedBookmark.surahNumber}`, { state: savedBookmark });
    } else {
      alert("لم يتم تحديد مرجعية بعد 📖");
    }
  };

  return (
    <button
      onClick={handleGoToBookmark}
      className="btn btn-warning d-flex align-items-center gap-2"
    >
      <i className="fa-solid fa-bookmark"></i>
      <span>الرجوع إلى آخر آية مقروءة</span>
    </button>
  );
}
