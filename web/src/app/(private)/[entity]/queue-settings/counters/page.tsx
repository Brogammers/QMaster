"use client";

import Entity from "../../page";
import CustomModal from "@/app/components/CustomModal";
import QueueModal from "@/app/shared/QueueModal";
import ServiceFactory from "@/components/service/ServiceFactory";
import {
    BusinessCategory,
    ServiceTemplate,
    businessTemplates,
} from "@/types/business";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import useWindowSize from "../../../../../../hooks/useWindowSize";

interface CounterSetupForm {
    services: ServiceTemplate[];
}

const validationSchema = Yup.object().shape({
    services: Yup.array()
        .of(
            Yup.object().shape({
                name: Yup.string().required("Required"),
                defaultCount: Yup.number().test(
                    "conditional-required",
                    "Required for counter and table services",
                    function (value, context) {
                        const { type } = context.parent;
                        if (["COUNTER", "TABLE"].includes(type)) {
                            return value !== undefined && value >= 1;
                        }
                        return true;
                    }
                ),
            })
        )
        .min(1, "At least one service must be configured"),
});

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
    const MAX_TICKETS = width > 1400 ? 4 : 3;

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
                    const overflowCount =
                        tickets.length - visibleTickets.length;
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

        calculateVisibleTickets(
            tickets1,
            setVisibleTickets1,
            setRemainingCount1
        );
        calculateVisibleTickets(
            tickets2,
            setVisibleTickets2,
            setRemainingCount2
        );
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
                style: {
                    background: "#10B981",
                    color: "#fff",
                },
            });
        }
    };

    const handleModalConfirm = (counterId: string) => {
        const selectedCounter = counters.find(
            (counter) => counter.id === parseInt(counterId)
        );
        if (selectedCounter) {
            const ticketToAdd = tickets2.find(
                (ticket) => ticket.service === selectedCounter.service
            );
            if (ticketToAdd) {
                const updatedTickets2 = tickets2.filter(
                    (ticket) => ticket !== ticketToAdd
                );
                const updatedTickets1 = tickets1.filter(
                    (ticket) => ticket.counterNum !== selectedCounter.id
                );

                const ticketWithCounter = {
                    ...ticketToAdd,
                    counterNum: selectedCounter.id,
                };

                updatedTickets1.push(ticketWithCounter);
                setTickets1(updatedTickets1);
                setTickets2(updatedTickets2);
                setModalOpen(false);
            }
        } else {
            toast.error("Select a valid counter", {
                style: {
                    background: "#ef4444",
                    color: "#fff",
                },
            });
        }
    };

    return (
        <Entity>
            <QueueModal title={`Setup counters for your queues`}>
                <div className="max-w-4xl mx-auto py-8">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                        validateOnChange={true}
                        validateOnBlur={true}
                    >
                        {({ values, setFieldValue }) => (
                            <div className="space-y-6">
                                {values.services.map((service, index) => (
                                    <ServiceFactory
                                        key={index}
                                        service={service}
                                        onServiceUpdate={(updates) => {
                                            const updatedServices = [
                                                ...values.services,
                                            ];
                                            updatedServices[index] = {
                                                ...service,
                                                ...updates,
                                            };
                                            setFieldValue(
                                                "services",
                                                updatedServices
                                            );
                                        }}
                                        onRemove={() => {
                                            const updatedServices = [
                                                ...values.services,
                                            ];
                                            updatedServices.splice(index, 1);
                                            setFieldValue(
                                                "services",
                                                updatedServices
                                            );
                                        }}
                                        canRemove={values.services.length > 1}
                                    />
                                ))}
                            </div>
                        )}
                    </Formik>
                </div>
            </QueueModal>
            <CustomModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleModalConfirm}
                counters={counters}
            />
        </Entity>
    );
}
