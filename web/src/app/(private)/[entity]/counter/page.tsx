"use client"

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Tab } from '@mui/material';
import { TabPanel, TabList, TabContext } from '@mui/lab';
import TicketNumber from '@/app/shared/TicketNumber';
import Entity from '../page';
import useWindowSize from '../../../../../hooks/useWindowSize';
import TextButton from '@/app/shared/TextButton';
import MissionAccomplished from "../../../../../public/mission-accomplished.svg";
import ExceptionMessage from '@/app/shared/ExceptionMessage';
import { Formik, Form, FormikErrors, FormikTouched } from 'formik';
import * as Yup from 'yup';
import { Button } from 'antd';
import QueueModal from '@/app/shared/QueueModal';
import StyledFieldArray from '@/app/shared/StyledFieldArray';
import StyledField from '@/app/shared/StyledField';
import CustomModal from '@/app/components/CustomModal';
import toast from 'react-hot-toast';

interface ServiceForm {
  services: Array<{
    name: string;
    count: number;
  }>;
}

const validationSchema = Yup.object().shape({
  services: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required('Required'),
        count: Yup.number().required('Required'),
      })
    )
    .test('is-duplicate', 'Duplicate service names found', function (value) {
      const serviceNames = new Set();
      let hasDuplicate = false;

      value?.forEach(service => {
        const serviceName = (service.name || '').replace(/\s+/g, '').trim().toLowerCase();
        if (serviceNames.has(serviceName)) {
          hasDuplicate = true;
          return;
        }
        serviceNames.add(serviceName);
      });

      return !hasDuplicate;
    })
    .min(1, 'At least one service must be entered'),
});

const initialValues = {
  services: [{ name: '', count: 0 }],
};

const ShowFormErrors = ({ 
  errors, 
  touched 
}: { 
  errors: FormikErrors<ServiceForm>, 
  touched: FormikTouched<ServiceForm> 
}) => {
  useEffect(() => {
    if (errors.services) {
      if (typeof errors.services === 'string') {
        toast.error(errors.services, {
          style: {
            background: '#ef4444',
            color: '#fff',
          },
        });
      } else if (Array.isArray(errors.services)) {
        errors.services.forEach((error: any, index: number) => {
          if (error?.name && touched.services?.[index]?.name) {
            toast.error(`Service Name is required`, {
              style: {
                background: '#ef4444',
                color: '#fff',
              },
            });
          }
          if (error?.count && touched.services?.[index]?.count) {
            toast.error(`Counter Count is required`, {
              style: {
                background: '#ef4444',
                color: '#fff',
              },
            });
          }
        });
      }
    }
  }, [errors.services, touched.services]);

  return null;
};

