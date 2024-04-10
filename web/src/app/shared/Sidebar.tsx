import { useState, useEffect} from "react";
import { useParams, useRouter } from "next/navigation";
import Image from 'next/image';
import { 
  CAlert, 
  CBadge,
  CNavGroup, 
  CNavItem, 
  CNavTitle, 
  CSidebar, 
  CSidebarBrand, 
  CSidebarHeader, 
  CSidebarNav, 
  CSidebarToggler 
} from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import CIcon from '@coreui/icons-react';
import { cilSettings, cilScreenDesktop, cilPeople } from '@coreui/icons';

import QMasterLogo from "../../../public/qmaster.svg";
import { ChildrenProps } from "../../../types";
import { Menu, Layout } from "antd";
import { SettingOutlined, DesktopOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'; // Import required icons

const { Sider } = Layout;
const { SubMenu } = Menu;


export default function Sidebar() {
  let { entity } = useParams();
  if (Array.isArray(entity)) {
    entity = entity[0];
  }
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleRouting = (route: string) => {
    router.push(`/${entity}/${route}`);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    router.replace('/login')
  }

  useEffect(() => {
    // Fetch the user's role from a server when they log in
    // and store it in the `role` state.

    // fetchUserRole().then(setRole);
  }, []);

  return (
    <Sider 
      collapsible 
      collapsed={isCollapsed} 
      onCollapse={toggleCollapsed}
      className="flex flex-col justify-between"
    >
      <div className="px-2 py-4 flex items-center justify-center border-b-2 border-ignite-black">
        <Image
          src={QMasterLogo}
          alt="QMaster"
          width={40}
        />
        {!isCollapsed && 
          <span className="font-bold text-white text-2xl ml-4">QMaster</span>
        }
      </div>
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <SubMenu 
          key="1" 
          title="Admin" 
          icon={<SettingOutlined />}
        >
          <Menu.Item 
            key="3" 
            onClick={() => handleRouting(`sharing-info`)}
          >
            Sharing Info
          </Menu.Item>
          <Menu.Item 
            key="4" 
            onClick={() => handleRouting(`queues`)}
          >
            Queues
          </Menu.Item>
          <Menu.Item 
            key="5" 
            onClick={() => handleRouting(`details`)}
          >
            Details
          </Menu.Item>
          <Menu.Item 
            key="6" 
            onClick={() => handleRouting(`customer-feedback`)}
          >
            Customer Feedback
          </Menu.Item>
        </SubMenu>
        <Menu.Item 
          key="2" 
          icon={<UserOutlined />} 
          onClick={() => handleRouting(`counter`)}
        >
          <span>Counter</span>
        </Menu.Item>
        <Menu.Item 
          key="3" 
          icon={<DesktopOutlined />} 
          onClick={() => handleRouting(`display`)}
        >
          <span>Display</span>
        </Menu.Item>
      </Menu>
      <Menu>
        <Menu.Item
          key="7"
          danger
          icon={<LogoutOutlined />}
          onClick={() => handleLogout()}
        >
          <span>Logout</span>
        </Menu.Item>
      </Menu>
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


