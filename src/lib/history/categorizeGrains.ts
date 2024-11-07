import { Grain, Standard } from "./types";

export function categorizeGrains(grains: Grain[], standards: Standard[]) {
  let totalWeight = 0;
  const composition: { [key: string]: number } = {};
  const defect: { [key: string]: number } = {};

  grains.forEach((grain) => {
    totalWeight += grain.weight;

    standards.forEach((standard) => {
      standard.standardData.forEach((subStandard) => {
        const { minLength, maxLength, conditionMin, conditionMax, shape } = subStandard;

        const lengthCheck =
          (conditionMin === "GT"
            ? grain.length > minLength
            : grain.length >= minLength) &&
          (conditionMax === "LT" ? grain.length < maxLength : grain.length <= maxLength);

        if (lengthCheck && shape.includes(grain.shape)) {
          composition[subStandard.name] =
            (composition[subStandard.name] || 0) + grain.weight;
        }
      });
    });

    defect[grain.type] = (defect[grain.type] || 0) + grain.weight;
  });

  // Calculate percentage
  Object.keys(composition).forEach((key) => {
    composition[key] = parseFloat(((composition[key] / totalWeight) * 100).toFixed(2));
  });

  Object.keys(defect).forEach((key) => {
    defect[key] = parseFloat(((defect[key] / totalWeight) * 100).toFixed(2));
  });

  return {
    totalWeight,
    composition,
    defect,
  };
}
