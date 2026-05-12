import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Star, Zap, HelpCircle } from 'lucide-react';
import PageSEO from '../components/PageSEO';
import { useAuth } from '../contexts/AuthContext';

const Pricing: React.FC = () => {
  // Visual toggle state only
  const [annual, setAnnual] = useState(false);
  const { user } = useAuth();

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      desc: "Perfect for testing the waters.",
      features: [
        "5 Descriptions per day",
        "Basic AI Model",
        "Standard Speed",
        "Community Support"
      ],
      cta: "Get Started",
      highlight: false
    },
    {
      name: "Starter",
      price: annual ? "$24" : "$29",
      period: "per month",
      desc: "For growing stores and dropshippers.",
      features: [
        "Unlimited Descriptions",
        "Advanced SEO Mode",
        "All Platforms (Amazon, Shopify)",
        "5 Brand Tones",
        "Priority Support"
      ],
      cta: "Start Free Trial",
      highlight: true
    },
    {
      name: "Pro Agency",
      price: annual ? "$89" : "$99",
      period: "per month",
      desc: "For agencies and large catalogs.",
      features: [
        "Everything in Starter",
        "Bulk CSV Processing",
        "API Access",
        "Team Collaboration",
        "Dedicated Account Manager"
      ],
      cta: "Contact Sales",
      highlight: false
    }
  ];

  const getPlanLink = (planName: string) => {
    if (planName === 'Free') {
      // If user is logged in, Free plan goes to dashboard, otherwise signup
      return user ? '/dashboard' : '/signup';
    }
    // For paid plans
    if (user) {
      // If user is logged in, disable the link (placeholder #) as requested
      return '#';
    }
    // If not logged in, go to signup
    return '/signup';
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pt-32 pb-24 relative overflow-hidden transition-colors">
      <PageSEO 
        title="Pricing Plans - Start for Free | ProductDetailer" 
        description="Simple, transparent pricing for e-commerce businesses of all sizes. Free plan available. No credit card required." 
      />
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-indigo-50 to-transparent dark:from-indigo-900/10 dark:to-transparent -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-indigo-600 dark:text-indigo-400 font-bold tracking-wide uppercase mb-3 text-sm">Pricing Plans</h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">Simple, transparent pricing</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
            Choose the plan that fits your business stage. No hidden fees. Cancel anytime.
          </p>

          {/* Toggle Switch */}
          <div className="flex justify-center items-center space-x-4 mb-8">
            <span className={`text-sm font-medium ${!annual ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>Monthly</span>
            <button 
              onClick={() => setAnnual(!annual)}
              className="relative rounded-full w-14 h-8 bg-indigo-600 dark:bg-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-200 ease-in-out ${annual ? 'translate-x-6' : 'translate-x-0'}`}></span>
            </button>
            <span className={`text-sm font-medium ${annual ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
              Yearly <span className="text-indigo-600 dark:text-indigo-400 text-xs font-bold ml-1 bg-indigo-50 dark:bg-indigo-900/50 px-2 py-0.5 rounded-full">-20%</span>
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <div key={idx} className={`relative flex flex-col rounded-3xl p-8 transition-all duration-300 ${
              plan.highlight 
                ? 'bg-white dark:bg-slate-900 shadow-2xl ring-2 ring-indigo-600 dark:ring-indigo-500 z-10 scale-105' 
                : 'bg-white dark:bg-slate-900 shadow-lg border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1'
            }`}>
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg shadow-indigo-500/30 flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-current" /> Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className={`text-xl font-bold mb-2 ${plan.highlight ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-900 dark:text-white'}`}>{plan.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{plan.desc}</p>
              </div>

              <div className="flex items-baseline mb-8">
                <span className="text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">{plan.price}</span>
                <span className="text-slate-500 dark:text-slate-400 ml-2 font-medium text-sm">/{plan.period === "forever" ? "mo" : "mo"}</span>
              </div>
              
              <div className="border-t border-slate-100 dark:border-slate-800 pt-8 mb-8 flex-1">
                <ul className="space-y-4">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start">
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 ${plan.highlight ? 'bg-indigo-100 dark:bg-indigo-900/30' : 'bg-slate-100 dark:bg-slate-800'}`}>
                        <Check className={`h-3.5 w-3.5 ${plan.highlight ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400'}`} strokeWidth={3} />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300 font-medium text-sm pt-0.5">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link 
                to={getPlanLink(plan.name)}
                className={`block w-full text-center py-4 rounded-xl font-bold transition-all duration-200 ${
                  plan.highlight 
                  ? 'bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 shadow-lg shadow-indigo-200 dark:shadow-none' 
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                } ${user && plan.name !== 'Free' ? 'cursor-default opacity-90' : ''}`}
                onClick={(e) => {
                  if (user && plan.name !== 'Free') {
                    e.preventDefault();
                  }
                }}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 md:p-12 transition-colors">
             <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">Frequently Asked Questions</h3>
             <div className="grid md:grid-cols-2 gap-8">
                <div>
                   <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                     <HelpCircle className="w-5 h-5 text-indigo-500 dark:text-indigo-400"/> Can I switch plans?
                   </h4>
                   <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
                </div>
                <div>
                   <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                     <HelpCircle className="w-5 h-5 text-indigo-500 dark:text-indigo-400"/> Is there a long-term contract?
                   </h4>
                   <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">No, all plans are month-to-month unless you choose the annual billing option for a discount.</p>
                </div>
                <div>
                   <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                     <HelpCircle className="w-5 h-5 text-indigo-500 dark:text-indigo-400"/> What happens after my free trial?
                   </h4>
                   <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">We'll email you a reminder 3 days before. If you don't cancel, you'll be moved to the paid plan.</p>
                </div>
                <div>
                   <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                     <HelpCircle className="w-5 h-5 text-indigo-500 dark:text-indigo-400"/> Do you offer enterprise APIs?
                   </h4>
                   <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Yes, the Pro Agency plan includes API access. Contact sales for custom rate limits.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;