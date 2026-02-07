"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Logo from "@/components/brand/Logo";
import { motion } from "framer-motion";
import { Heart, CheckCircle, ExternalLink } from "lucide-react";

export default function ThankYouPage() {
  const handleOpenDashboard = () => {
    window.open("https://wa.zenvyx.tech", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-brand-cream">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-brand-green/20 shadow-2xl overflow-hidden">
          <CardHeader className="space-y-6 text-center pb-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              className="flex justify-center"
            >
              <Logo className="h-20 w-auto" />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-3xl text-brand-green">Thank You!</CardTitle>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <CardDescription className="text-lg text-brand-green/80">
                Your feedback helps us grow!
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-6 pb-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center space-y-4"
            >
              <div className="flex items-center justify-center gap-2 text-brand-green/70">
                <Heart className="h-5 w-5 text-brand-terracotta fill-brand-terracotta" />
                <p className="text-sm">We truly appreciate your time and honest review</p>
              </div>

              <div className="p-4 bg-brand-cream/50 rounded-lg border border-brand-green/10">
                <p className="text-sm text-brand-green/80">
                  Your review will help other customers discover our premium products and help us
                  continue delivering quality nutrition.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <Button
                onClick={handleOpenDashboard}
                className="w-full bg-brand-green text-white hover:bg-brand-green/90 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Open Dashboard
                <ExternalLink className="h-4 w-4" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-center"
            >
              <p className="text-xs text-brand-green/50">
                This will open your dashboard in a new tab
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
