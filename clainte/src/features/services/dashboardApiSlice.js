import { authApi } from "../auth/authApi";

export const dashboardApi = authApi.injectEndpoints({
  tagTypes: ["dashboard_data"],
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: () => `service/admin/dashboard/`,
      providesTags: ["dashboard_data"],
    }),
  }),
});

export const { useGetDashboardDataQuery } = dashboardApi;
