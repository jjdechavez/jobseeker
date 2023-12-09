export const getSession = async (session: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/session`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );

    return response.json();
  } catch (error) {
    alert(error);
  }
};
