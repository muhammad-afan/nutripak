"use client";

import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Logo from "@/components/brand/Logo";
import { motion } from "framer-motion";
import { Heart, CheckCircle } from "lucide-react";

export default function ThankYouPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "https://wa.zenvyx.tech";
    }, 1500); // 1.5s delay so you can visually confirm page loads

    return () => clearTimeout(timer);
  }, []);

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
              <CardTitle className="text-3xl text-brand-green">Redirecting...</CardTitle>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <CardDescription className="text-lg text-brand-green/80">
                Taking you to your dashboard
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
                <p className="text-sm">Preparing your workspace…</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-center"
            >
              <p className="text-xs text-brand-green/50">
                If you are not redirected automatically,{" "}
                <a
                  href="https://wa.zenvyx.tech"
                  className="underline text-brand-green"
                >
                  click here
                </a>
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
