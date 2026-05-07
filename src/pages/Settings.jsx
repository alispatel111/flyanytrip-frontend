import React from 'react';
import { Shield, Key, Smartphone, Mail, Eye } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';

const Settings = () => {
  const securityItems = [
    {
      id: 'password',
      title: 'Password',
      desc: 'Update your login password regularly for better security',
      icon: Key,
      action: 'Change Password'
    },
    {
      id: '2fa',
      title: 'Two-Factor Authentication',
      desc: 'Add an extra layer of security to your account',
      icon: Smartphone,
      action: 'Enable'
    },
    {
      id: 'sessions',
      title: 'Active Sessions',
      desc: 'View and manage your active login sessions',
      icon: Eye,
      action: 'Manage'
    }
  ];

  return (
    <DashboardLayout 
      title="Security Settings" 
      subtitle="Manage your account security and preferences"
      icon={Shield}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          {securityItems.map((item) => (
            <div key={item.id} className="bg-black/[0.02] border border-black/5 rounded-[32px] p-8 flex flex-wrap items-center justify-between gap-6 hover:bg-white hover:shadow-xl hover:shadow-black/5 transition-all duration-500 group">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-red/5 text-brand-red flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <item.icon size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-brand-black tracking-tight mb-1">{item.title}</h3>
                  <p className="text-[13px] font-bold text-brand-black/40 leading-relaxed max-w-md">{item.desc}</p>
                </div>
              </div>
              <button className="h-14 px-8 bg-brand-black text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-brand-red transition-all duration-300">
                {item.action}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-brand-red/5 rounded-[40px] border border-brand-red/10">
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 rounded-2xl bg-brand-red text-white flex items-center justify-center shrink-0">
              <Shield size={24} />
            </div>
            <div>
              <h4 className="text-lg font-black text-brand-black mb-2 tracking-tight">Security Score: 80%</h4>
              <p className="text-sm font-bold text-brand-black/60 mb-6 leading-relaxed">Your account is mostly secure, but you can improve it by enabling Two-Factor Authentication.</p>
              <div className="w-full h-3 bg-black/5 rounded-full overflow-hidden">
                <div className="w-[80%] h-full bg-brand-red rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;

