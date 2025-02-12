// import { 
//   CAlert, 
//   CBadge,
//   CNavGroup, 
//   CNavItem, 
//   CNavTitle, 
//   CSidebar, 
//   CSidebarBrand, 
//   CSidebarHeader, 
//   CSidebarNav, 
//   CSidebarToggler 
// } from '@coreui/react';
// import '@coreui/coreui/dist/css/coreui.min.css';
// import CIcon from '@coreui/icons-react';
// import { cilSettings, cilScreenDesktop, cilPeople } from '@coreui/icons';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from 'next/image';
import QMasterLogo from "../../../public/qmaster.svg";
import { Menu, Layout } from "antd";
import { SettingOutlined, DesktopOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'; // Import required icons
import Tag from "./Tag";
import { useBusinessAuth } from "@/lib/auth/AuthContext";

const { Sider } = Layout;

export default function Sidebar() {
  let { entity } = useParams();
  if (Array.isArray(entity)) {
    entity = entity[0];
  }
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { logout } = useBusinessAuth();

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleRouting = (route: string) => {
    setIsLoading(true);
    setTimeout(async () => {
      await router.push(`/${entity}/${route}`);
      setIsLoading(false);
    }, 2000);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    setIsLoading(true);
    setTimeout(async () => {
      setIsLoading(false)
      logout();
    }, 2000);
  }

  const menuItems = [
    {
      key: '1',
      icon: <SettingOutlined />,
      label: 'Admin',
      children: [
        {
          key: '2',
          label: (
            <div className="flex justify-center items-center gap-4">
              <span>Customer Feedback</span>
              <Tag text="Coming Soon" bgColor="red-500" fontSize="xs" />
            </div>
          ),
          onClick: () => handleRouting(`admin/customer-feedback`)
        },
        {
          key: '3',
          label: 'Details',
          onClick: () => handleRouting(`admin/details`)
        },
        {
          key: '4',
          label: 'Queues',
          onClick: () => handleRouting(`admin/queues`)
        },
        {
          key: '5',
          label: 'Sharing Info',
          onClick: () => handleRouting(`admin/sharing-info`)
        }
      ]
    },
    {
      key: '6',
      icon: <UserOutlined />,
      label: 'Counter',
      onClick: () => handleRouting(`counter`)
    },
    {
      key: '7',
      icon: <DesktopOutlined />,
      label: 'Display',
      onClick: () => handleRouting(`display`)
    },
    {
      key: '8',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
      onClick: handleLogout
    }
  ];

  return (
    <Sider 
      collapsible 
      collapsed={isCollapsed} 
      onCollapse={toggleCollapsed}
      className="flex flex-col justify-between"
    >
      <div className="px-2 py-3 flex items-center justify-center border-b-2 border-ignite-black">
        <Image
          src={QMasterLogo}
          alt="QMaster"
          width={36}
        />
        {!isCollapsed && 
          <span className="font-bold text-white text-xl ml-4">QMaster</span>
        }
      </div>
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={menuItems} />
    </Sider>
    // <CSidebar className="sidebar border-end h-screen" colorScheme="dark" unfoldable>
    //   <CSidebarHeader className="border-bottom">
    //     <CSidebarBrand className='font-bold no-underline flex items-center'>
    //       <Image
    //         src={QMasterLogo} 
    //         alt='QMaster' 
    //         width={40}
    //       />
    //       <span className='text__branding text-2xl ml-4'>QMaster</span>
    //     </CSidebarBrand>
    //   </CSidebarHeader>
    //   <CSidebarNav>
    //     <CNavTitle>Welcome back, Hatem</CNavTitle>
    //     <CNavGroup
    //       toggler={
    //         <>
    //           <CIcon customClassName="nav-icon" icon={cilSettings} /> Admin
    //         </>
    //       }
    //     >
    //       <CNavItem href={`/${entity}/admin/details`}>
    //         <span className="nav-icon">
    //           <span className="nav-icon-bullet" />
    //         </span>
    //         Details
    //       </CNavItem>
    //       <CNavItem href={`/${entity}/admin/queues`}>
    //         <span className="nav-icon">
    //           <span className="nav-icon-bullet" />
    //         </span>
    //         Queues
    //       </CNavItem>
    //       <CNavItem href={`/${entity}/admin/customer-feedback`}>
    //         <span className="nav-icon">
    //           <span className="nav-icon-bullet" />
    //         </span>
    //         Customer Feedback
    //       </CNavItem>
    //     </CNavGroup>
    //     <CNavItem href={`/${entity}/counter`}>
    //       <CIcon 
    //         customClassName="nav-icon" 
    //         icon={cilPeople} 
    //       />
    //         Counter
    //     </CNavItem>
    //     <CNavItem href={`/${entity}/display`}>
    //       <CIcon 
    //         customClassName="nav-icon" 
    //         icon={cilScreenDesktop}
    //       />
    //         Display
    //         <CBadge color="primary ms-auto">NEW</CBadge>
    //     </CNavItem>
    //   </CSidebarNav>
    //   <CSidebarHeader className="border-top">
    //     <CSidebarToggler />
    //   </CSidebarHeader>
    // </CSidebar>
  )
}


