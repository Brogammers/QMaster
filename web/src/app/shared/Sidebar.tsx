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
import { cilPuzzle, cilSpeedometer, cilCloudDownload, cilLayers } from '@coreui/icons';
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
        <CNavItem href="#"><CIcon customClassName="nav-icon" icon={cilSpeedometer} /> Nav item</CNavItem>
        <CNavItem href="#"><CIcon customClassName="nav-icon" icon={cilSpeedometer} /> With badge <CBadge color="primary ms-auto">NEW</CBadge></CNavItem>
        <CNavGroup
          toggler={
            <>
              <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Nav dropdown
            </>
          }
        >
          <CNavItem href="#"><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Nav dropdown item</CNavItem>
          <CNavItem href="#"><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Nav dropdown item</CNavItem>
        </CNavGroup>
        <CNavItem href="https://coreui.io"><CIcon customClassName="nav-icon" icon={cilCloudDownload} /> Download CoreUI</CNavItem>
        <CNavItem href="https://coreui.io/pro/"><CIcon customClassName="nav-icon" icon={cilLayers} /> Try CoreUI PRO</CNavItem>
      </CSidebarNav>
      <CSidebarHeader className="border-top">
        <CSidebarToggler />
      </CSidebarHeader>
    </CSidebar>
  )
}


