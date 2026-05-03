export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  status: 'Active' | 'Pending' | 'Inactive';
  value: string;
  lastContact: string;
}

export interface Deal {
  id: string;
  title: string;
  company: string;
  value: string;
  stage: 'Lead' | 'Proposal' | 'Negotiation' | 'Closed';
  probability: number;
}

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
}

export const CRM_VERSION = '1.0.0';
