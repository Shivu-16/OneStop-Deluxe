import React, { useContext, useState } from "react";
import { FaRegUser, FaPencilAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Context } from "../../main";
import styles from "../styles";
import EarthCanvas from "../utils/Earth";
import StarsCanvas from "../utils/Stars";
import { baseUrl } from "../../../Urls";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/v1/user/register`,
        { name, phone, email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <section
      className={`${styles.paddings} relative z-10 bg-primary-black overflow-x-hidden`}
    >
      <StarsCanvas />
      <motion.div
        initial="hidden"
        animate="show"
        className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8`}
      >
        <motion.div
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 50 }}
          className="flex-[0.75] flex justify-center flex-col bg-transparent p-8 border-[1px] border-gray-400 rounded-lg shadow-2xl backdrop-blur-lg"
        >
          <div className="absolute w-[90%] inset-0 gradient-04" />

          <div className="header mb-4 text-center">
            <img src="/JobZeelogo.png" alt="logo" className="mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white">
              Create a new account
            </h3>
          </div>
          <form>
            <div className={`${styles.flexCenter} flex-row mb-4`}>
              <div
                className={`${styles.flexCenter} w-[70px] h-[70px] rounded-[24px] bg-[#323F5D]`}
              >
                <FaRegUser className="text-white text-[20px]" />
              </div>
              <div className="flex-1 ml-[30px]">
                <label className="block mb-2 text-white">Register As</label>
                <div className="relative">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full p-2 border border-gray-600 bg-transparent rounded-md text-white"
                  >
                    <option value="" className="text-zinc-900">
                      Select Role
                    </option>
                    <option value="Employer" className="text-zinc-900">
                      Employer
                    </option>
                    <option value="Job Seeker" className="text-zinc-900">
                      Job Seeker
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div className={`${styles.flexCenter} flex-row mb-4`}>
              <div
                className={`${styles.flexCenter} w-[70px] h-[70px] rounded-[24px] bg-[#323F5D]`}
              >
                <FaPencilAlt className="text-white text-[20px]" />
              </div>
              <div className="flex-1 ml-[30px]">
                <label className="block mb-2 text-white">Name</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Zeeshan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border border-gray-600 bg-transparent rounded-md text-white"
                  />
                </div>
              </div>
            </div>
            <div className={`${styles.flexCenter} flex-row mb-4`}>
              <div
                className={`${styles.flexCenter} w-[70px] h-[70px] rounded-[24px] bg-[#323F5D]`}
              >
                <MdOutlineMailOutline className="text-white text-[20px]" />
              </div>
              <div className="flex-1 ml-[30px]">
                <label className="block mb-2 text-white">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="zk@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border border-gray-600 bg-transparent rounded-md text-white"
                  />
                </div>
              </div>
            </div>
            <div className={`${styles.flexCenter} flex-row mb-4`}>
              <div
                className={`${styles.flexCenter} w-[70px] h-[70px] rounded-[24px] bg-[#323F5D]`}
              >
                <FaPhoneFlip className="text-white text-[20px]" />
              </div>
              <div className="flex-1 ml-[30px]">
                <label className="block mb-2 text-white">Phone Number</label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="12345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2 border border-gray-600 bg-transparent rounded-md text-white"
                  />
                </div>
              </div>
            </div>
            <div className={`${styles.flexCenter} flex-row mb-4`}>
              <div
                className={`${styles.flexCenter} w-[70px] h-[70px] rounded-[24px] bg-[#323F5D]`}
              >
                <RiLock2Fill className="text-white text-[20px]" />
              </div>
              <div className="flex-1 ml-[30px]">
                <label className="block mb-2 text-white">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border border-gray-600 bg-transparent rounded-md text-white"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              onClick={handleRegister}
              className="w-full bg-[#a509ff] text-white py-2 rounded-md hover:bg-[#2d4898bf]"
            >
              Register
            </button>
            <Link
              to={"/login"}
              className="block mt-4 text-center text-blue-500 hover:underline"
            >
              Login Now
            </Link>
          </form>
        </motion.div>
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 50, duration: 1 }}
          className={`flex-1 ${styles.flexCenter} overflow-hidden`}
        >
          <EarthCanvas direction="left" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Register;
