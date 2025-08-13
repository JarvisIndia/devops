// Mock data for development - replace with actual API calls
export const dashboardService = {
  getStats: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock data
    return {
      totalUsers: 1247,
      activeProjects: 23,
      totalRevenue: 45678,
      totalInventory: 156,
      userGrowth: 12.5,
      projectGrowth: 8.2,
      revenueGrowth: 15.7,
      inventoryGrowth: -2.1,
    };
  },

  getChartData: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Mock chart data
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const userData = [65, 78, 90, 105, 120, 135];
    const revenueData = [12000, 15000, 18000, 22000, 25000, 28000];
    
    return {
      userGrowth: {
        labels,
        data: userData,
      },
      revenue: {
        labels,
        data: revenueData,
      },
      projectStatus: [45, 25, 20, 10], // Completed, In Progress, Pending, Cancelled
    };
  },
};
