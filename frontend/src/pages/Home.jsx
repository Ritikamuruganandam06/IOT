import React from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button1";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1 },
  hover: { scale: 1.05 }
};

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const userDetail = user ? JSON.stringify(user) : "No user details available";

  return (
    <div className="w-full">
      {/* Hero Section with Background Image */}
      <motion.div
        className="w-full bg-slate-400 h-screen"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 1 }}
      >
        <div className="flex flex-col items-center justify-center h-full text-center px-6 bg-overlay-image bg-cover bg-center">
          <motion.h1
            className="text-3xl md:text-5xl font-bold"
            variants={fadeInUp}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Centralized IoT Dashboard for Real-Time Project Monitoring
          </motion.h1>
          <motion.p
            className="my-4 text-lg md:text-xl opacity-80 max-w-2xl"
            variants={fadeInUp}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Track and manage all IoT devices in one place. Access live data, analytics, and seamless project tracking within your campus network.
          </motion.p>
          <motion.div variants={fadeInUp} transition={{ duration: 1, delay: 0.6 }}>
            <Button
              className="bg-foreground hover:bg-primary cursor-pointer"
              onClick={() => navigate("/projects")}
            >
              Get Started
            </Button>
          </motion.div>
        </div>
      </motion.div>

      
    </div>
  );
};

export default Home;