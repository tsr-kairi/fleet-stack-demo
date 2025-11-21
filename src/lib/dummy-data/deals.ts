export interface Deal {
  id: string;
  title: string;
  company: string;
  value: number;
  stage: "lead" | "qualified" | "proposal" | "negotiation" | "closed";
  probability: number;
  expectedCloseDate: string;
  contactName: string;
  createdAt: string;
  description: string;
}

export const deals: Deal[] = [
  {
    id: "1",
    title: "Enterprise Platform Migration",
    company: "TechCorp Inc",
    value: 125000,
    stage: "negotiation",
    probability: 80,
    expectedCloseDate: "2024-04-15",
    contactName: "Sarah Johnson",
    createdAt: "2024-01-15",
    description: "Full platform migration for 500+ users"
  },
  {
    id: "2",
    title: "Cloud Infrastructure Setup",
    company: "Innovate Solutions",
    value: 85000,
    stage: "proposal",
    probability: 60,
    expectedCloseDate: "2024-04-30",
    contactName: "Michael Chen",
    createdAt: "2024-02-01",
    description: "AWS infrastructure setup and optimization"
  },
  {
    id: "3",
    title: "Startup Growth Package",
    company: "Startup Labs",
    value: 45000,
    stage: "qualified",
    probability: 40,
    expectedCloseDate: "2024-05-15",
    contactName: "Emily Rodriguez",
    createdAt: "2024-03-10",
    description: "Growth package for scaling startup"
  },
  {
    id: "4",
    title: "Global Expansion Project",
    company: "Enterprise Global",
    value: 200000,
    stage: "negotiation",
    probability: 85,
    expectedCloseDate: "2024-04-10",
    contactName: "David Kim",
    createdAt: "2024-01-20",
    description: "Multi-region deployment and support"
  },
  {
    id: "5",
    title: "Marketing Automation Suite",
    company: "Digital Dynamics",
    value: 35000,
    stage: "lead",
    probability: 20,
    expectedCloseDate: "2024-06-01",
    contactName: "Jessica Martinez",
    createdAt: "2023-11-05",
    description: "Marketing automation and analytics"
  },
  {
    id: "6",
    title: "Financial Systems Integration",
    company: "Finance Pro",
    value: 150000,
    stage: "closed",
    probability: 100,
    expectedCloseDate: "2024-03-25",
    contactName: "Robert Taylor",
    createdAt: "2024-02-14",
    description: "Complete financial systems integration"
  },
  {
    id: "7",
    title: "Consulting Services Package",
    company: "Consulting Partners",
    value: 60000,
    stage: "qualified",
    probability: 50,
    expectedCloseDate: "2024-05-20",
    contactName: "Amanda White",
    createdAt: "2024-03-05",
    description: "6-month consulting engagement"
  },
  {
    id: "8",
    title: "Retail POS System",
    company: "Retail Solutions",
    value: 95000,
    stage: "proposal",
    probability: 65,
    expectedCloseDate: "2024-04-25",
    contactName: "James Anderson",
    createdAt: "2024-01-30",
    description: "Modern POS system for 50 locations"
  }
];
