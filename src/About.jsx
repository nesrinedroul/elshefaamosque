
import "./index.css";

function About() {
  return (
    <>
      <h1 className="h1about">عنّا</h1>
      <div id="about-section" className="about-container">
        <div className="section left-image">
          <div className="section-image">
            <img src="./inside.jpg" alt="Mission" className="section-img" />
          </div>
          <div className="section-content">
            <h2 className="section-title">مهمتنا: ملاذ هادئ</h2>
            <p className="section-description">
              في مسجد الشفاء، مهمتنا هي توفير ملاذ هادئ للصلاة والتأمل والمجتمع. نحن نسعى للنمو الروحي، ونرحب بالجميع للانضمام إلينا في الصلوات اليومية والفعاليات الخاصة.
            </p>
          </div>
        </div>

        <div className="section right-image">
          <div className="section-content">
            <h2 className="section-title">قصتنا</h2>
            <p className="section-description">
              تأسس مسجد الشفاء لتعزيز الاتصال الروحي، وأصبح ركيزة في المجتمع. على مر السنين، تطورنا لدعم أعضاءنا في رحلاتهم الروحية، مما خلق مكانًا يُرحب فيه بالجميع للتعلم والصلاة والازدهار معًا.
            </p>
          </div>
          <div className="section-image">
            <img src="./inside2.jpg" alt="Story" className="section-img" />
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
