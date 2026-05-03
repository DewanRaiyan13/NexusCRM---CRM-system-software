import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import { Plus, MoreVertical, Search, Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Customers = () => {
  const { customers, addCustomer } = useCRM();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', company: '', email: '', status: 'Active' as const, value: '$0' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCustomer(newCustomer);
    setIsModalOpen(false);
    setNewCustomer({ name: '', company: '', email: '', status: 'Active', value: '$0' });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Customers</h1>
          <p>Manage your client relationships and contact details.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Add Customer
        </button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid hsl(var(--border))', display: 'flex', gap: '1rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'hsl(var(--muted-foreground))' }} size={16} />
            <input className="input" placeholder="Search customers..." style={{ paddingLeft: '35px', height: '38px' }} />
          </div>
          <button className="btn btn-ghost" style={{ border: '1px solid hsl(var(--border))' }}>
            <Filter size={16} />
            Filters
          </button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', background: 'hsl(var(--muted) / 0.3)' }}>
              <th style={{ padding: '1rem 1.5rem', color: 'hsl(var(--muted-foreground))', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase' }}>Name</th>
              <th style={{ padding: '1rem 1.5rem', color: 'hsl(var(--muted-foreground))', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase' }}>Company</th>
              <th style={{ padding: '1rem 1.5rem', color: 'hsl(var(--muted-foreground))', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '1rem 1.5rem', color: 'hsl(var(--muted-foreground))', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase' }}>Value</th>
              <th style={{ padding: '1rem 1.5rem', color: 'hsl(var(--muted-foreground))', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase' }}></th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} style={{ borderBottom: '1px solid hsl(var(--border) / 0.5)' }}>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <div style={{ fontWeight: 600 }}>{customer.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))' }}>{customer.email}</div>
                </td>
                <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem' }}>{customer.company}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span className={`badge ${customer.status === 'Active' ? 'badge-success' : customer.status === 'Pending' ? 'badge-warning' : 'badge-muted'}`}>
                    {customer.status}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>{customer.value}</td>
                <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                  <button className="btn btn-ghost" style={{ padding: '0.25rem' }}>
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
            <motion.div 
              className="modal-content" 
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button 
                onClick={() => setIsModalOpen(false)} 
                style={{ position: 'absolute', right: '20px', top: '20px', background: 'none', border: 'none', cursor: 'pointer', color: 'hsl(var(--muted-foreground))' }}
              >
                <X size={20} />
              </button>
              <h2 style={{ marginBottom: '1.5rem' }}>Add New Customer</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input 
                    className="input" 
                    required 
                    value={newCustomer.name}
                    onChange={e => setNewCustomer({...newCustomer, name: e.target.value})}
                    placeholder="e.g. John Doe"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Company</label>
                  <input 
                    className="input" 
                    required 
                    value={newCustomer.company}
                    onChange={e => setNewCustomer({...newCustomer, company: e.target.value})}
                    placeholder="e.g. Acme Corp"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input 
                    className="input" 
                    type="email" 
                    required 
                    value={newCustomer.email}
                    onChange={e => setNewCustomer({...newCustomer, email: e.target.value})}
                    placeholder="john@example.com"
                  />
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                  <button type="button" className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setIsModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Create Customer</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Customers;
