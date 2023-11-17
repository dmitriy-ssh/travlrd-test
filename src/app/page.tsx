"use server";

import { GdpInfo } from "@/components/views/GdpInfo";
import { parseWikipediaGdpPage } from "@/utils/parseWikipediaGdpPage";
import { Suspense } from "react";

const WIKIPEDIA_URL =
  "https://en.wikipedia.org/wiki/List_of_countries_by_GDP_(nominal)";

async function getData() {
  const res = await fetch(WIKIPEDIA_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch data from wikipedia");
  }

  const text = await res.text();

  return parseWikipediaGdpPage(text);
}

export default async function Home() {
  const gdpData = await getData();

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <GdpInfo gdpData={gdpData} />
      </Suspense>
    </>
  );
}
