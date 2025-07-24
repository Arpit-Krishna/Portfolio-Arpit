import React from "react";
import { AiFillInstagram, AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { SiLeetcode } from "react-icons/si";
const ContactSection = () => {
  return (
    <div
      data-aos="fade-left"
      className="flex flex-col lg:flex-row lg:items-center mb-20 lg:mb-36 "
    >
      <span className="uppercase text-3xl lg:text-2xl font-bold gradient-text mb-8 lg:mb-0 rotate-0 lg:-rotate-90">
        Get Started!
      </span>
      <div className="flex flex-col lg:flex-row lg:ml-20 lg:gap-36">
        <div className="mb-5 lg:mb-0">
          <h1 className="text-5xl lg:text-7xl gradient-text mb-5 lg:mb-10">
            Contact me
          </h1>
          <div className="flex flex-col gap-2">
            <a
              href="mailto:krishnaarpit930@gmail.com"
              className="text-white font-mono underline text-lg lg:text-2xl"
            >
              krishnaarpit930@gmail.com
            </a>
            <a
              href="tel:+918707830860"
              className="text-white font-mono underline text-lg lg:text-2xl"
            >
              +91 87078 30860
            </a>
          </div>
          <div className='flex gap-2 mt-2'>
              <a href="https://github.com/Arpit-Krishna" target="_blank" rel="noopener noreferrer" className='text-3xl text-white hover:text-purple-600 transition-all duration-300 ease-in-out'>
                  <AiFillGithub />
              </a>
              <a href="https://www.linkedin.com/in/arpit-krishna-028107209/" target="_blank" rel="noopener noreferrer" className='text-3xl text-white hover:text-blue-600 transition-all duration-300 ease-in-out'>
                  <AiFillLinkedin />
              </a>
              {/* <a href="https://www.instagram.com/arpitkrishna_/" target="_blank" rel="noopener noreferrer" className='text-3xl text-pink-500 hover:text-purple-600 transition-all duration-300 ease-in-out'>
                  <AiFillInstagram />
              </a> */}
              <a href="https://leetcode.com/ArpitKrishna98/" target="_blank" rel="noopener noreferrer" className='text-3xl text-white hover:text-yellow-500 transition-all duration-300 ease-in-out'>
                  <SiLeetcode />
              </a>
          </div>
          <h2 className="text-2xl font-bold font-mono text-white text-center">
            OR
          </h2>
        </div>
        <div>
          <form 
          action="https://formspree.io/f/xpwldayp"
          method="POST"
          className="flex flex-col p-3">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              className="bg-transparent p-3 outline-none border focus:border-purple-500 focus:pl-8 transition-all duration-100 rounded-lg border-white gradient-text font-mon text-lg lg:text-2xl  mb-5 lg:mb-10 w-full lg:w-[30vw]"
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="bg-transparent p-3 outline-none border focus:border-purple-500 focus:pl-8 transition-all duration-100 rounded-lg border-white gradient-text font-mon text-lg lg:text-2xl  mb-5 lg:mb-10 w-full lg:w-[30vw]"
            />
            <textarea
              name="message"
              id="message"
              rows="3"
              className="bg-transparent p-3 outline-none border focus:border-purple-500 focus:pl-8 transition-all duration-100 rounded-lg border-white gradient-text font-mon text-lg lg:text-2xl  mb-5 lg:mb-10 w-full lg:w-[30vw]"
              placeholder="Enter your message"
            />
            <button
              type="submit"
              className="px-3 py-2 text-lg lg:text-2xl bg-purple-500 hover:bg-purple-600 border font-bold text-white rounded-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
