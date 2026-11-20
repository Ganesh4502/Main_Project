import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useNotification } from '../../context/NotificationContext';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Enterprise Inquiries', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { showToast } = useNotification();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('success', 'Message Dispatched!', 'A Spotix athletic advisor will reach out to you within 2 business hours.');
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="primary">24/7 Athletic Support</Badge>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
          Get in Touch with Spotix
        </h1>
        <p className="text-sm text-slate-400">
          Have inquiries regarding arena onboarding, tournament sponsorships, API integration, or enterprise leagues? We're here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <Card className="p-6 border border-slate-800 space-y-3">
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl w-fit">
              <Mail className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-100">Direct Support Email</h4>
            <p className="text-xs text-slate-400">contact@spotix.io</p>
            <p className="text-xs text-slate-400">support@spotix.io</p>
          </Card>

          <Card className="p-6 border border-slate-800 space-y-3">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl w-fit">
              <Phone className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-100">Phone Support</h4>
            <p className="text-xs text-slate-400">+1 (800) 890-SPOTIX</p>
            <p className="text-[11px] text-slate-500">Mon-Sun, 24/7 Match Day Dispatch</p>
          </Card>

          <Card className="p-6 border border-slate-800 space-y-3">
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl w-fit">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-100">Global Headquarters</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              450 Innovation Parkway, Suite 800<br />
              San Francisco, CA 94107, United States
            </p>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card className="p-8 border border-slate-800">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-full w-fit mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-100">Thank You!</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Your message has been safely logged in our CRM. An athletic specialist will get back to you promptly.
                </p>
                <Button variant="outline" size="sm" onClick={() => setIsSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1.5">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Marcus Sterling"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1.5">Your Work Email</label>
                    <input
                      type="email"
                      required
                      placeholder="marcus@federation.org"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1.5">Inquiry Topic</label>
                  <select
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500 text-xs"
                  >
                    <option value="Enterprise Inquiries">Enterprise League Management</option>
                    <option value="Arena Onboarding">Arena & Venue Onboarding</option>
                    <option value="Official Accreditation">Referee / Official Accreditation</option>
                    <option value="Sponsorship Inquiries">Tournament Sponsorship Program</option>
                    <option value="Technical Support">Technical & API Integration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1.5">Message / Requirements</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell us about your sport, number of teams, venue needs, or questions..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500 text-xs leading-relaxed"
                  />
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full" rightIcon={<Send className="w-4 h-4" />}>
                  Dispatch Message
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
