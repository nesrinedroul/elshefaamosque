import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'; // Importing CSS for styling
import KidsList from './KidsList';

const ChildRegistration = ({ goBack }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [fatherPhone, setFatherPhone] = useState('');
  const [motherPhone, setMotherPhone] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [pdfFiles, setPdfFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  // Retrieve the token from local storage
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    if (!token) {
      setErrorMessage('لم يتم العثور على رمز. يرجى تسجيل الدخول مرة أخرى.');
    }
  }, [token]);

  const handleFileChange = (index, e) => {
    const newFiles = [...pdfFiles];
    newFiles[index] = e.target.files[0];
    setPdfFiles(newFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true); // Start loading

    if (pdfFiles.length !== 3 || pdfFiles.some(file => !file)) {
      setErrorMessage('يجب اختيار 3 ملفات PDF بالضبط.');
      setLoading(false); // Stop loading
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('last_name', lastName);
    formData.append('address', address);
    formData.append('father_phone', fatherPhone);
    formData.append('mother_phone', motherPhone);
    formData.append('birthdate', birthdate);
    pdfFiles.forEach((file) => {
      formData.append('pdf_files', file);
    });

    try {
      const response = await axios.post(
        'https://mohannednes.pythonanywhere.com/quran_school/register',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      setSuccessMessage(response.data.message);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('حدث خطأ غير متوقع.');
      }
    }

    setLoading(false); // Stop loading after submission
  };

  const nextStep = () => {
    if (step === 1) {
      if (!name || !lastName) {
        setErrorMessage('الرجاء ملء جميع الحقول في هذه الخطوة.');
        return;
      }
    } else if (step === 2) {
      if (!address || !fatherPhone || !motherPhone || !birthdate) {
        setErrorMessage('الرجاء ملء جميع الحقول في هذه الخطوة.');
        return;
      }
    } else if (step === 3) {
      if (pdfFiles.length !== 3 || pdfFiles.some(file => !file)) {
        setErrorMessage('يجب اختيار 3 ملفات PDF بالضبط.');
        return;
      }
    }
    setErrorMessage('');
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  return (
    <>
   
    <div className="cont">
      <button className="back-button" onClick={goBack}>← العودة</button>
      <div className="registration-container">
       

        <div className="registration-image">
          <img src="prayer.jpg" alt="Registration" />
          <div className="image-text">
            <h1>مرحبًا بك في التسجيل</h1>
            <p>أدخل معلوماتك الشخصية وملفات PDF المطلوبة.</p>
          </div>
        </div>
        <div className="registration-form">
          {loading ? ( // Loading animation
            <div className="loading-spinner">جارٍ التحميل...</div>
          ) : (
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="form-step">
                  <h2>الخطوة 1: المعلومات الشخصية</h2>
                  <input
                    type="text"
                    value={name}
                    placeholder="الاسم"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    value={lastName}
                    placeholder="اللقب"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                  <button type="button" onClick={nextStep}>التالي</button>
                </div>
              )}
              {step === 2 && (
                <div className="form-step">
                  <h2>الخطوة 2: التفاصيل الإضافية</h2>
                  <input
                    type="text"
                    value={address}
                    placeholder="العنوان"
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    value={fatherPhone}
                    placeholder="رقم هاتف الأب"
                    onChange={(e) => setFatherPhone(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    value={motherPhone}
                    placeholder="رقم هاتف الأم"
                    onChange={(e) => setMotherPhone(e.target.value)}
                    required
                  />
                  <input
                    type="date"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    required
                  />
                  <button type="button" onClick={prevStep}>العودة</button>
                  <button type="button" onClick={nextStep}>التالي</button>
                </div>
              )}
              {step === 3 && (
                <div className="form-step">
                  <h2>الخطوة 3: تحميل الملفات</h2>
                  <label>تحميل ملفات PDF (3 ملفات):</label>
                  {[0, 1, 2].map(index => (
                    <input
                      key={index}
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileChange(index, e)}
                      required
                    />
                  ))}
                  <button type="button" onClick={prevStep}>العودة</button>
                  <button type="submit">إرسال</button>
                </div>
              )}
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              {successMessage && <p className="success-message">{successMessage}</p>}
            </form>
          )}
        </div> 
        
      </div>
      
    </div>
   
    </>
  );
};

export default ChildRegistration;
