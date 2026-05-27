import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Play, Flame, Heart, Eye } from "lucide-react";
import { handleHoverSound, handleClickSound } from "../utils/sound";
import { shuffleArray } from "../utils/shuffle";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function TrendingSlider({ videos }) {
  const trendingVideos = useMemo(
    () => shuffleArray(videos).slice(0, 10),
    [videos]
  );

  return (
    <section className="py-24 bg-[#050409] relative overflow-hidden select-none">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-fuchsia-600/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-cyan-600/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-black tracking-widest text-lime-400 uppercase">
              <Flame className="w-4 h-4 text-lime-400 fill-lime-400/25" />
              LES PLUS POPULAIRES
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
              TENDANCES DU MOMENT
            </h2>
          </div>
          <Link
            to="/categories"
            onClick={handleClickSound}
            onMouseEnter={handleHoverSound}
            className="text-xs font-bold text-slate-400 hover:text-white border-b border-white/10 hover:border-white pb-1 transition-all duration-300"
          >
            VOIR TOUTES LES CATÉGORIES
          </Link>
        </div>

        {/* Swiper Slider Wrapper */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={true}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 28 },
              1440: { slidesPerView: 4, spaceBetween: 32 },
            }}
            className="trending-swiper !pb-14"
          >
            {trendingVideos.map((vid) => (
              <SwiperSlide key={vid.id}>
                <Link
                  to={`/video/${vid.id}`}
                  onClick={handleClickSound}
                  onMouseEnter={handleHoverSound}
                  className="block relative rounded-2xl overflow-hidden glass-card group cursor-pointer"
                >
                  
                  {/* Image Container with Hover Zoom */}
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={vid.thumbnail}
                      alt={vid.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 pointer-events-none"
                      loading="lazy"
                    />

                    {/* Dark gradient card overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10 z-10 transition-opacity duration-300" />
                    
                    {/* Category tag */}
                    <span className="absolute top-4 left-4 z-20 text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full bg-black/60 border border-white/10 text-white backdrop-blur-md">
                      {vid.category === "cooking" ? "CUISINE" : vid.category === "comedy" ? "COMÉDIE" : vid.category === "cartoon" ? "DESSIN ANIMÉ" : vid.category === "games" ? "JEUX" : "MODE"}
                    </span>

                    {/* Duration badge */}
                    <span className="absolute bottom-4 right-4 z-20 text-[9px] font-bold font-mono tracking-wide px-2 py-0.5 rounded bg-black/75 text-slate-300">
                      {vid.duration}
                    </span>

                    {/* Play button hover reveal */}
                    <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
                      <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transition-transform duration-300 hover:scale-105 active:scale-95">
                        <Play className="w-5 h-5 fill-black ml-1" />
                      </div>
                    </div>
                  </div>

                  {/* Card Description/Details */}
                  <div className="p-5.5 relative z-10 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold uppercase">
                      <span>{vid.creator}</span>
                    </div>

                    <h3 className="font-display font-extrabold text-sm text-slate-100 group-hover:text-white line-clamp-1 transition-colors duration-300 uppercase">
                      {vid.title}
                    </h3>

                    {/* Interactive stats row */}
                    <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 border-t border-white/5 pt-3.5 mt-1.5">
                      <span className="flex items-center gap-1.5 hover:text-white transition-colors">
                        <Eye className="w-3.5 h-3.5" />
                        {vid.views}
                      </span>
                      <span className="flex items-center gap-1.5 hover:text-white transition-colors">
                        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/10" />
                        {vid.likes}
                      </span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
