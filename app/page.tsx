'use client'

import { useGeoStore } from "./store/geo";

import FileUpload from "./components/FileUpload";
import GeoVisualizer from "./components/GeoVisualizer";

export default function Home() {
  const { data } = useGeoStore();

  return (
    <main>
      {data ? <GeoVisualizer /> : <FileUpload />}
    </main>
  );
}
