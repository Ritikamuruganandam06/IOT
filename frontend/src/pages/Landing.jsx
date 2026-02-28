import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Activity,
  Wifi,
  Globe,
  Database,
  Monitor,
  TrendingUp,
} from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900">
      {/* Background overlay with pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(96, 165, 250, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(34, 211, 238, 0.2) 0%, transparent 50%)
          `,
        }}
      />

      {/* Decorative tech elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Circuit lines */}
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="rgba(96, 165, 250, 0.3)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Glowing orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Floating IoT Icons */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 left-1/4"
        >
          <Wifi className="w-24 h-24 text-cyan-300" strokeWidth={1} />
        </motion.div>

        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-48 right-1/4"
        >
          <Globe className="w-32 h-32 text-blue-300" strokeWidth={1} />
        </motion.div>

        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 left-1/3"
        >
          <Database className="w-20 h-20 text-purple-300" strokeWidth={1} />
        </motion.div>

        <motion.div
          animate={{ y: [0, 25, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-32 right-1/3"
        >
          <Monitor className="w-28 h-28 text-cyan-200" strokeWidth={1} />
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-12"
        >
          <Activity className="w-36 h-36 text-blue-400" strokeWidth={1} />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-6xl backdrop-blur-sm bg-slate-900/30 p-12 rounded-3xl border border-white/10"
        >
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
          >
            Centralized IoT Dashboard for{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Real-Time Project Monitoring
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Connect, monitor, and control your IoT devices in real time — all from a single intelligent platform built for engineers and innovators.
          </motion.p>

          {/* Get Started Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
            className="px-12 py-4 bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white font-bold text-lg rounded-xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 border border-blue-600"
          >
            Get Started
          </motion.button>

          {/* Decorative Icons at bottom */}
          <div className="mt-16 flex justify-center gap-12 opacity-30">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Wifi className="w-8 h-8 text-cyan-300" strokeWidth={1.5} />
            </motion.div>
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            >
              <Globe className="w-8 h-8 text-blue-300" strokeWidth={1.5} />
            </motion.div>
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            >
              <Activity className="w-8 h-8 text-cyan-300" strokeWidth={1.5} />
            </motion.div>
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            >
              <Database className="w-8 h-8 text-blue-300" strokeWidth={1.5} />
            </motion.div>
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2.3, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            >
              <Monitor className="w-8 h-8 text-cyan-300" strokeWidth={1.5} />
            </motion.div>
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <TrendingUp className="w-8 h-8 text-blue-300" strokeWidth={1.5} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