export default function Counter() {
  const [activeTab1, setActiveTab1] = useState<string>('0');
  const [activeTab2, setActiveTab2] = useState<string>('0');
  const [visibleTickets1, setVisibleTickets1] = useState<any[]>([]);
  const [visibleTickets2, setVisibleTickets2] = useState<any[]>([]);
  const [remainingCount1, setRemainingCount1] = useState<number>(0);
  const [remainingCount2, setRemainingCount2] = useState<number>(0);
  const [counterSetup, setCounterSetup] = useState<boolean>(true);
  const [counters, setCounters] = useState<any[]>([]);
  const [formValues, setFormValues] = useState<any>(null);
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);
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
    { id: 14, ticketNumber: 'P-799', service: 'Payments' },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);

  const handleSubmit = (values: { services: { name: string; count: number; }[] }, { setSubmitting }: any) => {
    const serviceNames = new Set<string>();
    let duplicateService: string | null = null;

    values.services.forEach((service: { name: string }) => {
      if (serviceNames.has(service.name)) {
        duplicateService = service.name;
        return;
      } else {
        serviceNames.add(service.name);
      }
    });

    if (duplicateService) {
      return Promise.resolve();
    }

    console.log('Form values:', values);
    setCounterSetup(!counterSetup);
    setFormValues(values);

    const serviceCounts: { [key: string]: number } = {};
    values.services.forEach((service: any) => {
      const { name } = service;
      if (serviceCounts[name]) {
        duplicateService = name;
        return;
      }
      serviceCounts[name] = (serviceCounts[name] || 0) + 1;
    });

    if (duplicateService) {
      alert(`You filled in the same service '${duplicateService}' more than once.`);
      return Promise.resolve();
    }

    let counterId = 1; 
    const updatedCounters = values.services.flatMap((service: any) => {
      const { name, count } = service;
      const countersForService = Array.from({ length: count }, (_, index) => ({
        id: counterId++, 
        service: name,
      }));
      return countersForService;
    });

    setCounters(updatedCounters);

    return Promise.resolve(); 
  };
  
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
    if (tabValue === '0') {
      return tickets;
    } else {
      return tickets.filter(ticket => ticket.service === tabValue);
    }
  };

  const initialOverflowCount2 = Math.max(tickets2.length - MAX_TICKETS, 0);

  const [overflowCount2, setOverflowCount2] = useState<number>(initialOverflowCount2);

  const calculateOverflowCount = (filteredTickets: any[], maxTickets: number) => {
    return Math.max(filteredTickets.length - maxTickets, 0);
  };

  useEffect(() => {
    const initialOverflowCount2 = calculateOverflowCount(tickets2, MAX_TICKETS);

    setOverflowCount2(initialOverflowCount2);
  }, [tickets1, tickets2, MAX_TICKETS]);

  useEffect(() => {
    const filteredTickets1 = filterTickets(tickets1, activeTab1);
    const filteredTickets2 = filterTickets(tickets2, activeTab2);

    const overflowCount2 = calculateOverflowCount(filteredTickets2, MAX_TICKETS);

    setOverflowCount2(overflowCount2);
  }, [tickets1, tickets2, activeTab1, activeTab2, MAX_TICKETS]);

  const handleAddTicket = () => {
    if (tickets2.length > 0) {
      setModalOpen(true);
    } else {
      alert("Celebrate! No waiting line!");
    }
  };

  const handleModalConfirm = (counterId: string) => {
    const selectedCounter = counters.find(counter => counter.id === parseInt(counterId));
    if (selectedCounter) {
      const ticketToAdd = tickets2.find(ticket => ticket.service === selectedCounter.service);
      if (ticketToAdd) {
        const updatedTickets2 = tickets2.filter(ticket => ticket !== ticketToAdd);
        const updatedTickets1 = tickets1.filter(ticket => ticket.counterNum !== selectedCounter.id);

        const ticketWithCounter = { ...ticketToAdd, counterNum: selectedCounter.id };
        
        updatedTickets1.push(ticketWithCounter);
        setTickets1(updatedTickets1);
        setTickets2(updatedTickets2);
        setModalOpen(false);
      }
    } else {
      alert("Select a valid counter");
    }
  };

  return (
    <Entity>
      {counterSetup ? (
        <QueueModal title="Setup Counter Space">
          <div className="max-w-4xl mx-auto py-8">
            <Formik<ServiceForm>
              initialValues={initialValues} 
              onSubmit={handleSubmit} 
              validationSchema={validationSchema}
              validateOnChange={true}
              validateOnBlur={true}
            >
              {({ values, errors, isValid, setFieldValue, touched }) => (
                <Form className="space-y-8">
                  <ShowFormErrors errors={errors} touched={touched} />
                  <StyledFieldArray name="services" render={({ push, remove }) => (
                    <div className="space-y-6">
                      {values.services.map((_, index) => (
                        <div key={index} className="flex items-start gap-6 p-8 bg-white/10 backdrop-blur-md rounded-3xl border-2 border-white/20 shadow-lg">
                          <div className="flex-1 flex gap-6">
                            <div className="flex-1">
                              <label className="block text-sm font-medium text-coal-black mb-2">Service Name</label>
                              <div className="relative">
                                <StyledField
                                  name={`services.${index}.name`}
                                  placeholder="Service"
                                  className="border-ocean-blue border-4 w-full bg-white/50 rounded-xl px-4 py-3 text-coal-black placeholder-coal-black/50 focus:ring-2 focus:ring-baby-blue"
                                />
                              </div>
                            </div>
                            <div className="w-56">
                              <label className="block text-sm font-medium text-coal-black mb-2">Counter Count</label>
                              <div className="relative">
                                <StyledField 
                                  name={`services.${index}.count`} 
                                  placeholder="Number of Counters" 
                                  type="number"
                                  className="border-ocean-blue border-4 w-full bg-white/50 rounded-xl px-4 py-3 text-coal-black placeholder-coal-black/50 focus:ring-2 focus:ring-baby-blue"
                                />
                              </div>
                            </div>
                          </div>
                          <Button
                            onClick={() => remove(index)}
                            disabled={isDuplicate}
                            className="!bg-rose-500/90 !text-white hover:!bg-rose-600 border-0 rounded-xl h-11 mt-8"
                            icon={<span className="text-lg">×</span>}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button
                        onClick={() => setFieldValue('services', [...values.services, { name: '', count: 0 }])}
                        disabled={isDuplicate}
                        className="!bg-ocean-blue/90 !text-white hover:!bg-ocean-blue border-0 rounded-xl w-full h-12 text-lg"
                      >
                        Add Service
                      </Button>
                    </div>
                  )} />
                  <Button
                    htmlType="submit"
                    disabled={!isValid || isDuplicate}
                    className="!bg-gradient-to-r !from-baby-blue !to-ocean-blue hover:!opacity-90 !text-white !border-0 !rounded-xl w-full !h-14 !text-lg !font-medium mt-4"
                  >
                    Create Counter Space
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </QueueModal>
      ) : (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-coal-black mb-4">Serving</h2>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <TabContext value={activeTab1}>
                <Box sx={{ borderBottom: 1, borderColor: 'rgba(0,0,0,0.1)' }}>
                  <TabList 
                    onChange={handleServingChange} 
                    aria-label="serving tabs"
                    sx={{ 
                      '& .MuiTab-root': { 
                        color: 'rgba(0,0,0,0.6)',
                        '&.Mui-selected': { color: '#1DCDFE' }
                      },
                      '& .MuiTabs-indicator': { backgroundColor: '#1DCDFE' }
                    }}
                  >
                    <Tab label="All servings" value="0" />
                    {formValues?.services?.map((service: any) => (
                      <Tab key={service.name} label={service.name} value={service.name} />
                    ))}
                  </TabList>
                </Box>

                <TabPanel className="px-0 py-6" value={activeTab1}>
                  <div className={`counter__scrollbar flex gap-4 ${tickets1.length <= 0 && 'justify-center items-center'}`}>
                    {tickets1.length <= 0 ? (
                      <div className="flex items-center gap-16">
                        <TextButton
                          text="Add to Queue"
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
                          imageTitle="Mission Accomplished"
                          orientation="row"
                          width={185}
                          message="Hooray! All served, no waiting!"
                        />
                      </div>
                    ) : (
                      <>
                        {filterTickets(tickets1, activeTab1).map((ticket, index) => (
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
                        ))}
                        <TextButton
                          text="+"
                          textSize="3xl"
                          textColor="white"
                          buttonColor="coal-black"
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

          <div>
            <h2 className="text-2xl font-bold text-coal-black mb-4">In waiting line</h2>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <TabContext value={activeTab2}>
                <Box sx={{ borderBottom: 1, borderColor: 'rgba(0,0,0,0.1)' }}>
                  <TabList 
                    onChange={handleWaitingChange} 
                    aria-label="waiting tabs"
                    sx={{ 
                      '& .MuiTab-root': { 
                        color: 'rgba(0,0,0,0.6)',
                        '&.Mui-selected': { color: '#1DCDFE' }
                      },
                      '& .MuiTabs-indicator': { backgroundColor: '#1DCDFE' }
                    }}
                  >
                    <Tab label="All queues" value="0" />
                    {formValues?.services?.map((service: any) => (
                      <Tab key={service.name} label={service.name} value={service.name} />
                    ))}
                  </TabList>
                </Box>

                <TabPanel className="px-0 py-6" value={activeTab2}>
                  <div className={`counter__scrollbar flex gap-4 ${tickets2.length <= 0 && 'justify-center items-center'}`}>
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
            </div>
          </div>
        </div>
      )}
      <CustomModal 
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleModalConfirm}
        counters={counters}
      />
    </Entity>
  );
}
