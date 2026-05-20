export interface AnalyticsSnapshot {
  id: string;
  date: string;
  totalRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  confirmedOrders: number;
  deliveredOrders: number;
  completedOrders: number;
  topProducts: TopProduct[];
}

export interface TopProduct {
  productId: string;
  productName: string;
  orderCount: number;
  revenue: number;
}

export interface DashboardStats {
  todayRevenue: number;
  monthlyRevenue: number;
  totalOrders: number;
  pendingConfirmations: number;
  processingOrders: number;
  deliveredOrders: number;
  completedOrders: number;
  topProducts: TopProduct[];
  recentOrders: RecentOrderSummary[];
}

export interface RecentOrderSummary {
  id: string;
  trackingId: string;
  customerName: string;
  productName: string;
  grandTotal: number;
  orderStatus: string;
  paymentStatus: string;
  createdAt: Date;
}

export interface RevenuePoint {
  date: string;
  revenue: number;
  orders: number;
}