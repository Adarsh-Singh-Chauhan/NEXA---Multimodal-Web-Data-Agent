"use client";

import React from "react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <div className="flex flex-col items-center justify-center pt-32 pb-12 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-sm font-medium bg-brand-gray text-brand-dark rounded-full border border-gray-200">
          <span>2 Months Free - Annually</span>
          <span className="w-4 h-4 rounded-full bg-brand-dark text-white flex items-center justify-center text-[10px]">→</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-brand-dark mb-4 leading-[1.1]">
          Search your Documents <br />
          <span className="text-brand-orange">and Evaluate image</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          The web data API to search, scrape, and interact at scale. <br className="hidden md:block" />
          <span className="bg-brand-gray px-2 py-0.5 rounded text-brand-dark font-medium inline-block mt-2 md:mt-0">It's also open source.</span>
        </p>

        <div className="flex items-center justify-center gap-4">
          <button className="px-6 py-3 text-base font-medium bg-brand-orange hover:bg-orange-600 text-white rounded-xl transition-all hover:scale-105 active:scale-95 shadow-sm shadow-orange-500/20">
            Start for free
          </button>
          <button className="px-6 py-3 text-base font-medium bg-brand-gray hover:bg-gray-200 text-brand-dark rounded-xl transition-all border border-gray-200 flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            Setup for agents
          </button>
        </div>
      </motion.div>
    </div>
  );
}
