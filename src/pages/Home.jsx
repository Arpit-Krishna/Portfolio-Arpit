import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import About from "../components/About";
import SkillsCloud from "../components/SkillsCloud";
import ProjectGrid from "../components/ProjectGrid";
import OpenSource from "../components/OpenSource";
import ExperienceTimeline from "../components/ExperienceTimeline";
import ContactCTA from "../components/ContactCTA";
import usePageMeta from "../hooks/usePageMeta";

export default function Home() {
  usePageMeta();
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <SkillsCloud />
      <ProjectGrid />
      <OpenSource />
      <ExperienceTimeline />
      <ContactCTA />
    </>
  );
}
