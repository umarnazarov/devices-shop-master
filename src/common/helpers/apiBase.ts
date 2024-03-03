interface RequestOptions extends RequestInit {}
export async function baseFetch<T>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const baseUrl = import.meta.env.VITE_BASE_API_URL;

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  const mergedOptions: RequestInit = {
    method: "GET",
    headers: { ...defaultHeaders, ...options.headers },
    ...options,
  };

  try {
    const response = await fetch(`${baseUrl}${url}`, mergedOptions);

    if (!response.ok) {
      let errorMessage = "Network response was not ok.";

      try {
        const errorResponseData = await response.json();
        if (errorResponseData && errorResponseData.message) {
          errorMessage = errorResponseData.message;
        }
      } catch (error) {
        console.error("Error parsing error response JSON:", error);
      }

      throw new Error(errorMessage);
    }

    const responseData: T = await response.json();
    return responseData;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
