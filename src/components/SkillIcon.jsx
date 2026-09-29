import {
  SiGo, SiOpenjdk, SiPython, SiCplusplus, SiC, SiJavascript, SiGin, SiSpringboot, SiSpringsecurity,
  SiFastapi, SiDjango, SiNodedotjs, SiExpress, SiHono, SiApachekafka, SiJsonwebtokens, SiJunit5,
  SiApachemaven, SiReact, SiTailwindcss, SiVite, SiChartdotjs, SiHtml5, SiCss, SiPwa, SiPostgresql,
  SiMysql, SiMongodb, SiRedis, SiPrisma, SiDocker, SiLinux,
  SiGithubactions, SiVercel, SiCloudflareworkers, SiPandas, SiNumpy, SiScikitlearn, SiOpencv,
} from "react-icons/si";
import { Cloud, Database } from "@phosphor-icons/react";

const icons = {
  go: SiGo, java: SiOpenjdk, python: SiPython, cpp: SiCplusplus, c: SiC, javascript: SiJavascript,
  gin: SiGin, springboot: SiSpringboot, springsecurity: SiSpringsecurity, fastapi: SiFastapi,
  django: SiDjango, node: SiNodedotjs, express: SiExpress, hono: SiHono, kafka: SiApachekafka,
  jwt: SiJsonwebtokens, junit: SiJunit5, maven: SiApachemaven, react: SiReact, tailwind: SiTailwindcss,
  vite: SiVite, chartjs: SiChartdotjs, html: SiHtml5, css: SiCss, pwa: SiPwa, postgres: SiPostgresql,
  mysql: SiMysql, mongodb: SiMongodb, documentdb: Database, redis: SiRedis, prisma: SiPrisma,
  aws: Cloud, docker: SiDocker, linux: SiLinux, githubactions: SiGithubactions, vercel: SiVercel,
  cloudflare: SiCloudflareworkers, pandas: SiPandas, numpy: SiNumpy, sklearn: SiScikitlearn, opencv: SiOpencv,
};

export default function SkillIcon({ name, size = 22 }) {
  const Icon = icons[name];
  if (!Icon) return <Database size={size} aria-hidden="true" />;
  return <Icon size={size} aria-hidden="true" />;
}
