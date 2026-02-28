import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import Badge from './ui/badge';
import { Button } from './ui/button1';
import { getStatus } from '@/utils/status';

import { FaRegBell, FaRegUser } from 'react-icons/fa';
import { RiAdminFill } from "react-icons/ri";

const Header = () => {
  const { user } = useAuth();
  const [status, setStatus] = useState('Disconnected');
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef(null);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchStatus = async () => {
        if (user && user.id) {
            const currentStatus = await getStatus(user.id);
            setStatus(currentStatus);
        }
    };

    fetchStatus();
  }, []);

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.header layout
      className="fixed top-0 left-0 sm:left-36 lg:left-64 md:left-48 right-0 z-[40] bg-foreground text-secondary flex justify-between items-center py-4 px-6 shadow-lg border-secondary/30"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center space-x-2 sm:space-x-4">
        {user?.role === 'ADMIN' ? (
          <motion.div
            className="hidden md:block text-3xl cursor-pointer transition-transform"
            whileHover={{ scale: 1.1 }}
          >
            <RiAdminFill />
          </motion.div>
        ) : (
          <motion.div
            className="hidden md:block text-3xl cursor-pointer transition-transform hover:scale-110"
            whileHover={{ scale: 1.1 }}
          >
            <FaRegUser />
          </motion.div>
        )}
        <p className="pl-2 sm:pl-0 text-base sm:text-lg font-medium">{user?.username || "Guest"}</p>
      </div>
      
      <div className="flex items-center space-x-2 sm:space-x-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
        >
          <Button 
            variant="secondary" className="rounded-lg px-1 sm:px-4 shadow-md transition-all hover:shadow-lg text-bold text-foreground hover:bg-tertiary hover:text-secondary"
            onClick={() => user.role === 'ADMIN' ? Navigate('/manageProject') : Navigate('/projects')}
          >
          {user?.role === 'ADMIN' ? 'Manage Projects' : 'Quick Start'}
          </Button>
        </motion.div>
        <Badge status={status} className="text-sm font-semibold" />
        <div className="relative" ref={notifRef}>
          <motion.div
            className="text-xl sm:text-3xl cursor-pointer transition-transform hover:scale-110"
            whileHover={{ scale: 1.1 }}
            onClick={() => setShowNotifications((prev) => !prev)}
          >
            <FaRegBell />
          </motion.div>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.18 }}
                className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-white/10">
                  <span className="font-semibold text-gray-800 dark:text-white text-sm">Notifications</span>
                  <span className="text-xs text-gray-400">0 new</span>
                </div>
                <div className="flex flex-col items-center justify-center py-10 text-gray-400 dark:text-gray-500 gap-2">
                  <FaRegBell className="text-3xl opacity-30" />
                  <p className="text-sm">No notifications yet</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;