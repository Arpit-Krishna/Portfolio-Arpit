import { memo } from "react";

const words = [
  "Go", "Idempotent webhooks", "Spring Boot", "Circuit breakers", "FastAPI", "Kafka", "PostgreSQL",
  "Valkey", "React", "Docker", "HMAC signing", "Cloudflare Workers", "Design docs", "Staged rollouts",
];

// Infinite ticker. The list is duplicated so the -50% translate loops seamlessly.
function Marquee() {
  const row = [...words, ...words];
  return (
    <div
      className="relative overflow-hidden border-y border-white/[0.06] py-5 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee gap-10 motion-reduce:animate-none">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10 font-mono text-sm text-zinc-500">
            {w}
            <span className="h-1 w-1 rounded-full bg-accent/60" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default memo(Marquee);
