import React from "react";
import myImg from "../assets/self.png";

const HomeCard = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-5 lg:gap-0 justify-between items-center mb-20 lg:mb-36">
      <div data-aos="fade-up-right" className="flex flex-col gap-5 lg:w-[50%]">
        <p className='text-5xl lg:text-7xl mb-10 gradient-text'>Hey! </p>
        <p className = 'text-gray-300 text-xl lg:text-2xl'>I build scalable AI-powered systems that move from prototype to production with precision. </p>
        <p className = 'text-gray-300 text-xl lg:text-2xl'>
            Ranked in the top 5% globally on LeetCode and a 2x GATE qualifier, I engineer solutions that solve real problems. I developed Hal-Jivi, a supply-chain platform enabling farmers to transparently track and understand Minimum Support Price calculations using government data, empowering informed decisions across rural communities. With projects like Sentry-CAM and Medi-Vault, I have deployed ML models in real-world pipelines, ensuring reliability and privacy at scale. Proficient across Web DEV, and ML workflows, I'm ready to ship fullstack code that delivers measurable impact.
        </p>
      </div>
      <div data-aos="fade-up-left">
        <img
          src={myImg}
          alt="Arpit Krishna" className='w-[200px] lg:w-[30vw] aspect-square rounded-full object-cover shadow-lg mx-auto'
        />
      </div>
    </div>
  );
};

export default HomeCard;
