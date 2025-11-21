"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, DollarSign, Calendar, User } from "lucide-react";
import { deals } from "@/lib/dummy-data/deals";

const stages = ["lead", "qualified", "proposal", "negotiation", "closed"] as const;

const stageColors = {
  lead: "bg-slate-100 text-slate-700",
  qualified: "bg-blue-100 text-blue-700",
  proposal: "bg-purple-100 text-purple-700",
  negotiation: "bg-amber-100 text-amber-700",
  closed: "bg-green-100 text-green-700",
};

export default function DealsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Deals</h1>
          <p className="text-muted-foreground">Manage your sales pipeline</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Deal
        </Button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-5 lg:overflow-x-visible">
        {stages.map((stage) => {
          const stageDeals = deals.filter((deal) => deal.stage === stage);
          const totalValue = stageDeals.reduce((sum, deal) => sum + deal.value, 0);

          return (
            <div key={stage} className="min-w-[280px] space-y-3 lg:min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold capitalize">{stage}</h3>
                <Badge variant="secondary">{stageDeals.length}</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                ${(totalValue / 1000).toFixed(0)}K
              </div>
              <div className="space-y-3">
                {stageDeals.map((deal) => (
                  <Card key={deal.id} className="cursor-pointer transition-shadow hover:shadow-md">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium leading-tight">{deal.title}</h4>
                          <p className="text-xs text-muted-foreground">{deal.company}</p>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <DollarSign className="h-3 w-3" />
                          <span className="font-medium">${(deal.value / 1000).toFixed(0)}K</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <User className="h-3 w-3" />
                          <span>{deal.contactName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{deal.expectedCloseDate}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge className={stageColors[deal.stage]} variant="secondary">
                            {deal.probability}%
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
