import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pagination, Card, Button, Spin, Table, message } from 'antd';
import './AdminKids.css'; // تأكد من أن تنسيق CSS لديك مصمم بشكل صحيح

const AdminKids = ({ updateCounts }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('https://mohannednes.pythonanywhere.com/admin/admin/students', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        setStudents(response.data.students || []);
        updateCounts(response.data.students.length, 31); // تمرير عدد الطلاب إلى مكون الإدارة
      } catch (err) {
        console.error('حدث خطأ أثناء جلب الطلاب:', err);
        setError('فشل في جلب الطلاب.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [updateCounts]);

  const fetchPdfFiles = async (studentId) => {
    try {
      const response = await axios.get(`https://mohannednes.pythonanywhere.com/quran_school/admin/view_files/${studentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `files_student_${studentId}.zip`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      message.error('فشل في جلب ملفات PDF. يرجى المحاولة مرة أخرى.');
    }
  };

  const handleStudentClick = (studentId) => {
    fetchPdfFiles(studentId);
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  if (loading) {
    return <div className="loading-message"><Spin size="large" tip="جارٍ تحميل الطلاب..." /></div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const columns = [
    {
      title: 'الاسم',
      dataIndex: 'name',
      key: 'name',
      render: (text) => text.replace(/"/g, ''),
    },
    {
      title: 'الكنية',
      dataIndex: 'last_name',
      key: 'last_name',
      render: (text) => text.replace(/"/g, ''),
    },
    {
      title: 'تاريخ الميلاد',
      dataIndex: 'birthdate',
      key: 'birthdate',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'الإجراء',
      key: 'action',
      render: (text, record) => (
        <Button type="primary" onClick={() => handleStudentClick(record.id)}>
          عرض الملفات
        </Button>
      ),
    },
  ];

  const indexOfLastStudent = currentPage * pageSize;
  const indexOfFirstStudent = indexOfLastStudent - pageSize;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  return (
    <div className="admin-kids">
      <h3 className="students-title">قائمة الطلاب</h3>

      <div className="table-container">
        <Table
          columns={columns}
          dataSource={currentStudents}
          pagination={false}
          rowKey="id"
          className="student-table"
        />
      </div>

      <div className="student-cards">
        {currentStudents.map((student) => (
          <Card
            key={student.id}
            className="student-card"
            hoverable
          >
            <h4>{student.name.replace(/"/g, '')}</h4>
            <p>الكنية: {student.last_name.replace(/"/g, '')}</p>
            <p>تاريخ الميلاد: {new Date(student.birthdate).toLocaleDateString()}</p>
            <Button type="primary" onClick={() => handleStudentClick(student.id)}>عرض الملفات</Button>
          </Card>
        ))}
      </div>

      {/* ترقيم مركزي */}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={students.length}
        onChange={handlePageChange}
        showSizeChanger
        pageSizeOptions={[5, 10, 20]}
        className="pagination"
      />
    </div>
  );
};

export default AdminKids;
