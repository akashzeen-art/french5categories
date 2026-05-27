import { Link } from "react-router-dom";
import { ChefHat, Play, Flame } from "lucide-react";
import { handleHoverSound, handleClickSound } from "../utils/sound";

export default function CookingShowcase({ videos }) {
  const cookingVideos = videos.filter((v) => v.category === "cooking").slice(0, 6);

  return (
    <section className="py-24 bg-[#FFF8EE] text-[#1C140A] relative overflow-hidden select-none">

      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-orange-200/40 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-200/40 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#FF4500] uppercase">
              <ChefHat className="w-4 h-4" />
              RECETTES DU MONDE
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-extrabold text-[#2C1D0F] tracking-tight leading-none uppercase">
              CUISINE MAISON
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#4E3D30] font-medium leading-relaxed">
            Burgers, tagines, lasagnes, kebabs et currys — des recettes du monde entier préparées avec passion et saveur.
          </p>
        </div>

        {/* Grid: 1 featured large + 5 small */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {/* Featured card — spans 2 cols & 2 rows */}
          {cookingVideos[0] && (
            <div className="col-span-2 row-span-2 group">
              <Link
                to={`/video/${cookingVideos[0].id}`}
                onClick={handleClickSound}
                onMouseEnter={handleHoverSound}
                className="block relative rounded-2xl overflow-hidden shadow-xl border border-[#F0E5D8] cursor-pointer h-full"
              >
                <img
                  src={cookingVideos[0].thumbnail}
                  alt={cookingVideos[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ minHeight: "320px" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Play */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div className="w-16 h-16 rounded-full bg-[#FF4500] flex items-center justify-center shadow-xl">
                    <Play className="w-6 h-6 fill-white text-white ml-1" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 z-10">
                  <span className="inline-flex items-center gap-1 text-[9px] font-black tracking-widest text-[#FF4500] bg-white px-3 py-1 rounded-full uppercase mb-2">
                    <Flame className="w-3 h-3" /> POPULAIRE
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl font-extrabold text-white uppercase line-clamp-2 leading-snug">
                    {cookingVideos[0].title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">{cookingVideos[0].description}</p>
                </div>
              </Link>
            </div>
          )}

          {/* Small cards */}
          {cookingVideos.slice(1, 5).map((vid) => (
            <div key={vid.id} className="group">
              <Link
                to={`/video/${vid.id}`}
                onClick={handleClickSound}
                onMouseEnter={handleHoverSound}
                className="block relative rounded-xl overflow-hidden border border-[#F0E5D8] shadow-md cursor-pointer bg-white"
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 rounded-full bg-[#FF4500] flex items-center justify-center shadow-lg">
                      <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-serif font-extrabold text-xs text-[#2C1D0F] line-clamp-1 uppercase group-hover:text-[#FF4500] transition-colors">
                    {vid.title}
                  </h3>
                  <p className="text-[10px] text-[#6C5B4C] mt-1 line-clamp-2">{vid.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/cooking"
            onClick={handleClickSound}
            onMouseEnter={handleHoverSound}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#2C1D0F] hover:bg-[#FF4500] text-white text-xs font-bold tracking-widest uppercase hover:scale-105 transition-all duration-300 shadow-md"
          >
            ENTRER DANS LA CUISINE →
          </Link>
        </div>
      </div>
    </section>
  );
}
