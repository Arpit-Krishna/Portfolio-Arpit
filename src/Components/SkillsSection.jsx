import React from "react";
import SkillsCard from "./SkillsCard";

const skills = [
  { title: "ReactJs", value: 75 },  
  { title: "NextJs", value: 50 },
  { title: "Tailwind css", value: 80 },
  { title: "NodeJs", value: 40 },
  { title: "ExpressJs", value: 40 },
  { title: "FastAPI", value: 70 },
  { title: "Django", value: 70 },
  { title: "Python", value: 70 },
  { title: "My-SQL", value: 70 },
  { title: "MongoDB", value: 35 }
]

const SkillsSection = () => {
  return (
    <div data-aos="fade-right" className="mb-20 lg:mb-36">
      <h1 className="text-5xl lg:text-7xl gradient-text mb-10">My Skills</h1>
      <div className="h-[300px] overflow-y-scroll select-none scroll-bar">
        {skills.map((skill, index) => (
          <SkillsCard key={index} title={skill.title} value={skill.value} />
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
