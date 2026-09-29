import { useEffect } from "react";

const DEFAULT_TITLE = "Arpit Krishna | Backend and Full-Stack Developer Portfolio";

// Sets the document title and meta description for client-side routes.
export default function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | Arpit Krishna` : DEFAULT_TITLE;
    const tag = document.querySelector('meta[name="description"]');
    const previous = tag?.getAttribute("content");
    if (tag && description) tag.setAttribute("content", description);
    return () => {
      if (tag && previous) tag.setAttribute("content", previous);
    };
  }, [title, description]);
}
