import useAxiosInstance from "./useAxiosInstance";

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
  planetsGetStarList,
};
