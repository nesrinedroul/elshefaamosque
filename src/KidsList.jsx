import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Table, Button, Modal, Typography, Pagination, Card } from "antd";
import './index.css'; // Custom CSS for styling

const { Title } = Typography;

const KidsList = () => {
  const navigate = useNavigate();
  const [kids, setKids] = useState([]);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [currentKid, setCurrentKid] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);

  // Fetch kids data on mount
  useEffect(() => {
    const fetchKidsWithComments = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get(
          'https://mohannednes.pythonanywhere.com/quran_school/my_kids_with_comments',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && Array.isArray(response.data.kids_with_comments)) {
          setKids(response.data.kids_with_comments);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (error) {
        console.error('Error fetching kids:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKidsWithComments();
  }, []);

  // Handle navigating back to Parent Dashboard
  const handleBackToDashboard = () => {
    navigate('/parent-dashboard');
  };

  // Handle navigating to ChildRegistration component
  const handleRegisterKid = () => {
    navigate('/child-registration');
  };

  // Open the details modal
  const handleOpenDetailsDialog = (kid) => {
    setCurrentKid(kid);
    setDetailsDialogOpen(true);
  };

  // Close the details modal
  const handleCloseDetailsDialog = () => {
    setDetailsDialogOpen(false);
    setCurrentKid(null);
  };

  // Open the comment modal
  const handleOpenCommentDialog = (kid) => {
    setCurrentKid(kid);
    setCommentDialogOpen(true);
  };

  // Close the comment modal
  const handleCloseCommentDialog = () => {
    setCommentDialogOpen(false);
    setCurrentKid(null);
  };

  // Pagination handling
  const indexOfLastKid = page * rowsPerPage;
  const indexOfFirstKid = indexOfLastKid - rowsPerPage;

  const currentKids = Array.isArray(kids) ? kids.slice(indexOfFirstKid, indexOfLastKid) : [];

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>;
  }

  // If no kids are registered
  if (kids.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <p>لم تقم بتسجيل أي طفل حتى الآن.</p>
        <Button
          type="primary"
          onClick={handleBackToDashboard}
          style={{
            backgroundColor: '#311FDA',
            color: 'white',
            borderRadius: '8px',
            fontWeight: 'bold',
            padding: '10px 20px',
            margin: '10px',
          }}
        >
          العودة إلى لوحة القيادة
        </Button>
        <Button
          type="default"
          onClick={handleRegisterKid}
          style={{
            borderRadius: '8px',
            fontWeight: 'bold',
            padding: '10px 20px',
            margin: '10px',
            border: "1px solid #311FDA",
            color: '#311FDA',
          }}
        >
          تسجيل طفل جديد
        </Button>
      </div>
    );
  }

  // Table columns
  const columns = [
    { title: "الاسم", dataIndex: "name", key: "name", align: "center" },
    { title: "اللقب", dataIndex: "last_name", key: "last_name", align: "center" },
    { title: "تاريخ الميلاد", dataIndex: "birthdate", key: "birthdate", align: "center" },
    {
      title: "الإجراءات",
      key: "actions",
      align: "center",
      render: (kid) => (
        <div>
          <Button
            type="primary"
            onClick={() => handleOpenDetailsDialog(kid)}
            style={{
              backgroundColor: '#311FDA',
              color: 'white',
              borderRadius: '8px',
              fontWeight: 'bold',
              padding: '8px 16px',
              transition: 'background-color 0.3s ease',
              fontSize: '16px',
              border: "none",
              marginRight: '8px'
            }}
          >
            عرض التفاصيل
          </Button>
          <Button
            type="default"
            onClick={() => handleOpenCommentDialog(kid)}
            style={{
              borderRadius: '8px',
              fontWeight: 'bold',
              padding: '8px 16px',
              fontSize: '16px',
              border: "1px solid #311FDA",
              color: '#311FDA',
              marginRight: '12px',
            }}
          >
            عرض التعليق
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="kids-list-component" style={{ padding: "-1px" }}>
      <div style={{ padding: '10px', maxWidth: '1200px', margin: '0 auto',height:'100vh' }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: "20px", color: "#345",marginTop:'90px',position:'relative' }}>
          قائمة الأطفال
        </Title>

        {/* Back to Dashboard Button */}
        <Button 
          type="primary" 
          onClick={handleBackToDashboard} 
          style={{
            backgroundColor: '#311FDA',
            color: 'white',
            borderRadius: '8px',
            fontWeight: 'bold',
            padding: '10px 20px',
            marginBottom: '20px'
          }}
        >
          العودة إلى لوحة القيادة
        </Button>

        {/* Table for larger screens */}
        <div className="table-responsive">
          <Table
            dataSource={currentKids}
            columns={columns}
            pagination={false}
            rowKey="id"
            bordered
            size="middle"
            style={{ marginBottom: "30px", textAlign: "center", borderRadius: "35px" }}
            components={{
              header: {
                cell: (cellProps) => (
                  <th {...cellProps} style={{ backgroundColor: '#311FDA', color: 'white' }}>
                    {cellProps.children}
                  </th>
                ),
              },
            }}
            scroll={{ x: true }}
          />
        </div>

        {/* Cards for smaller screens */}
        <div className="card-responsive">
          {currentKids.length > 0 && (
            currentKids.map((kid) => (
              <Card
                key={kid.id}
                title={`${kid.name} ${kid.last_name}`}
                extra={
                  <div>
                    <Button type="primary" onClick={() => handleOpenDetailsDialog(kid)}>عرض التفاصيل</Button>
                    <Button type="default" onClick={() => handleOpenCommentDialog(kid)}>عرض التعليق</Button>
                  </div>
                }
                style={{ marginBottom: '16px', borderRadius: '18px' }}
              >
                <p><strong>تاريخ الميلاد:</strong> {kid.birthdate}</p>
              </Card>
            ))
          )}
        </div>

        {/* Pagination Component */}
        <Pagination
          total={kids.length}
          current={page}
          pageSize={rowsPerPage}
          onChange={(value) => setPage(value)}
          style={{ textAlign: "center", display: "flex", flexDirection: "row", justifyContent: "center" }}
        />

        {/* Modal for Viewing Details */}
        <Modal
          title={`تفاصيل ${currentKid?.name || ""}`}
          open={detailsDialogOpen}
          onCancel={handleCloseDetailsDialog}
          footer={[
            <Button key="back" onClick={handleCloseDetailsDialog} style={{ backgroundColor: '#5EEFCB', color: 'white', borderRadius: '8px' }}>
              إغلاق
            </Button>
          ]}
          centered
          destroyOnClose
        >
          <p><strong>الاسم:</strong> {currentKid?.name}</p>
          <p><strong>اللقب:</strong> {currentKid?.last_name}</p>
          <p><strong>تاريخ الميلاد:</strong> {currentKid?.birthdate}</p>
        </Modal>

        {/* Modal for Viewing Comments */}
        <Modal
          title={`تعليق ${currentKid?.name || ""}`}
          open={commentDialogOpen}
          onCancel={handleCloseCommentDialog}
          footer={[
            <Button key="back" onClick={handleCloseCommentDialog} style={{ backgroundColor: '#5EEFCB', color: 'white', borderRadius: '8px' }}>
              إغلاق
            </Button>
          ]}
          centered
          destroyOnClose
        >
          <p>{currentKid?.comments}</p>
        </Modal>
      </div>
    </div>
  );
};

export default KidsList;
