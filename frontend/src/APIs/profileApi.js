import api from "@/utils/api";

export const getProjectsByUserId = async (userId) => {
  try {
    const response = await api.post(`/api/projects/getByUser/${userId}`, { id: userId });
    console.log("Projects fetched successfully:", response.data);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    throw error;
  }
};