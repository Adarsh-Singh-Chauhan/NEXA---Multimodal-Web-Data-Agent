"use client";

import React from "react";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { AgentTask } from "@/types";
import { motion } from "framer-motion";

interface ActivityPanelProps {
  tasks: AgentTask[];
}

export function ActivityPanel({ tasks }: ActivityPanelProps) {
  if (!tasks || tasks.length === 0) return null;

  return (
    <div className="w-full py-4 px-12">
      <div className="max-w-2xl bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Agent Activity</h4>
        <div className="flex flex-col gap-2">
          {tasks.map((task) => (
            <motion.div 
              key={task.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 text-sm"
            >
              {task.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
              {task.status === 'active' && <Loader2 className="w-4 h-4 text-brand-orange animate-spin" />}
              {task.status === 'pending' && <Circle className="w-4 h-4 text-gray-300" />}
              {task.status === 'error' && <Circle className="w-4 h-4 text-red-500" />}
              
              <span className={
                task.status === 'active' ? 'text-brand-dark font-medium' :
                task.status === 'completed' ? 'text-gray-600' :
                task.status === 'error' ? 'text-red-500' :
                'text-gray-400'
              }>
                {task.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
