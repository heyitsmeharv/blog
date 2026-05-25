import { useEffect, useState } from "react";

const LIKES_KEY = "portfolio_likes";
export const endpoint = import.meta.env.VITE_LIKES_ENDPOINT;

export function useLikeCount(postId) {
  const [count, setCount] = useState(null);
  useEffect(() => {
    if (!postId || !endpoint) return;
    fetch(`${endpoint}?postId=${encodeURIComponent(postId)}`)
      .then((r) => r.json())
      .then((data) => setCount(data.count ?? 0))
      .catch(() => setCount(0));
  }, [postId]);
  return count;
}

function getStoredLikes() {
  try {
    return JSON.parse(localStorage.getItem(LIKES_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function setStoredLike(postId, value) {
  const stored = getStoredLikes();
  if (value) {
    stored[postId] = true;
  } else {
    delete stored[postId];
  }
  localStorage.setItem(LIKES_KEY, JSON.stringify(stored));
}

export function useLikes(postId, visitorId) {
  const [liked, setLiked] = useState(() => !!getStoredLikes()[postId]);
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!postId || !endpoint) return;
    fetch(`${endpoint}?postId=${encodeURIComponent(postId)}`)
      .then((r) => r.json())
      .then((data) => setCount(data.count ?? 0))
      .catch(() => setCount(0));
  }, [postId]);

  const handleLike = async () => {
    if (liked || loading || !visitorId || !endpoint) return;
    setLoading(true);
    setLiked(true);
    setCount((c) => (c ?? 0) + 1);
    setStoredLike(postId, true);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, visitorId }),
      });
      if (!res.ok && res.status !== 409) throw new Error("failed");
    } catch {
      setLiked(false);
      setCount((c) => Math.max(0, (c ?? 1) - 1));
      setStoredLike(postId, false);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlike = async () => {
    if (!liked || loading || !visitorId || !endpoint) return;
    setLoading(true);
    setLiked(false);
    setCount((c) => Math.max(0, (c ?? 1) - 1));
    setStoredLike(postId, false);
    try {
      const res = await fetch(endpoint, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, visitorId }),
      });
      if (!res.ok) throw new Error("failed");
    } catch {
      setLiked(true);
      setCount((c) => (c ?? 0) + 1);
      setStoredLike(postId, true);
    } finally {
      setLoading(false);
    }
  };

  return { count, liked, loading, handleLike, handleUnlike };
}
