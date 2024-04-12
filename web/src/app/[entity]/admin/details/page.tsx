'use client'
import { useState } from 'react';
import Entity from "../../page";
import AdminDetailsNavBar from '../../../components/AdminDetailsNavBar';
import DetailsComponent from '@/app/components/DetailsComponent';
import OpeningHours from '@/app/components/OpeningHours';
import DetailsSettings from '@/app/components/DetailsSettings';
import DetailsSocials from '@/app/components/DetailsSocials';
import VisitorData from '@/app/components/VisitorData';
import QueueModal from '@/app/shared/QueueModal';

export default function Details() {
  const [selectedItem, setSelectedItem] = useState('Details');

  const handleItemSelected = (item: string): void => {
    setSelectedItem(item);
  }

  return (
    <Entity>
      
      <QueueModal title='Place Details'>
      <AdminDetailsNavBar onItemSelected={handleItemSelected} />
          {selectedItem === 'Details' && <DetailsComponent />}
          {selectedItem === 'Opening Hours' && <OpeningHours />}
          {selectedItem === 'Settings' && <DetailsSettings />}
          {selectedItem === 'Socials' && <DetailsSocials />}
          {selectedItem === 'Visitor Data' && <VisitorData />}
      </QueueModal>
    </Entity>
  )
}
