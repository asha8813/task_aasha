import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, HelpCircle, Zap, Shield, HelpCircle as QuestionIcon } from 'lucide-react';
import { cn } from '../lib/utils.ts';
import MarketingNavbar from '../components/MarketingNavbar.tsx';
import MarketingFooter from '../components/MarketingFooter.tsx';

const pricingPlans = [
  {
    name: 'Starter',
    price: '0',
    description: 'Perfect for individuals and small teams exploringTaskNova.',
    features: [
      'Up to 3 Projects',
      'Basic Task Management',
      'Team Collaboration',
      'Limited Analytics',
      'Standard Support'
    ],
    buttonText: 'Get Started',
    popular: false
  },
  {
    name: 'Professional',
    price: '19',
    description: 'Advanced tools to scale your team and complex projects.',
    features: [
      'Unlimited Projects',
      'Advanced Analytics',
      'Team Management',
      'Kanban Boards',
      'Custom Task Notifications',
      'Priority Support',
      'Project Templates'
    ],
    buttonText: 'Start Free Trial',
    popular: true
  },
  {
    name: 'Enterprise',
    price: '49',
    description: 'Maximum power and customized control for large organizations.',
    features: [
      'Everything in Pro',
      'AI Productivity Tools',
      'Custom Workspaces',
      'Advanced Team Permissions',
      'SSO & Advanced Security',
      'Dedicated Account Manager',
      'Custom API Access'
    ],
    buttonText: 'Contact Sales',
    popular: false
  }
];

