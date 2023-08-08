import useAxiosInstance from "./useAxiosInstance";

const planetsGetPlanetList = async () => {
  try {
    const response = await useAxiosInstance.apiClient.get(`/planets`);
    return response.data;
  } catch (e) {
    console.log("planet_error:", e);
  }
};

const planetsGetStarList = async (planetId) => {
  try {
    const response = await useAxiosInstance.apiClient.get(
      `/planets/${planetId}`,
    );
    return response.data;
  } catch (e) {
    console.log("planet_error:", e);
  }
};

export default {
  planetsGetPlanetList,
  planetsGetStarList,
};
