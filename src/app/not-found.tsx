"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Logo from "@/components/brand/Logo";
import { motion } from "framer-motion";
import { Home, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-brand-cream">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg"
      >
        <Card className="border-brand-green/20 shadow-2xl text-center">
          <CardHeader className="space-y-6">
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
              <Logo className="h-10 w-auto" />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-terracotta/10 mb-4">
                <Search className="h-10 w-10 text-brand-terracotta" />
              </div>
              <CardTitle className="text-4xl text-brand-green mb-2">404</CardTitle>
              <CardTitle className="text-2xl text-brand-green">Page Not Found</CardTitle>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <CardDescription className="text-base text-brand-green/70">
                We couldn't find the page you're looking for. It might have been moved or doesn't exist.
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-4 pb-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Link href="/">
                <Button className="w-full bg-brand-terracotta hover:bg-brand-terracotta/90 text-white">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <p className="text-xs text-brand-green/50">
                If you believe this is an error, please contact NutriPak support
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
