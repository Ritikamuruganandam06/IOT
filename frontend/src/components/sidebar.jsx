import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHome,
  FaProjectDiagram,
  FaMapMarkerAlt,
  FaBook,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUsersCog,
} from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

const sidebarVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
};

const linkVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  hover: { scale: 1.05 },
};

const Sidebar = () => {
  const { logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSideBar = () => {
    if (window.innerWidth <= 640) {
      setIsOpen(!isOpen);
    }
  };

  const role = user?.role?.toLowerCase(); // 🔥 CASE SAFE

  return (
    <>
      {/* Mobile Toggle */}
      <div className="sm:hidden h-screen fixed top-6 left-2 z-[60]">
        {isOpen ? (
          <FaTimes
            className="text-2xl cursor-pointer text-white"
            onClick={toggleSideBar}
          />
        ) : (
          <FaBars
            className="text-2xl cursor-pointer text-white"
            onClick={toggleSideBar}
          />
        )}
      </div>

      <div className="min-h-screen bg-foreground text-secondary z-50">
        <motion.div
          layout
          className={`fixed top-0 left-0 pt-10 pb-4 h-screen bg-foreground text-secondary transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } sm:relative sm:translate-x-0 flex flex-col justify-between sm:w-36 lg:w-64 md:w-48`}
          initial="hidden"
          animate="visible"
          variants={sidebarVariants}
        >
          {/* Logo */}
          <motion.div
            variants={linkVariants}
            whileHover="hover"
            onClick={toggleSideBar}
            className="flex items-center justify-center mt-4 space-x-2 mb-4 cursor-pointer"
          >
            <img src="/IOT.svg" alt="logo" className="w-14 h-14 rounded-xl" />
            <p className="font-semibold md:text-xl">IoT Dashboard</p>
          </motion.div>

          {/* Navigation */}
          <nav className="text-center text-xl space-y-2 flex flex-col">
            {/* Home */}
            <motion.div
              variants={linkVariants}
              whileHover="hover"
              onClick={toggleSideBar}
            >
              <Link
                to="/"
                className="pl-4 lg:pl-10 py-3 mx-5 hover:bg-secondary hover:text-primary rounded-xl transition duration-300 flex items-center space-x-2"
              >
                <FaHome />
                <span>Home</span>
              </Link>
            </motion.div>

            {/* USER ROUTES */}
            {role === "user" && (
              <>
                <motion.div
                  variants={linkVariants}
                  whileHover="hover"
                  onClick={toggleSideBar}
                >
                  <Link
                    to="/projects"
                    className="pl-4 lg:pl-10 py-3 mx-5 hover:bg-secondary hover:text-primary rounded-xl transition duration-300 flex items-center space-x-2"
                  >
                    <FaProjectDiagram />
                    <span>Projects</span>
                  </Link>
                </motion.div>

                <motion.div
                  variants={linkVariants}
                  whileHover="hover"
                  onClick={toggleSideBar}
                >
                  <Link
                    to="/liveTracking"
                    className="pl-4 lg:pl-10 py-3 mx-5 hover:bg-secondary hover:text-primary rounded-xl transition duration-300 flex items-center space-x-2"
                  >
                    <FaMapMarkerAlt />
                    <span>Live Tracking</span>
                  </Link>
                </motion.div>

                <motion.div
                  variants={linkVariants}
                  whileHover="hover"
                  onClick={toggleSideBar}
                >
                  <Link
                    to="/tutorial"
                    className="pl-4 lg:pl-10 py-3 mx-5 hover:bg-secondary hover:text-primary rounded-xl transition duration-300 flex items-center space-x-2"
                  >
                    <FaBook />
                    <span>Tutorial</span>
                  </Link>
                </motion.div>
              </>
            )}

            {/* ADMIN ROUTES */}
            {role === "admin" && (
              <>
                <motion.div
                  variants={linkVariants}
                  whileHover="hover"
                  onClick={toggleSideBar}
                >
                  <Link
                    to="/manageProject"
                    className="pl-4 lg:pl-10 py-3 mx-5 hover:bg-secondary hover:text-primary rounded-xl transition duration-300 flex items-center space-x-2"
                  >
                    <FaProjectDiagram />
                    <span>Manage Projects</span>
                  </Link>
                </motion.div>

                <motion.div
                  variants={linkVariants}
                  whileHover="hover"
                  onClick={toggleSideBar}
                >
                  <Link
                    to="/manageUser"
                    className="pl-4 lg:pl-10 py-3 mx-5 hover:bg-secondary hover:text-primary rounded-xl transition duration-300 flex items-center space-x-2"
                  >
                    <FaUsersCog />
                    <span>Manage User</span>
                  </Link>
                </motion.div>

                <motion.div
                  variants={linkVariants}
                  whileHover="hover"
                  onClick={toggleSideBar}
                >
                  <Link
                    to="/allTracking"
                    className="pl-4 lg:pl-10 py-3 mx-5 hover:bg-secondary hover:text-primary rounded-xl transition duration-300 flex items-center space-x-2"
                  >
                    <FaMapMarkerAlt />
                    <span>Live Tracking</span>
                  </Link>
                </motion.div>
              </>
            )}
          </nav>

          {/* Bottom Section */}
          <div className="text-center text-xl mb-14 space-y-2">
            <motion.div
              variants={linkVariants}
              whileHover="hover"
              onClick={toggleSideBar}
            >
              <Link
                to="/profile"
                className="pl-4 lg:pl-10 py-3 mx-5 hover:bg-secondary hover:text-primary rounded-xl transition duration-300 flex items-center space-x-2"
              >
                <FaUser />
                <span>Profile</span>
              </Link>
            </motion.div>

            <motion.div
              variants={linkVariants}
              whileHover="hover"
              onClick={logout}
              className="pl-4 lg:pl-10 py-3 mx-5 hover:bg-secondary hover:text-primary rounded-xl transition duration-300 cursor-pointer flex items-center space-x-2"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Sidebar;
