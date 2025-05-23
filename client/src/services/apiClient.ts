const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

interface FetchAPIOptions extends RequestInit {
  params?: Record<string, string>;
}

async function fetchAPI(endpoint: string, options: FetchAPIOptions = {}) {
  let url = `${API_BASE_URL}${endpoint}`;

  if (options.params) {
    const queryParams = new URLSearchParams(options.params);
    url += `?${queryParams.toString()}`;
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'x-api-key': API_KEY,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      error: "API request failed with status: " + response.status,
    }));
    throw new Error(
      errorData.error ||
        `API request failed: ${response.statusText} for ${url}`,
    );
  }

  if (response.status === 204) {
    return null;
  }
  return response.json();
}

export const uploadTransactionFiles = (formData: FormData) => {
  return fetchAPI("/upload", {
    method: "POST",
    body: formData,
  });
};

export interface GetTransactionsReportParams {
  startDate?: string;
  endDate?: string;
}

export const getTransactionsReportByCard = () => {
  return fetchAPI("/reports/transactions/by-card");
};

export const getTransactionsReportByCardType = () => {
  return fetchAPI("/reports/transactions/by-card-type");
};

export const getTransactionsReportByDay = (
  params: GetTransactionsReportParams,
) => {
  const queryParams: Record<string, string> = {};
  if (params.startDate) {
    queryParams.startDate = params.startDate;
  }
  if (params.endDate) {
    queryParams.endDate = params.endDate;
  }
  return fetchAPI("/reports/transactions/by-day", { params: queryParams });
};

export const getRejectedTransactionsReport = () => {
  return fetchAPI("/reports/transactions/rejected");
};
