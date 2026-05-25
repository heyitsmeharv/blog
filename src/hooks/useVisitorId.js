import { useState } from "react";
import { nanoid } from "nanoid";

const STORAGE_KEY = "portfolio_visitor_id";

export function useVisitorId() {
  const [visitorId] = useState(() => {
    let id = localStorage.getItem(STORAGE_KEY);
    if (!id) {
      id = nanoid();
      localStorage.setItem(STORAGE_KEY, id);
    }
    return id;
  });
  return visitorId;
}
