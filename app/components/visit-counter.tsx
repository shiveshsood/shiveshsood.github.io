"use client";

import { useEffect, useState } from "react";

const NAMESPACE = "shiveshsood";
const KEY = "home";
const STORAGE_KEY = "ss-visited";

export function VisitCounter() {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    const hasVisited = sessionStorage.getItem(STORAGE_KEY);
    const action = hasVisited ? "get" : "hit";
    const url = `https://abacus.jasoncameron.dev/${action}/${NAMESPACE}/${KEY}`;

    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        if (data.value != null) {
          setCount(data.value);
          sessionStorage.setItem(STORAGE_KEY, "1");
        }
      })
      .catch(() => {});
  }, []);

  if (count === null) return null;

  const eyeballs = (count * 2).toLocaleString();

  return (
    <span className="tabular-nums select-none text-neutral-400">
      {eyeballs} eyeballs have seen this site
    </span>
  );
}
