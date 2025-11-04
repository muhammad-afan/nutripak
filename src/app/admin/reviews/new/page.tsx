"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/brand/Logo";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { toast } from "sonner";

export default function NewReviewPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    address: "",
    item: "panjeeri",
    quantity: "1",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          quantity: parseInt(formData.quantity),
        }),
      });

      if (response.status === 401) {
        toast.error("Unauthorized. Please login again.");
        router.push("/admin/login");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create review");
      }

      setGeneratedLink(data.reviewLink);
      toast.success("Review link generated successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to create review");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const resetForm = () => {
    setFormData({
      phone: "",
      name: "",
      address: "",
      item: "panjeeri",
      quantity: "1",
    });
    setGeneratedLink("");
  };

  if (generatedLink) {
    return (
      <div className="min-h-screen bg-brand-cream p-4 md:p-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <Link href="/admin/reviews">
            <Button variant="outline" className="border-brand-green text-brand-green">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>

          <Card className="border-brand-green/20">
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center">
                <Logo className="h-16 w-auto" />
              </div>
              <CardTitle className="text-2xl text-brand-green">Review Link Generated!</CardTitle>
              <CardDescription>
                Share this link with your customer to collect their review
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-brand-cream rounded-lg border-2 border-brand-green/20">
                <p className="text-sm text-brand-green/70 mb-2">Review Link:</p>
                <p className="text-brand-green font-mono break-all">{generatedLink}</p>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={copyToClipboard}
                  className="flex-1 bg-brand-terracotta hover:bg-brand-terracotta/90 text-white"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Link
                    </>
                  )}
                </Button>

                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="flex-1 border-brand-green text-brand-green"
                >
                  Create Another
                </Button>
              </div>

              <Link href="/admin/reviews" className="block">
                <Button variant="ghost" className="w-full text-brand-green">
                  View All Reviews
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Link href="/admin/reviews">
          <Button variant="outline" className="border-brand-green text-brand-green">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <Card className="border-brand-green/20">
          <CardHeader className="space-y-4">
            <div className="flex justify-center">
              <Logo className="h-12 w-auto" />
            </div>
            <div className="text-center">
              <CardTitle className="text-2xl text-brand-green">
                Generate Review Link for a Customer
              </CardTitle>
              <CardDescription>
                Fill in the customer details to create a unique review link
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-brand-green">
                  Phone Number <span className="text-brand-terracotta">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g., +92 300 1234567"
                  required
                  className="border-brand-green/30 focus:border-brand-green"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-brand-green">
                  Customer Name (Optional)
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Ahmed Khan"
                  className="border-brand-green/30 focus:border-brand-green"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-brand-green">
                  Address (Optional)
                </Label>
                <Input
                  id="address"
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g., House 123, Street 4, Lahore"
                  className="border-brand-green/30 focus:border-brand-green"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="item" className="text-brand-green">
                  Item <span className="text-brand-terracotta">*</span>
                </Label>
                <select
                  id="item"
                  value={formData.item}
                  onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                  required
                  className="w-full h-10 px-3 rounded-md border border-brand-green/30 bg-white text-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/50"
                >
                  <option value="panjeeri">Panjeeri</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-brand-green">
                  Quantity <span className="text-brand-terracotta">*</span>
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder="1"
                  required
                  className="border-brand-green/30 focus:border-brand-green"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand-terracotta hover:bg-brand-terracotta/90 text-white transition-all duration-300"
              >
                {isLoading ? "Generating..." : "Generate Review Link"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
