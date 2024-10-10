import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, Select, message, Popconfirm, Row, Col, Card, Pagination } from 'antd';
import { EditOutlined, DeleteOutlined, UserAddOutlined } from '@ant-design/icons';
import './UserList.css';

const { Option } = Select;

const UserList = ({ updateCounts, userCount, studentCount }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState(null);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get('https://mohannednes.pythonanywhere.com/admin/admin/view_users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data.users);
      updateCounts(24, response.data.users.length);
    } catch (err) {
      message.error('فشل في جلب المستخدمين');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSave = async () => {
    try {
      const values = form.getFieldsValue();
      const token = localStorage.getItem('access_token');
      if (editUser) {
        await axios.put(`https://mohannednes.pythonanywhere.com/admin/admin/edit_user/${editUser.id}`, values, {
          headers: { Authorization: `Bearer ${token}` },
        });
        message.success('تم تحديث المستخدم بنجاح');
      } else {
        await axios.post('https://mohannednes.pythonanywhere.com/admin/admin/add_user', values, {
          headers: { Authorization: `Bearer ${token}` },
        });
        message.success('تم إضافة المستخدم بنجاح');
      }
      fetchUsers();
      setIsModalVisible(false);
      form.resetFields();
    } catch (err) {
      message.error('فشل في حفظ المستخدم');
    }
  };

  // Edit user handler
  const handleEdit = (user) => {
    setEditUser(user);
    form.setFieldsValue({ ...user });
    setIsModalVisible(true);
  };

  // Save (Add/Edit) user
 
  // Delete user handler
  const handleDelete = async (userId) => {
    const token = localStorage.getItem('access_token');
    try {
      await axios.delete(`https://mohannednes.pythonanywhere.com/admin/admin/remove_user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success('تم حذف المستخدم بنجاح');
      fetchUsers();
    } catch (err) {
      message.error('فشل في حذف المستخدم');
    }
  };

  // Handle table change
  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  // Calculate current users based on pagination
  const currentUsers = users.slice((pagination.current - 1) * pagination.pageSize, pagination.current * pagination.pageSize);

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h1>قائمة المستخدمين</h1>
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          onClick={() => {
            setIsModalVisible(true);
            setEditUser(null);
            form.resetFields();
          }}
        >
          إضافة مستخدم
        </Button>
      </div>

      {/* Display as table for larger screens */}
      <div className="user-list-table">
        {loading ? (
          <p>جار التحميل...</p>
        ) : (
          <Table
            dataSource={currentUsers}
            pagination={false}  // Disable default pagination for the table
            rowKey="id"
            loading={loading}
            columns={[
              {
                title: 'الاسم',
                dataIndex: 'name',
              },
              {
                title: 'البريد الإلكتروني',
                dataIndex: 'email',
              },
              {
                title: 'الدور',
                dataIndex: 'role',
              },
              {
                title: 'الإجراءات',
                render: (text, user) => (
                  <>
                    <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(user)} />
                    <Popconfirm
                      title="هل أنت متأكد أنك تريد حذف هذا المستخدم؟"
                      onConfirm={() => handleDelete(user.id)}
                      okText="نعم"
                      cancelText="لا"
                    >
                      <Button type="danger" icon={<DeleteOutlined />}>حذف</Button>
                    </Popconfirm>
                  </>
                ),
              },
            ]}
          />
        )}
        {/* Pagination for table view */}
        <div className="pagination-container">
          <Pagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={users.length}
            onChange={(page, pageSize) => setPagination({ current: page, pageSize })}
          />
        </div>
      </div>

      {/* Display as cards for smaller screens */}
      <div className="user-list-cards">
        {loading ? (
          <p>جار التحميل...</p>
        ) : (
          <>
            <Row gutter={[16, 16]}>
              {currentUsers.map(user => (
                <Col xs={24} sm={12} md={8} key={user.id}>
                  <Card
                    title={user.name}
                    extra={
                      <>
                        <Button
                          type="primary"
                          icon={<EditOutlined />}
                          onClick={() => handleEdit(user)}
                          style={{ marginRight: 8 }}
                        />
                        <Popconfirm
                          title="هل أنت متأكد أنك تريد حذف هذا المستخدم؟"
                          onConfirm={() => handleDelete(user.id)}
                          okText="نعم"
                          cancelText="لا"
                        >
                          <Button type="danger" icon={<DeleteOutlined />}>حذف</Button>
                        </Popconfirm>
                      </>
                    }
                  >
                    <p><strong>البريد الإلكتروني:</strong> {user.email}</p>
                    <p><strong>الدور:</strong> {user.role}</p>
                  </Card>
                </Col>
              ))}
            </Row>
            {/* Add pagination for card view */}
            <div className="pagination-container">
              <Pagination
                current={pagination.current}
                pageSize={pagination.pageSize}
                total={users.length}
                onChange={(page, pageSize) => setPagination({ current: page, pageSize })}
              />
            </div>
          </>
        )}
      </div>

      <Modal
        title={editUser ? 'تعديل المستخدم' : 'إضافة مستخدم'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="الاسم" rules={[{ required: true, message: 'الرجاء إدخال اسم' }]}>
            <Input placeholder="أدخل الاسم" />
          </Form.Item>
          <Form.Item name="email" label="البريد الإلكتروني" rules={[{ required: true, message: 'الرجاء إدخال البريد الإلكتروني' }]}>
            <Input placeholder="أدخل البريد الإلكتروني" />
          </Form.Item>
          <Form.Item name="role" label="الدور" rules={[{ required: true, message: 'الرجاء اختيار دور' }]}>
            <Select placeholder="اختر الدور">
              <Option value="admin">مدير</Option>
              <Option value="member">عضو</Option>
              <Option value="teacher">معلم</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserList;
