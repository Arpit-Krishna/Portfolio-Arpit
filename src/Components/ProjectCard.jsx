import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { RiSignalTowerFill } from "react-icons/ri";

const ProjectCard = ({ project }) => {
  return (
    <div className="p-4 -m-4">
      <div className="h-[480px] md:h-[500px] w-[300px] md:w-[320px] border-2 border-gray-200 border-opacity-60 rounded-2xl overflow-clip lg:overflow-hidden hover:shadow-md lg:hover:scale-105 transition-all backdrop-blur-3xl shadow-xl">
        <a href={project.liveLink || "#"}>
          <img
            src={project.image}
            alt="project-img"
            className="lg:h-48 h-[200px] w-full object-cover object-center"
          />
        </a>
        <div className="p-4 flex flex-col lg:gap-3">
          <h2 className="tracking-widest text-2xl text-white">
            {project.title}
          </h2>
          <h1 className="text-lg lg:text-xl font-bold text-gray-400">
            {project.description}
          </h1>
          <div className="flex items-center justify-between">
            <a href={project.github || "#"}>
              <AiFillGithub className="text-pink-500 font-bold inline-flex items-center text-lg md:text-xl md:mb-2 lg:mb-0 hover:text-purple-600 cursor-pointer" />
            </a>
            <a href={project.liveLink || "#"}>
              <RiSignalTowerFill className="text-pink-500 font-bold inline-flex items-center text-lg md:text-xl md:mb-2 lg:mb-0 hover:text-purple-600 cursor-pointer" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
