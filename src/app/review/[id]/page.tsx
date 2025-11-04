"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/brand/Logo";
import RatingStars from "@/components/RatingStars";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function ReviewPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingReview, setPendingReview] = useState<any>(null);
  const [error, setError] = useState("");
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);

  const [formData, setFormData] = useState({
    rating: 0,
    title: "",
    body: "",
  });

  useEffect(() => {
    const checkReview = async () => {
      try {
        const response = await fetch(`/api/review/check?pendingId=${params.id}`);
        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Invalid or expired link");
          return;
        }

        setPendingReview(data.data);
        setAlreadyReviewed(data.data.alreadyReviewed);
      } catch (err) {
        setError("Invalid or expired link");
      } finally {
        setIsLoading(false);
      }
    };

    checkReview();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/review/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pendingId: params.id,
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit review");
      }

      toast.success("Review submitted successfully!");
      router.push("/thank-you");
    } catch (error: any) {
      toast.error(error.message || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream">
        <div className="text-center space-y-4">
          <Logo className="h-16 w-auto mx-auto" />
          <p className="text-brand-green/70">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-brand-cream">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="w-full max-w-md border-brand-green/20 shadow-lg text-center">
            <CardHeader className="space-y-4">
              <Logo className="h-16 w-auto mx-auto" />
              <CardTitle className="text-2xl text-brand-green">Oops!</CardTitle>
              <CardDescription className="text-base">{error}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-brand-green/70">
                Please contact NutriPak if you think this is a mistake.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (alreadyReviewed) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-brand-cream">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="w-full max-w-md border-brand-green/20 shadow-lg text-center">
            <CardHeader className="space-y-4">
              <Logo className="h-16 w-auto mx-auto" />
              <CardTitle className="text-2xl text-brand-green">Already Reviewed</CardTitle>
              <CardDescription className="text-base">
                Thank you! You have already submitted your review for this purchase.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-brand-green/70">
                We appreciate your feedback and look forward to serving you again!
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-brand-cream">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="border-brand-green/20 shadow-xl">
          <CardHeader className="space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center"
            >
              <Logo className="h-16 w-auto" />
            </motion.div>
            <div className="text-center">
              <CardTitle className="text-2xl text-brand-green">
                How was your NutriPak {pendingReview?.item}?
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Your feedback helps us grow!
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label className="text-brand-green text-base">
                  Rating <span className="text-brand-terracotta">*</span>
                </Label>
                <div className="flex justify-center py-2">
                  <RatingStars
                    rating={formData.rating}
                    onRatingChange={(rating) => setFormData({ ...formData, rating })}
                    size="lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title" className="text-brand-green">
                  Review Title (Optional)
                </Label>
                <Input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Excellent quality!"
                  className="border-brand-green/30 focus:border-brand-green"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="body" className="text-brand-green">
                  Your Feedback (Optional)
                </Label>
                <textarea
                  id="body"
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  placeholder="Tell us what you liked or how we can improve..."
                  rows={4}
                  className="w-full px-3 py-2 rounded-md border border-brand-green/30 focus:outline-none focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || formData.rating === 0}
                className="w-full bg-brand-terracotta hover:bg-brand-terracotta/90 text-white transition-all duration-300 transform hover:scale-105"
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>

              <p className="text-xs text-center text-brand-green/60">
                Your review will help other customers make informed decisions
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
