export enum BusinessCategory {
  HEALTHCARE = 'HEALTHCARE',
  BANKING = 'BANKING',
  AUTOMOTIVE = 'AUTOMOTIVE',
  GOVERNMENT = 'GOVERNMENT',
  EDUCATION = 'EDUCATION',
  RESTAURANT = 'RESTAURANT',
  TELECOM = 'TELECOM',
  PRIVATE_CATERING = 'PRIVATE_CATERING',
  RETAIL = 'RETAIL',
}

export interface ServiceTemplate {
  name: string;
  type: 'COUNTER' | 'TABLE' | 'APPOINTMENT' | 'BOOKING';
  defaultCount?: number;
  properties?: {
    capacity?: number;
    duration?: number;
    specialization?: string;
  };
}

export interface BusinessTemplate {
  category: BusinessCategory;
  name: string;
  defaultServices: ServiceTemplate[];
  allowCustomServices: boolean;
  requiresBooking: boolean;
  hasWaitingQueue: boolean;
}

export const businessTemplates: Record<BusinessCategory, BusinessTemplate> = {
  [BusinessCategory.HEALTHCARE]: {
    category: BusinessCategory.HEALTHCARE,
    name: 'Healthcare',
    defaultServices: [
      { name: 'General Consultation', type: 'COUNTER', defaultCount: 3 },
      { name: 'Specialist Consultation', type: 'APPOINTMENT' },
      { name: 'Emergency', type: 'COUNTER', defaultCount: 2 },
      { name: 'Pharmacy', type: 'COUNTER', defaultCount: 2 },
    ],
    allowCustomServices: true,
    requiresBooking: true,
    hasWaitingQueue: true,
  },
  [BusinessCategory.BANKING]: {
    category: BusinessCategory.BANKING,
    name: 'Banking',
    defaultServices: [
      { name: 'Teller', type: 'COUNTER', defaultCount: 4 },
      { name: 'Customer Service', type: 'COUNTER', defaultCount: 3 },
      { name: 'Business Banking', type: 'COUNTER', defaultCount: 2 },
      { name: 'Loans & Mortgages', type: 'APPOINTMENT' },
    ],
    allowCustomServices: true,
    requiresBooking: false,
    hasWaitingQueue: true,
  },
  [BusinessCategory.AUTOMOTIVE]: {
    category: BusinessCategory.AUTOMOTIVE,
    name: 'Automotive',
    defaultServices: [
      { name: 'Sales Consultant', type: 'COUNTER', defaultCount: 4 },
      { name: 'Service Advisor', type: 'COUNTER', defaultCount: 3 },
      { name: 'Parts Counter', type: 'COUNTER', defaultCount: 2 },
      { name: 'Vehicle Inspection', type: 'APPOINTMENT' },
    ],
    allowCustomServices: true,
    requiresBooking: true,
    hasWaitingQueue: true,
  },
  [BusinessCategory.GOVERNMENT]: {
    category: BusinessCategory.GOVERNMENT,
    name: 'Government',
    defaultServices: [
      { name: 'General Inquiries', type: 'COUNTER', defaultCount: 3 },
      { name: 'Document Processing', type: 'COUNTER', defaultCount: 4 },
      { name: 'Licensing', type: 'COUNTER', defaultCount: 2 },
      { name: 'Specialized Services', type: 'APPOINTMENT' },
    ],
    allowCustomServices: true,
    requiresBooking: false,
    hasWaitingQueue: true,
  },
  [BusinessCategory.EDUCATION]: {
    category: BusinessCategory.EDUCATION,
    name: 'Education',
    defaultServices: [
      { name: 'Admissions', type: 'COUNTER', defaultCount: 3 },
      { name: 'Financial Aid', type: 'COUNTER', defaultCount: 2 },
      { name: 'Student Services', type: 'COUNTER', defaultCount: 2 },
      { name: 'Academic Advising', type: 'APPOINTMENT' },
    ],
    allowCustomServices: true,
    requiresBooking: true,
    hasWaitingQueue: true,
  },
  [BusinessCategory.RESTAURANT]: {
    category: BusinessCategory.RESTAURANT,
    name: 'Restaurant',
    defaultServices: [
      { name: '2-Seater Table', type: 'TABLE', defaultCount: 8, properties: { capacity: 2 } },
      { name: '4-Seater Table', type: 'TABLE', defaultCount: 6, properties: { capacity: 4 } },
      { name: '6-Seater Table', type: 'TABLE', defaultCount: 4, properties: { capacity: 6 } },
      { name: 'VIP Room', type: 'TABLE', defaultCount: 2, properties: { capacity: 10 } },
    ],
    allowCustomServices: true,
    requiresBooking: true,
    hasWaitingQueue: true,
  },
  [BusinessCategory.TELECOM]: {
    category: BusinessCategory.TELECOM,
    name: 'Telecom',
    defaultServices: [
      { name: 'Customer Support', type: 'COUNTER', defaultCount: 4 },
      { name: 'New Connections', type: 'COUNTER', defaultCount: 3 },
      { name: 'Bill Payment', type: 'COUNTER', defaultCount: 2 },
      { name: 'Technical Support', type: 'COUNTER', defaultCount: 2 },
    ],
    allowCustomServices: true,
    requiresBooking: false,
    hasWaitingQueue: true,
  },
  [BusinessCategory.PRIVATE_CATERING]: {
    category: BusinessCategory.PRIVATE_CATERING,
    name: 'Private Catering',
    defaultServices: [
      { name: 'Wedding Catering', type: 'BOOKING', properties: { duration: 6 } },
      { name: 'Corporate Events', type: 'BOOKING', properties: { duration: 4 } },
      { name: 'Private Parties', type: 'BOOKING', properties: { duration: 4 } },
      { name: 'Special Occasions', type: 'BOOKING', properties: { duration: 3 } },
    ],
    allowCustomServices: true,
    requiresBooking: true,
    hasWaitingQueue: false,
  },
  [BusinessCategory.RETAIL]: {
    category: BusinessCategory.RETAIL,
    name: 'Retail',
    defaultServices: [
      { name: 'Checkout Counter', type: 'COUNTER', defaultCount: 4 },
      { name: 'Customer Service', type: 'COUNTER', defaultCount: 2 },
      { name: 'Returns & Exchange', type: 'COUNTER', defaultCount: 2 },
      { name: 'Personal Shopping', type: 'APPOINTMENT' },
    ],
    allowCustomServices: true,
    requiresBooking: false,
    hasWaitingQueue: true,
  },
}; 