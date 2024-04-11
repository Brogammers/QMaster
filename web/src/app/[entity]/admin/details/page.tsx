'use client'
import { useState } from 'react';
import Entity from "../../page";
import AdminDetailsNavBar from '../../../components/AdminDetailsNavBar';

export default function Details() {
  const [selectedItem, setSelectedItem] = useState('Details');

  const handleItemSelected = (item: string): void => {
    setSelectedItem(item);
  }

  return (
    <Entity>
      <div className="h-screen pl-24 pt-4 bg-[#34F5C5]">
        <div className="max-w-5xl bg-[#17222D] p-4">
          <h2 className="text-white">Place details</h2>
          <AdminDetailsNavBar onItemSelected={handleItemSelected} />
          {/* Create a component for each item and render them using an if statement */}
        </div>
      </div>
    </Entity>
  )
}
