import { useState, useRef } from 'react';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';

const VAS  = 'https://api.ameora.fun/content/vas_cartoon';
const BASE = 'https://api.ameora.fun/content/GalaxiWebsite/CARTOONS-32';

const tomAndJerry = [
  { id: 't1', title: 'Folie martienne',                               thumbnail: `${VAS}/thumnbnail/TOMANDJERRY/1.png`, videoUrl: `${VAS}/video/tomandjerryfr/Foliemartienne.mp4` },
  { id: 't2', title: 'Le chat & la souris détectives',                thumbnail: `${VAS}/thumnbnail/TOMANDJERRY/2.png`, videoUrl: `${VAS}/video/tomandjerryfr/Lechat%26lasourisd%C3%A9tectives.mp4` },
  { id: 't3', title: 'Les GRANDES aventures fantasy de Tom et Jerry', thumbnail: `${VAS}/thumnbnail/TOMANDJERRY/3.png`, videoUrl: `${VAS}/video/tomandjerryfr/LesGRANDESaventuresfantasydeTometJerry.mp4` },
  { id: 't4', title: 'Tom & Jerry – RATS DE BIBLIOTHÈQUE',            thumbnail: `${VAS}/thumnbnail/TOMANDJERRY/4.png`, videoUrl: `${VAS}/video/tomandjerryfr/Tom%26JerrydeviennentdesRATSDEBIBLIOTH%C3%88QUE.mp4` },
  { id: 't5', title: 'Un Jerry IMMENSE vs un Tom MINUSCULE',          thumbnail: `${VAS}/thumnbnail/TOMANDJERRY/5.png`, videoUrl: `${VAS}/video/tomandjerryfr/UnJerryIMMENSEvsunTomMINUSCULE.mp4` },
];

const dragonBallZ = [
  { id: 'd1', title: 'Dragon Ball Z – Méga Compilation Saga Boo',    thumbnail: `${VAS}/thumnbnail/DRAGONBALLZ/1.png`, videoUrl: `${VAS}/video/dragonballZ/DragonBallZ-M%C3%A9gaCompilation-R%C3%A9sum%C3%A9CompletSagaBoo.mp4` },
  { id: 'd2', title: 'Méga Compilation – Résumé Comp',                thumbnail: `${VAS}/thumnbnail/DRAGONBALLZ/2.png`, videoUrl: `${VAS}/video/dragonballZ/M%C3%A9gaCompilation-R%C3%A9sum%C3%A9Comp.mp4` },
  { id: 'd3', title: 'Méga Compilation – Résumé Complet',             thumbnail: `${VAS}/thumnbnail/DRAGONBALLZ/3.png`, videoUrl: `${VAS}/video/dragonballZ/M%C3%A9gaCompilation-R%C3%A9sum%C3%A9Complet.mp4` },
  { id: 'd4', title: 'Méga Compilation – Résumé Complet Saga',        thumbnail: `${VAS}/thumnbnail/DRAGONBALLZ/4.png`, videoUrl: `${VAS}/video/dragonballZ/M%C3%A9gaCompilation-R%C3%A9sum%C3%A9CompletSaga.mp4` },
  { id: 'd5', title: 'Résumé Complet Saga Babidi',                    thumbnail: `${VAS}/thumnbnail/DRAGONBALLZ/5.png`, videoUrl: `${VAS}/video/dragonballZ/R%C3%A9sum%C3%A9CompletSagaBabidi.mp4` },
];

const heyArnold = [
  { id: 'h1', title: 'Hé Arnold – Canicule !',           thumbnail: `${VAS}/thumnbnail/HEYARNOLD/1.png`, videoUrl: `${VAS}/video/HEYARNOLD/H%C3%A9Arnold_Canicule!.mp4` },
  { id: 'h2', title: 'Hé Arnold – La soirée de filles',  thumbnail: `${VAS}/thumnbnail/HEYARNOLD/2.png`, videoUrl: `${VAS}/video/HEYARNOLD/H%C3%A9Arnold_Lasoir%C3%A9edefilles.mp4` },
  { id: 'h3', title: 'Hé Arnold – Le samedi parfait',    thumbnail: `${VAS}/thumnbnail/HEYARNOLD/3.png`, videoUrl: `${VAS}/video/HEYARNOLD/H%C3%A9Arnold_Lesamediparfait.mp4` },
  { id: 'h4', title: 'Hé Arnold – Le petit carnet rose', thumbnail: `${VAS}/thumnbnail/HEYARNOLD/4.png`, videoUrl: `${VAS}/video/HEYARNOLD/H%C3%A9ArnoldLepetitcarnetrose.mp4` },
  { id: 'h5', title: 'Hé Arnold – Monsieur Smith',       thumbnail: `${VAS}/thumnbnail/HEYARNOLD/5.png`, videoUrl: `${VAS}/video/HEYARNOLD/H%C3%A9ArnoldMonsieurSmith.mp4` },
];

