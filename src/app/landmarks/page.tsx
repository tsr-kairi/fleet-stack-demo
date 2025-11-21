"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MapPin, Edit, Trash2 } from "lucide-react";

const landmarks = [
  { id: 1, name: "Warehouse A", type: "Warehouse", address: "123 Industrial Rd", radius: "500m", vehicles: 24 },
  { id: 2, name: "Distribution Center", type: "Hub", address: "456 Logistics Ave", radius: "1km", vehicles: 18 },
  { id: 3, name: "Customer Site - North", type: "Delivery", address: "789 Business Park", radius: "200m", vehicles: 12 },
  { id: 4, name: "Service Station", type: "Maintenance", address: "321 Service Ln", radius: "300m", vehicles: 8 },
  { id: 5, name: "Parking Lot B", type: "Parking", address: "654 Fleet St", radius: "400m", vehicles: 15 },
];

export default function LandmarksPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Landmarks</h1>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Landmark
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Landmarks</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search landmarks..." className="w-64 pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Radius</TableHead>
                <TableHead>Vehicles</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {landmarks.map((landmark) => (
                <TableRow key={landmark.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      {landmark.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{landmark.type}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{landmark.address}</TableCell>
                  <TableCell>{landmark.radius}</TableCell>
                  <TableCell>{landmark.vehicles}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
