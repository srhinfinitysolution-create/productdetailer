import React from 'react';
import PageSEO from '../components/PageSEO';

const CookiePolicy: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen pt-32 pb-24 transition-colors">
      <PageSEO 
        title="Cookie Policy | ProductDetailer" 
        description="Learn about how we use cookies to improve your experience on our website." 
      />
       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Cookie Policy</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-12">Last updated: November 15, 2023</p>
          
          <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
             <p>This Cookie Policy explains what Cookies are and how We use them. You should read this policy so You can understand what type of cookies We use, or the information We collect using Cookies and how that information is used.</p>
             
             <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Interpretation and Definitions</h2>
             <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
             
             <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">The use of the Cookies</h2>
             <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-4">Type of Cookies We Use</h3>
             <p>Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies remain on your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close your web browser.</p>
             <p>We use both session and persistent Cookies for the purposes set out below:</p>
             
             <ul className="list-disc pl-6 space-y-4 mt-4">
                <li>
                   <strong>Necessary / Essential Cookies</strong>
                   <p>These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts.</p>
                </li>
                <li>
                   <strong>Functionality Cookies</strong>
                   <p>These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience.</p>
                </li>
                <li>
                   <strong>Tracking and Performance Cookies</strong>
                   <p>These Cookies are used to track information about traffic to the Website and how users use the Website. The information gathered via these Cookies may directly or indirectly identify you as an individual visitor.</p>
                </li>
             </ul>

             <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Your Choices Regarding Cookies</h2>
             <p>If You prefer to avoid the use of Cookies on the Website, first You must disable the use of Cookies in your browser and then delete the Cookies saved in your browser associated with this website. You may use this option for preventing the use of Cookies at any time.</p>

             <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Contact Us</h2>
             <p>If you have any questions about this Cookie Policy, You can contact us:</p>
             <ul className="list-disc pl-6 space-y-2">
                <li>By email: contact@productdetailer.com</li>
             </ul>
          </div>
       </div>
    </div>
  );
};
export default CookiePolicy;