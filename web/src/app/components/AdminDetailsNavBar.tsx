'use client'
import { useState } from 'react';
import { CNav, CNavItem, CNavLink } from '@coreui/react'
import { onSelectedProps } from '../../../types';

export default function AdminDetailsNavBar({ onItemSelected }: onSelectedProps) {
  const [activeLink, setActiveLink] = useState('Details');

  const handleClick = (item: string): void => {
    setActiveLink(item);
    onItemSelected(item);
  }

  return (
    <div><CNav variant="underline">
      <CNavItem>
        <CNavLink
          href="#"
          style={{ color: activeLink === 'Details' ? 'white' : 'grey' }}
          onClick={() => handleClick('Details')}
        >
          Details
        </CNavLink>
      </CNavItem>
      <CNavItem>
        <CNavLink
          href="#"
          style={{ color: activeLink === 'Opening Hours' ? 'white' : 'grey' }}
          onClick={() => handleClick('Opening Hours')}
        >
          Opening Hours
        </CNavLink>
      </CNavItem>
      <CNavItem>
        <CNavLink
          href="#"
          style={{ color: activeLink === 'Settings' ? 'white' : 'grey' }}
          onClick={() => handleClick('Settings')}
        >
          Settings
        </CNavLink>
      </CNavItem>
      <CNavItem>
        <CNavLink
          href="#"
          style={{ color: activeLink === 'Visitor data' ? 'white' : 'grey' }}
          onClick={() => handleClick('Visitor data')}
        >
          Visitor data
        </CNavLink>
      </CNavItem>
      <CNavItem>
        <CNavLink
          href="#"
          style={{ color: activeLink === 'Socials' ? 'white' : 'grey' }}
          onClick={() => handleClick('Socials')}
        >
          Socials
        </CNavLink>
      </CNavItem>
    </CNav></div>
  )
}