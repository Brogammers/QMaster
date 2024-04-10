import { useState, useEffect} from "react";
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
import Image from 'next/image';
import QMasterLogo from "../../../public/qmaster.svg";


export default function Sidebar() {
  const [role, setRole] = useState('');

  useEffect(() => {
    // Fetch the user's role from a server when they log in
    // and store it in the `role` state.

    // fetchUserRole().then(setRole);
  }, []);

  return (
    <CSidebar className="sidebar border-end h-screen" colorScheme="dark" unfoldable>
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand className='font-bold no-underline flex items-center'>
          <Image
            src={QMasterLogo} 
            alt='QMaster' 
            width={40}
          />
          <span className='text__branding text-2xl ml-4'>QMaster</span>
        </CSidebarBrand>
      </CSidebarHeader>
      <CSidebarNav>
        <CNavTitle>Welcome back, Hatem</CNavTitle>
        <CNavGroup
          toggler={
            <>
              <CIcon customClassName="nav-icon" icon={cilSettings} /> Admin
            </>
          }
        >
          <CNavItem href="/admin/details">
            <span className="nav-icon">
              <span className="nav-icon-bullet" />
            </span>
            Details
          </CNavItem>
          <CNavItem href="/admin/queues">
            <span className="nav-icon">
              <span className="nav-icon-bullet" />
            </span>
            Queues
          </CNavItem>
          <CNavItem href="/admin/customer-feedback">
            <span className="nav-icon">
              <span className="nav-icon-bullet" />
            </span>
            Customer Feedback
          </CNavItem>
        </CNavGroup>
        <CNavItem href="/counter">
          <CIcon 
            customClassName="nav-icon" 
            icon={cilPeople} 
          />
            Counter
        </CNavItem>
        <CNavItem href="/display">
          <CIcon 
            customClassName="nav-icon" 
            icon={cilScreenDesktop}
          />
            Display
            <CBadge color="primary ms-auto">NEW</CBadge>
        </CNavItem>
      </CSidebarNav>
      <CSidebarHeader className="border-top">
        <CSidebarToggler />
      </CSidebarHeader>
    </CSidebar>
  )
}


