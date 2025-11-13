

import { Icons } from '../components/icons';
import React from 'react';

export const sidebarNavItems = [
  { group: "DAS", items: [
    { title: "Dashboard", path: "/dashboard", icon: Icons.LayoutDashboard },
  ]},
  { group: "COM", items: [
    { title: "Alpha Feed", path: "/community", icon: Icons.Users },
    { title: "Leaderboards", path: "/leaderboards", icon: Icons.Trophy },
    { title: "Missions", path: "/missions", icon: Icons.Target },
    { title: "Messages", path: "/messages", icon: Icons.Mail },
  ]},
  { group: "CAS", items: [
    { title: "Casino Directory", path: "/casinos", icon: Icons.Star },
    { title: "Bonus Offers", path: "/bonus-offers", icon: Icons.Percent },
    { title: "Tournaments", path: "/tournaments", icon: Icons.Zap },
  ]},
  { group: "TOOLS", items: [
    { title: "Strategy Sandbox", path: "/strategy-sandbox", icon: Icons.Binary },
    { title: "Bonus Calculator", path: "/bonus-calculator", icon: Icons.Calculator },
    { title: "RTP Tracker", path: "/rtp-tracker", icon: Icons.Activity },
  ]},
  { group: "SUP", items: [
    { title: "Support", path: "/support", icon: Icons.HelpCircle },
    { title: "FAQ", path: "/faq", icon: Icons.BookOpen },
    { title: "Command Console", path: "/settings", icon: Icons.Settings },
  ]}
];