"use client"

import React, { useEffect, useMemo, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Import styles for React Tabs
import TicketNumber from '@/app/shared/TicketNumber';
import Entity from '../page';

export default function Counter() {
  const [activeTab1, setActiveTab1] = useState<number>(0);
  const [activeTab2, setActiveTab2] = useState<number>(0);
  const [visibleTickets1, setVisibleTickets1] = useState<any[]>([]);
  const [visibleTickets2, setVisibleTickets2] = useState<any[]>([]);

  const MAX_TICKETS = 5;

  const tickets1 = useMemo(() => [
    { id: 1, ticketNumber: 'C-123', service: 'Customer Service' },
    { id: 2, ticketNumber: 'C-124', service: 'New Customer' },
    // Add more ticket data as needed
  ], []);

  const tickets2 = useMemo(() => [
    { id: 1, ticketNumber: 'C-126', service: 'Customer Service' },
    { id: 2, ticketNumber: 'C-127', service: 'Customer Service' },
    { id: 3, ticketNumber: 'C-125', service: 'New Customer' }
    // Add more ticket data as needed
  ], []);

  useEffect(() => {
    const calculateVisibleTickets = (tickets: any[], setTickets: Function) => {
      let totalWidth = 0;
      let visibleTickets: any[] = [];

      for (const ticket of tickets) {
        totalWidth += ticket.width;
        if (totalWidth <= window.innerWidth) {
          visibleTickets.push(ticket);
        } else {
          const overflowCount = tickets.length - visibleTickets.length;
          visibleTickets.push({ id: 'overflow', ticketNumber: `${overflowCount}+` });
          break;
        }
      }

      setTickets(visibleTickets);
    };

    calculateVisibleTickets(tickets1, setVisibleTickets1);
    calculateVisibleTickets(tickets2, setVisibleTickets2);
  }, [tickets1, tickets2]);

  return (
    <Entity>
      <div className="flex flex-col justify-start gap-16">
        <div>
          <h3>Serving</h3>
          <Tabs width={window.innerWidth}>
            <TabList>
              {/* Tabs navigation for first row */}
              <Tab onClick={() => setActiveTab1(0)}>All servings</Tab>
              <Tab onClick={() => setActiveTab1(1)}>Customer Service</Tab>
              <Tab onClick={() => setActiveTab1(2)}>New Customer</Tab>
              {/* Add more tabs as needed */}
            </TabList>

            {/* Tab panels for first row */}
            <TabPanel className="w-full">
              {/* Scrollable container for first row */}
              <div className="w-full overflow-x-scroll flex">
                {/* Render list of ticket/cards for the selected service */}
                {tickets1.map((ticket, index) => (
                  <TicketNumber 
                    key={ticket.id} 
                    active={index === activeTab1}
                    bgColor="white"
                    textColor="black"
                    fontSize="3xl"
                    borderRadius="md"
                    width="6"
                    queue={ticket.service}
                    ticketNum={ticket.ticketNumber}
                  />
                ))}
                {/* Display overflow ticket if needed */}
                {tickets1.length > MAX_TICKETS && (
                  <TicketNumber
                    key="overflow"
                    ticketNum={`${tickets1.length - MAX_TICKETS}+`}
                    bgColor="white"
                    textColor="black"
                    fontSize="lg"
                    borderRadius="md"
                    width="6"
                  />
                )}
              </div>
            </TabPanel>

            {/* Add more TabPanels as needed for additional services */}
          </Tabs>
        </div>

        <div>
          <h3>In waiting line</h3>
          <Tabs>
            <TabList className="border-b-slate-grey border-b-2 flex items-center">
              {/* Tabs navigation for second row */}
              <Tab selectedClassName='bg-transparent' onClick={() => setActiveTab2(0)}>All queues</Tab>
              <Tab selectedClassName='bg-transparent' onClick={() => setActiveTab2(1)}>Customer Service</Tab>
              <Tab selectedClassName='bg-transparent' onClick={() => setActiveTab2(2)}>New Customer</Tab>
              {/* Add more tabs as needed */}
            </TabList>

            {/* Tab panels for second row */}
            <TabPanel>
              {/* Scrollable container for second row */}
              <div className="w-full overflow-x-scroll flex">
                {/* Render list of ticket/cards for the selected service */}
                {tickets2.map((ticket, index) => (
                  <TicketNumber 
                    key={ticket.id} 
                    active={index === activeTab2}
                    bgColor="white"
                    textColor="black"
                    fontSize="3xl"
                    borderRadius="md"
                    width="6"
                    queue={ticket.service}
                    ticketNum={ticket.ticketNumber}
                  />
                ))}
                {/* Display overflow ticket if needed */}
                {tickets2.length > MAX_TICKETS && (
                  <TicketNumber
                    key="overflow"
                    ticketNum={`${tickets2.length - MAX_TICKETS}+`}
                    bgColor="white"
                    textColor="black"
                    fontSize="lg"
                    borderRadius="md"
                    width="6"
                  />
                )}
              </div>
            </TabPanel>

            {/* Add more TabPanels as needed for additional services */}
          </Tabs>
        </div>
      </div>
    </Entity>
  );
};