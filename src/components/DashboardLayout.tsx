import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const DashboardLayout: React.FC = () => {

  const getBreadcrumbItems = () => {
    return [
      { title: 'Home' },
      { title: 'Clinical Management' },
      { title: 'OPD' },
      { title: 'New Patients' }
    ];
  };

  return (
    <Layout className="min-h-screen">
      <Layout>
        <Content className="p-6">
          <Breadcrumb
            separator=">"
            items={getBreadcrumbItems()}
            className="mb-6"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;