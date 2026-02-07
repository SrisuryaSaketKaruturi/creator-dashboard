import {
  creators,
  sortCreators,
  filterCreators,
  getMetrics,
} from "@/lib/creators";

test("sorts followers descending with stable tie", () => {
  const result = sortCreators(creators, "followers", "desc");
  expect(result[0].name).toBe("Karan");
  expect(result[1].name).toBe("Neha");
});

test("sorts revenue ascending", () => {
  const result = sortCreators(creators, "revenue", "asc");
  expect(result[0].revenue).toBe(0);
});

test("filters by search and active", () => {
  const result = filterCreators(creators, "a", true);
  expect(result.every(c => c.active)).toBe(true);
});

test("avg revenue is zero when no active creators", () => {
  const result = getMetrics(creators.filter(c => !c.active));
  expect(result.avgRevenuePerActive).toBe(0);
});

