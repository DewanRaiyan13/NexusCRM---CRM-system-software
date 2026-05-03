import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  CheckSquare, 
  Settings, 
  Search, 
  Bell, 
  Plus
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, to }: any) => (
  <NavLink 
    to={to}
    className={({ isActive }) => `btn btn-ghost ${isActive ? 'active' : ''}`}
    style={({ isActive }) => ({ 
      justifyContent: 'flex-start', 
      width: '100%', 
      marginBottom: '0.5rem',
      backgroundColor: isActive ? 'hsl(var(--brand))' : 'transparent',
      color: isActive ? 'hsl(var(--brand-foreground))' : 'inherit'
    })}
  >
    <Icon size={20} />
    <span>{label}</span>
  </NavLink>
);

const Layout = () => {
  return (
    <div className="layout">
      <aside className="sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem', padding: '0 0.5rem' }}>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            background: 'linear-gradient(135deg, hsl(var(--brand)), #9333ea)', 
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold'
          }}>N</div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>NexusCRM</h3>
        </div>

        <nav style={{ flex: 1 }}>
          <SidebarItem icon={LayoutDashboard} label="Dashboard" to="/" />
          <SidebarItem icon={Users} label="Customers" to="/customers" />
          <SidebarItem icon={Briefcase} label="Deals" to="/deals" />
          <SidebarItem icon={CheckSquare} label="Tasks" to="/tasks" />
        </nav>

        <div style={{ borderTop: '1px solid hsl(var(--border))', paddingTop: '1.5rem' }}>
          <SidebarItem icon={Settings} label="Settings" to="/settings" />
        </div>
      </aside>

      <main className="main-content">
        <header className="header">
          <div style={{ position: 'relative', width: '300px' }}>
            <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'hsl(var(--muted-foreground))' }} size={18} />
            <input className="input" placeholder="Search everything..." style={{ paddingLeft: '40px' }} />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="btn btn-ghost" style={{ padding: '0.5rem' }}>
              <Bell size={20} />
            </button>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'hsl(var(--muted))', overflow: 'hidden' }}>
              <img src="https://ui-avatars.com/api/?name=Dewan+CRM&background=6366f1&color=fff" alt="User" />
            </div>
            <button className="btn btn-primary">
              <Plus size={18} />
              Quick Action
            </button>
          </div>
        </header>
        
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
