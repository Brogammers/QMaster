"use client"

import React, { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import { Tab } from '@mui/material';
import { TabPanel, TabList, TabContext } from '@mui/lab';
import TicketNumber from '@/app/shared/TicketNumber';
import Entity from '../page';
import useWindowSize from '../../../../hooks/useWindowSize';
import TextButton from '@/app/shared/TextButton';
import Image from 'next/image';
import MissionAccomplished from "../../../../public/mission-accomplished.svg";
import ExceptionMessage from '@/app/shared/ExceptionMessage';


export default function Counter() {
  const [activeTab1, setActiveTab1] = useState<string>('0');
  const [activeTab2, setActiveTab2] = useState<string>('0');
  const [visibleTickets1, setVisibleTickets1] = useState<any[]>([]);
  const [visibleTickets2, setVisibleTickets2] = useState<any[]>([]);
  const [remainingCount1, setRemainingCount1] = useState<number>(0);
  const [remainingCount2, setRemainingCount2] = useState<number>(0);
  const [tickets1, setTickets1] = useState<any[]>([
    // Add more ticket data as needed
  ]);
  const [tickets2, setTickets2] = useState<any[]>([
    { id: 1, ticketNumber: 'C-123', service: 'Customer Service' },
    { id: 2, ticketNumber: 'A-124', service: 'New Customer' },
    { id: 3, ticketNumber: 'C-126', service: 'Customer Service' },
    { id: 4, ticketNumber: 'C-127', service: 'Customer Service' },
    { id: 5, ticketNumber: 'A-125', service: 'New Customer' },
    { id: 6, ticketNumber: 'A-435', service: 'New Customer' },
    { id: 7, ticketNumber: 'A-450', service: 'New Customer' },
    { id: 8, ticketNumber: 'C-455', service: 'Customer Service' },
    { id: 9, ticketNumber: 'C-460', service: 'Customer Service' },
    { id: 10, ticketNumber: 'A-670', service: 'New Customer' },
    { id: 11, ticketNumber: 'A-677', service: 'New Customer' },
    { id: 12, ticketNumber: 'A-790', service: 'New Customer' },
    { id: 13, ticketNumber: 'A-799', service: 'New Customer' },
    // Add more ticket data as needed
  ]);
  
  const width = useWindowSize().width;
  const MAX_TICKETS = width > 1400 ? 4 : 3;

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
    // Apply the appropriate filter condition based on the tab value
    if (tabValue === '0') {
        // Return all tickets for tab value '0'
        return tickets;
    } else {
        // Filter tickets based on the selected service category
        return tickets.filter(ticket => ticket.service === tabValue);
    }
};

  // Initialize overflow count based on total tickets
  const initialOverflowCount1 = Math.max(tickets1.length - MAX_TICKETS, 0);
  const initialOverflowCount2 = Math.max(tickets2.length - MAX_TICKETS, 0);

  // State for overflow count
  const [overflowCount1, setOverflowCount1] = useState<number>(initialOverflowCount1);
  const [overflowCount2, setOverflowCount2] = useState<number>(initialOverflowCount2);

  // Calculate overflow count dynamically
  const calculateOverflowCount = (filteredTickets: any[], maxTickets: number) => {
    return Math.max(filteredTickets.length - maxTickets, 0);
  };

  useEffect(() => {
    // Calculate overflow count for initial state
    const initialOverflowCount1 = calculateOverflowCount(tickets1, MAX_TICKETS);
    const initialOverflowCount2 = calculateOverflowCount(tickets2, MAX_TICKETS);

    // Set initial overflow count
    setOverflowCount1(initialOverflowCount1);
    setOverflowCount2(initialOverflowCount2);
  }, [tickets1, tickets2, MAX_TICKETS]);

  // Update overflow count whenever filtering logic changes
  useEffect(() => {
    const filteredTickets1 = filterTickets(tickets1, activeTab1);
    const filteredTickets2 = filterTickets(tickets2, activeTab2);

    // Calculate overflow count based on filtered tickets
    const overflowCount1 = calculateOverflowCount(filteredTickets1, MAX_TICKETS);
    const overflowCount2 = calculateOverflowCount(filteredTickets2, MAX_TICKETS);

    // Update overflow count state
    setOverflowCount1(overflowCount1);
    setOverflowCount2(overflowCount2);
  }, [tickets1, tickets2, activeTab1, activeTab2, MAX_TICKETS]);

  const handleTicketButtonClick = (ticketNumber: string) => {
    // Handle ticket button click based on the queue type
    if (activeTab1 === "Customer Service") {
      // Logic for "serving" row
    } else if (activeTab2 === "others waiting in queue") {
      // Logic for "waiting in line" row
    }
  };

  const handleAddTicket = () => {
    // Check if there are tickets in the waiting line (tickets2)
    if (tickets2.length > 0) {
      // Get the first ticket from tickets2
      const ticketToAdd = tickets2[0];
  
      // Remove the first ticket from tickets2
      const updatedTickets2 = tickets2.slice(1);
  
      // Add the ticket to the beginning of tickets1
      const updatedTickets1 = [...tickets1, ticketToAdd];
  
      // Update the state with the modified ticket arrays
      setTickets1(updatedTickets1);
      setTickets2(updatedTickets2);
    }
  };
  

  return (
    <Entity>
      <div className="flex flex-col justify-start gap-16">
        <div>
          <h2>Serving</h2>
          <Box sx={{ width: '100%', typography: 'body1', bgcolor: 'white', borderRadius: 2, paddingX: 4, paddingY: 2, marginY: 4 }}>
            <TabContext value={activeTab1}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleServingChange} aria-label="lab API tabs example" sx={{ color: 'white' }}>
                  <Tab label="All servings" value="0" />
                  <Tab label="Customer Service" value="Customer Service" />
                  <Tab label="New Customer" value="New Customer" />
                </TabList>
              </Box>

              <TabPanel className="px-0" value={activeTab1}>
                <div className={`counter__scrollbar w-full overflow-x-scroll flex gap-4 ${tickets1.length <= 0 && ` justify-center items-center`}`}>
                  {tickets1.length <= 0 ? (
                    <>
                      <TextButton
                        text="Add to Queue"
                        textSize="xl"
                        textColor="white"
                        buttonColor="baby-blue"
                        borderRadius="xl"
                        width="16"
                        paddingX="16"
                        paddingY="8"
                        onPress={() => handleAddTicket()}
                      />
                      <ExceptionMessage
                        image={MissionAccomplished}
                        imageTitle="Mission Accomplished"
                        orientation="row"
                        width={185}
                        message="Hooray! All served, no waiting!"
                      />
                    </>
                  ) : (
                    <>
                      {filterTickets(tickets1, activeTab1).slice(0, MAX_TICKETS - 1).map((ticket, index) => (
                        <TicketNumber 
                          key={ticket.id} 
                          active={index === parseInt(activeTab1)}
                          bgColor="ocean-blue"
                          textColor="white"
                          fontSize="3xl"
                          borderRadius="xl"
                          width="6"
                          maxWidth="16"
                          queue={ticket.service}
                          ticketNum={ticket.ticketNumber}
                        />
                      ))}
                      {tickets1.length > MAX_TICKETS - 1 && (
                        <TicketNumber
                          key="overflow"
                          ticketNum={`${overflowCount1 + 1}+`}
                          queue="others are being served"
                          bgColor="baby-blue"
                          textColor="white"
                          fontSize="3xl"
                          borderRadius="xl"
                          width="6"
                          maxWidth="16"
                          labelPadding="4"
                        />
                      )}
                      <TextButton
                        text="+"
                        textSize="3xl"
                        textColor="white"
                        buttonColor="coal-black"
                        borderRadius="xl"
                        width="24"
                        paddingX="24"
                        paddingY="8"
                        onPress={() => handleAddTicket()}
                      />
                    </>
                  )}
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        </div>

        <div>
          <h2>In waiting line</h2>
          <Box sx={{ width: '100%', typography: 'body1', bgcolor: 'white', borderRadius: 2, paddingX: 4, paddingY: 2, marginY: 4 }}>
            <TabContext value={activeTab2}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleWaitingChange} aria-label="lab API tabs example" sx={{ color: 'white' }}>
                  <Tab label="All queues" value="0" />
                  <Tab label="Customer Service" value="Customer Service" />
                  <Tab label="New Customer" value="New Customer" />
                </TabList>
              </Box>

              <TabPanel className="px-0" value={activeTab2}>
                <div className={`counter__scrollbar w-full overflow-x-scroll flex gap-4 ${tickets2.length <= 0 && ` justify-center items-center`}`}>
                  {tickets2.length <= 0 ? (
                    <ExceptionMessage
                      image={MissionAccomplished}
                      imageTitle="Mission Accomplished"
                      orientation="row"
                      width={185}
                      message="Celebrate! No waiting line!"
                    />
                  ) : (
                    <>
                      {filterTickets(tickets2, activeTab2).slice(0, MAX_TICKETS).map((ticket, index) => (
                        <TicketNumber 
                          key={ticket.id} 
                          active={index === parseInt(activeTab2)}
                          bgColor="ocean-blue"
                          textColor="white"
                          fontSize="3xl"
                          borderRadius="xl"
                          width="6"
                          maxWidth="16"
                          queue={ticket.service}
                          ticketNum={ticket.ticketNumber}
                        />
                      ))}
                      {tickets2.length > MAX_TICKETS && (
                        <TicketNumber
                          key="overflow"
                          ticketNum={`${overflowCount2}+`}
                          queue="others waiting in queue"
                          bgColor="baby-blue"
                          textColor="white"
                          fontSize="3xl"
                          borderRadius="xl"
                          width="6"
                          maxWidth="16"
                          labelPadding="4"
                        />
                      )}
                    </>
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
