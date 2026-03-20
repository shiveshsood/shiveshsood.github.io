"use client";

import { useEffect, useState } from "react";

const NAMESPACE = "shiveshsood";
const KEY = "home";
const STORAGE_KEY = "ss-visited";

export function VisitCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [geo, setGeo] = useState<{ region: string; country: string } | null>(
    null
  );

  useEffect(() => {
    // Fetch visit count from abacus
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

    // Fetch visitor geo from ipinfo.io (free, HTTPS, CORS-enabled)
    fetch("https://ipinfo.io/json")
      .then((r) => r.json())
      .then((data) => {
        if (data.region && data.country) {
          const countryName =
            new Intl.DisplayNames(["en"], { type: "region" }).of(
              data.country
            ) ?? data.country;
          setGeo({ region: data.region, country: countryName });
        }
      })
      .catch(() => {});
  }, []);

  if (count === null) return null;

  const eyeballs = (count * 2).toLocaleString();

  return (
    <span className="tabular-nums select-none text-neutral-400">
      <span>{eyeballs} eyeballs have seen this site</span>
      {geo && (
        <span className="block">
          Latest pair from {geo.region}, {geo.country}
        </span>
      )}
    </span>
  );
}
