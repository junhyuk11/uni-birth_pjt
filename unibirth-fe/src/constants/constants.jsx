// API URL
export const API_URL = "http://43.202.47.103:8080";

export const CONTENT_TYPE_JSON = "application/json";

const num = 10;

export const PLANET_LIST = [
  { planetId: 1, name: "행성 1", x: num, y: 0, z: 0 },
  {
    planetId: 2,
    name: "행성 2",
    x: num * Math.sin(45),
    y: 0,
    z: num * Math.sin(45),
  },
  { planetId: 3, name: "행성 3", x: 0, y: 0, z: num },
  { planetId: 4, name: "행성 4", x: -num * Math.sin(45), y: 0, z: num },
  { planetId: 5, name: "행성 5", x: -num, y: 0, z: 0 },
  {
    planetId: 6,
    name: "행성 6",
    x: -num * Math.sin(45),
    y: 0,
    z: -num * Math.sin(45),
  },
  { planetId: 7, name: "행성 7", x: 0, y: 0, z: -num },
  {
    planetId: 8,
    name: "행성 8",
    x: num * Math.sin(45),
    y: 0,
    z: -num * Math.sin(45),
  },
];

export const SEARTCH_LIST = [
  { name: "All" },
  { name: "Constellation" },
  { name: "Star" },
  { name: "Nickname" },
];
