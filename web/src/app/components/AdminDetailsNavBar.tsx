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
    <div className='mb-6'>
      <CNav variant="underline">
        <CNavItem>
          <CNavLink
            href="#"
            style={{ color: activeLink === 'Details' ? 'black' : 'grey' }}
            onClick={() => handleClick('Details')}
          >
            Details
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="#"
            style={{ color: activeLink === 'Opening Hours' ? 'black' : 'grey' }}
            onClick={() => handleClick('Opening Hours')}
          >
            Opening Hours
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="#"
            style={{ color: activeLink === 'Settings' ? 'black' : 'grey' }}
            onClick={() => handleClick('Settings')}
          >
            Settings
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="#"
            style={{ color: activeLink === 'Visitor Data' ? 'black' : 'grey' }}
            onClick={() => handleClick('Visitor Data')}
          >
            Visitor Data
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="#"
            style={{ color: activeLink === 'Socials' ? 'black' : 'grey' }}
            onClick={() => handleClick('Socials')}
          >
            Socials
          </CNavLink>
        </CNavItem>
      </CNav>
    </div>
  )
}