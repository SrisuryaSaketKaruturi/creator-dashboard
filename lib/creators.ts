export type Creator = {
  id: number;
  name: string;
  followers: number;
  revenue: number;
  active: boolean;
  createdAt: string;
};

export const creators: Creator[] = [
  { id: 1, name: "Aman", followers: 1200, revenue: 4500, active: true, createdAt: "2025-01-10" },
  { id: 2, name: "Riya", followers: 540, revenue: 0, active: false, createdAt: "2025-01-12" },
  { id: 3, name: "Karan", followers: 9800, revenue: 12000, active: true, createdAt: "2025-01-21" },
  { id: 4, name: "Neha", followers: 9800, revenue: 2000, active: true, createdAt: "2025-02-02" }
];

export function sortCreators(
  data: Creator[],
  key: "followers" | "revenue",
  direction: "asc" | "desc"
) {
  return [...data].sort((a, b) => {
    const diff = a[key] - b[key];
    if (diff !== 0) {
      return direction === "asc" ? diff : -diff;
    }
    return a.name.localeCompare(b.name);
  });
}

export function filterCreators(
  data: Creator[],
  search: string,
  activeOnly: boolean
) {
  return data.filter(c => {
    const matchesSearch = c.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesActive = activeOnly ? c.active : true;
    return matchesSearch && matchesActive;
  });
}

export function getMetrics(data: Creator[]) {
  const totalCreators = data.length;
  const activeCreators = data.filter(c => c.active);
  const totalRevenue = data.reduce((sum, c) => sum + c.revenue, 0);

  return {
    totalCreators,
    activeCreators: activeCreators.length,
    totalRevenue,
    avgRevenuePerActive:
      activeCreators.length === 0 ? 0 : totalRevenue / activeCreators.length,
  };
}

