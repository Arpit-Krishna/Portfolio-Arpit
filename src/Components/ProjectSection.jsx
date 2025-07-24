import React from "react";
import ProjectCard from "./ProjectCard";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";
import { useRef } from "react";

const projects = [
  {
    title: "Hal-Jivi", 
    description: "Hal-Jivi is a distributed supply chain management platform focused on crop Minimum Support Price (MSP) transparency and secure logistics for farmers and stakeholders.",
    image: "https://i.ibb.co/XkkL52Sp/Screenshot-2025-07-24-172302.png",
    github: "https://github.com/Arpit-Krishna/Hal-Jivi",
    liveLink: "https://github.com/Arpit-Krishna/Hal-Jivi"
  },
  {
    title: "Medium-Clone", 
    description: "A Medium-like blogging app with a Hono + Cloudflare Workers serverless backend, using PostgreSQL with Prisma for data management and JWT auth for secure APIs.",
    image: "https://i.ibb.co/hFFgCh0v/medium.png",
    github: "https://github.com/Arpit-Krishna/Medium-Serverless_frontend",
    liveLink: "https://medium-clone-arpit-krishnas-projects.vercel.app/"
  },
  {
    title: "Habot Learning Service Provider", 
    description: "A React module for browsing, filtering, and viewing learning providers, with responsive UI, dynamic routing, and simulated API integration, built for Habot Connect DMCC.",
    image: "https://i.ibb.co/sJthBHNn/habot.png",
    github: "https://github.com/Arpit-Krishna/Habot-Learning-Support-Provider",
    liveLink: "https://habot-learning-support-provider.vercel.app/"
  },
  {
    title: "ClimaTikka", 
    description: "🌦️ ClimaTikka is a Django-based web app that uses APIs to provide real-time weather forecasting with location-based accuracy.",
    image: "https://media.geeksforgeeks.org/wp-content/uploads/20240125180753/Screenshot-2024-01-25-125829.jpg",
    github: "https://github.com/Arpit-Krishna/ClimaTikka/tree/main/WeathApp",
    liveLink: "https://github.com/Arpit-Krishna/ClimaTikka/tree/main/WeathApp"
  },
  {
    title: "URL Shortener", 
    description: "A lightweight URL shortener with CRUD for shortened links, built with Node.js and Express, fully Docker containerized for easy deployment, and includes a dummy React frontend to test API endpoints seamlessly.",
    image: "https://i.ibb.co/Lhb8PJTw/Screenshot-2025-07-24-180209.png",
    github: "https://github.com/Arpit-Krishna/mini-url-shortener",
    liveLink: "https://github.com/Arpit-Krishna/mini-url-shortener"
  },
]

const ProjectSection = () => {
  const scrollRef = useRef(null);

  const hScrollRight = () => {
    scrollRef.current.scrollLeft += 500;
  };

  const hScrollLeft = () => {
    scrollRef.current.scrollLeft -= 500;
  };
  return (
    <div data-aos="fade-down" className="mb-20 lg:mb-36">
      <h1 className="text-5xl lg:text-7xl gradient-text mb-10">My Projects</h1>
      <div
        ref={scrollRef}
        className="flex overflow-x-scroll gap-8 lg:p-3 scroll-hide"
      >
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
      <div className="flex justify-center items-center gap-3 mt-2 select-none">
        <HiArrowSmLeft
          onClick={hScrollLeft}
          className="text-xl lg:text-2xl cursor-pointer text-yellow-500 hidden lg:block"
        />
        <h2 className="gradient-text font-mono text-lg uppercase">
          Slide for more
        </h2>
        <HiArrowSmRight
          onClick={hScrollRight}
          className="text-xl lg:text-2xl cursor-pointer text-yellow-500 hidden lg:block"
        />
      </div>
    </div>
  );
};

export default ProjectSection;
