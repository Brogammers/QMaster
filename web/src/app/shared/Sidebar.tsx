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
import { RiAdminLine } from "react-icons/ri";
import CIcon from '@coreui/icons-react';
import { cilSettings, cilScreenDesktop, cilPeople } from '@coreui/icons';
import '@coreui/coreui/dist/css/coreui.min.css';
import Image from 'next/image';
import QMasterLogo from "../../../public/qmaster.svg"
import { useState } from 'react';


export default function Sidebar() {
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
          <CNavItem href="#">
            <span className="nav-icon">
              <span className="nav-icon-bullet" />
            </span>
            Details
          </CNavItem>
          <CNavItem href="#">
            <span className="nav-icon">
              <span className="nav-icon-bullet" />
            </span>
            Queues
          </CNavItem>
          <CNavItem href="#">
            <span className="nav-icon">
              <span className="nav-icon-bullet" />
            </span>
            Customer Feedback
          </CNavItem>
        </CNavGroup>
        <CNavItem href="#">
          <CIcon 
            customClassName="nav-icon" 
            icon={cilPeople} 
          />
            Counter
        </CNavItem>
        <CNavItem href="#">
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


