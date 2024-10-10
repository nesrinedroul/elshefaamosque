import { useState } from 'react';
import ChildRegistration from './ChildRegistration';
import KidsList from './KidsList';

const ParentDashboard = ({ token }) => {
  const [activeComponent, setActiveComponent] = useState(null);

  // Function to go back to the dashboard
  const goBack = () => {
    setActiveComponent(null);
  };

  return (
    <div className="dashboard-container">
      {activeComponent === null && (
        <div className="card-container">
          <div className="card futuristic-card" onClick={() => setActiveComponent('register')}>
            <h4>تسجيل طفل</h4>
            <p>قم بتسجيل طفل جديد في النظام.</p>
          </div>

          <div className="card futuristic-card" onClick={() => setActiveComponent('list')}>
            <h4>عرض الأطفال</h4>
            <p>عرض قائمة الأطفال المسجلين في النظام.</p>
          </div>
        </div>
      )}

      {activeComponent === 'register' && (
        <ChildRegistration goBack={goBack} />
      )}

      {activeComponent === 'list' && (
        <KidsList  />
      )}
    </div>
  );
};

export default ParentDashboard;