const faqs = [
  { q: "Can I cancel my subscription at any time?", a: "Yes, you can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your billing period." },
  { q: "Is there a free trial for the Professional plan?", a: "Absolutely! Every TaskNova account starts with a 14-day free trial of our Professional features. No credit card required." },
  { q: "Do you offer discounts for non-profits?", a: "Yes, we love supporting great causes. Contact our sales team to learn more about our 50% discount for registered non-profit organizations." },
  { q: "What security measures do you have in place?", a: "We use bank-grade AES-256 encryption, regular security audits, and SOC2 compliant data centers to ensure your team's data remains private and secure." }
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <MarketingNavbar />

      <main className="pt-32 pb-20">
        {/* Header Section */}
        <section className="text-center px-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Simple, Transparent <span className="text-indigo-500">Pricing</span></h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              Choose the plan that's right for your team. From startups to global enterprises, we've got you covered.
            </p>

            {/* Toggle Switch */}
            <div className="flex items-center justify-center gap-4">
              <span className={cn("text-sm font-bold transition-colors", !isYearly ? "text-white" : "text-slate-500")}>Monthly</span>
              <button 
                onClick={() => setIsYearly(!isYearly)}
                className="w-14 h-7 bg-slate-800 rounded-full p-1 relative transition-colors hover:bg-slate-700"
              >
                <motion.div 
                  className="w-5 h-5 bg-indigo-500 rounded-full"
                  animate={{ x: isYearly ? 28 : 0 }}
                />
              </button>
              <div className="flex items-center gap-2">
                <span className={cn("text-sm font-bold transition-colors", isYearly ? "text-white" : "text-slate-500")}>Yearly</span>
                <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase rounded border border-emerald-500/20">Save 20%</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Pricing Cards */}
        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {pricingPlans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "p-8 rounded-[32px] border relative flex flex-col group h-full",
                plan.popular 
                  ? "bg-slate-900 border-indigo-500/50 shadow-[0_0_40px_rgba(79,70,229,0.15)] ring-1 ring-indigo-500/50" 
                  : "bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-colors"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-500 text-white text-[10px] font-black uppercase rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">$</span>
                  <span className="text-6xl font-black text-white">
                    {isYearly ? Math.floor(parseInt(plan.price) * 0.8) : plan.price}
                  </span>
                  <span className="text-slate-500 font-bold">/mo</span>
                </div>
              </div>

              <div className="space-y-4 mb-10 flex-1">
                {plan.features.map(feature => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-indigo-400" />
                    </div>
                    <span className="text-sm text-slate-400 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={cn(
                "w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2 group",
                plan.popular
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
              )}>
                {plan.buttonText}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </section>

        {/* Compare Plans Section */}
        <section className="max-w-4xl mx-auto px-6 mb-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Detailed comparison</h2>
            <p className="text-slate-500 text-sm font-medium">Find the perfect feature set for your unique workflow.</p>
          </div>
          
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden backdrop-blur-xl">
             <table className="w-full text-left">
                <thead className="border-b border-slate-800">
                  <tr className="text-[10px] uppercase font-black tracking-widest text-slate-500">
                    <th className="px-6 py-6 font-black">Capacity</th>
                    <th className="px-4 py-6 text-center">Starter</th>
                    <th className="px-4 py-6 text-center">Pro</th>
                    <th className="px-4 py-6 text-center">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-sm">
                   {[
                     { name: 'Max Projects', s: '3', p: 'Unlimited', e: 'Unlimited' },
                     { name: 'Team Members', s: '5', p: 'Unlimited', e: 'Unlimited' },
                     { name: 'File Storage', s: '1GB', p: '50GB', e: 'Unlimited' },
                     { name: 'Historical Data', s: '30 Days', p: 'Forever', e: 'Forever' },
                     { name: 'Single Sign On', s: 'No', p: 'No', e: 'Yes' },
                     { name: 'Custom Branding', s: 'No', p: 'Basic', e: 'Advanced' }
                   ].map(row => (
                      <tr key={row.name} className="hover:bg-slate-800/20 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-300">{row.name}</td>
                        <td className="px-4 py-4 text-center text-slate-500 font-medium">{row.s}</td>
                        <td className="px-4 py-4 text-center text-slate-500 font-medium">{row.p}</td>
                        <td className="px-4 py-4 text-center text-slate-500 font-medium">{row.e}</td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-6 mb-32">
           <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/3">
                 <h2 className="text-3xl font-bold mb-4 tracking-tight">Common <span className="text-indigo-500">Questions</span></h2>
                 <p className="text-slate-500 text-sm font-medium leading-relaxed">Everything you need to know about our plans and billing procedures.</p>
                 <div className="mt-8 p-4 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl">
                    <div className="flex items-center gap-3 mb-2">
                       <QuestionIcon className="w-5 h-5 text-indigo-400" />
                       <span className="text-sm font-bold text-white uppercase tracking-wider">Need Help?</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium mb-4">Our support team is available 24/7 to help with any specific needs.</p>
                    <button className="text-xs font-black text-indigo-400 uppercase tracking-widest hover:text-white transition-colors">Talk to Us</button>
                 </div>
              </div>
              <div className="md:w-2/3 space-y-6">
                 {faqs.map((faq, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      className="p-6 bg-slate-900 border border-slate-800 rounded-2xl"
                    >
                       <h4 className="font-bold text-white mb-3 text-lg">{faq.q}</h4>
                       <p className="text-slate-400 text-sm font-medium leading-relaxed">{faq.a}</p>
                    </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* Bottom CTA */}
        <section className="px-6">
           <div className="max-w-7xl mx-auto p-12 lg:p-20 bg-indigo-600 rounded-[48px] relative overflow-hidden flex flex-col items-center text-center">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
              <div className="relative z-10 w-full max-w-2xl">
                 <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">Join 25,000+ teams working better together.</h2>
                 <p className="text-indigo-100 text-lg mb-10 font-medium">Try TaskNova for 14 days free. Complete setup in under 2 minutes.</p>
                 <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="w-full sm:w-auto px-8 py-4 bg-white text-indigo-600 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl hover:bg-indigo-50 transition-all">Start Free Trial</button>
                    <button className="w-full sm:w-auto px-8 py-4 border-2 border-indigo-400 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-indigo-500 transition-all">Contact Sales</button>
                 </div>
              </div>
           </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