const inspectorGadget = [
  { id: 'g1', title: 'Conférence de presse de Gadget', thumbnail: `${VAS}/thumnbnail/INSPECTORGADGET/1.png`, videoUrl: `${VAS}/video/inspectorgadget/Conf%C3%A9rencedepressedeGadget.mp4` },
  { id: 'g2', title: 'Gadget et le Lama',              thumbnail: `${VAS}/thumnbnail/INSPECTORGADGET/2.png`, videoUrl: `${VAS}/video/inspectorgadget/GadgetetleLama.mp4` },
  { id: 'g3', title: 'Gadget et le Nain',              thumbnail: `${VAS}/thumnbnail/INSPECTORGADGET/3.png`, videoUrl: `${VAS}/video/inspectorgadget/GadgetetleNain.mp4` },
  { id: 'g4', title: 'Gadget le somnambule',           thumbnail: `${VAS}/thumnbnail/INSPECTORGADGET/4.png`, videoUrl: `${VAS}/video/inspectorgadget/Gadgetlesomnambule.mp4` },
  { id: 'g5', title: 'Gadget magique',                 thumbnail: `${VAS}/thumnbnail/INSPECTORGADGET/5.png`, videoUrl: `${VAS}/video/inspectorgadget/Gadgetmagique.mp4` },
];

const pokemon = [
  { id: 'p1', title: 'Le Maître Pokémon Évolutions – Épisode 1',       thumbnail: `${VAS}/thumnbnail/POKEMON/1.png`, videoUrl: `${VAS}/video/POKEMON/LeMa%C3%AEtrePok%C3%A9mon%C3%89volutions_%C3%89pisode1.mp4` },
  { id: 'p2', title: 'Pokémon Évolutions – Bande-annonce 2',            thumbnail: `${VAS}/thumnbnail/POKEMON/2.png`, videoUrl: `${VAS}/video/POKEMON/Pok%C3%A9mon%C3%89volutions_Bande-annonce2.mp4` },
  { id: 'p3', title: "L'éclipse – Pokémon Évolutions – Épisode 2",      thumbnail: `${VAS}/thumnbnail/POKEMON/3.png`, videoUrl: `${VAS}/video/POKEMON/L%27%C3%A9clipse_Pok%C3%A9mon%C3%89volutions%E2%80%93%C3%89pisode2.mp4` },
  { id: 'p4', title: 'Le visionnaire – Pokémon Évolutions – Épisode 3', thumbnail: `${VAS}/thumnbnail/POKEMON/4.png`, videoUrl: `${VAS}/video/POKEMON/Levisionnaire_Pok%C3%A9mon%C3%89volutions_%C3%89pisode3.mp4` },
  { id: 'p5', title: 'Le plan – Pokémon Évolutions – Épisode 4',        thumbnail: `${VAS}/thumnbnail/POKEMON/5.png`, videoUrl: `${VAS}/video/POKEMON/Leplan_Pok%C3%A9mon%C3%89volutions_%C3%89pisode4.mp4` },
];

