import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Customer, Deal, Task } from '../types/crm';

interface CRMContextType {
  customers: Customer[];
  deals: Deal[];
  tasks: Task[];
  addCustomer: (customer: Omit<Customer, 'id' | 'lastContact'>) => void;
  updateDealStage: (dealId: string, stage: Deal['stage']) => void;
  toggleTask: (taskId: string) => void;
  addDeal: (deal: Omit<Deal, 'id'>) => void;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

export const CRMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customers, setCustomers] = useState<Customer[]>([
    { id: '1', name: 'Alex Thompson', company: 'TechFlow Inc.', email: 'alex@techflow.com', status: 'Active', value: '$12,400', lastContact: '2h ago' },
    { id: '2', name: 'Sarah Jenkins', company: 'Nova Labs', email: 'sarah@novalabs.io', status: 'Pending', value: '$8,200', lastContact: '5h ago' },
  ]);

  const [deals, setDeals] = useState<Deal[]>([
    { id: '1', title: 'Enterprise License', company: 'TechFlow Inc.', value: '$45,000', stage: 'Negotiation', probability: 80 },
    { id: '2', title: 'Cloud Migration', company: 'Nova Labs', value: '$12,000', stage: 'Lead', probability: 20 },
    { id: '3', title: 'Mobile App Dev', company: 'Vertex Systems', value: '$25,000', stage: 'Proposal', probability: 50 },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Call Alex for follow-up', dueDate: '2026-05-04', priority: 'High', completed: false },
    { id: '2', title: 'Prepare proposal for Sarah', dueDate: '2026-05-05', priority: 'Medium', completed: true },
  ]);

  const addCustomer = (customer: Omit<Customer, 'id' | 'lastContact'>) => {
    const newCustomer: Customer = {
      ...customer,
      id: Math.random().toString(36).substr(2, 9),
      lastContact: 'Just now'
    };
    setCustomers([newCustomer, ...customers]);
  };

  const addDeal = (deal: Omit<Deal, 'id'>) => {
    const newDeal: Deal = {
      ...deal,
      id: Math.random().toString(36).substr(2, 9),
    };
    setDeals([newDeal, ...deals]);
  };

  const updateDealStage = (dealId: string, stage: Deal['stage']) => {
    setDeals(deals.map(d => d.id === dealId ? { ...d, stage } : d));
  };

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  return (
    <CRMContext.Provider value={{ customers, deals, tasks, addCustomer, updateDealStage, toggleTask, addDeal }}>
      {children}
    </CRMContext.Provider>
  );
};

export const useCRM = () => {
  const context = useContext(CRMContext);
  if (!context) throw new Error('useCRM must be used within a CRMProvider');
  return context;
};
