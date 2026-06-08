import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Play, Pause, Volume2, VolumeX, Maximize, Eye, Heart, 
  Share2, ArrowLeft, Sparkles 
} from "lucide-react";
import { getVideos } from "../data/videos";
import { handleHoverSound, handleClickSound } from "../utils/sound";

export default function VideoPlayer() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  const videoRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    // Load video details and related lists
    const all = getVideos();
    const active = all.find((v) => v.id === id);
    if (active) {
      setVideo(active);
      setLikesCount(parseInt(active.likes) || 12);
      const related = all.filter((v) => v.category === active.category && v.id !== active.id).slice(0, 5);
      setRelatedVideos(related);
      setIsPlaying(true);
      setProgress(0);
      setHasLiked(false);
    }
  }, [id]);

  // Video play/pause toggle
  const togglePlay = () => {
    handleClickSound();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Video mute/unmute toggle
  const toggleMute = () => {
    handleClickSound();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // Time progress bar tracking
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const cur = videoRef.current.currentTime;
      const dur = videoRef.current.duration;
      setCurrentTime(cur);
      if (dur) setProgress((cur / dur) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  // Fullscreen trigger
  const toggleFullscreen = () => {
    handleClickSound();
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      }
    }
  };

  // Like video trigger
  const handleLike = () => {
    handleClickSound();
    if (hasLiked) {
      setLikesCount(likesCount - 1);
      setHasLiked(false);
    } else {
      setLikesCount(likesCount + 1);
      setHasLiked(true);
    }
  };

  if (!video) return null;

  return (
    <div className="bg-[#050409] text-white pt-28 pb-24 relative overflow-hidden select-none min-h-screen">
      
      {/* Glow blobs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-cyan-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 flex flex-col lg:grid lg:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN: Large Video Player & Description details (Cols: 8) */}
        <div className="lg:col-span-8 flex flex-col gap-6 text-left">
          
          {/* Back trigger */}
          <Link
            to={`/${video.category}`}
            onClick={handleClickSound}
            onMouseEnter={handleHoverSound}
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors w-fit mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            RETOUR À LA CHAINE {video.category.toUpperCase()}
          </Link>

          {/* CUSTOM IMMERSIVE THEATER MOVIE PLAYER */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-black border border-white/5 shadow-2xl group">
            
            {/* HTML5 video direct stream */}
            <video
              ref={videoRef}
              src={video.videoUrl}
              autoPlay
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onClick={togglePlay}
              className="w-full h-full object-cover cursor-pointer"
            />

            {/* Custom overlays when playing is inactive */}
            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center cursor-pointer transition-opacity duration-300"
              >
                {/* Big pulse Play controller */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-fuchsia-500 text-white flex items-center justify-center shadow-2xl scale-95 hover:scale-100 transition-transform duration-300">
                  <Play className="w-8 h-8 fill-white ml-1.5" />
                </div>
              </div>
            )}

            {/* Controls Bar - Overlay at bottom */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-3">
              
              {/* Progress scrollbar */}
              <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden relative cursor-pointer">
                <div className="h-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400" style={{ width: `${progress}%` }} />
              </div>

              {/* Lower button deck */}
              <div className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-4">
                  <button onClick={togglePlay} className="hover:text-fuchsia-400 transition-colors cursor-pointer">
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>
                  <button onClick={toggleMute} className="hover:text-fuchsia-400 transition-colors cursor-pointer">
                    {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <span className="text-[10px] font-mono text-slate-300">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <button onClick={toggleFullscreen} className="hover:text-fuchsia-400 transition-colors cursor-pointer">
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Details segment */}
          <div className="p-6 rounded-2xl glass-card border border-white/5 flex flex-col gap-4">
            
            <div className="flex justify-between items-center gap-4">
              <span className="text-[9px] font-black tracking-widest text-fuchsia-400 uppercase bg-fuchsia-500/5 border border-fuchsia-500/10 px-3 py-1.5 rounded-full font-display">
                {video.category.toUpperCase()} • EXCLUSIF
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-black transition-all cursor-pointer ${
                    hasLiked 
                      ? "bg-rose-500 border-rose-500 text-white shadow-lg shadow-rose-500/20" 
                      : "bg-white/5 border-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${hasLiked ? "fill-white" : ""}`} />
                  {likesCount}K J'AIME
                </button>

                <button
                  onClick={() => { handleClickSound(); alert("Link copied to clipboard!"); }}
                  className="p-2 rounded-full border border-white/5 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                  title="Partager la vidéo"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h1 className="font-display font-black text-2xl md:text-3xl text-white uppercase tracking-tight leading-none mt-2">
              {video.title}
            </h1>

            <div className="flex flex-wrap items-center gap-5 text-xs text-slate-400 font-bold border-y border-white/5 py-4 mt-1">
              <span>Créateur: <strong className="text-white">{video.creator}</strong></span>
              <span>•</span>
              <span>{video.views}</span>
            </div>

            <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-medium mt-1">
              {video.description}
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN: Suggested related sidebar (Cols: 4) */}
        <div className="lg:col-span-4 flex flex-col gap-6 text-left">
          
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <h3 className="font-display font-black text-sm uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-fuchsia-400" />
              SUIVANT / SIMILAIRES
            </h3>
            <span className="text-[9px] font-bold text-slate-500">LECTURE AUTO</span>
          </div>

          <div className="flex flex-col gap-4">
            {relatedVideos.map((vid) => (
              <Link
                key={vid.id}
                to={`/video/${vid.id}`}
                onClick={handleClickSound}
                onMouseEnter={handleHoverSound}
                className="flex gap-4 p-2.5 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 hover:border-white/10 transition-all duration-300 group cursor-pointer"
              >
                
                {/* Visual Thumbnail Mini */}
                <div className="w-28 h-20 rounded-lg overflow-hidden relative flex-shrink-0">
                  <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                    <Play className="w-4 h-4 text-white fill-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <span className="absolute bottom-1 right-1 text-[8px] font-bold font-mono px-1 rounded bg-black/60 text-slate-300">
                    {vid.duration}
                  </span>
                </div>

                {/* Details Mini */}
                <div className="flex flex-col gap-1.5 justify-center text-left">
                  <span className="text-[8px] font-black text-fuchsia-400 uppercase tracking-widest">{vid.creator}</span>
                  <h4 className="font-display text-xs text-slate-200 group-hover:text-fuchsia-400 font-bold line-clamp-2 transition-colors uppercase leading-normal">
                    {vid.title}
                  </h4>
                  <span className="text-[8px] text-slate-500 font-sans">{vid.views}</span>
                </div>

              </Link>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
