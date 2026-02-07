"use client";

import { useState } from "react";
import {
  creators,
  sortCreators,
  filterCreators,
  getMetrics,
} from "@/lib/creators";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

export default function Page() {
  const [search, setSearch] = useState("");
  const [activeOnly, setActiveOnly] = useState(false);
  const [sortKey, setSortKey] =
    useState<"followers" | "revenue">("followers");
  const [sortDir, setSortDir] =
    useState<"asc" | "desc">("asc");

  let data = filterCreators(creators, search, activeOnly);
  data = sortCreators(data, sortKey, sortDir);

  const metrics = getMetrics(data);

  return (
    <div className="p-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent>Total creators: {metrics.totalCreators}</CardContent>
        </Card>
        <Card>
          <CardContent>Active creators: {metrics.activeCreators}</CardContent>
        </Card>
        <Card>
          <CardContent>Total revenue: ₹{metrics.totalRevenue}</CardContent>
        </Card>
        <Card>
          <CardContent>
            Avg / active: ₹{metrics.avgRevenuePerActive.toFixed(2)}
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <Input
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex items-center gap-2">
          <Switch
            checked={activeOnly}
            onCheckedChange={setActiveOnly}
          />
          Active only
        </div>
      </div>

      {/* Table */}
      {data.length === 0 ? (
        <div className="text-center text-muted-foreground">
          No creators match your filters.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSortKey("followers");
                    setSortDir(sortDir === "asc" ? "desc" : "asc");
                  }}
                >
                  Followers
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSortKey("revenue");
                    setSortDir(sortDir === "asc" ? "desc" : "asc");
                  }}
                >
                  Revenue
                </Button>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.followers}</TableCell>
                <TableCell>{c.revenue}</TableCell>
                <TableCell>
                  {c.active ? "Active" : "Inactive"}
                </TableCell>
                <TableCell>{c.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

