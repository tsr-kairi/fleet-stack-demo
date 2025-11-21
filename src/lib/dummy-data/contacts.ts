export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  status: "active" | "inactive" | "lead";
  avatar?: string;
  createdAt: string;
  lastContact: string;
  dealValue: number;
  tags: string[];
  notes: string;
}

export const contacts: Contact[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@techcorp.com",
    phone: "+1 (555) 123-4567",
    company: "TechCorp Inc",
    position: "VP of Sales",
    status: "active",
    createdAt: "2024-01-15",
    lastContact: "2024-03-20",
    dealValue: 125000,
    tags: ["enterprise", "hot-lead"],
    notes: "Interested in enterprise plan. Follow up next week."
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "m.chen@innovate.io",
    phone: "+1 (555) 234-5678",
    company: "Innovate Solutions",
    position: "CTO",
    status: "active",
    createdAt: "2024-02-01",
    lastContact: "2024-03-18",
    dealValue: 85000,
    tags: ["tech", "decision-maker"],
    notes: "Evaluating our platform vs competitors."
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.r@startup.com",
    phone: "+1 (555) 345-6789",
    company: "Startup Labs",
    position: "Founder & CEO",
    status: "lead",
    createdAt: "2024-03-10",
    lastContact: "2024-03-19",
    dealValue: 45000,
    tags: ["startup", "warm-lead"],
    notes: "Requested demo for next month."
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.kim@enterprise.com",
    phone: "+1 (555) 456-7890",
    company: "Enterprise Global",
    position: "Director of Operations",
    status: "active",
    createdAt: "2024-01-20",
    lastContact: "2024-03-15",
    dealValue: 200000,
    tags: ["enterprise", "vip"],
    notes: "Long-term partnership potential."
  },
  {
    id: "5",
    name: "Jessica Martinez",
    email: "j.martinez@digital.co",
    phone: "+1 (555) 567-8901",
    company: "Digital Dynamics",
    position: "Marketing Director",
    status: "inactive",
    createdAt: "2023-11-05",
    lastContact: "2024-01-10",
    dealValue: 35000,
    tags: ["marketing", "cold"],
    notes: "No response to last 3 emails."
  },
  {
    id: "6",
    name: "Robert Taylor",
    email: "r.taylor@finance.com",
    phone: "+1 (555) 678-9012",
    company: "Finance Pro",
    position: "CFO",
    status: "active",
    createdAt: "2024-02-14",
    lastContact: "2024-03-21",
    dealValue: 150000,
    tags: ["finance", "hot-lead"],
    notes: "Ready to sign contract this quarter."
  },
  {
    id: "7",
    name: "Amanda White",
    email: "a.white@consulting.com",
    phone: "+1 (555) 789-0123",
    company: "Consulting Partners",
    position: "Senior Consultant",
    status: "lead",
    createdAt: "2024-03-05",
    lastContact: "2024-03-17",
    dealValue: 60000,
    tags: ["consulting", "warm-lead"],
    notes: "Interested in Q2 implementation."
  },
  {
    id: "8",
    name: "James Anderson",
    email: "j.anderson@retail.com",
    phone: "+1 (555) 890-1234",
    company: "Retail Solutions",
    position: "VP of Technology",
    status: "active",
    createdAt: "2024-01-30",
    lastContact: "2024-03-16",
    dealValue: 95000,
    tags: ["retail", "decision-maker"],
    notes: "Scheduling technical review meeting."
  }
];
