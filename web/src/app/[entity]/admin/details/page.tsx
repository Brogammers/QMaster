'use client'
import React, { useState } from 'react';
import Entity from "../../page";
import AdminDetailsNavBar from '../../../components/AdminDetailsNavBar';

export default function Details() {
  // Step 1: State to hold the selected item
  const [selectedItem, setSelectedItem] = useState('Details');

  // Step 2: Handler function to update the selected item
  const handleItemSelected = (item: string): void => {
    setSelectedItem(item);
  }

  return (
    <Entity>
      <div className="h-screen pl-24 pt-4 bg-[#34F5C5]">
        <div className="max-w-5xl bg-[#17222D] p-4">
          <h2 className="text-white">Place details</h2>
          <AdminDetailsNavBar onItemSelected={handleItemSelected} />
          <div className="p-4">
            <h3 className="text-white">{selectedItem}</h3>
          </div>
        </div>
      </div>
    </Entity>
  )
}
