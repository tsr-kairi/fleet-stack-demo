"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Calendar, TrendingUp, MapPin, Clock, Fuel, AlertTriangle } from "lucide-react";

const reportTypes = [
  { icon: TrendingUp, title: "Fleet Performance", description: "Vehicle utilization and efficiency metrics", color: "text-blue-500" },
  { icon: MapPin, title: "Route Analysis", description: "Distance, stops, and route optimization", color: "text-green-500" },
  { icon: Clock, title: "Driver Activity", description: "Working hours, breaks, and compliance", color: "text-purple-500" },
  { icon: Fuel, title: "Fuel Consumption", description: "Fuel usage and cost analysis", color: "text-orange-500" },
  { icon: AlertTriangle, title: "Incidents & Alerts", description: "Safety events and violations", color: "text-red-500" },
  { icon: Calendar, title: "Maintenance Schedule", description: "Service history and upcoming maintenance", color: "text-cyan-500" },
];

const recentReports = [
  { name: "Monthly Fleet Summary - March 2024", date: "2024-03-20", type: "PDF" },
  { name: "Driver Performance Report", date: "2024-03-18", type: "Excel" },
  { name: "Fuel Analysis Q1 2024", date: "2024-03-15", type: "PDF" },
  { name: "Route Optimization Report", date: "2024-03-12", type: "PDF" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Reports</h1>
        <div className="flex items-center gap-2">
          <Select defaultValue="30">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold">Generate Report</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reportTypes.map((report, i) => (
            <Card key={i} className="cursor-pointer transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <report.icon className={`h-8 w-8 ${report.color}`} />
                  <Button size="sm" variant="outline">
                    Generate
                  </Button>
                </div>
                <CardTitle className="text-base">{report.title}</CardTitle>
                <CardDescription className="text-xs">{report.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentReports.map((report, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{report.name}</p>
                    <p className="text-xs text-muted-foreground">{report.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{report.type}</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
