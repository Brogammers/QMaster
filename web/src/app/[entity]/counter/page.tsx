"use client"

import React, { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import { Tab } from '@mui/material';
import { TabPanel, TabList, TabContext } from '@mui/lab';
import TicketNumber from '@/app/shared/TicketNumber';
import Entity from '../page';

export default function Counter() {
  const [activeTab1, setActiveTab1] = useState<string>('0');
  const [activeTab2, setActiveTab2] = useState<string>('0');
  const [visibleTickets1, setVisibleTickets1] = useState<any[]>([]);
  const [visibleTickets2, setVisibleTickets2] = useState<any[]>([]);
  const [remainingCount1, setRemainingCount1] = useState<number>(0);
  const [remainingCount2, setRemainingCount2] = useState<number>(0);

  const MAX_TICKETS = 3;

  const tickets1 = useMemo(() => [
    { id: 1, ticketNumber: 'C-123', service: 'Customer Service' },
    { id: 2, ticketNumber: 'C-124', service: 'New Customer' },
    // Add more ticket data as needed
  ], []);

  const tickets2 = useMemo(() => [
    { id: 1, ticketNumber: 'C-126', service: 'Customer Service' },
    { id: 2, ticketNumber: 'C-127', service: 'Customer Service' },
    { id: 3, ticketNumber: 'C-125', service: 'New Customer' },
    { id: 4, ticketNumber: 'C-435', service: 'New Customer' },
    { id: 5, ticketNumber: 'C-450', service: 'New Customer' },
    { id: 6, ticketNumber: 'C-455', service: 'Customer Service' },
    { id: 7, ticketNumber: 'C-460', service: 'Customer Service' },
    { id: 8, ticketNumber: 'C-670', service: 'New Customer' },
    { id: 9, ticketNumber: 'C-677', service: 'New Customer' },
    { id: 10, ticketNumber: 'C-790', service: 'New Customer' },
    { id: 11, ticketNumber: 'C-799', service: 'New Customer' },
    // Add more ticket data as needed
  ], []);

  useEffect(() => {
    const calculateVisibleTickets = (tickets: any[], setTickets: Function, setRemainingCount: Function) => {
      let totalWidth = 0;
      let visibleTickets: any[] = [];

      for (const ticket of tickets) {
        totalWidth += ticket.width;
        if (totalWidth <= window.innerWidth) {
          visibleTickets.push(ticket);
        } else {
          const overflowCount = tickets.length - visibleTickets.length;
          visibleTickets.push({ id: 'overflow', ticketNumber: `${overflowCount}+` });
          setRemainingCount(overflowCount);
          break;
        }
      }

      setTickets(visibleTickets);
    };

    calculateVisibleTickets(tickets1, setVisibleTickets1, setRemainingCount1);
    calculateVisibleTickets(tickets2, setVisibleTickets2, setRemainingCount2);
  }, [tickets1, tickets2]);

  const handleServingChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab1(newValue);
  };

  const handleWaitingChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab2(newValue);
  };

  const filterTickets = (tickets: any[], tabValue: string) => {
    // Extract unique service names from the tickets data
    const services = Array.from(new Set(tickets.map(ticket => ticket.service)));
  
    // Create filter conditions dynamically based on the unique service names
    const filterConditions: { [key: string]: (ticket: any) => boolean } = {};
    services.forEach((service, index) => {
      filterConditions[index.toString()] = (ticket) => ticket.service === service;
    });
  
    // Add a catch-all condition to return all tickets for tab value '0'
    filterConditions['0'] = () => true;
  
    // Apply the appropriate filter condition based on the tab value
    const filterCondition = filterConditions[tabValue];
    if (filterCondition) {
      return tickets.filter(filterCondition);
    } else {
      return [];
    }
  };
  

  return (
    <Entity>
      <div className="flex flex-col justify-start gap-16">
        <div>
          <h3>Serving</h3>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={activeTab1}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleServingChange} aria-label="lab API tabs example" sx={{ color: 'white' }}>
                  <Tab label="All servings" value="0" />
                  <Tab label="Customer Service" value="1" />
                  <Tab label="New Customer" value="2" />
                  {/* Add more tabs as needed */}
                </TabList>
              </Box>

              {/* Tab panels for first row */}
              <TabPanel className="px-0" value={activeTab1}>
                {/* Scrollable container for first row */}
                <div className="counter__scrollbar w-full overflow-x-scroll flex gap-4">
                  {/* Render list of ticket/cards for the selected service */}
                  {filterTickets(tickets1, activeTab1).map((ticket, index) => (
                    <TicketNumber 
                      key={ticket.id} 
                      active={index === parseInt(activeTab1)}
                      bgColor="white"
                      textColor="black"
                      fontSize="3xl"
                      borderRadius="md"
                      width="6"
                      maxWidth="16"
                      queue={ticket.service}
                      ticketNum={ticket.ticketNumber}
                    />
                  ))}
                  <TicketNumber
                    bgColor="transparent"
                    textColor="white"
                    fontSize="3xl"
                    borderRadius='md'
                    width="6"
                    maxWidth="16"
                    ticketNum="+"
                  />
                  {/* Display overflow ticket if needed */}
                  {tickets1.length > MAX_TICKETS && (
                    <TicketNumber
                      key="overflow"
                      ticketNum={`${tickets1.length - MAX_TICKETS}+`}
                      queue="others being served"
                      bgColor="white"
                      textColor="black"
                      fontSize="3xl"
                      borderRadius="md"
                      width="6"
                      maxWidth="16"
                    />
                  )}
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        </div>

        <div>
          <h3>In waiting line</h3>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={activeTab2}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleWaitingChange} aria-label="lab API tabs example" sx={{ color: 'white' }}>
                  <Tab label="All queues" value="0" />
                  <Tab label="Customer Service" value="1" />
                  <Tab label="New Customer" value="2" />
                  {/* Add more tabs as needed */}
                </TabList>
              </Box>

              {/* Tab panels for second row */}
              <TabPanel className="px-0" value={activeTab2}>
                {/* Scrollable container for second row */}
                <div className="counter__scrollbar w-full overflow-x-scroll flex gap-4">
                  {/* Render list of ticket/cards for the selected service */}
                  {filterTickets(tickets2, activeTab2).slice(0, 3).map((ticket, index) => (
                    <TicketNumber 
                      key={ticket.id} 
                      active={index === parseInt(activeTab2)}
                      bgColor="white"
                      textColor="black"
                      fontSize="3xl"
                      borderRadius="md"
                      width="6"
                      maxWidth="16"
                      queue={ticket.service}
                      ticketNum={ticket.ticketNumber}
                    />
                  ))}
                  {/* Display overflow ticket if needed */}
                  {tickets2.length > MAX_TICKETS && (
                    <TicketNumber
                      key="overflow"
                      ticketNum={`${tickets2.length - MAX_TICKETS}+`}
                      queue="others waiting in queue"
                      bgColor="white"
                      textColor="black"
                      fontSize="3xl"
                      borderRadius="md"
                      width="6"
                      maxWidth="16"
                    />
                  )}
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
    </Entity>
  );
};
