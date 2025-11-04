"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/components/brand/Logo";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-brand-cream via-brand-cream to-brand-green/5">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        <Card className="border-brand-green/20 shadow-2xl overflow-hidden bg-white/95 backdrop-blur">
          <CardHeader className="space-y-8 text-center pb-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.3,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              className="flex justify-center"
            >
              <Logo className="h-24 w-auto" />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 text-brand-green text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                <span>Premium Nutrition</span>
              </div>

              <CardTitle className="text-4xl md:text-5xl text-brand-green font-bold">
                Coming Soon
              </CardTitle>

              <CardDescription className="text-lg md:text-xl text-brand-green/80 max-w-lg mx-auto">
                We're crafting something special for you. Our new website is on its way!
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="pb-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-lg bg-brand-cream">
                  <div className="text-2xl font-bold text-brand-green mb-1">100%</div>
                  <div className="text-sm text-brand-green/70">Natural Ingredients</div>
                </div>
                <div className="p-4 rounded-lg bg-brand-cream">
                  <div className="text-2xl font-bold text-brand-gold mb-1">Premium</div>
                  <div className="text-sm text-brand-green/70">Quality Products</div>
                </div>
                <div className="p-4 rounded-lg bg-brand-cream">
                  <div className="text-2xl font-bold text-brand-terracotta mb-1">Fresh</div>
                  <div className="text-sm text-brand-green/70">Made Daily</div>
                </div>
              </div>

              <div className="text-center text-sm text-brand-green/60">
                <p>Meanwhile, we're collecting reviews and feedback from our customers.</p>
                <p className="mt-2">Thank you for your patience and support!</p>
              </div>
            </motion.div>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-brand-green/50">
            © 2025 NutriPak. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
