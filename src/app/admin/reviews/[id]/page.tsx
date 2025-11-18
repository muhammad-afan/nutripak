"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Logo from "@/components/brand/Logo";
import RatingStars from "@/components/RatingStars";
import { ArrowLeft, Calendar, Package, Phone, User, MapPin, Copy } from "lucide-react";
import { toast } from "sonner";

interface ReviewDetails {
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

export default function AdminReviewDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [review, setReview] = useState<ReviewDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await fetch(`/api/admin/reviews/${params.id}`);

        if (response.status === 401) {
          toast.error("Unauthorized. Please login again.");
          router.push("/admin/login");
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch review");
        }

        setReview(data.data);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to fetch review";
        toast.error(errorMessage);
        router.push("/admin/reviews");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReview();
  }, [params.id, router]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const copyReviewLink = (reviewId: string) => {
    const link = `${window.location.origin}/review/${reviewId}`;
    navigator.clipboard.writeText(link);
    toast.success("Review link copied to clipboard!");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-cream p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12 text-brand-green/70">Loading...</div>
        </div>
      </div>
    );
  }

  if (!review) {
    return (
      <div className="min-h-screen bg-brand-cream p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12 text-brand-green/70">Review not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo className="h-20 w-auto" />
            <div>
              <h1 className="text-3xl font-bold text-brand-green">Review Details</h1>
              <p className="text-brand-green/70">Review ID: {review._id}</p>
            </div>
          </div>
          <Link href="/admin/reviews">
            <Button variant="outline" className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Reviews
            </Button>
          </Link>
        </div>

        {/* Status Badge */}
        <div className="flex gap-2">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              review.reviewId
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {review.reviewId ? "Reviewed" : "Pending Review"}
          </span>
        </div>

        {/* Customer Information */}
        <Card className="border-brand-green/20">
          <CardHeader>
            <CardTitle className="text-brand-green">Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-brand-green/70" />
                <div>
                  <p className="text-sm text-brand-green/70">Phone</p>
                  <p className="font-medium text-brand-green">{review.phone}</p>
                </div>
              </div>
              {review.name && (
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-brand-green/70" />
                  <div>
                    <p className="text-sm text-brand-green/70">Name</p>
                    <p className="font-medium text-brand-green">{review.name}</p>
                  </div>
                </div>
              )}
              {review.address && (
                <div className="flex items-center gap-3 md:col-span-2">
                  <MapPin className="h-5 w-5 text-brand-green/70" />
                  <div>
                    <p className="text-sm text-brand-green/70">Address</p>
                    <p className="font-medium text-brand-green">{review.address}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Order Information */}
        <Card className="border-brand-green/20">
          <CardHeader>
            <CardTitle className="text-brand-green">Order Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-brand-green/70" />
                <div>
                  <p className="text-sm text-brand-green/70">Item</p>
                  <p className="font-medium text-brand-green capitalize">{review.item}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-brand-green/70" />
                <div>
                  <p className="text-sm text-brand-green/70">Quantity</p>
                  <p className="font-medium text-brand-green">{review.quantity}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-brand-green/70" />
                <div>
                  <p className="text-sm text-brand-green/70">Order Created</p>
                  <p className="font-medium text-brand-green">{formatDate(review.createdAt)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Review Details */}
        {review.review ? (
          <Card className="border-brand-green/20">
            <CardHeader>
              <CardTitle className="text-brand-green">Customer Review</CardTitle>
              <CardDescription>Submitted on {formatDate(review.review.createdAt)}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-brand-green/70 mb-2">Rating</p>
                <RatingStars rating={review.review.rating} readonly size="lg" />
              </div>
              {review.review.title && (
                <div>
                  <p className="text-sm text-brand-green/70 mb-2">Title</p>
                  <p className="text-lg font-semibold text-brand-green">{review.review.title}</p>
                </div>
              )}
              {review.review.body && (
                <div>
                  <p className="text-sm text-brand-green/70 mb-2">Review</p>
                  <p className="text-brand-green whitespace-pre-wrap">{review.review.body}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="border-brand-green/20">
            <CardHeader>
              <CardTitle className="text-brand-green">Pending Review</CardTitle>
              <CardDescription>Customer has not submitted a review yet</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => copyReviewLink(review._id)}
                className="bg-brand-terracotta hover:bg-brand-terracotta/90 text-white"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Review Link
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
