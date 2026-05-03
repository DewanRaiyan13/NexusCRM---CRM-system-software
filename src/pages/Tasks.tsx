import React from 'react';
import { useCRM } from '../context/CRMContext';
import { Plus, CheckCircle2, Circle, Clock, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const Tasks = () => {
  const { tasks, toggleTask } = useCRM();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Tasks</h1>
          <p>Stay on top of your daily activities and follow-ups.</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} />
          New Task
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem' }}>Upcoming Tasks</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {tasks.map((task) => (
              <div 
                key={task.id} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem', 
                  padding: '1rem', 
                  borderRadius: 'var(--radius)', 
                  border: '1px solid hsl(var(--border))',
                  background: task.completed ? 'hsl(var(--muted) / 0.2)' : 'hsl(var(--card))'
                }}
              >
                <button 
                  onClick={() => toggleTask(task.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: task.completed ? 'hsl(var(--success))' : 'hsl(var(--muted-foreground))' }}
                >
                  {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                </button>
                
                <div style={{ flex: 1 }}>
                  <h4 style={{ 
                    fontSize: '1rem', 
                    fontWeight: 600, 
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? 'hsl(var(--muted-foreground))' : 'inherit'
                  }}>
                    {task.title}
                  </h4>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))' }}>
                      <Calendar size={12} />
                      {task.dueDate}
                    </div>
                    <div className={`badge ${task.priority === 'High' ? 'badge-danger' : task.priority === 'Medium' ? 'badge-warning' : 'badge-muted'}`}>
                      {task.priority}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ background: 'hsl(var(--brand))', color: 'white' }}>
            <h3 style={{ color: 'white', marginBottom: '1rem' }}>Daily Progress</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>
              {tasks.filter(t => t.completed).length}/{tasks.length}
            </div>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem' }}>tasks completed today</p>
            <div style={{ marginTop: '1rem', height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '3px' }}>
              <div style={{ width: `${(tasks.filter(t => t.completed).length / tasks.length) * 100}%`, height: '100%', background: 'white', borderRadius: '3px' }} />
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: '1rem' }}>Task Categories</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Follow-up', 'Preparation', 'Meeting', 'Email'].map(cat => (
                <div key={cat} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
                  <span>{cat}</span>
                  <span style={{ fontWeight: 600 }}>{Math.floor(Math.random() * 5)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Tasks;
