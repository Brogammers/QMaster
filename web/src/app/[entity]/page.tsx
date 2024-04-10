"use client"

import { ChildrenProps } from "../../../types";
import { Menu, Layout } from "antd";
import Image from "next/image";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { SettingOutlined, DesktopOutlined, UserOutlined } from '@ant-design/icons'; // Import required icons
import QMasterLogo from "../../../public/qmaster.svg";

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

export default function Entity({ children }: ChildrenProps) {
  const { entity } = useParams();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleClick = (route: string) => {
    router.push(route);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={isCollapsed} onCollapse={toggleCollapsed} width={isCollapsed ? 80 : 200}>
        <div className="px-2 py-4 flex items-center justify-center border-b-2 border-coal-black">
          <Image
            src={QMasterLogo}
            alt="QMaster"
            width={40}
          />
          {!isCollapsed && <span className="font-bold text-2xl ml-4">QMaster</span>}
        </div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <SubMenu key="1" title="Admin" icon={<SettingOutlined />}>
            <Menu.Item key="3" onClick={() => handleClick('/sharing-info')}>Sharing Info</Menu.Item>
            <Menu.Item key="4" onClick={() => handleClick('/queues')}>Queues</Menu.Item>
            <Menu.Item key="5" onClick={() => handleClick('/details')}>Details</Menu.Item>
            <Menu.Item key="6" onClick={() => handleClick('/customer-feedback')}>Customer Feedback</Menu.Item>
          </SubMenu>
          <Menu.Item key="2" icon={<UserOutlined />} onClick={() => handleClick('/counter')}>
            <span>Counter</span>
          </Menu.Item>
          <Menu.Item key="3" icon={<DesktopOutlined />} onClick={() => handleClick('/display')}>
            <span>Display</span>
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Main Content */}
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <h2>{entity}&apos;s Coworking Space</h2>
            {/* Main content */}
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
