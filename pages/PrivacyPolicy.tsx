import React from 'react';
import PageSEO from '../components/PageSEO';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen pt-32 pb-24 transition-colors">
      <PageSEO 
        title="Privacy Policy | ProductDetailer" 
        description="Read our Privacy Policy to understand how we collect, use, and protect your personal data." 
      />
       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Privacy Policy</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-12">Last updated: November 15, 2023</p>
          
          <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
             <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
             
             <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Interpretation and Definitions</h2>
             <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-4">Interpretation</h3>
             <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
             
             <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-4">Definitions</h3>
             <ul className="list-disc pl-6 space-y-2">
                <li><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</li>
                <li><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to ProductDetailer.</li>
                <li><strong>Service</strong> refers to the Website.</li>
             </ul>

             <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Collecting and Using Your Personal Data</h2>
             <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-4">Types of Data Collected</h3>
             <p>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:</p>
             <ul className="list-disc pl-6 space-y-2">
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Usage Data</li>
             </ul>

             <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-4">Use of Your Personal Data</h3>
             <p>The Company may use Personal Data for the following purposes:</p>
             <ul className="list-disc pl-6 space-y-2">
                <li>To provide and maintain our Service, including to monitor the usage of our Service.</li>
                <li>To manage Your Account: to manage Your registration as a user of the Service.</li>
                <li>To contact You: To contact You by email regarding updates or informative communications related to the functionalities, products or contracted services.</li>
             </ul>

             <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Security of Your Personal Data</h2>
             <p>The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</p>
             
             <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Contact Us</h2>
             <p>If you have any questions about this Privacy Policy, You can contact us:</p>
             <ul className="list-disc pl-6 space-y-2">
                <li>By email: contact@productdetailer.com</li>
             </ul>
          </div>
       </div>
    </div>
  );
};
export default PrivacyPolicy;