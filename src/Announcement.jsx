
import "./index.css";
import { Link } from 'react-router-dom';

function Announcement() {
    return (
        <>
            <div className='announce-h1'>
                <h1>أخبار هامة</h1>
            </div> 
            <div className="announcement-container">
              <Link to='/register-child'> <div 
                    className="announcement-card" >
                    <div className="icon-container">
                        <span className="material-symbols-outlined">
                            mosque
                        </span>
                    </div>
                    <h3>مدرسة القرآن</h3>
                </div>
</Link>
<a href='#prayer'>
                <div 
                    className="announcement-card" 
                  >
                    <div className="icon-container">
                        <span className="material-symbols-outlined">
                            mosque
                        </span>
                    </div>
                    <h3>أوقات الصلاة</h3>
                </div>
</a>
<a href='#about'>
                <div className="announcement-card">
                    <div className="icon-container">
                        <span className="material-symbols-outlined">
                            campaign
                        </span>
                    </div>
                    <h3>   إعلانات هامة</h3> 
                </div></a>
            </div>
        </>
    );
}

export default Announcement;