const smurfs = [
  { id: 's1', title: 'Le Pouvoir du Sourire ! Les Schtroumpfs',         thumbnail: `${VAS}/thumnbnail/THESMURFS/1.png`,  videoUrl: `${VAS}/video/thesmurfs/ePouvoirduSourire!LesSchtroumpfs.mp4` },
  { id: 's2', title: 'Le Problème du Schtroumpf Paresseux !',           thumbnail: `${VAS}/thumnbnail/THESMURFS/2.png`,  videoUrl: `${VAS}/video/thesmurfs/LeProbl%C3%A8meduSchtroumpfParesseux!.mp4` },
  { id: 's3', title: 'Le Retour des Schtroumpfs ! – Clip Exclusif',     thumbnail: `${VAS}/thumnbnail/THESMURFS/3.png`,  videoUrl: `${VAS}/video/thesmurfs/LeRetourdesSchtroumpfs!_CLIPEXCLUSIF!.mp4` },
  { id: 's4', title: 'Les deux bêtas font la paire – Schtroumpfs 3D',   thumbnail: `${VAS}/thumnbnail/THESMURFS/4.png`,  videoUrl: `${VAS}/video/thesmurfs/Lesdeuxb%C3%AAtasfontlapaire-LesSchtroumpfs3D.mp4` },
  { id: 's5', title: 'Qui a cassé le télescope du Grand Schtroumpf ?',  thumbnail: `${VAS}/thumnbnail/THESMURFS/5.png`,  videoUrl: `${VAS}/video/thesmurfs/Quiacassel%C3%A9t%C3%A9lescopeduGrandSchtroumpf-LesSchtroumpfs.mp4` },
  { id: 's6', title: 'Un Anniversaire EXPLOSIF !',                      thumbnail: `${VAS}/thumnbnail/THESMURFS/6.png`, videoUrl: `${VAS}/video/thesmurfs/UnAnniversaireEXPLOSIF!.mp4` },
];

const cartoons11 = [
  { id: 'c1',  title: 'Silicon Valley Girls',      thumbnail: `${BASE}/CARTOONS-11/i1.jpg`,  videoUrl: `${BASE}/CARTOONS-11/v1.mp4` },
  { id: 'c2',  title: 'A Thing For Musicians',     thumbnail: `${BASE}/CARTOONS-11/i2.jpg`,  videoUrl: `${BASE}/CARTOONS-11/v2.mp4` },
  { id: 'c3',  title: 'Mandy Book',                thumbnail: `${BASE}/CARTOONS-11/i3.jpg`,  videoUrl: `${BASE}/CARTOONS-11/v3.mp4` },
  { id: 'c4',  title: 'Baddies On A Blimp',        thumbnail: `${BASE}/CARTOONS-11/i4.jpg`,  videoUrl: `${BASE}/CARTOONS-11/v4.mp4` },
  { id: 'c5',  title: 'Danger TV',                 thumbnail: `${BASE}/CARTOONS-11/i5.jpg`,  videoUrl: `${BASE}/CARTOONS-11/v5.mp4` },
  { id: 'c6',  title: 'Une Vie De Chat',           thumbnail: `${BASE}/CARTOONS-11/i6.jpg`,  videoUrl: `${BASE}/CARTOONS-11/v6.mp4` },
  { id: 'c7',  title: 'Jeux Vidéo Zéro',          thumbnail: `${BASE}/CARTOONS-11/i7.jpg`,  videoUrl: `${BASE}/CARTOONS-11/v7.mp4` },
  { id: 'c8',  title: 'Super Méga Danse Show',     thumbnail: `${BASE}/CARTOONS-11/i8.jpg`,  videoUrl: `${BASE}/CARTOONS-11/v8.mp4` },
  { id: 'c9',  title: 'Mariage Et Sabotages',      thumbnail: `${BASE}/CARTOONS-11/i9.jpg`,  videoUrl: `${BASE}/CARTOONS-11/v9.mp4` },
  { id: 'c10', title: 'Les Délices De Grand-Mère', thumbnail: `${BASE}/CARTOONS-11/i10.jpg`, videoUrl: `${BASE}/CARTOONS-11/v10.mp4` },
  { id: 'c11', title: 'Célébrité Volée',           thumbnail: `${BASE}/CARTOONS-11/i11.jpg`, videoUrl: `${BASE}/CARTOONS-11/v11.mp4` },
];

