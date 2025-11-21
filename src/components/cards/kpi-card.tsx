import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreVertical } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  progress: string;
  barColor: string;
}

export function KpiCard({ title, value, change, progress, barColor = "bg-primary" }: KPICardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <MoreVertical className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <p className="text-xs text-green-600">{change}</p>
        <div className="mt-4 h-2 w-full rounded-full bg-muted">
          <div
            className={`h-2 rounded-full ${barColor}`}
            style={{ width: progress }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
