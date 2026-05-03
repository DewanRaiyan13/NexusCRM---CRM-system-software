import React from 'react';
import { useCRM } from '../context/CRMContext';
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  Target, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical
} from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ stat }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="card"
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{ 
        padding: '0.75rem', 
        borderRadius: '0.5rem', 
        backgroundColor: `hsl(var(--${stat.color}) / 0.1)`,
        color: `hsl(var(--${stat.color}))`
      }}>
        <stat.icon size={24} />
      </div>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.25rem',
        fontSize: '0.75rem',
        fontWeight: 600,
        color: stat.change.startsWith('+') ? 'hsl(var(--success))' : 'hsl(var(--danger))'
      }}>
        {stat.change.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {stat.change}
      </div>
    </div>
    <div style={{ marginTop: '1.25rem' }}>
      <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>{stat.label}</p>
      <h2 style={{ marginTop: '0.25rem' }}>{stat.value}</h2>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const { customers, deals, tasks } = useCRM();

  const stats = [
    { label: 'Total Revenue', value: '$124,592', change: '+12.5%', icon: CreditCard, color: 'brand' },
    { label: 'Active Deals', value: deals.length.toString(), change: '+5.2%', icon: Briefcase, color: 'success' },
    { label: 'New Customers', value: customers.length.toString(), change: '+2.4%', icon: Users, color: 'brand' },
    { label: 'Tasks Pending', value: tasks.filter(t => !t.completed).length.toString(), change: '-8.1%', icon: Target, color: 'warning' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
    >
      <div style={{ marginBottom: '2rem' }}>
        <h1>Overview</h1>
        <p>Your performance at a glance.</p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '2rem' 
      }}>
        {stats.map((stat, i) => (
          <StatCard key={i} stat={stat} />
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3>Recent Activities</h3>
            <button className="btn btn-ghost" style={{ fontSize: '0.75rem' }}>View History</button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid hsl(var(--border))' }}>
                <th style={{ paddingBottom: '1rem', color: 'hsl(var(--muted-foreground))', fontWeight: 500, fontSize: '0.875rem' }}>Customer</th>
                <th style={{ paddingBottom: '1rem', color: 'hsl(var(--muted-foreground))', fontWeight: 500, fontSize: '0.875rem' }}>Status</th>
                <th style={{ paddingBottom: '1rem', color: 'hsl(var(--muted-foreground))', fontWeight: 500, fontSize: '0.875rem' }}>Value</th>
                <th style={{ paddingBottom: '1rem', color: 'hsl(var(--muted-foreground))', fontWeight: 500, fontSize: '0.875rem' }}></th>
              </tr>
            </thead>
            <tbody>
              {customers.slice(0, 5).map((customer) => (
                <tr key={customer.id} style={{ borderBottom: '1px solid hsl(var(--border) / 0.5)' }}>
                  <td style={{ padding: '1rem 0' }}>
                    <div style={{ fontWeight: 600 }}>{customer.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))' }}>{customer.company}</div>
                  </td>
                  <td style={{ padding: '1rem 0' }}>
                    <span className={`badge ${customer.status === 'Active' ? 'badge-success' : 'badge-muted'}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 0', fontWeight: 500 }}>{customer.value}</td>
                  <td style={{ padding: '1rem 0', textAlign: 'right' }}>
                    <button className="btn btn-ghost" style={{ padding: '0.25rem' }}>
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            borderRadius: '50%', 
            background: 'hsl(var(--brand) / 0.1)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'hsl(var(--brand))',
            marginBottom: '1.5rem'
          }}>
            <TrendingUp size={40} />
          </div>
          <h3>Growth Target</h3>
          <p style={{ margin: '1rem 0' }}>You've achieved 85% of your quarterly goal. You're doing great!</p>
          <div style={{ width: '100%', height: '8px', background: 'hsl(var(--muted))', borderRadius: '4px', overflow: 'hidden', marginBottom: '1.5rem' }}>
            <div style={{ width: '85%', height: '100%', background: 'hsl(var(--brand))' }} />
          </div>
          <button className="btn btn-primary" style={{ width: '100%' }}>View Full Report</button>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