const cartoons16 = [
  { id: 'm1',  title: 'Chap Kollé',                         thumbnail: `${BASE}/CARTOONS-16/i1.jpg`,  videoUrl: `${BASE}/CARTOONS-16/v1.mp4` },
  { id: 'm2',  title: 'Dansez Petits Rats',                 thumbnail: `${BASE}/CARTOONS-16/i2.jpg`,  videoUrl: `${BASE}/CARTOONS-16/v2.mp4` },
  { id: 'm3',  title: 'Deux Mirette',                       thumbnail: `${BASE}/CARTOONS-16/i3.jpg`,  videoUrl: `${BASE}/CARTOONS-16/v3.mp4` },
  { id: 'm4',  title: 'Faux Pas Sur La Place Rouge',        thumbnail: `${BASE}/CARTOONS-16/i4.jpg`,  videoUrl: `${BASE}/CARTOONS-16/v4.mp4` },
  { id: 'm5',  title: 'Jean Patonaute',                     thumbnail: `${BASE}/CARTOONS-16/i5.jpg`,  videoUrl: `${BASE}/CARTOONS-16/v5.mp4` },
  { id: 'm6',  title: 'La Griffe Du Caire',                 thumbnail: `${BASE}/CARTOONS-16/i6.jpg`,  videoUrl: `${BASE}/CARTOONS-16/v6.mp4` },
  { id: 'm7',  title: 'La Trahison Du Bortsch',             thumbnail: `${BASE}/CARTOONS-16/i7.jpg`,  videoUrl: `${BASE}/CARTOONS-16/v7.mp4` },
  { id: 'm8',  title: 'Le Monstre De La Tamise',            thumbnail: `${BASE}/CARTOONS-16/i8.jpg`,  videoUrl: `${BASE}/CARTOONS-16/v8.mp4` },
  { id: 'm9',  title: "L'Invasion Des Potiches Tournantes", thumbnail: `${BASE}/CARTOONS-16/i9.jpg`,  videoUrl: `${BASE}/CARTOONS-16/v9.mp4` },
  { id: 'm10', title: 'Le Sphinx Se Démonte',               thumbnail: `${BASE}/CARTOONS-16/i10.jpg`, videoUrl: `${BASE}/CARTOONS-16/v10.mp4` },
  { id: 'm11', title: 'Paris Photo Express',                thumbnail: `${BASE}/CARTOONS-16/i11.jpg`, videoUrl: `${BASE}/CARTOONS-16/v11.mp4` },
  { id: 'm12', title: "Pour L'Amour Du Sphinx",             thumbnail: `${BASE}/CARTOONS-16/i12.jpg`, videoUrl: `${BASE}/CARTOONS-16/v12.mp4` },
  { id: 'm13', title: 'Rap À Plondres',                     thumbnail: `${BASE}/CARTOONS-16/i13.jpg`, videoUrl: `${BASE}/CARTOONS-16/v13.mp4` },
  { id: 'm14', title: 'Rome Mise À Neuf',                   thumbnail: `${BASE}/CARTOONS-16/i14.jpg`, videoUrl: `${BASE}/CARTOONS-16/v14.mp4` },
  { id: 'm15', title: 'Taxi Iii Yi Iii Ha',                 thumbnail: `${BASE}/CARTOONS-16/i15.jpg`, videoUrl: `${BASE}/CARTOONS-16/v15.mp4` },
  { id: 'm16', title: 'Un Gorille À New York',              thumbnail: `${BASE}/CARTOONS-16/i16.jpg`, videoUrl: `${BASE}/CARTOONS-16/v16.mp4` },
];

const cartoons5 = [
  { id: 'e1', title: 'La Chute',                          thumbnail: `${BASE}/CARTOONS-5/i1.jpg`, videoUrl: `${BASE}/CARTOONS-5/v1.mp4` },
  { id: 'e2', title: 'La Loi De La Jungle',               thumbnail: `${BASE}/CARTOONS-5/i2.jpg`, videoUrl: `${BASE}/CARTOONS-5/v2.mp4` },
  { id: 'e3', title: 'Miss À Tous Les Prix',              thumbnail: `${BASE}/CARTOONS-5/i3.jpg`, videoUrl: `${BASE}/CARTOONS-5/v3.mp4` },
  { id: 'e4', title: 'Such Is Taken',                     thumbnail: `${BASE}/CARTOONS-5/i4.jpg`, videoUrl: `${BASE}/CARTOONS-5/v4.mp4` },
  { id: 'e5', title: 'Les Espionnes De La Silicon Valley',thumbnail: `${BASE}/CARTOONS-5/i5.jpg`, videoUrl: `${BASE}/CARTOONS-5/v5.mp4` },
];

