import React from 'react';
import { useCRM } from '../context/CRMContext';
import { Plus, MoreHorizontal, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Deal } from '../types/crm';

const stages: Deal['stage'][] = ['Lead', 'Proposal', 'Negotiation', 'Closed'];

const Deals = () => {
  const { deals, updateDealStage } = useCRM();

  const getDealsByStage = (stage: Deal['stage']) => deals.filter(d => d.stage === stage);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Sales Pipeline</h1>
          <p>Track your deals through the sales funnel.</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} />
          New Deal
        </button>
      </div>

      <div className="kanban-board">
        {stages.map((stage) => (
          <div key={stage} className="kanban-column">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stage}</h3>
                <span style={{ 
                  backgroundColor: 'hsl(var(--muted))', 
                  fontSize: '0.75rem', 
                  padding: '2px 8px', 
                  borderRadius: '10px',
                  fontWeight: 600
                }}>
                  {getDealsByStage(stage).length}
                </span>
              </div>
              <button className="btn btn-ghost" style={{ padding: '4px' }}><MoreHorizontal size={14} /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {getDealsByStage(stage).map((deal) => (
                <motion.div 
                  key={deal.id} 
                  className="kanban-card"
                  whileHover={{ y: -2 }}
                  layoutId={deal.id}
                >
                  <div style={{ fontSize: '0.75rem', color: 'hsl(var(--brand))', fontWeight: 600, marginBottom: '0.25rem' }}>{deal.company}</div>
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '0.75rem' }}>{deal.title}</h4>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'hsl(var(--success))', fontWeight: 700, fontSize: '0.875rem' }}>
                      <DollarSign size={14} />
                      {deal.value}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))' }}>
                      {deal.probability}% prob.
                    </div>
                  </div>

                  <div style={{ marginTop: '0.75rem', height: '4px', backgroundColor: 'hsl(var(--muted))', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: `${deal.probability}%`, height: '100%', backgroundColor: 'hsl(var(--brand))' }} />
                  </div>
                </motion.div>
              ))}
              
              {getDealsByStage(stage).length === 0 && (
                <div style={{ 
                  border: '2px dashed hsl(var(--border))', 
                  borderRadius: 'var(--radius)', 
                  padding: '2rem', 
                  textAlign: 'center',
                  color: 'hsl(var(--muted-foreground))',
                  fontSize: '0.75rem'
                }}>
                  No deals here
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Deals;
