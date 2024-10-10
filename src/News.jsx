import  { useState, useEffect } from "react";
import "./index.css";

const eventSlides = [
  {
    title: "شرح الأربعين النووية",
    description: "سيتم تنظيم جلسة لشرح الأربعين النووية يوم الأحد بين المغرب و العشاء. الأربعين النووية هي مجموعة من الأحاديث النبوية الهامة التي تم جمعها لشرح تعاليم الدين الإسلامي بعمق. ستشمل الجلسة تحليل وتفسير للأحاديث، مما يساعد الحضور على فهم أفضل لتعاليم النبي محمد صلى الله عليه وسلم.",
    image: "./new40.png",
  },
  {
    title: "شرح السيرة النبوية",
    description: " سيكون لدينا درس لشرح السيرة النبوية يوم الأربعاء بين المغرب و العشاء. في هذه الجلسة، سنقوم بدراسة تفاصيل حياة النبي محمد صلى الله عليه وسلم، مع التركيز على أحداث هامة في سيرته العطرة وتعليماته القيمة. الهدف هو تعزيز المعرفة وفهم حياة النبي بشكل أعمق.",
    image: "./masjid.jpg",
  },
  {
    title: "التفسير",
    description: " ستُعقد جلسة تفسير القرآن الكريم يوم الجمعة بين المغرب و العشاء. في هذه الجلسة، سنقوم بتفسير آيات من القرآن الكريم، مع التركيز على معانيها وتطبيقاتها في الحياة اليومية. سيتم تقديم تفسير شامل للآيات لمساعدة الحضور في فهم الرسائل القرآنية وتطبيقها على حياتهم.",
    image: "./inside.jpg",
  },
];

function News() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === eventSlides.length - 1 ? 0 : prevSlide + 1
      );
    }, 9000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="about-section" className="about-container">
      <h1 className="h1about" id="about">الإعلانات</h1>
      <div className="slideshow-container">
        <div className="slide">
          <img
            src={eventSlides[currentSlide].image}
            alt={eventSlides[currentSlide].title}
            className="slide-image"
          />
          <div className="slide-content">
            <h2 className="slide-title">{eventSlides[currentSlide].title}</h2>
            <p className="slide-description">
              {eventSlides[currentSlide].description}
            </p>
          </div>
        </div>
        <div className="slide-indicators">
          {eventSlides.map((_, index) => (
            <span
              key={index}
              className={`indicator ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default News;
