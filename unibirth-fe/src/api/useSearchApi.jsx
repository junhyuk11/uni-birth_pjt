import useAxiosInstance from "./useAxiosInstance";

const searchGetMemberCuration = async (nickname) => {
  const jwt = sessionStorage.getItem("accessToken");
  console.log(nickname);
  try {
    const response = await useAxiosInstance
      .authApiClient(jwt)
      .get(`/members/curation`, nickname);
    return response.data;
  } catch (e) {
    console.log(e);
  }
  return searchGetMemberCuration;
};

const searchGetSearch = async (category, word) => {
  const jwt = sessionStorage.getItem("accessToken");
  console.log(category, word);
  try {
    const response = await useAxiosInstance
      .authApiClient(jwt)
      .get(`/search?category=${category}&word=${word}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export default {
  searchGetMemberCuration,
  searchGetSearch,
};
