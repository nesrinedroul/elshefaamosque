import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, Typography, Pagination, message, Card } from "antd";
import './index.css'; // Custom CSS file for styling
const { Title } = Typography;

const TeacherComponent = () => {
  const [students, setStudents] = useState([]);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [comment, setComment] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get("https://mohannednes.pythonanywhere.com/teacher/kids", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents(response.data);
    } catch (error) {
      message.error("خطأ في جلب بيانات الطلاب.");
    }
  };

  const handleOpenCommentDialog = (student) => {
    setCurrentStudent(student);
    setCommentDialogOpen(true);
  };

  const handleCloseCommentDialog = () => {
    setCommentDialogOpen(false);
    setCurrentStudent(null);
    setComment("");
  };

  const handleSubmitComment = async () => {
    if (!comment.trim()) {
      message.warning("يرجى إدخال تعليق قبل الإرسال.");
      return;
    }
    try {
      const token = localStorage.getItem("access_token");
      await axios.post(
        `https://mohannednes.pythonanywhere.com/teacher/kid/${currentStudent.id}/comment`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("تم إرسال التعليق بنجاح!");
      handleCloseCommentDialog();
    } catch (error) {
      message.error("خطأ في إرسال التعليق.");
    }
  };

  const columns = [
    { title: "الاسم", dataIndex: "name", key: "name", align: "center" },
    { title: "اللقب", dataIndex: "last_name", key: "last_name", align: "center" },
    { title: "العنوان", dataIndex: "address", key: "address", align: "center" },
    { title: "تاريخ الميلاد", dataIndex: "birthdate", key: "birthdate", align: "center" },
    { title: "هاتف الأب", dataIndex: "father_phone", key: "father_phone", align: "center" },
    { title: "هاتف الأم", dataIndex: "mother_phone", key: "mother_phone", align: "center" },
    {
      title: "الإجراءات",
      key: "actions",
      align: "center",
      render: (student) => (
        <Button
  type="primary"
  onClick={() => handleOpenCommentDialog(student)}
  style={{
    backgroundColor: '#5EEFCB', // Primary color
   border:"none",
    color: 'white', // Text color
    borderRadius: '8px', // Rounded corners
    fontWeight: 'bold', // Bold text
    padding: '8px 16px', // Padding for the button
    transition: 'background-color 0.3s ease', // Smooth transition
    fontSize: '16px'// Larger text
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = '##52D3B2';
    e.currentTarget.style.color = 'black' ;// Darker on hover
    e.currentTarget.style.borderColor = '#0056b3'; // Darker border on hover
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = '#5EEFCE'; // Original color
     e.currentTarget.style.color = 'white'
    e.currentTarget.style.borderColor = '#007bff'; // Original border
  }}
>
  إضافة تعليق
</Button>
      ),
    },
  ];

  const indexOfLastStudent = page * rowsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - rowsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  return (
    <div className="teacher-component" style={{ padding:"27px" }}>
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0px auto' }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "50px", marginTop: "90px", color: "#345" }}>
        قائمة الطلاب
      </Title>

      {/* Table for larger screens */}
      <div className="table-responsive">
        <Table
          dataSource={currentStudents}
          columns={columns}
          pagination={false}
          rowKey="id"
          bordered
          size="middle"
          style={{ marginBottom: "30px", textAlign: "center", borderRadius: "35px" }}
          components={{
            header: {
              cell: (cellProps) => (
                <th {...cellProps} style={{ backgroundColor: '#5EEFCB', color: 'black' }}>
                  {cellProps.children}
                </th>
              ),
            },
          }}
          scroll={{ x: true }} // Enable horizontal scrolling
        />
      </div>

      {/* Cards for smaller screens */}
      <div className="card-responsive">
        {currentStudents.map(student => (
          <Card
            key={student.id}
            title={`${student.name} ${student.last_name}`}
            extra={<Button type="primary" onClick={() => handleOpenCommentDialog(student)}>إضافة تعليق</Button>}
            style={{ marginBottom: '16px', borderRadius: '18px' }}
          >
            <p><strong>العنوان:</strong> {student.address}</p>
            <p><strong>تاريخ الميلاد:</strong> {student.birthdate}</p>
            <p><strong>هاتف الأب:</strong> {student.father_phone}</p>
            <p><strong>هاتف الأم:</strong> {student.mother_phone}</p>
          </Card>
        ))}
      </div>

      {/* Pagination Component */}
      <Pagination
        total={students.length}
        current={page}
        pageSize={rowsPerPage}
        onChange={(value) => setPage(value)}
        style={{ textAlign: "center", display: "flex", flexDirection: "row", justifyContent: "center" }}
      />

      {/* Modal for Adding Comments */}
      <Modal
  title={`إضافة تعليق لـ ${currentStudent?.name || ""}`}
  visible={commentDialogOpen}
  onCancel={handleCloseCommentDialog}
  footer={[
    <Button key="back" onClick={handleCloseCommentDialog}
    style={{
      backgroundColor: '#5EEFCB',
      color: '#FFFFFF',
      borderRadius: '8px',
      fontWeight: 'bold',
      padding: '10px 20px',
      transition: 'background-color 0.3s ease'
    }}
    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'white'
      e.currentTarget.style.color = 'black' // Darker on hover
      e.currentTarget.style.borderColor = '#5EEFCB' // Darker border on hover
    }}
    onMouseLeave={(e) =>{ e.currentTarget.style.backgroundColor = '#5EEFCB' 
      e.currentTarget.style.color = 'white' // Original color
      e.currentTarget.style.borderColor = '#5EEFCB' 
     } }
     >
      إلغاء
    </Button>,
    <Button
      type="primary"
      onClick={handleSubmitComment}
      style={{
        backgroundColor: '#5EEFCB',
        color: 'white',
        borderRadius: '8px',
        fontWeight: 'bold',
        padding: '10px 20px',
        transition: 'background-color 0.3s ease'
      }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'white'
        e.currentTarget.style.color = 'black' // Darker on hover
        e.currentTarget.style.borderColor = '#5EEFCB' // Darker border on hover
      }}
      onMouseLeave={(e) =>{ e.currentTarget.style.backgroundColor = '#5EEFCB' 
        e.currentTarget.style.color = 'white' // Original color
        e.currentTarget.style.borderColor = '#5EEFCB' 
       } }>
      إرسال
    </Button>
  ]}
  centered // Add this prop
  destroyOnClose // This will ensure the dialog content is destroyed when closed
>
  <Form layout="vertical">
    <Form.Item label="التعليق">
      <Input.TextArea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={5}
        placeholder="أدخل تعليقك هنا"
      />
    </Form.Item>
  </Form>
</Modal>
</div></div>
  );
};

export default TeacherComponent;
