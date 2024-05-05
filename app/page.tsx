'use client'
import dynamic from 'next/dynamic';

import { useGeoStore } from "./store/geo";
import FileUpload from "./components/FileUpload";

const GeoVisualizer = dynamic(() => import('./components/GeoVisualizer'), {
  ssr: false,
});

export default function Home() {
  const { data } = useGeoStore();

  return (
    <main>
      {data ? <GeoVisualizer /> : <FileUpload />}
    </main>
  );
}
