"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import Box from "@mui/material/Box";
import { Tab } from "@mui/material";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import TicketNumber from "@/app/shared/TicketNumber";
import useWindowSize from "../../../../../hooks/useWindowSize";
import TextButton from "@/app/shared/TextButton";
import MissionAccomplished from "../../../../../public/mission-accomplished.svg";
import ExceptionMessage from "@/app/shared/ExceptionMessage";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "antd";
import QueueModal from "@/app/shared/QueueModal";
import CustomModal from "@/app/components/CustomModal";
import toast from "react-hot-toast";
import {
  BusinessCategory,
  ServiceTemplate,
  businessTemplates,
} from "@/types/business";
import ServiceFactory from "@/components/service/ServiceFactory";
import Entity from "../page";

interface CounterSetupForm {
  services: ServiceTemplate[];
}

// Constants for ticket dimensions
const TICKET_DIMENSIONS = {
  width: 250, // Width of each ticket including any margins
  gap: 16, // Gap between tickets (from gap-4)
  plusButtonWidth: 100, // Width of the "+" button
  indicatorWidth: 250, // Width of the "+N more" indicator ticket
} as const;

export default function Counter() {
  const [activeTab1, setActiveTab1] = useState<string>("0");
  const [activeTab2, setActiveTab2] = useState<string>("0");
  const [visibleTickets1, setVisibleTickets1] = useState<any[]>([]);
  const [visibleTickets2, setVisibleTickets2] = useState<any[]>([]);
  const [remainingCount1, setRemainingCount1] = useState<number>(0);
  const [remainingCount2, setRemainingCount2] = useState<number>(0);
  const [counterSetup, setCounterSetup] = useState<boolean>(true);
  const [counters, setCounters] = useState<any[]>([]);
  const [formValues, setFormValues] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [businessType, setBusinessType] = useState<BusinessCategory>(
    BusinessCategory.BANKING
  ); // This should come from your auth context or API
  const [tickets1, setTickets1] = useState<any[]>([]);
  const [tickets2, setTickets2] = useState<any[]>([
    { id: 1, ticketNumber: "C-123", service: "Customer Service" },
    { id: 2, ticketNumber: "A-124", service: "New Customer" },
    { id: 3, ticketNumber: "C-126", service: "Customer Service" },
    { id: 4, ticketNumber: "C-127", service: "Customer Service" },
    { id: 5, ticketNumber: "A-125", service: "New Customer" },
  ]);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const businessTemplate = businessTemplates[businessType];
  const initialValues: CounterSetupForm = {
    services: businessTemplate.defaultServices,
  };

  const handleSubmit = (values: CounterSetupForm) => {
    console.log("Form values:", values);
    setCounterSetup(false);
    setFormValues(values);

    let counterId = 1;
    const updatedCounters = values.services.flatMap((service) => {
      if (service.type === "COUNTER" || service.type === "TABLE") {
        return Array.from(
          { length: service.defaultCount || 0 },
          (_, index) => ({
            id: counterId++,
            service: service.name,
            type: service.type,
            properties: service.properties,
          })
        );
      }
      return [];
    });

    setCounters(updatedCounters);
  };

  const width = useWindowSize().width;

  // Function to calculate how many tickets can fit
  const calculateVisibleTickets = useCallback((containerWidth: number) => {
    const availableWidth = containerWidth - TICKET_DIMENSIONS.indicatorWidth; // Reserve space for indicator
    const ticketTotalWidth = TICKET_DIMENSIONS.width + TICKET_DIMENSIONS.gap;
    return Math.max(2, Math.floor(availableWidth / ticketTotalWidth) + 1);
  }, []);

  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateContainerWidth();
    window.addEventListener("resize", updateContainerWidth);
    return () => window.removeEventListener("resize", updateContainerWidth);
  }, []);

  useEffect(() => {
    const calculateVisibleTickets = (
      tickets: any[],
      setTickets: Function,
      setRemainingCount: Function
    ) => {
      let totalWidth = 0;
      let visibleTickets: any[] = [];

      for (const ticket of tickets) {
        totalWidth += ticket.width;
        if (totalWidth <= window.innerWidth) {
          visibleTickets.push(ticket);
        } else {
          const overflowCount = tickets.length - visibleTickets.length;
          visibleTickets.push({
            id: "overflow",
            ticketNumber: `${overflowCount}+`,
          });
          setRemainingCount(overflowCount);
          break;
        }
      }

      setTickets(visibleTickets);
    };

    calculateVisibleTickets(tickets1, setVisibleTickets1, setRemainingCount1);
    calculateVisibleTickets(tickets2, setVisibleTickets2, setRemainingCount2);
  }, [tickets1, tickets2]);

  const handleServingChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setActiveTab1(newValue);
  };

  const handleWaitingChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setActiveTab2(newValue);
  };

  const filterTickets = (tickets: any[], tabValue: string) => {
    if (tabValue === "0") {
      return tickets;
    } else {
      return tickets.filter((ticket) => ticket.service === tabValue);
    }
  };

  const handleAddTicket = () => {
    if (tickets2.length > 0) {
      setModalOpen(true);
    } else {
      toast.success("Celebrate! No waiting line!", {
        duration: 5000,
        style: {
          background: "#17222D",
          color: "#FFF",
        },
      });
    }
  };

  return (
    <Entity>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-coal-black mb-4">Counter</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <TabContext value={activeTab1}>
              <Box sx={{ borderBottom: 1, borderColor: "rgba(0,0,0,0.1)" }}>
                <TabList
                  onChange={handleServingChange}
                  aria-label="serving tabs"
                  sx={{
                    "& .MuiTab-root": {
                      color: "rgba(0,0,0,0.6)",
                      "&.Mui-selected": { color: "#1DCDFE" },
                    },
                    "& .MuiTabs-indicator": {
                      backgroundColor: "#1DCDFE",
                    },
                  }}
                >
                  <Tab
                    label={
                      businessTemplate.hasWaitingQueue
                        ? "All servings"
                        : "All active"
                    }
                    value="0"
                  />
                  {formValues?.services?.map((service: ServiceTemplate) => (
                    <Tab
                      key={service.name}
                      label={service.name}
                      value={service.name}
                    />
                  ))}
                </TabList>
              </Box>

              <TabPanel className="px-0 py-6" value={activeTab1}>
                <div
                  className={`counter__scrollbar flex gap-4 ${
                    tickets1.length <= 0 && "justify-center items-center"
                  }`}
                >
                  {tickets1.length <= 0 ? (
                    <div className="flex items-center gap-16">
                      <TextButton
                        text={
                          businessTemplate.hasWaitingQueue
                            ? "Add to Queue"
                            : "Add Booking"
                        }
                        textSize="sm"
                        textColor="white"
                        buttonColor="baby-blue"
                        borderRadius="xl"
                        width="16"
                        minWidth="56"
                        paddingX="4"
                        paddingY="4"
                        onPress={() => handleAddTicket()}
                      />
                      <ExceptionMessage
                        image={MissionAccomplished}
                        imageTitle="All Clear"
                        orientation="row"
                        width={185}
                        message={
                          businessTemplate.hasWaitingQueue
                            ? "All served, no waiting!"
                            : "No active bookings"
                        }
                      />
                    </div>
                  ) : (
                    <>
                      {filterTickets(tickets1, activeTab1).map(
                        (ticket, index) => (
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
                            counterNum={ticket.counterNum}
                            ticketNum={ticket.ticketNumber}
                          />
                        )
                      )}
                      <TextButton
                        text="+"
                        textSize="3xl"
                        textColor="white"
                        buttonColor="baby-blue"
                        borderRadius="xl"
                        width="32"
                        minWidth="56"
                        paddingX="8"
                        paddingY="4"
                        onPress={() => handleAddTicket()}
                      />
                    </>
                  )}
                </div>
              </TabPanel>
            </TabContext>
          </div>
        </div>

        {businessTemplate.hasWaitingQueue && (
          <div>
            <h2 className="text-2xl font-bold text-coal-black mb-4">
              In waiting line
            </h2>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <TabContext value={activeTab2}>
                <Box sx={{ borderBottom: 1, borderColor: "rgba(0,0,0,0.1)" }}>
                  <TabList
                    onChange={handleWaitingChange}
                    aria-label="waiting tabs"
                    sx={{
                      "& .MuiTab-root": {
                        color: "rgba(0,0,0,0.6)",
                        "&.Mui-selected": { color: "#1DCDFE" },
                      },
                      "& .MuiTabs-indicator": {
                        backgroundColor: "#1DCDFE",
                      },
                    }}
                  >
                    <Tab label="All queues" value="0" />
                    {formValues?.services?.map((service: ServiceTemplate) => (
                      <Tab
                        key={service.name}
                        label={service.name}
                        value={service.name}
                      />
                    ))}
                  </TabList>
                </Box>

                <TabPanel className="px-0 py-6" value={activeTab2}>
                  <div
                    ref={containerRef}
                    className={`counter__scrollbar flex gap-4 ${
                      tickets2.length <= 0 && "justify-center items-center"
                    }`}
                  >
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
                        {(() => {
                          const maxVisibleTickets =
                            calculateVisibleTickets(containerWidth);
                          const filteredTickets = filterTickets(
                            tickets2,
                            activeTab2
                          );
                          const visibleTickets = filteredTickets.slice(
                            0,
                            maxVisibleTickets
                          );
                          const remainingTickets =
                            filteredTickets.length - maxVisibleTickets;

                          return (
                            <>
                              {visibleTickets.map((ticket) => (
                                <TicketNumber
                                  key={ticket.id}
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
                              {remainingTickets > 0 && (
                                <TicketNumber
                                  key="overflow"
                                  ticketNum={`${remainingTickets}+`}
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
                          );
                        })()}
                      </>
                    )}
                  </div>
                </TabPanel>
              </TabContext>
            </div>
          </div>
        )}
      </div>
    </Entity>
  );
}
