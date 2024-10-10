import "./index.css";  
function InfoPage() {
  return (
    <div className="info-page-container">
      <div className="info-text">
        <h1 className="info-title animate-fade-in">
        وَمَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا، سَهَّلَ اللَّهُ لَهُ طَرِيقًا إِلَى الجَنَّةِ
        </h1>
        <p className="info-description animate-fade-in-delay">
          مسجد الشفاء هو ملاذ من السلام والتأمل، حيث تجد الإلهام والتوجيه. نحن هنا لنرشدك وندعمك في رحلتك الروحية.
        </p>
        <button className="info-button"><a href="#about-section">اعرف المزيد</a></button>
      </div>
      <div className="info-image">
        <img src="./background.png" alt="مسجد" />
      </div>
    </div>
  );
}

export default InfoPage;



