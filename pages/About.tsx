import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Heart, Target, Zap } from 'lucide-react';
import PageSEO from '../components/PageSEO';

const About: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-950 transition-colors">
      <PageSEO 
        title="About Us - Our Mission | ProductDetailer" 
        description="We help e-commerce brands tell better stories. Learn about our mission to save sellers time and boost conversions with AI." 
      />
      {/* Hero */}
      <section className="pt-32 pb-20 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6">
            We Help E-commerce Brands <br /> <span className="text-indigo-600 dark:text-indigo-400">Tell Better Stories</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            ProductDetailer was born from a simple frustration: writing hundreds of product descriptions is boring, repetitive, and time-consuming. We built the tool we wished we had.
          </p>
        </div>
      </section>

      {/* Mission Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                 <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6 text-red-600 dark:text-red-400">
                    <Heart className="w-8 h-8"/>
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Customer Obsession</h3>
                 <p className="text-slate-600 dark:text-slate-400">We don't just build AI. We build tools that solve real problems for real shop owners.</p>
              </div>
              <div className="text-center">
                 <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600 dark:text-blue-400">
                    <Target className="w-8 h-8"/>
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Quality First</h3>
                 <p className="text-slate-600 dark:text-slate-400">Quantity matters in e-commerce, but quality converts. We optimize for both.</p>
              </div>
              <div className="text-center">
                 <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6 text-yellow-600 dark:text-yellow-400">
                    <Zap className="w-8 h-8"/>
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Speed & Efficiency</h3>
                 <p className="text-slate-600 dark:text-slate-400">Time is money. Our goal is to save you 10+ hours a week on content creation.</p>
              </div>
           </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-slate-900 dark:bg-slate-800 text-white border-t border-slate-800">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
               <div>
                  <div className="text-4xl font-bold text-indigo-400 mb-2">5M+</div>
                  <div className="text-slate-400">Descriptions Generated</div>
               </div>
               <div>
                  <div className="text-4xl font-bold text-indigo-400 mb-2">12k+</div>
                  <div className="text-slate-400">Active Users</div>
               </div>
               <div>
                  <div className="text-4xl font-bold text-indigo-400 mb-2">98%</div>
                  <div className="text-slate-400">Satisfaction Rate</div>
               </div>
               <div>
                  <div className="text-4xl font-bold text-indigo-400 mb-2">24/7</div>
                  <div className="text-slate-400">System Uptime</div>
               </div>
            </div>
         </div>
      </section>

      {/* Team CTA */}
      <section className="py-24 dark:bg-slate-950">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Join the movement</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10">
               Stop wasting time on writer's block. Start scaling your store today with the power of AI.
            </p>
            <Link to="/signup" className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none">
               Get Started for Free
            </Link>
         </div>
      </section>
    </div>
  );
};

export default About;