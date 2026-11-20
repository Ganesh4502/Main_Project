import React from 'react';
import { HelpCircle, Sparkles, ShieldCheck, MapPin, Trophy, Users, Play, Smartphone } from 'lucide-react';
import { Accordion } from '../../components/ui/Tabs';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';

export const FAQPage: React.FC = () => {
  const faqItems = [
    {
      id: 'faq-1',
      title: 'What is Spotix?',
      icon: <Sparkles className="w-5 h-5" />,
      content: (
        <div className="space-y-2">
          <p>
            Spotix is a comprehensive, enterprise-grade Smart Sports Tournament & Arena Management Platform. It serves as a unified digital ecosystem connecting sports organizers, sponsors, arena managers, team managers, players, officials, spectators, and super administrators.
          </p>
          <p>
            Key capabilities include AI-powered fixture generation, smart referee assignment, real-time live scoreboards, court slot reservations, and in-depth performance analytics.
          </p>
        </div>
      ),
    },
    {
      id: 'faq-2',
      title: 'Who can use Spotix?',
      icon: <Users className="w-5 h-5" />,
      content: (
        <p>
          Spotix features role-based access for 8 distinct user personas: <strong>Super Administrators</strong> (platform governance), <strong>Sponsors</strong> (brand initiatives & referee verification), <strong>Organizers</strong> (tournament creators & directors), <strong>Arena Managers</strong> (facility & slot booking operators), <strong>Team Managers</strong> (club & roster leaders), <strong>Players</strong> (athletes tracking stats & matches), <strong>Officials</strong> (certified referees scoring matches), and <strong>Spectators</strong> (fans following live scores and standings).
        </p>
      ),
    },
    {
      id: 'faq-3',
      title: 'How can I book an arena?',
      icon: <MapPin className="w-5 h-5" />,
      content: (
        <p>
          Navigate to the <a href="/arenas" className="text-emerald-400 underline font-semibold">Arenas page</a> to browse verified sports complexes. Filter by sport, city, indoor/outdoor preferences, and pricing. Click on any arena to inspect available calendar slots, select your preferred court time, and reserve instantly.
        </p>
      ),
    },
    {
      id: 'faq-4',
      title: 'How do I create a tournament?',
      icon: <Trophy className="w-5 h-5" />,
      content: (
        <p>
          Registered Tournament Organizers can use our 5-step interactive <strong>Create Tournament Wizard</strong> (/organizer/tournaments/create). Define basic info, configure formats (Knockout, League, Round Robin, or Group Stage), set dates and deadlines, link participating arenas, and publish for club registrations.
        </p>
      ),
    },
    {
      id: 'faq-5',
      title: 'How does AI fixture generation work?',
      icon: <Sparkles className="w-5 h-5" />,
      content: (
        <p>
          Our proprietary constraint-satisfaction engine processes multi-variable parameters including team counts, venue court availability, rest duration limits (mandatory 4-hour recovery buffers), and weekend prime broadcast times. In seconds, it produces a balanced, 0-conflict schedule with quality audit scores before human approval.
        </p>
      ),
    },
    {
      id: 'faq-6',
      title: 'How are officials assigned?',
      icon: <ShieldCheck className="w-5 h-5" />,
      content: (
        <p>
          Accredited officials and referees are registered exclusively by Super Admins and authorized Sponsors. When assigning referees to fixtures, our AI evaluates referee certification tiers (National/International), sport specialization, current workload fatigue, availability calendars, and conflict-of-interest risks.
        </p>
      ),
    },
    {
      id: 'faq-7',
      title: 'Can spectators follow live matches?',
      icon: <Play className="w-5 h-5" />,
      content: (
        <p>
          Yes! Spectators have direct access to the <strong>Live Match Center</strong> (/matches/:id/live) to view real-time countdown clocks, point-by-point scoreboards, play-by-play timelines, foul counts, timeout records, and live comments with sub-second WebSocket synchronization.
        </p>
      ),
    },
    {
      id: 'faq-8',
      title: 'Is Spotix mobile friendly?',
      icon: <Smartphone className="w-5 h-5" />,
      content: (
        <p>
          Absolutely. Spotix is designed mobile-first and tablet-optimized. Match officials can comfortably utilize the high-speed touch scoring pad on tablets directly on court courtside, and athletes & fans can access full tournament brackets seamlessly from any smartphone screen.
        </p>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3">
        <Badge variant="primary">Knowledge Base</Badge>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-slate-400">
          Everything you need to know about the Spotix sports technology operating system.
        </p>
      </div>

      <Accordion items={faqItems} allowMultiple />
    </div>
  );
};
