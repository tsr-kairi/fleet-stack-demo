export interface KPI {
  title: string;
  value: string;
  change: string;
  progress: string;
  barColor: string;
}

export const kpis: KPI[] = [
{ title: "Vehicles", value: "1,284", change: "+3.2% MoM", progress: "75%", barColor: "bg-primary" },
{ title: "Active Users", value: "642", change: "+11%", progress: "50%", barColor: "bg-blue-500" },
{ title: "Online", value: "1,012", change: "+6.7%", progress: "80%", barColor: "bg-green-500" }
];

export const revenueData = [
  { day: "D1", users: 150, vehicles: 110 },
  { day: "D2", users: 165, vehicles: 95 },
  { day: "D3", users: 140, vehicles: 105 },
  { day: "D4", users: 160, vehicles: 100 },
  { day: "D5", users: 155, vehicles: 95 },
  { day: "D6", users: 145, vehicles: 105 },
  { day: "D7", users: 150, vehicles: 110 },
  { day: "D8", users: 155, vehicles: 100 },
  { day: "D9", users: 145, vehicles: 95 },
  { day: "D10", users: 200, vehicles: 120 },
  { day: "D11", users: 180, vehicles: 110 },
  { day: "D12", users: 150, vehicles: 100 },
  { day: "D13", users: 145, vehicles: 95 },
  { day: "D14", users: 160, vehicles: 105 },
];

export const dealsByStage = [
  { name: "Running", value: 56, color: "#94a3b8" },
  { name: "Stopped", value: 22, color: "#60a5fa" },
  { name: "Idle", value: 14, color: "#a78bfa" },
  { name: "No Data", value: 8, color: "#34d399" },
];

export const recentActivities = [
  { id: "1", action: "New deal created", user: "Sarah Johnson", time: "2 hours ago" },
  { id: "2", action: "Meeting scheduled", user: "Michael Chen", time: "4 hours ago" },
  { id: "3", action: "Contract signed", user: "Robert Taylor", time: "1 day ago" },
  { id: "4", action: "Proposal sent", user: "Emily Rodriguez", time: "2 days ago" }
];


export interface Widget {
  id: string;
  type: "kpi" | "chart" | "table" | "activity";
  title: string;
  position: { x: number; y: number };
  size: { w: number; h: number };
}

export interface CustomDashboard {
  id: string;
  name: string;
  widgets: Widget[];
  createdAt: string;
}

export const customDashboards: CustomDashboard[] = [
  {
    id: "1",
    name: "Sales Overview",
    widgets: [
      { id: "w1", type: "kpi", title: "Total Revenue", position: { x: 0, y: 0 }, size: { w: 1, h: 1 } },
      { id: "w2", type: "kpi", title: "Active Deals", position: { x: 1, y: 0 }, size: { w: 1, h: 1 } },
      { id: "w3", type: "chart", title: "Revenue Trend", position: { x: 0, y: 1 }, size: { w: 2, h: 2 } },
    ],
    createdAt: "2024-03-01",
  },
  {
    id: "2",
    name: "Team Performance",
    widgets: [
      { id: "w4", type: "table", title: "Top Performers", position: { x: 0, y: 0 }, size: { w: 2, h: 2 } },
      { id: "w5", type: "activity", title: "Recent Activities", position: { x: 2, y: 0 }, size: { w: 1, h: 2 } },
    ],
    createdAt: "2024-03-05",
  },
];
