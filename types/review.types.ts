export interface Review {
  id: string;
  orderId: string;
  customerName: string;
  productName: string;
  categoryName: string;
  rating: number;
  reviewText: string;
  isApproved: boolean;
  createdAt: Date;
}

export interface CreateReviewPayload {
  orderId: string;
  customerName: string;
  productName: string;
  categoryName: string;
  rating: number;
  reviewText: string;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingBreakdown: Record<number, number>;
}