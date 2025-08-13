export interface DashboardStats {
  totalUsers: number;
  activeProjects: number;
  totalRevenue: number;
  totalInventory: number;
  userGrowth: number;
  projectGrowth: number;
  revenueGrowth: number;
  inventoryGrowth: number;
}

export interface ChartData {
  userGrowth: {
    labels: string[];
    data: number[];
  };
  revenue: {
    labels: string[];
    data: number[];
  };
  projectStatus: number[];
}
