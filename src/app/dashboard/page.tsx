"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, MoreVertical, LayoutGrid, Edit2, X } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DonutChart } from "@/components/charts/donut-chart";
import { dealsByStage, recentActivities, type CustomDashboard, type Widget } from "@/lib/dummy-data/dashboard";

const chartData = [
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

const defaultDashboards: CustomDashboard[] = [
  { 
    id: "1", 
    name: "Fleet Overview", 
    widgets: [
      { id: "1", type: "kpi", title: "Vehicles", position: { x: 0, y: 0 }, size: { w: 1, h: 1 } },
      { id: "2", type: "kpi", title: "Active Users", position: { x: 1, y: 0 }, size: { w: 1, h: 1 } },
      { id: "3", type: "kpi", title: "Online", position: { x: 2, y: 0 }, size: { w: 1, h: 1 } },
      { id: "4", type: "chart", title: "Users vs Vehicles (14d)", position: { x: 0, y: 1 }, size: { w: 2, h: 1 } },
      { id: "5", type: "table", title: "Vehicle Status", position: { x: 2, y: 1 }, size: { w: 1, h: 1 } },
      { id: "6", type: "activity", title: "Recent Activity", position: { x: 0, y: 2 }, size: { w: 2, h: 1 } },
    ], 
    createdAt: "2024-01-01" 
  },
];

export default function CustomDashboardsPage() {
  const [dashboards, setDashboards] = useState<CustomDashboard[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("customDashboards");
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return defaultDashboards;
  });
  const [selectedDashboard, setSelectedDashboard] = useState<string>("");
  const [newDashboardName, setNewDashboardName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editingName, setEditingName] = useState("");
  const [draggedWidget, setDraggedWidget] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const currentDashboard = dashboards.find((d) => d.id === selectedDashboard);

  useEffect(() => {
    if (dashboards.length > 0 && !selectedDashboard) {
      setSelectedDashboard(dashboards[0].id);
    }
  }, [dashboards, selectedDashboard]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("customDashboards", JSON.stringify(dashboards));
    }
  }, [dashboards]);

  const createDashboard = () => {
    if (!newDashboardName.trim()) return;
    const newDashboard: CustomDashboard = {
      id: Date.now().toString(),
      name: newDashboardName,
      widgets: [],
      createdAt: new Date().toISOString().split("T")[0],
    };
    const updated = [...dashboards, newDashboard];
    setDashboards(updated);
    setSelectedDashboard(newDashboard.id);
    setNewDashboardName("");
    setIsCreateDialogOpen(false);
  };

  const deleteDashboard = (id: string) => {
    const filtered = dashboards.filter((d) => d.id !== id);
    setDashboards(filtered);
    if (selectedDashboard === id) {
      setSelectedDashboard(filtered[0]?.id || "");
    }
  };

  const addWidget = (type: Widget["type"]) => {
    if (!currentDashboard) return;
    const newWidget: Widget = {
      id: `w${Date.now()}`,
      type,
      title: `New ${type}`,
      position: { x: 0, y: 0 },
      size: { w: 1, h: 1 },
    };
    const updated = dashboards.map((d) =>
      d.id === selectedDashboard
        ? { ...d, widgets: [...d.widgets, newWidget] }
        : d
    );
    setDashboards(updated);
  };

  const removeWidget = (widgetId: string) => {
    const updated = dashboards.map((d) =>
      d.id === selectedDashboard
        ? { ...d, widgets: d.widgets.filter((w) => w.id !== widgetId) }
        : d
    );
    setDashboards(updated);
  };

  const updateDashboardName = () => {
    if (!editingName.trim()) return;
    const updated = dashboards.map((d) =>
      d.id === selectedDashboard ? { ...d, name: editingName } : d
    );
    setDashboards(updated);
    setIsEditDialogOpen(false);
    setEditingName("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LayoutGrid className="h-5 w-5" />
          <h1 className="text-xl font-semibold">Custom Dashboards</h1>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedDashboard} onValueChange={setSelectedDashboard}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {dashboards.map((dashboard) => (
                <SelectItem key={dashboard.id} value={dashboard.id}>
                  {dashboard.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {!editMode ? (
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingName(currentDashboard?.name || "");
                    setIsEditDialogOpen(true);
                  }}
                >
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Edit Dashboard Name</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-name">Dashboard Name</Label>
                    <Input
                      id="edit-name"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter className="gap-2">
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                  <Button onClick={updateDashboardName}>
                    Save
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setEditMode(false)}>
              Save Changes
            </Button>
          )}
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add New
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Dashboard</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Fleet Health, Control Room"
                    value={newDashboardName}
                    onChange={(e) => setNewDashboardName(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                <Button onClick={createDashboard}>
                  Create
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {editMode && (
        <div className="grid gap-4 lg:grid-cols-4">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">Available Widgets</CardTitle>
              <p className="text-xs text-muted-foreground">Drag or click to add</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div
                draggable
                onDragStart={() => setDraggedWidget("kpi")}
                onClick={() => addWidget("kpi")}
                className="flex cursor-move items-center gap-3 rounded-lg border-2 border-dashed p-3 transition-colors hover:border-primary hover:bg-accent"
              >
                <LayoutGrid className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm font-medium">KPI Card</p>
                  <p className="text-xs text-muted-foreground">Metrics display</p>
                </div>
              </div>
              <div
                draggable
                onDragStart={() => setDraggedWidget("chart")}
                onClick={() => addWidget("chart")}
                className="flex cursor-move items-center gap-3 rounded-lg border-2 border-dashed p-3 transition-colors hover:border-primary hover:bg-accent"
              >
                <LayoutGrid className="h-6 w-6 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Chart Widget</p>
                  <p className="text-xs text-muted-foreground">Data visualization</p>
                </div>
              </div>
              <div
                draggable
                onDragStart={() => setDraggedWidget("table")}
                onClick={() => addWidget("table")}
                className="flex cursor-move items-center gap-3 rounded-lg border-2 border-dashed p-3 transition-colors hover:border-primary hover:bg-accent"
              >
                <LayoutGrid className="h-6 w-6 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Table Widget</p>
                  <p className="text-xs text-muted-foreground">Data table</p>
                </div>
              </div>
              <div
                draggable
                onDragStart={() => setDraggedWidget("activity")}
                onClick={() => addWidget("activity")}
                className="flex cursor-move items-center gap-3 rounded-lg border-2 border-dashed p-3 transition-colors hover:border-primary hover:bg-accent"
              >
                <LayoutGrid className="h-6 w-6 text-purple-500" />
                <div>
                  <p className="text-sm font-medium">Activity Feed</p>
                  <p className="text-xs text-muted-foreground">Recent activities</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-3">
            <Card
              className="min-h-[500px] border-2 border-dashed"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (draggedWidget) {
                  addWidget(draggedWidget as Widget["type"]);
                  setDraggedWidget(null);
                }
              }}
            >
              <CardContent className="p-6">
                {currentDashboard && currentDashboard.widgets.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {currentDashboard.widgets.map((widget) => (
                      <Card key={widget.id} className="relative">
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute right-2 top-2 h-6 w-6"
                          onClick={() => removeWidget(widget.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <CardContent className="flex h-32 items-center justify-center p-4">
                          <div className="text-center">
                            <LayoutGrid className="mx-auto h-8 w-8 text-muted-foreground" />
                            <p className="mt-2 text-sm font-medium">{widget.title}</p>
                            <p className="text-xs text-muted-foreground">{widget.type}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-96 items-center justify-center">
                    <div className="text-center">
                      <LayoutGrid className="mx-auto h-16 w-16 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-semibold">Drop widgets here</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Drag widgets from the left panel or click to add
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {currentDashboard && !editMode && currentDashboard.widgets.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {currentDashboard.widgets.map((widget) => {
            if (widget.type === "kpi") return (
              <Card key={widget.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{widget.title}</CardTitle>
                  <MoreVertical className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,284</div>
                  <p className="text-xs text-muted-foreground">+3.2% MoM</p>
                </CardContent>
              </Card>
            );
            if (widget.type === "chart") return (
              <Card key={widget.id} className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{widget.title}</CardTitle>
                  <MoreVertical className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
                        <YAxis stroke="#9ca3af" fontSize={12} />
                        <Tooltip />
                        <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
                        <Line type="monotone" dataKey="vehicles" stroke="#60a5fa" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            );
            if (widget.type === "table") return (
              <Card key={widget.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{widget.title}</CardTitle>
                  <MoreVertical className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="h-80">
                  <DonutChart data={dealsByStage} />
                </CardContent>
              </Card>
            );
            if (widget.type === "activity") return (
              <Card key={widget.id} className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{widget.title}</CardTitle>
                  <MoreVertical className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0">
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.user}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
            return null;
          })}
        </div>
      ) : !editMode ? (
        <div className="flex h-96 items-center justify-center rounded-lg border-2 border-dashed">
          <div className="text-center">
            <Plus className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No widgets yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">Click Edit to add widgets to your dashboard</p>
            <Button
              className="mt-4"
              onClick={() => setEditMode(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Start Adding Widgets
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
