export interface Activity {
  id: string;
  type: "call" | "email" | "meeting" | "note" | "task";
  title: string;
  description: string;
  contactName: string;
  date: string;
  status: "completed" | "pending" | "scheduled";
  priority?: "low" | "medium" | "high";
}

export const activities: Activity[] = [
  {
    id: "1",
    type: "meeting",
    title: "Product Demo",
    description: "Conducted product demo for enterprise features",
    contactName: "Sarah Johnson",
    date: "2024-03-20",
    status: "completed"
  },
  {
    id: "2",
    type: "call",
    title: "Follow-up Call",
    description: "Discussed pricing and implementation timeline",
    contactName: "Michael Chen",
    date: "2024-03-18",
    status: "completed"
  },
  {
    id: "3",
    type: "email",
    title: "Proposal Sent",
    description: "Sent detailed proposal with pricing breakdown",
    contactName: "Emily Rodriguez",
    date: "2024-03-19",
    status: "completed"
  },
  {
    id: "4",
    type: "task",
    title: "Contract Review",
    description: "Review and finalize contract terms",
    contactName: "David Kim",
    date: "2024-03-25",
    status: "pending",
    priority: "high"
  },
  {
    id: "5",
    type: "meeting",
    title: "Quarterly Business Review",
    description: "Q1 review and Q2 planning session",
    contactName: "Robert Taylor",
    date: "2024-03-28",
    status: "scheduled",
    priority: "high"
  },
  {
    id: "6",
    type: "note",
    title: "Client Feedback",
    description: "Positive feedback on recent implementation",
    contactName: "James Anderson",
    date: "2024-03-16",
    status: "completed"
  },
  {
    id: "7",
    type: "call",
    title: "Discovery Call",
    description: "Initial discovery call to understand requirements",
    contactName: "Amanda White",
    date: "2024-03-17",
    status: "completed"
  },
  {
    id: "8",
    type: "task",
    title: "Send Resources",
    description: "Send case studies and technical documentation",
    contactName: "Emily Rodriguez",
    date: "2024-03-24",
    status: "pending",
    priority: "medium"
  }
];
