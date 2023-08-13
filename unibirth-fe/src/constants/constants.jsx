// API URL
export const API_URL = "https://i9a410.p.ssafy.io/api/";
export const CONTENT_TYPE_JSON = "application/json";

const num = 20;

export const PLANET_LIST = [
  { planetId: 1, name: "SSAFY", x: num, y: 0, z: 0 },
  {
    planetId: 2,
    name: "개발",
    x: num * Math.sin(45),
    y: 0,
    z: num * Math.sin(45),
  },
  { planetId: 3, name: "취미", x: 0, y: 0, z: num },
  { planetId: 4, name: "자기계발", x: -num * Math.sin(45), y: 0, z: num },
  { planetId: 5, name: "운동", x: -num, y: 0, z: 0 },
  {
    planetId: 6,
    name: "공감",
    x: -num * Math.sin(45),
    y: 0,
    z: -num * Math.sin(45),
  },
  { planetId: 7, name: "미라클모닝", x: 0, y: 0, z: -num },
  {
    planetId: 8,
    name: "자랑",
    x: num * Math.sin(45),
    y: 0,
    z: -num * Math.sin(45),
  },
];

export const SEARTCH_LIST = [
  { name: "all" },
  { name: "constellation" },
  { name: "star" },
  { name: "nickname" },
];
