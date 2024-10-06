export const lensModels = ["Single Vision", "BiFocal", "Progressive"];
export const lensTypes = ["Polycarbonate", "Plastic", "Glass"];
export const lensCategory = ["HMC", "HC", "ARC", "BlueCut"];
export const sign = ["-", "+"];
export const integer = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22,
];
export const decimal = [".00", ".25", ".50", ".75"];
export const generateAxis = () => {
  let axis = [];
  for (let i = 0; i < 180; i++) {
    axis.push(i);
  }
  return axis;
};
