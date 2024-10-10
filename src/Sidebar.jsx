import React from 'react';
import { Menu } from 'antd';
import { UserOutlined, DashboardOutlined, TeamOutlined } from '@ant-design/icons';

const Sidebar = ({ collapsed, setActiveSection }) => {
    return (
        <>
            <div className="sidebar-header">
                {/* Only show the header when not collapsed */}
                {!collapsed && <h2 style={{ color: '#311FDA', margin: 0 }}></h2>}
            </div>
            <Menu
                mode="inline"
                defaultSelectedKeys={['2']}
                style={{ backgroundColor: '#091d3c' }} // Background of the sidebar
            >
               
                <Menu.Item
                    key="2"
                    icon={<UserOutlined style={{ color: '#311FDA' }} />}
                    onClick={() => setActiveSection('users')}
                    style={{ color: 'white' }}
                >
                     المستخدمين
                </Menu.Item>
                <Menu.Item
                    key="3"
                    icon={<TeamOutlined style={{ color: '#311FDA' }} />}
                    onClick={() => setActiveSection('students')}
                    style={{ color: 'white' }}
                >
                  الطلاب
                </Menu.Item>
            </Menu>
        </>
    );
};

export default Sidebar;