/* ── VideoCard ── */
function VideoCard({ video, darkTitle = false }) {
  const [playing, setPlaying] = useState(false);
  return (
    <>
      <div className="group cursor-pointer" onClick={() => setPlaying(true)}>
        <div className="relative rounded-lg overflow-hidden aspect-video bg-black">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 flex items-center justify-center transition-all">
            <Play className="w-12 h-12 text-white drop-shadow-lg" fill="white" />
          </div>
        </div>
        <p className={`mt-2 font-semibold text-sm text-center line-clamp-2 ${darkTitle ? 'text-gray-800' : 'text-white'}`}>
          {video.title}
        </p>
      </div>

      {playing && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setPlaying(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-gray-900 rounded-lg overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setPlaying(false)}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/40 p-2 rounded-full transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <video src={video.videoUrl} controls controlsList="nodownload" autoPlay className="w-full aspect-video" />
            <div className="p-4">
              <h3 className="text-lg font-bold text-white">{video.title}</h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ── Slider — ref-based scroll, no index math ── */
function Slider({ videos }) {
  const trackRef = useRef(null);

  const scroll = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    // scroll by the width of one card (first child)
    const cardW = track.firstElementChild?.offsetWidth ?? 300;
    track.scrollBy({ left: dir * cardW, behavior: 'smooth' });
  };

  return (
    <div className="relative group/slider">
      {/* scrollable track — hidden scrollbar */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {videos.map(video => (
          <div
            key={video.id}
            className="flex-shrink-0 w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]"
          >
            <VideoCard video={video} />
          </div>
        ))}
      </div>

      {/* Prev button */}
      <button
        onClick={() => scroll(-1)}
        className="absolute left-0 top-[42%] -translate-y-1/2 -translate-x-3 bg-black/50 hover:bg-black/80 p-2 rounded-full z-10 transition-all"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      {/* Next button */}
      <button
        onClick={() => scroll(1)}
        className="absolute right-0 top-[42%] -translate-y-1/2 translate-x-3 bg-black/50 hover:bg-black/80 p-2 rounded-full z-10 transition-all"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}

/* ── Section helpers ── */
function SectionTitle({ title, light = true }) {
  return (
    <h2 className={`font-black text-3xl md:text-5xl uppercase tracking-tight text-center mb-8 ${light ? 'text-white' : 'text-gray-900'}`}>
      {title}
    </h2>
  );
}

function DarkSection({ title, videos, bgImage }) {
  return (
    <div
      className="relative py-16 md:py-24"
      style={bgImage
        ? { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
        : { backgroundColor: '#111827' }
      }
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative max-w-7xl mx-auto px-8 md:px-12">
        <SectionTitle title={title} />
        <Slider videos={videos} />
      </div>
    </div>
  );
}

function LightGrid({ title, videos }) {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
      <SectionTitle title={title} light={false} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
        {videos.map(video => <VideoCard key={video.id} video={video} darkTitle />)}
      </div>
    </div>
  );
}

/* ── Page ── */
export default function CartoonPage() {
  const sliderVideos11 = cartoons11.slice(0, 7);
  const gridVideos11   = cartoons11.slice(7);

  return (
    <div className="bg-white min-h-screen overflow-x-hidden pt-20 md:pt-24">

      <DarkSection title="Tom & Jerry"                          videos={tomAndJerry}     bgImage={`${VAS}/thumnbnail/TOMANDJERRY/3.png`} />
      <DarkSection title="Dragon Ball Z"                        videos={dragonBallZ} />
      <DarkSection title="Hé Arnold"                           videos={heyArnold}       bgImage={`${VAS}/thumnbnail/HEYARNOLD/3.png`} />
      <DarkSection title="Inspecteur Gadget"                    videos={inspectorGadget} />
      <DarkSection title="Pokémon Évolutions"                   videos={pokemon}         bgImage={`${VAS}/thumnbnail/POKEMON/3.png`} />
      <DarkSection title="Les Schtroumpfs"                      videos={smurfs} />
      <DarkSection title="Totally Spies – Épisodes en Vedette" videos={sliderVideos11}  bgImage={`${BASE}/CARTOONS-11/i1.jpg`} />

      <LightGrid title="Plus d'Épisodes Totally Spies" videos={gridVideos11} />

      {/* Promo Banner */}
      <div
        className="relative py-16 md:py-20"
        style={{ backgroundImage: `url(${BASE}/CARTOONS-16/i1.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 text-center">
          <SectionTitle title="Explorez Plus d'Aventures en Dessin Animé" />
        </div>
      </div>

      <LightGrid title="Les Enquêtes de Mirette" videos={cartoons16} />

      <DarkSection title="Totally Spies – Saison 6 Extras" videos={cartoons5} />

    </div>
  );
}
