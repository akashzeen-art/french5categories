import { useState } from "react";
import Hero from "../sections/Hero";
import TrendingSlider from "../sections/TrendingSlider";
import CookingShowcase from "../sections/CookingShowcase";
import ComedyFun from "../sections/ComedyFun";
import CartoonUniverse from "../sections/CartoonUniverse";
import GamesCyberpunk from "../sections/GamesCyberpunk";
import FashionLuxury from "../sections/FashionLuxury";
import { getVideos } from "../data/videos";
import { shuffleArray, shuffleVideos } from "../utils/shuffle";

const HOME_SECTIONS = [
  { id: "trending", Component: TrendingSlider },
  { id: "cooking", Component: CookingShowcase },
  { id: "comedy", Component: ComedyFun },
  { id: "cartoon", Component: CartoonUniverse },
  { id: "games", Component: GamesCyberpunk },
  { id: "fashion", Component: FashionLuxury },
];

export default function Home() {
  const [videos] = useState(() => shuffleVideos(getVideos()));
  const [sections] = useState(() => shuffleArray(HOME_SECTIONS));

  if (videos.length === 0) return null;

  return (
    <div className="relative bg-background overflow-hidden min-h-screen">
      <Hero />

      {sections.map(({ id, Component }) => (
        <Component key={id} videos={videos} />
      ))}
    </div>
  );
}
