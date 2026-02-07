"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Logo from "@/components/brand/Logo";
import RatingStars from "@/components/RatingStars";
import { Plus, Search, Filter, Copy } from "lucide-react";
import { toast } from "sonner";

interface Review {
  _id: string;
  phone: string;
  name?: string;
  address?: string;
  item: string;
  quantity: number;
  reviewId?: string;
  createdAt: string;
  review?: {
    rating: number;
    title?: string;
    body?: string;
    createdAt: string;
  };
}

export default function AdminDashboardPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [phoneFilter, setPhoneFilter] = useState("");
  const [itemFilter, setItemFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "reviewed">("all");
  const router = useRouter();

  const fetchReviews = async () => {
    try {
      const params = new URLSearchParams();
      if (phoneFilter) params.append("phone", phoneFilter);
      if (itemFilter) params.append("item", itemFilter);
      if (statusFilter !== "all") params.append("status", statusFilter);

      const response = await fetch(`/api/admin/reviews?${params}`);

      if (response.status === 401) {
        toast.error("Unauthorized. Please login again.");
        router.push("/admin/login");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch reviews");
      }

      setReviews(data.data);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch reviews");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [phoneFilter, itemFilter, statusFilter]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const copyReviewLink = (reviewId: string) => {
    const link = `${window.location.origin}/review/${reviewId}`;
    navigator.clipboard.writeText(link);
    toast.success("Review link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-brand-cream p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo className="h-25 w-auto" />
            <div>
              <h1 className="text-3xl font-bold text-brand-green">Admin Dashboard</h1>
              <p className="text-brand-green/70">Manage customer reviews</p>
            </div>
          </div>
          <Link href="/admin/reviews/new">
            <Button className="bg-brand-terracotta hover:bg-brand-terracotta/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Review Link
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card className="border-brand-green/20">
          <CardHeader>
            <CardTitle className="text-brand-green flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-brand-green">Phone</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-brand-green/50" />
                  <Input
                    placeholder="Search by phone..."
                    value={phoneFilter}
                    onChange={(e) => setPhoneFilter(e.target.value)}
                    className="pl-9 border-brand-green/30"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-brand-green">Item</label>
                <Input
                  placeholder="Filter by item..."
                  value={itemFilter}
                  onChange={(e) => setItemFilter(e.target.value)}
                  className="border-brand-green/30"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-brand-green">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="w-full h-10 px-3 rounded-md border border-brand-green/30 bg-white text-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/50"
                >
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reviews Table */}
        <Card className="border-brand-green/20">
          <CardHeader>
            <CardTitle className="text-brand-green">Reviews</CardTitle>
            <CardDescription>
              Total: {reviews.length} review{reviews.length !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-12 text-brand-green/70">Loading...</div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-12 text-brand-green/70">
                No reviews found. Create your first review link!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-brand-green">Phone</TableHead>
                      <TableHead className="text-brand-green">Name</TableHead>
                      <TableHead className="text-brand-green">Item</TableHead>
                      <TableHead className="text-brand-green">Qty</TableHead>
                      <TableHead className="text-brand-green">Status</TableHead>
                      <TableHead className="text-brand-green">Rating</TableHead>
                      <TableHead className="text-brand-green">Created</TableHead>
                      <TableHead className="text-brand-green">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reviews.map((review) => (
                      <TableRow 
                        key={review._id}
                        onClick={() => router.push(`/admin/reviews/${review._id}`)}
                        className="cursor-pointer hover:bg-brand-green/5 transition-colors"
                      >
                        <TableCell className="font-medium">{review.phone}</TableCell>
                        <TableCell>{review.name || "-"}</TableCell>
                        <TableCell className="capitalize">{review.item}</TableCell>
                        <TableCell>{review.quantity}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              review.reviewId
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {review.reviewId ? "Reviewed" : "Pending"}
                          </span>
                        </TableCell>
                        <TableCell>
                          {review.review ? (
                            <RatingStars rating={review.review.rating} readonly size="sm" />
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell className="text-sm text-brand-green/70">
                          {formatDate(review.createdAt)}
                        </TableCell>
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          {!review.reviewId && (
                            <Button
                              onClick={() => copyReviewLink(review._id)}
                              variant="outline"
                              size="sm"
                              className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white"
                            >
                              <Copy className="h-4 w-4 mr-1" />
                              Copy Link
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
