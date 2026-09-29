import { GithubLogo, LinkedinLogo, EnvelopeSimple } from "@phosphor-icons/react";
import { SiLeetcode } from "react-icons/si";

export default function SocialIcon({ id, size = 18 }) {
  switch (id) {
    case "github":
      return <GithubLogo size={size} weight="regular" aria-hidden="true" />;
    case "linkedin":
      return <LinkedinLogo size={size} weight="regular" aria-hidden="true" />;
    case "leetcode":
      return <SiLeetcode size={size - 2} aria-hidden="true" />;
    default:
      return <EnvelopeSimple size={size} weight="regular" aria-hidden="true" />;
  }
}
