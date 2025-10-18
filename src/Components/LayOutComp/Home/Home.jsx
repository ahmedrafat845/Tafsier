import React from 'react';
import style from "./Home.module.css";
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className={style.home}>
      <div className={style.overlay}>
        <div className={style.content}>
          <h1 className={style.title}>تفسير القرآن الكريم</h1>
          <p className={style.caption}>
            موقع لتصفح سور القرآن الكريم مع إمكانية عرض تفسير كل آية بسهولة،
            مع تصميم بسيط وتجربة استخدام مريحة.
          </p>
          <ul className={style.features}>
            <li>📖 عرض جميع سور القرآن الكريم</li>
            <li>💬 عرض تفسير كل آية عند الضغط عليها</li>
            <li>⚡ واجهة سريعة وسهلة الاستخدام</li>
          </ul>
          <Link to="/quran" className={style.btn}>
          تصفّح السور الآن
        </Link>
          <p className={style.footerNote}>
            المزيد من الخصائص قادمة قريبًا بإذن الله 🤍
          </p>
        </div>
      </div>
    </section>
  );
}
