import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileText, Cookie } from 'lucide-react';
import PageSEO from '../components/PageSEO';

const Legal: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen pt-32 pb-24 transition-colors">
      <PageSEO 
        title="Legal Center | ProductDetailer" 
        description="Access our Privacy Policy, Terms of Service, and Cookie Policy." 
      />
       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">Legal Center</h1>
          <div className="grid md:grid-cols-3 gap-8">
             <Link to="/privacy" className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-indigo-500 transition-colors group">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                   <Shield className="w-6 h-6"/>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Privacy Policy</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">How we collect, use, and protect your data.</p>
             </Link>
             <Link to="/terms" className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-indigo-500 transition-colors group">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                   <FileText className="w-6 h-6"/>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Terms of Service</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">The rules and regulations for using our service.</p>
             </Link>
             <Link to="/cookies" className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-indigo-500 transition-colors group">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                   <Cookie className="w-6 h-6"/>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Cookie Policy</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">How we use cookies to improve your experience.</p>
             </Link>
          </div>
       </div>
    </div>
  );
};
export default Legal;