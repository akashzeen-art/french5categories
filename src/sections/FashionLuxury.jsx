import { Link } from "react-router-dom";
import { Shirt, ArrowUpRight, Heart, Eye } from "lucide-react";
import { handleHoverSound, handleClickSound } from "../utils/sound";

export default function FashionLuxury({ videos }) {
  // Extract 3 high-fashion videos for luxury magazine large layouts
  const fashionVideos = videos.filter((v) => v.category === "fashion").slice(0, 3);

  return (
    <section className="py-28 bg-[#FAF9F6] text-[#1A1A1A] relative overflow-hidden select-none">
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Editorial Heading */}
        <div className="flex flex-col items-center text-center mb-24 max-w-2xl mx-auto gap-4">
          <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#C5A880] uppercase">
            <Shirt className="w-3.5 h-3.5" />
            BEAUTÉ & STYLE
          </div>
          <h2 className="font-serif text-5xl md:text-7xl font-extrabold tracking-tight uppercase text-stone-900 leading-none">
            TUTOS BEAUTE
          </h2>
          <div className="w-20 h-[1px] bg-[#C5A880] my-4" />
          <p className="text-xs md:text-sm text-stone-600 font-serif leading-relaxed italic">
            Maquillage, coiffure, soins de la peau et ongles — des tutoriels pour sublimer votre beauté au quotidien.
          </p>
        </div>

        {/* Magazine Editorial Columns (Staggered Layouts) */}
        <div className="flex flex-col gap-32">
          {fashionVideos.map((vid, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={vid.id}
                className={`flex flex-col md:flex-row items-center gap-12 md:gap-20 ${
                  isEven ? "" : "md:flex-row-reverse"
                }`}
              >
                
                {/* Visual Column - Large magazine image */}
                <div className="w-full md:w-3/5 group relative overflow-hidden bg-stone-100 border border-stone-200 p-2">
                  <Link
                    to={`/video/${vid.id}`}
                    onClick={handleClickSound}
                    onMouseEnter={handleHoverSound}
                    className="block relative aspect-[16/10] overflow-hidden cursor-pointer"
                  >
                    <img
                      src={vid.thumbnail}
                      alt={vid.title}
                      className="w-full h-full object-cover grayscale transition-all duration-[1.2s] ease-out group-hover:scale-105 group-hover:grayscale-0"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                    
                    {/* Top Right Arrow */}
                    <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md text-[#1A1A1A] flex items-center justify-center shadow-lg transform translate-x-12 translate-y-12 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </Link>
                </div>

                {/* Text Description Column */}
                <div className="w-full md:w-2/5 flex flex-col gap-6 text-left">
                  <div className="flex items-center justify-between text-[10px] font-black tracking-widest text-[#C5A880] uppercase">
                    <span>{vid.creator}</span>
                    <span>{vid.duration}</span>
                  </div>

                  <h3 className="font-serif text-3xl md:text-4xl font-extrabold text-stone-900 leading-tight uppercase hover:text-[#C5A880] transition-colors duration-300">
                    <Link to={`/video/${vid.id}`} onClick={handleClickSound}>
                      {vid.title}
                    </Link>
                  </h3>

                  <p className="text-sm text-stone-600 font-medium leading-relaxed font-sans">
                    {vid.description}
                  </p>

                  <div className="flex items-center gap-6 text-[10px] font-bold text-stone-500 border-t border-stone-200 pt-6 mt-2 font-sans uppercase">
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      {vid.views}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/10" />
                      {vid.likes} Likes
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="mt-28 text-center">
          <Link
            to="/fashion"
            onClick={handleClickSound}
            onMouseEnter={handleHoverSound}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-stone-900 hover:bg-stone-900 hover:text-white text-stone-900 text-xs font-bold tracking-widest uppercase transition-all duration-300 font-sans cursor-pointer"
          >
            VOIR TOUS LES TUTOS →
          </Link>
        </div>
      </div>
    </section>
  );
}
