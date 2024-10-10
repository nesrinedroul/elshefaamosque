import React from "react";
import "./index.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2 className="footer-title">معلومات عنا</h2>
          <p className="footer-text">
            مسجد الشفاء هو ملاذ هادئ للصلاة والتأمل والمجتمع. نرحب بالجميع للانضمام إلينا في صلواتنا اليومية والفعاليات الخاصة.
          </p>
        </div>
        <div className="footer-section links">
          <h2 className="footer-title">روابط سريعة</h2>
          <ul>
            <li><a href="#about">حول</a></li>
            <li><a href="#salah">مواقيت الصلاة</a></li>
            <li><a href="#program">البرامج</a></li>
            <li><a href="#contact">اتصل بنا</a></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h2 className="footer-title">اتصل بنا</h2>
          <p><i className="fas fa-map-marker-alt"></i> بينام، الجزائر</p>
          <p><i className="fas fa-phone"></i> +213 123 456 789</p>
          <p><i className="fas fa-envelope"></i> info@mosqueelshefaa.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2024 مسجد الشفاء | جميع الحقوق محفوظة
      </div>
    </footer>
  );
}

export default Footer;
