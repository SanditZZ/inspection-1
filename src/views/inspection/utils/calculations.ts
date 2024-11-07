import { Standard, Grain } from "@/lib/history/types";

// Calculate the percentage of each grain type.
export function calculateGrainTypePercentage(grains: Grain[]): Record<string, number> {
  const totalGrains = grains.length;
  const typeCount = grains.reduce<Record<string, number>>((acc, grain) => {
    acc[grain.type] = (acc[grain.type] || 0) + 1;
    return acc;
  }, {});

  return Object.fromEntries(
    Object.entries(typeCount).map(([type, count]) => [type, (count / totalGrains) * 100]),
  );
}

// Calculate the percentage of grains that meet each standard type criteria.
export function calculateStandardPercentage(
  grains: Grain[],
  standard: Standard,
): Record<string, number> {
  const totalGrains = grains.length;
  const standardData = standard.standardData;

  return standardData.reduce<Record<string, number>>((acc, criteria) => {
    const matchingGrains = grains.filter(
      (grain) =>
        criteria.shape.includes(grain.shape) &&
        grain.length >= criteria.minLength &&
        grain.length <= criteria.maxLength,
    );
    acc[criteria.name] = (matchingGrains.length / totalGrains) * 100;
    return acc;
  }, {});
}
