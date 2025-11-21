"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plus, Zap, Clock, AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";

const workflows = [
  { id: 1, name: "Speeding Alert", trigger: "Speed > 80 km/h", action: "Send notification to manager", enabled: true, executions: 142 },
  { id: 2, name: "Geofence Entry", trigger: "Vehicle enters restricted zone", action: "Alert driver and log event", enabled: true, executions: 89 },
  { id: 3, name: "Idle Time Warning", trigger: "Idle > 30 minutes", action: "Send SMS to driver", enabled: false, executions: 56 },
  { id: 4, name: "Maintenance Due", trigger: "Mileage reaches threshold", action: "Create maintenance ticket", enabled: true, executions: 23 },
  { id: 5, name: "After Hours Movement", trigger: "Vehicle moves after 10 PM", action: "Alert security team", enabled: true, executions: 12 },
];

export default function WorkflowsPage() {
  const [workflowStates, setWorkflowStates] = useState(
    workflows.reduce((acc, w) => ({ ...acc, [w.id]: w.enabled }), {} as Record<number, boolean>)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Workflows</h1>
          <p className="text-sm text-muted-foreground">Automate actions based on fleet events</p>
        </div>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Create Workflow
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workflows.filter((w) => w.enabled).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Executions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workflows.reduce((sum, w) => sum + w.executions, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Workflows</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workflows.map((workflow) => (
              <div key={workflow.id} className="flex items-start justify-between rounded-lg border p-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold">{workflow.name}</h3>
                    {workflowStates[workflow.id] ? (
                      <Badge variant="default" className="bg-green-500">
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                  </div>
                  <div className="grid gap-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <AlertCircle className="h-3 w-3" />
                      <span>Trigger: {workflow.trigger}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="h-3 w-3" />
                      <span>Action: {workflow.action}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {workflow.executions} executions
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={workflowStates[workflow.id]}
                    onCheckedChange={(checked) =>
                      setWorkflowStates({ ...workflowStates, [workflow.id]: checked })
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
