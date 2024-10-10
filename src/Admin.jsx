import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Layout, Spin, Alert, Card, Statistic, Row, Col } from 'antd';
import { UserOutlined, TeamOutlined } from '@ant-design/icons';
import Sidebar from './Sidebar';
import UserList from './UserList';
import AdminKids from './AdminKids';
import './Admin.css';

const { Header, Sider, Content } = Layout;

const Admin = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('users');

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768); // Collapse sidebar if the width is less than 768 pixels
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    if (window.innerWidth >= 768) { // Only allow toggling if the width is 768 pixels or more
      setCollapsed(!collapsed);
    }
  };

  // Fetch initial counts of users and students
  const fetchCounts = async () => {
    try {
      const studentResponse = await axios.get('/api/students-count');
      const userResponse = await axios.get('/api/users-count');
      setStudentCount(studentResponse.data.count);
      setUserCount(userResponse.data.count);
      setLoading(false);
    } catch (error) {
      setError('');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  // Update counts if necessary
  const updateCounts = (students, users) => {
    setStudentCount(students);
    setUserCount(users);
  };

  if (loading) {
    return <Spin />;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggleSidebar} style={{ background: '#091d3c' }}>
        <Sidebar setActiveSection={setActiveSection} />
      </Sider>
      <Layout>
        <Content style={{ padding: '8px' }}>
          <Row gutter={[16, 16]} justify="center" className="admin-stats-container">
            <Col xs={24} sm={12} lg={8}>
              <Card bordered={false}>
                <Statistic title="Total Users" value={userCount} prefix={<UserOutlined />} valueStyle={{ color: '#311FDA' }} />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Card bordered={false}>
                <Statistic title="Total Students" value={studentCount} prefix={<TeamOutlined />} valueStyle={{ color: '#311FDA' }} />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Card bordered={false}>
                <Statistic title="Total" value={userCount + studentCount} valueStyle={{ color: '#311FDA' }} />
              </Card>
            </Col>
          </Row>
          {error && <Alert message={error} type="error" showIcon style={{ marginTop: '20px' }} />}
          {/* Pass counts as props to child components */}
          {activeSection === 'users' && <UserList updateCounts={updateCounts} userCount={userCount} studentCount={studentCount} />}
          {activeSection === 'students' && <AdminKids updateCounts={updateCounts} userCount={userCount} studentCount={studentCount} />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
