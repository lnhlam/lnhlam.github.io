import { useState, useRef, useEffect } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  ArrowLeft,
  ChevronDown,
  Volume2,
  VolumeX,
} from "lucide-react";

type Page = "home" | "motion" | "illustration" | "gameart";

const ACCENT = "#1aaa98";

// ── Swap these URLs with your own links ───────────────────────────────────────
const INTRO_REEL_URL = "https://lnhlam.art/video/Demo-Reel.mp4"; // landing page intro reel
const MOTION_REEL_URL =
  "https://lnhlam.art/video/Motion-Graphics-Reel-2026.mp4"; // motion page showreel
const ABOUT_BG_URL = "https://lnhlam.art/images/slide1.jpg"; // About panel background image — paste a URL or "/your-image.png" from public/
const LOGO_URL = "https://lnhlam.art/images/LogoName.png"; // Top bar logo image — paste a URL or "/your-logo.png" from public/

// ── Contact links ─────────────────────────────────────────────────────────────
const CONTACT_EMAIL = "lnhlam@ymail.com";
const CONTACT_ARTSTATION = "https://lennylam1.artstation.com/projects";
const CONTACT_LINKEDIN = "https://www.linkedin.com/in/lnhlam/";

// ─── Data ──────────────────────────────────────────────────────────────────────

// aspect: set this to match your video file — "4/5" (1080x1350), "9/16" (1080x1920), "1/1" (1080x1080), "16/9" (1920x1080)
const MOTION_PROJECTS = [
  {
    id: 1,
    title: "Smash The Diet Industry Retargeting",
    client: "Midi",
    year: 2026,
    aspect: "4/5",
    description:
      "A retargeting campaign for Midi, the virtual care clinic created by specialists in perimenopause and menopause, was based around breaking the expectations of the diet industry. This specific creative was marked as a top performing creative among the campaign.\n\n Agency: Monks \n\n Role: Motion Designer",
    thumb:
      "https://lnhlam.art/video/Motion-Design/Midi_SmashTheDietIndustry_1080X1350.mp4",
    video:
      "https://lnhlam.art/video/Motion-Design/Midi_SmashTheDietIndustry_1080X1350.mp4",
  },
  {
    id: 2,
    title: "HRT 1006.2",
    client: "Midi",
    year: 2026,
    aspect: "4/5",
    description:
      "In part of a rebranding of the client, Midi, the virtual care clinic created by specialists in perimenopause and menopause. The client requested for punchy, hard-hitting pacing to emphasize their updated branding. \n\n Agency: Monks \n\n Role: Motion Designer",
    thumb:
      "https://lnhlam.art/video/Motion-Design/Midi_1053_HRT 1006-2_1080x1350.mp4",
    video:
      "https://lnhlam.art/video/Motion-Design/Midi_1053_HRT 1006-2_1080x1350.mp4",
  },
  {
    id: 3,
    title: "Magnifying Glass",
    client: "Rula",
    year: 2026,
    aspect: "4/5",
    description:
      "A high performing creative for the client Rula, an online mental health platform. The main focus was the magnifying glass that needed to pull in the attention, feel real, and have a satisfying effect. \n\n Agency: Monks \n\n Role: Motion Designer",
    thumb: "https://lnhlam.art/video/Motion-Design/RU_1051_Magnifying Glass.mp4",
    video: "https://lnhlam.art/video/Motion-Design/RU_1051_Magnifying Glass.mp4",
  },
  {
    id: 4,
    title: "Testimonial Lifestyle",
    client: "QuillBot",
    year: 2026,
    aspect: "16/9",
    description:
      "A quickly paced, high tempo, testimonial showcase for Quillbot, a multilingual AI writing assistant extension. \n\n Agency: Monks \n\n Role: Motion Designer ",
    thumb: "https://lnhlam.art/video/Motion-Design/QuillBot-Testimonial-Lifestyle-1920x1080.mp4",
    video: "https://lnhlam.art/video/Motion-Design/QuillBot-Testimonial-Lifestyle-1920x1080.mp4",
  },
  {
    id: 5,
    title: "Effective Resource Management",
    client: "Planview",
    year: 2026,
    aspect: "4/5",
    description:
      "An illustration heavy looping animation for Planview, the platform for driving enterprise execution and outcomes. This creative is intended as a seamlessly looping gif and required simple UI motion and subtle puppeting. \n\n Agency: Monks \n\n Role: Motion Designer",
    thumb: "https://lnhlam.art/video/Motion-Design/Planview-Effective-Resource-Management.mp4",
    video: "https://lnhlam.art/video/Motion-Design/Planview-Effective-Resource-Management.mp4",
  },
  {
    id: 6,
    title: "Holiday NMO",
    client: "Chime",
    year: 2025,
    aspect: "4/5",
    description:
      "Part of a seasonal promotion for the fintech company, Chime. To follow the holiday design, the snowglobe features a lo-fi snowfall effect and showcasing a gentle rocking Chime credit card as the focal point. \n\n Agency: Monks \n\n Role: Motion Designer",
    thumb: "https://lnhlam.art/video/Motion-Design/Chime_1139_Holiday NMO_1080x1350.mp4",
    video: "https://lnhlam.art/video/Motion-Design/Chime_1139_Holiday NMO_1080x1350.mp4",
  },
  {
    id: 7,
    title: "Never Start Over",
    client: "QuillBot",
    year: 2026,
    aspect: "16/9",
    description:
      "A UI/UX interaction heavy showcase for Quillbot, a multilingual AI writing assistant extension. The interactions needed to feel smooth, accurate to the product, but with some added flair to engage the viewer into the user experience. \n\n Agency: Monks \n\n Role: Motion Designer",
    thumb: "https://lnhlam.art/video/Motion-Design/QuillBot_1036_Never Start Over_1920x1080 v2.mp4",
    video: "https://lnhlam.art/video/Motion-Design/QuillBot_1036_Never Start Over_1920x1080 v2.mp4",
  },
  {
    id: 8,
    title: "Chime Prime",
    client: "Chime",
    year: 2026,
    aspect: "9/16",
    description:
      "An upbeat UI showcase of Chime alongside several promotional offers. The animation was set up as an evergreen template and 6 different copies at 4 different resizes were provided to the client. \n\n Agency: Monks \n\n Role: Motion Designer",
    thumb: "https://lnhlam.art/video/Motion-Design/Chime-Prime-1080x1920.mp4",
    video: "https://lnhlam.art/video/Motion-Design/Chime-Prime-1080x1920.mp4",
  },
  {
    id: 9,
    title: "The Flywheel Quadrant",
    client: "Quicken",
    year: 2026,
    aspect: "9/16",
    description:
      "A multi-level creative series for Quicken, a personal finance management application, I brought from 2 static versions and later combined to one animated version. The client preference for stock imagery and video lands under an older demographic with high-life imagery.\n\n Agency: Monks \n\n Role: Graphic Designer, Motion Designer",
    thumb: "https://lnhlam.art/video/Motion-Design/Quicken_1051_The Flywheel Quadrant_1080x1920_A.mp4",
    video: "https://lnhlam.art/video/Motion-Design/Quicken_1051_The Flywheel Quadrant_1080x1920_A.mp4",
  },
  {
    id: 10,
    title: "Guide to Scent Stacking 101",
    client: "Sol De Janeiro",
    year: 2025,
    aspect: "9/16",
    description:
      "A simple step-by-step video showcase to provide direction for users of the product by Sol de Janeiro, an American skincare and fragrance brand inspired by Brazilian beach culture. \n\n Agency: Monks \n\n Role: Motion Designer",
    thumb: "https://lnhlam.art/video/Motion-Design/Sol-Guide-To-Scent-Stacking-101-Collages-1080x1920.mp4",
    video: "https://lnhlam.art/video/Motion-Design/Sol-Guide-To-Scent-Stacking-101-Collages-1080x1920.mp4",
  },
  {
    id: 11,
    title: "Kinetic Testimonial UGC",
    client: "Quicken",
    year: 2021,
    aspect: "16/9",
    description:
      "A UGC concept brought from design, to editing, to animation for Quicken, a personal finance management application. The creative features overall design, cutting and editing the UGC footage, to animating graphics, UI, and kinetic typography. \n\n Agency: Monks \n\n Role: Graphic Designer, Video Editor, Motion Designer",
    thumb: "https://lnhlam.art/video/Motion-Design/Quicken_1039_Kinetic Testimonial UGC_Hook1_1920x1080.mp4",
    video: "https://lnhlam.art/video/Motion-Design/Quicken_1039_Kinetic Testimonial UGC_Hook1_1920x1080.mp4",
  },
  {
    id: 12,
    title: "Gen Z Phone",
    client: "Chime",
    year: 2026,
    aspect: "4/5",
    description:
      "A creative brought from a pass-off to finishing for the fintech, Chime. The AI-generated background was provided to me and needed additional design edits as well as motion tracking and finishing. \n\n Agency: Monks \n\n Role: Motion Designer",
    thumb: "https://lnhlam.art/video/Motion-Design/Chime_1176_Evergreen-GenZPhone_1080x1350.mp4",
    video: "https://lnhlam.art/video/Motion-Design/Chime_1176_Evergreen-GenZPhone_1080x1350.mp4",
  },
];

const ILLUSTRATION_ITEMS = [
  {
    id: 1,
    title: "Smol Concept Sheet",
    year: 2023,
    url: "https://lnhlam.art/images/portfolio/portfolio4/pbig.png",
    w: 320,
    description:
      "A species concept sheet of the main inhabitants in the universe of the fractal-world farming/life simulator game, Smolbound. The project's creative direction fell under a hybrid of anime/isekai-inspired world building while maintaining the core characteristics of the original IP/NFT project, Smolverse.",
  },
  {
    id: 2,
    title: "Sky Whale Concept Sheet",
    year: 2023,
    url: "https://lnhlam.art/images/portfolio/portfolio4/pbig1.png",
    w: 270,
    description:
      "Character/environment concept design of the Sky Whale for the fractal-world farming/life simulator game, Smolbound.",
  },
  {
    id: 3,
    title: "Smolbound Buildings Concept Sheet",
    year: 2023,
    url: "https://lnhlam.art/images/portfolio/portfolio4/pbig9.png",
    w: 300,
    description:
      "Buildings concept sheet for the 'village on the back of a sky whale' for the fractal-world farming/life simulator game, Smolbound.",
  },
  {
    id: 4,
    title: "Omni-Tool Concept Sheet",
    year: 2023,
    url: "https://lnhlam.art/images/portfolio/portfolio4/pbig2.png",
    w: 400,
    description:
      "Prop concept sheet for the essential tool in the fractal-world farming/life simulator game, Smolbound.",
  },
  {
    id: 5,
    title: "Alice Concept Sheet",
    year: 2023,
    url: "https://lnhlam.art/images/portfolio/portfolio4/pbig3.png",
    w: 310,
    description:
      "Character concept sheet for an NPC character designed as a multi-dimensional being inspired by the original Alice of Alice in Wonderland. Designed for fractal-world farming/life simulator game, Smolbound.",
  },
  {
    id: 6,
    title: "Cheshire Concept Sheet",
    year: 2023,
    url: "https://lnhlam.art/images/portfolio/portfolio4/pbig4.png",
    w: 360,
    description:
      "Character concept sheet for an NPC character inspired by a humanized Cheshire cat in the fractal world farming/life simulator game, Smolbound.",
  },

  /*
  {
    id: 7,
    title: "Book Cover — Pale Fire",
    year: 2022,
    url: "https://images.unsplash.com/photo-1549277513-f1b32fe1f8f5?w=440&h=680&fit=crop&auto=format",
    w: 260,
    description:
      "Cover redesign for a classic literary work. Typographic and painterly elements merged into a single cohesive composition.",
  },
  {
    id: 8,
    title: "Surface Studies",
    year: 2021,
    url: "https://images.unsplash.com/photo-1732996909435-f1918cd4bf8b?w=680&h=520&fit=crop&auto=format",
    w: 390,
    description:
      "Texture and material explorations used as a foundation for a broader brand identity project. Acrylic on board.",
  },
  {
    id: 9,
    title: "Cartographic Study I",
    year: 2024,
    url: "https://images.unsplash.com/photo-1713220425194-635e2fe9f9e4?w=900&h=520&fit=crop&auto=format",
    w: 560,
    description:
      "Wide-format landscape illustration exploring topographic abstraction and hand-rendered map aesthetics. Mixed media on paper.",
  },
  {
    id: 10,
    title: "Forest Archive",
    year: 2023,
    url: "https://images.unsplash.com/photo-1703587045962-8f7609851d72?w=860&h=520&fit=crop&auto=format",
    w: 530,
    description:
      "Botanical archive series drawn from historical illustration traditions. Ink on archival paper, digitally restored.",
  },
  {
    id: 11,
    title: "Coastal Dusk",
    year: 2022,
    url: "https://images.unsplash.com/photo-1748199810583-766ad2bf158f?w=800&h=520&fit=crop&auto=format",
    w: 490,
    description:
      "Atmospheric study of reflected light on still water at the boundary between land and sea. Painted for a limited print edition.",
  },
  */
];

const GAME_PROJECTS = [
  {
    id: 1,
    title: "Smolbound",
    subtitle: "Art Direction, Rigging & Animation, Shadergraph | Unity, Spine, Photoshop",
    year: 2024,
    coverImage:
      "https://lnhlam.art/images/pthumbnail4.jpg",
    characterArt:
      "https://lnhlam.art/images/charA.png",
    images: [
      "https://lnhlam.art/video/Smolbound.mp4",
      "https://lnhlam.art/images/portfolio/portfolio4/SC1.png",
      "https://lnhlam.art/images/portfolio/portfolio4/SC2.png",
      "https://lnhlam.art/images/portfolio/portfolio4/SC3.png",
      "https://lnhlam.art/images/portfolio/portfolio4/SC4.png",
      "https://lnhlam.art/images/portfolio/portfolio4/SC5.png",
    ],
    description:
      "Smolbound is a bright and colorful game based off of the original IP known as Smolverse. The core idea of the game is a blend of cozy sandbox, colony management, and strategic exploration, while bringing in a twist of whacky farming-based combat. The player lives on the back of a Sky Whale which travels throughout an endless void across floating islands in the galaxy where they meet unique characters and gain more villagers on their journey. The project began as a title under the crypto-game publishing company known as Treasure. As the main point of the art team, I was in charge of establishing the initial art direction and visual tone, directly contributing to securing $6M in project funding. Throughout the project, core duties involved setting the initial unity-art pipeline alongside the engineering team, leading a small team of artists to maintain visual consistency through art and UI, while maintaining and directing all other visual needs for the studio. \n\n Role: Art Lead with duties in Art Direction, Character Art, Environment Art, Character Rigging and Animation, Technical Art and VFX",
  },
  {
    id: 2,
    title: "Underling Uprising",
    subtitle: "2D Rigging & Animation, Art Direction, Shadergraph | Unity, Spine, Animate",
    year: 2023,
    coverImage:
      "https://lnhlam.art/images/pthumbnail6.jpg",
    characterArt:
      "https://lnhlam.art/images/charB.png",
    images: [
      "https://www.youtube.com/watch?v=np3hv-rIRTU",
      "https://www.youtube.com/watch?v=3VcuS8IdbNA",
      "https://lnhlam.art/video/UU-Cinematic.mp4",
      "https://lnhlam.art/images/portfolio/portfolio6/pbig6.png",
      "https://lnhlam.art/images/portfolio/portfolio6/pbig64.png",
      "https://lnhlam.art/images/portfolio/portfolio6/pbig65.png",
      "https://lnhlam.art/images/portfolio/portfolio6/Boogie-Walk.gif",
      "https://lnhlam.art/images/portfolio/portfolio6/Deckster-Walk.gif",
      "https://lnhlam.art/images/portfolio/portfolio6/Angel-Walk.gif",
      "https://lnhlam.art/images/portfolio/portfolio6/Rose-Walk.gif",
      "https://lnhlam.art/images/portfolio/portfolio6/Boogie-Action.gif",
      "https://lnhlam.art/images/portfolio/portfolio6/Deckster-Action.gif",
      "https://lnhlam.art/images/portfolio/portfolio6/Angel-Action.gif",
      "https://lnhlam.art/images/portfolio/portfolio6/Rose-Action.gif",
      "https://lnhlam.art/images/portfolio/portfolio6/Exoskeleton-Walk.gif",
      "https://lnhlam.art/images/portfolio/portfolio6/Lion-Walk.gif",
      "https://lnhlam.art/images/portfolio/portfolio6/pbig62.gif",
      "https://lnhlam.art/images/portfolio/portfolio6/pbig63.png",
    ],
    description:
      "Underling Uprising is a 2D arcade, saturday morning-inspired Beat 'em up game about 4 failed science experiments rising up to take down their mad scientist creator, Dr. Baldrick. This project is set to release soon and was funded on Kickstarter raising over $15,000. The character bases are created in Adobe Animate, animated in Spine, and character attacks and actions are purely frame-by-frame animation. \n\n Role: Art Direction, Animation, Technical Art, Character Art, Background Art, Marketing Art, Graphic Design, Cinematic Animation",
  },
  {
    id: 3,
    title: "Kippoverse",
    subtitle: "2D Rigging & Animation | Unity, Spine, Tiled",
    year: 2022,
    coverImage:
      "https://lnhlam.art/images/pthumbnail7.jpg",
    characterArt:
      "https://lnhlam.art/images/charD.png",
    images: [
      "https://lnhlam.art/video/Kippo.mp4",
      "https://lnhlam.art/images/portfolio/portfolio7/pbig1.png",
      "https://lnhlam.art/images/portfolio/portfolio7/pbig2.png",
      "https://lnhlam.art/images/portfolio/portfolio7/pbig3.png",
      "https://lnhlam.art/images/portfolio/portfolio7/pbig4.png",
      "https://lnhlam.art/images/portfolio/portfolio7/pbig5.png",
      "https://lnhlam.art/images/portfolio/portfolio7/pbig6.png",
    ],
    description:
      "The Kippoverse is a 2D mobile metaverse extension of the dating app known as Kippo. Originally the Dating App for Gamers, Kippo has built a social world within the app where users can meet, voice chat, and connect. All in-game assets are vector based illustrations made in Adobe Illustrator, animated in either After Effects or Spine Esoteric, and implemented in Unity.\n\nRole: 2D Artist, Spine and Lottie Animator, Motion Graphics",
  },
  {
    id: 4,
    title: "Ninja Chowdown",
    subtitle: "Pixel Art & Animation | Unity, Asesprite",
    year: 2019,
    coverImage:
      "https://lnhlam.art/images/pthumbnail3.jpg",
    characterArt:
      "https://lnhlam.art/images/charC.png",
    images: [
      "https://www.youtube.com/watch?v=ur-kUYaU-U4",
      "https://lnhlam.art/images/portfolio/portfolio5/pbig50.jpg",
      "https://lnhlam.art/images/portfolio/portfolio5/pbig5.png",
      "https://lnhlam.art/images/portfolio/portfolio5/pbig51.png",
      "https://lnhlam.art/images/portfolio/portfolio5/pbig52.png",
    ],
    description:
      "Ninja Chowdown is a pixel based mobile application featuring a ninja rushing through the streets in pursuit of the legendary Knownut. The game is an automatic side scrolling runner where the player must dodge obstacles, eat donuts, and defeat anything in their path.\n\nRole: Pixel Art, Marketing Art, Graphic Design, Motion Graphics",
  },

    {
    id: 5,
    title: "Turtle Daddy",
    subtitle: "Pixel Art & Animation | Unity, Asesprite",
    year: 2020,
    coverImage:
      "https://lnhlam.art/images/pthumbnail2.jpg",
    characterArt:
      "https://lnhlam.art/images/charE.png",
    images: [
      "https://www.youtube.com/watch?v=lfxmCq_mEmg",
      "https://lnhlam.art/images/portfolio/portfolio2/pbig2.png",
      "https://lnhlam.art/images/portfolio/portfolio2/pbig22.png",
      "https://lnhlam.art/images/portfolio/portfolio2/pbig23.gif",
      "https://lnhlam.art/images/portfolio/portfolio2/pbig24.png",
    ],
    description:
      "Turtle Daddy is a pixel-based video game featuring an enthusiastic 'Turtle Daddy' commando who travels across several beaches and saves baby turtles from the dangers of the shorelines on their trek from birth to sea.\n\nRole: Art, Animation, Marketing Art, and Graphic Design",
  },
];

// ─── Reel Players ──────────────────────────────────────────────────────────────

function MuteButton({ muted, onToggle }: { muted: boolean; onToggle: (e: React.MouseEvent) => void }) {
  return (
    <button
      onClick={onToggle}
      style={{
        position: "absolute",
        bottom: "16px",
        right: "16px",
        zIndex: 10,
        background: "rgba(28,28,28,0.55)",
        border: "1px solid rgba(255,255,255,0.22)",
        backdropFilter: "blur(8px)",
        borderRadius: "50%",
        width: "36px",
        height: "36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "border-color 0.2s ease",
        opacity: "75%",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = ACCENT)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)")}
    >
      {muted
        ? <VolumeX size={14} style={{ color: "rgba(255,255,255,0.6)" }} />
        : <Volume2 size={14} style={{ color: "#fff" }} />}
    </button>
  );
}

function ReelPlayer({ url }: { url: string }) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClick = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      v.pause();
      setPlaying(false);
    } else {
      v.play().catch(() => {});
      setPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <div
      className="relative w-full overflow-hidden cursor-pointer group"
      style={{ aspectRatio: "16/9", background: "#0d0d0d" }}
      onClick={handleClick}
    >
      {url ? (
        <video
          ref={videoRef}
          src={url}
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
          onEnded={() => setPlaying(false)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "9px",
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.25)",
              textTransform: "uppercase",
            }}
          >
            Set MOTION_REEL_URL to embed your reel
          </span>
        </div>
      )}
      {/* Overlay dims when playing */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "rgba(28,28,28,0.35)",
          opacity: playing ? 0 : 1,
          transition: "opacity 0.4s ease",
        }}
      />
      {/* Play / pause button */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          opacity: playing ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        <div
          className="group-hover:scale-110"
          style={{
            width: "88px",
            height: "88px",
            borderRadius: "50%",
            border: "1.5px solid rgba(255,255,255,0.62)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(8px)",
            background: "rgba(28,28,28,0.35)",
            transition: "transform 0.3s ease",
          }}
        >
          <Play
            size={30}
            style={{ color: "#fff", marginLeft: "4px" }}
          />
        </div>
      </div>
      {playing && <MuteButton muted={muted} onToggle={toggleMute} />}
    </div>
  );
}

function IntroReelPlayer({
  url,
  style,
}: {
  url: string;
  style?: React.CSSProperties;
}) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClick = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      v.pause();
      setPlaying(false);
    } else {
      v.play().catch(() => {});
      setPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <div
      className="relative w-full overflow-hidden cursor-pointer group"
      style={{
        height: "58vh",
        background: "#0d0d0d",
        ...style,
      }}
      onClick={handleClick}
    >
      {url ? (
        <video
          ref={videoRef}
          src={url}
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
          onEnded={() => setPlaying(false)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "9px",
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.25)",
              textTransform: "uppercase",
            }}
          >
            Set INTRO_REEL_URL to embed your intro reel
          </span>
        </div>
      )}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "rgba(28,28,28,0.45)",
          opacity: playing ? 0 : 1,
          transition: "opacity 0.4s ease",
        }}
      />
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-5 pointer-events-none"
        style={{
          opacity: playing ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        <div
          className="group-hover:scale-110"
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            border: `1.5px solid ${ACCENT}60`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(8px)",
            background: `${ACCENT}12`,
            transition: "transform 0.3s ease",
          }}
        >
          <Play
            size={28}
            style={{ color: ACCENT, marginLeft: "4px" }}
          />
        </div>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "9px",
            letterSpacing: "0.4em",
            color: "rgba(255,255,255,0.5)",
            textTransform: "uppercase",
          }}
        >
          Introduction Reel
        </p>
      </div>
      {playing && <MuteButton muted={muted} onToggle={toggleMute} />}
    </div>
  );
}

// ─── Global Header ─────────────────────────────────────────────────────────────

function GlobalHeader({
  page,
  onBack,
  aboutOpen,
  onToggleAbout,
}: {
  page: Page;
  onBack: () => void;
  aboutOpen: boolean;
  onToggleAbout: () => void;
}) {
  const [atTop, setAtTop] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setAtTop(y < 8);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bgColor =
    aboutOpen
      ? "transparent"
      : atTop
      ? "rgba(28,28,28,0.95)"
      : "rgba(28,28,28,0.08)";
  const blurVal = aboutOpen ? "none" : "blur(16px) saturate(1.3)";

  const SIDE_W = "180px";
  const monoSm: React.CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "10px",
    letterSpacing: "0.28em",
    textTransform: "uppercase" as const,
  };

  const CATEGORY: Record<Page, string> = {
    home: "",
    motion: "Motion Design",
    illustration: "Illustration / Art Direction",
    gameart: "Technical Game Art",
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "28px 32px",
        transition:
          "background 0.5s ease, backdrop-filter 0.5s ease, border-color 0.4s ease",
        background: bgColor,
        backdropFilter: blurVal,
        WebkitBackdropFilter: blurVal,
        borderBottom: "none",
        maskImage:
          atTop
            ? "none"
            : "linear-gradient(to bottom, black 55%, transparent 100%)",
        WebkitMaskImage:
          atTop
            ? "none"
            : "linear-gradient(to bottom, black 55%, transparent 100%)",
      }}
    >
      {/* Left — back button */}
      <div
        style={{
          width: SIDE_W,
          display: "flex",
          alignItems: "center",
        }}
      >
        {page !== "home" && (
          <button
            onClick={onBack}
            style={{
              ...monoSm,
              color: "rgba(255,255,255,0.58)",
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: 0,
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "#fff")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color =
                "rgba(255,255,255,0.58)")
            }
          >
            <ArrowLeft size={12} />
            Portfolio
          </button>
        )}
      </div>

      {/* Center — name / logo */}
      <button
        onClick={onToggleAbout}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "9px",
          padding: "6px 16px",
        }}
      >
        {LOGO_URL ? (
          <img
            src={LOGO_URL}
            alt="Logo"
            style={{
              height: "50px",
              width: "auto",
              objectFit: "contain",
              
              opacity: aboutOpen ? 1 : 0.82,
              transition: "opacity 0.25s ease",
            }}
          />
        ) : (
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: "1.1rem",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: aboutOpen
                ? "#fff"
                : "rgba(255,255,255,0.82)",
              transition: "color 0.25s ease",
            }}
          >
            Lenny Lam
          </span>
        )}
        <ChevronDown
          size={13}
          style={{
            color: aboutOpen
              ? ACCENT
              : "rgba(255,255,255,0.32)",
            transform: aboutOpen
              ? "rotate(180deg)"
              : "rotate(0deg)",
            transition: "transform 0.3s ease, color 0.25s ease",
          }}
        />
      </button>

      {/* Right — category label */}
      <div
        style={{
          width: SIDE_W,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {CATEGORY[page] && (
          <span
            style={{
              ...monoSm,
              color: "rgba(255,255,255,0.58)",
            }}
          >
            {CATEGORY[page]}
          </span>
        )}
      </div>
    </header>
  );
}

// ─── About Panel ───────────────────────────────────────────────────────────────

const DEFAULT_ABOUT =
  "Hi! I’m Linh Lam, but you can call me Lenny. I’m a versatile Motion Designer, Illustrator, and Technical Game Artist based in Southern California, with a passion for bringing ideas to life through art, motion, and interactive experiences.\nMy work spans motion design, illustration, animation, and game development, allowing me to jump between creative disciplines and find the right visual language for each project. I especially enjoy working where art and technology overlap, turning creative ideas into polished, expressive experiences.\n When I’m not making things move or building things in games, I’m probably playing games, bouldering, or snowboarding!";

function AboutPanel({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "0px",
        left: 0,
        right: 0,
        zIndex: 55,
        overflow: "hidden",
        borderBottom: `1px solid ${ACCENT}25`,
        animation:
          "slideDown 0.38s cubic-bezier(0.25,0.46,0.45,0.94) forwards",
      }}
    >
      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>

      {/* Background image contained to panel */}
      {ABOUT_BG_URL && (
        <>
          <img
            src={ABOUT_BG_URL}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(28,28,28,0.82) 0%, rgba(28,28,28,0.6) 33%, rgba(28,28,28,0.18) 55%, transparent 72%)",
            }}
          />
        </>
      )}

      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          bottom: "32px",
          right: "32px",
          zIndex: 2,
          background: "none",
          border: "none",
          color: "rgba(255,255,255,0.5)",
          cursor: "pointer",
          transition: "color 0.2s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "#fff")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color =
            "rgba(255,255,255,0.5)")
        }
      >
        <X size={20} />
      </button>

      {/* Content — left third of screen */}
      <div
        style={{
          top:"50px",
          position: "relative",
          zIndex: 2,
          width: "40%",
          minWidth: "360px",
          padding: "64px 48px 86px 56px",
        }}
      >
        <div style={{ marginBottom: "28px" }}>
          <h2
            style={{
              fontFamily: "'Road Rage', sans-serif",
              fontSize: "3.6rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#fff",
              lineHeight: 1,
            }}
          >
            Hi, I'm Lenny!
          </h2>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.3em",
              color: ACCENT,
              textTransform: "uppercase",
              marginTop: "10px",
            }}
          >
            Motion Design · Illustration · Technical Game Art
          </p>
        </div>
        <div
          style={{
            width: "32px",
            height: "1px",
            background: ACCENT,
            marginBottom: "24px",
          }}
        />
        <label
          style={{
            display: "block",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "9px",
            letterSpacing: "0.35em",
            color: "rgba(255,255,255,0.62)",
            textTransform: "uppercase",
            marginBottom: "10px",
          }}
        >
          About
        </label>
        <p
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 400,
            fontSize: "15px",
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.78)",
            whiteSpace: "pre-line",
          }}
        >
          {DEFAULT_ABOUT}
        </p>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "24px",
          }}
        >
          {[
            { label: "Email", href: CONTACT_EMAIL ? `mailto:${CONTACT_EMAIL}` : "" },
            { label: "ArtStation", href: CONTACT_ARTSTATION },
            { label: "LinkedIn", href: CONTACT_LINKEDIN },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href || undefined}
              target={href && !href.startsWith("mailto") ? "_blank" : undefined}
              rel="noopener noreferrer"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "9px",
                letterSpacing: "0.3em",
                color: "rgba(255,255,255,0.5)",
                textTransform: "uppercase",
                textDecoration: "none",
                cursor: href ? "pointer" : "default",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                href && (e.currentTarget.style.color = ACCENT)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
              }
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Landing ───────────────────────────────────────────────────────────────────

const COLUMNS: {
  id: Page;
  label: string;
  sub: string;
  number: string;
  image: string;
  video?: string; // optional — set to a URL to use a video instead of the image
}[] = [
  {
    id: "motion",
    label: "Motion",
    sub: "Design",
    number: "01",
    //image: "",
    video: "https://lnhlam.art/video/Motion-Graphics-Reel-2026.mp4",
  },
  {
    id: "illustration",
    label: "Illustration",
    sub: "Art Direction",
    number: "02",
    image: "https://lnhlam.art/images/coverArt1.png",
    // video: "/your-illustration-bg.mp4",
  },
  {
    id: "gameart",
    label: "Technical",
    sub: "Game Art",
    number: "03",
    //image: "",
    video: "https://lnhlam.art/video/Smolbound.mp4",
  },
];

function LandingPage({
  onNavigate,
}: {
  onNavigate: (p: Page) => void;
}) {
  const [hovered, setHovered] = useState<Page | null>(null);

  return (
    <div style={{ background: "#1c1c1c", minHeight: "100vh" }}>
      {/* ── Full-width intro video ── */}
      <IntroReelPlayer
        url={INTRO_REEL_URL}
        style={{ marginTop: "92px" }}
      />

      {/* ── Three category columns ── */}
      <div style={{ display: "flex", height: "100vh" }}>
        {COLUMNS.map((col, i) => (
          <div
            key={col.id}
            className="relative overflow-hidden cursor-pointer"
            style={{
              flex: hovered === col.id ? "1.5" : hovered ? "0.75" : "1",
              transition: "flex 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
            }}
            onMouseEnter={() => setHovered(col.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onNavigate(col.id)}
          >
            {col.video ? (
              <video
                src={col.video}
                className="absolute inset-0 w-full h-full object-cover"
                ref={(el) => { if (el) { el.muted = true; el.play().catch(() => {}); } }}
                loop
                playsInline
                style={{
                  transition:
                    "filter 0.7s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94)",
                  filter:
                    hovered === col.id
                      ? "grayscale(0%) brightness(0.72) saturate(1.1)"
                      : "grayscale(100%) brightness(0.18)",
                  transform:
                    hovered === col.id
                      ? "scale(1.07)"
                      : "scale(1)",
                }}
              />
            ) : (
              <img
                src={col.image}
                alt={col.label}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  transition:
                    "filter 0.7s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94)",
                  filter:
                    hovered === col.id
                      ? "grayscale(0%) brightness(0.72) saturate(1.1)"
                      : "grayscale(100%) brightness(0.18)",
                  transform:
                    hovered === col.id
                      ? "scale(1.07)"
                      : "scale(1)",
                }}
              />
            )}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(28,28,28,0.3) 0%, rgba(28,28,28,0.5) 60%, rgba(28,28,28,0.8) 100%)",
                transition: "opacity 0.6s ease",
                opacity: hovered === col.id ? 0.6 : 1,
              }}
            />
            {i > 0 && (
              <div
                className="absolute left-0 top-0 bottom-0 w-px"
                style={{ background: "rgba(255,255,255,0.14)" }}
              />
            )}
            <div
              className="absolute left-0 top-0 bottom-0 w-[2px]"
              style={{
                background: ACCENT,
                transition: "opacity 0.4s ease",
                opacity: hovered === col.id ? 1 : 0,
              }}
            />

            <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 px-6 text-center">
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.5em",
                  color:
                    hovered === col.id
                      ? ACCENT
                      : "rgba(255,255,255,0.2)",
                  transition:
                    "color 0.4s ease, transform 0.5s ease",
                  transform:
                    hovered === col.id
                      ? "translateY(-4px)"
                      : "translateY(0)",
                  display: "block",
                  marginBottom: "20px",
                }}
              >
                {col.number}
              </span>

              <div
                style={{
                  transition:
                    "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
                  transform:
                    hovered === col.id
                      ? "translateY(-8px)"
                      : "translateY(0)",
                }}
              >
                <h2
                  style={{
                    fontFamily: "'Road Rage', sans-serif",
                    fontSize: "clamp(2rem, 3.2vw, 3.6rem)",
                    letterSpacing: "0.1em",
                    lineHeight: 1,
                    color:
                      hovered === col.id
                        ? "#ffffff"
                        : "rgba(255,255,255,0.78)",
                    transition: "color 0.4s ease",
                    textTransform: "uppercase",
                  }}
                >
                  {col.label}
                </h2>
                <h2
                  style={{
                    fontFamily:
                      "'Barlow Condensed', sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(1.2rem, 2vw, 2.2rem)",
                    letterSpacing: "0.25em",
                    lineHeight: 1.3,
                    color:
                      hovered === col.id
                        ? "rgba(255,255,255,0.75)"
                        : "rgba(255,255,255,0.35)",
                    transition: "color 0.4s ease",
                    textTransform: "uppercase",
                    marginTop: "4px",
                  }}
                >
                  {col.sub}
                </h2>
              </div>

              <div
                style={{
                  marginTop: "24px",
                  opacity: hovered === col.id ? 1 : 0,
                  transform:
                    hovered === col.id
                      ? "translateY(0)"
                      : "translateY(10px)",
                  transition:
                    "opacity 0.45s ease, transform 0.45s ease",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    height: "1px",
                    width: "40px",
                    background: ACCENT,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "9px",
                    letterSpacing: "0.35em",
                    color: ACCENT,
                    textTransform: "uppercase",
                  }}
                >
                  View Work
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Motion Grid Card ──────────────────────────────────────────────────────────

function MotionGridCard({
  proj,
  onClick,
}: {
  proj: (typeof MOTION_PROJECTS)[0];
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const handleEnter = () => setHovered(true);
  const handleLeave = () => setHovered(false);

  return (
    <div
      className="relative overflow-hidden cursor-pointer"
      style={{ aspectRatio: proj.aspect || "4/5", background: "#242424", width: "100%" }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={onClick}
    >
      {/* Video — autoplays muted on loop */}
      <video
        src={proj.video}
        className="absolute inset-0 w-full h-full object-cover"
        ref={(el) => { if (el) { el.muted = true; el.play().catch(() => {}); } }}
        loop
        playsInline
        style={{ opacity: 1 }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(28,28,28,0.25)",
          transition: "opacity 0.4s ease",
          opacity: hovered ? 0 : 1,
        }}
      />
      {/* Info overlay */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          padding: "40px 14px 14px",
          background:
            "linear-gradient(to top, rgba(28,28,28,0.95) 0%, transparent 100%)",
          transition:
            "opacity 0.35s ease, transform 0.35s ease",
          opacity: hovered ? 1 : 0,
          transform: hovered
            ? "translateY(0)"
            : "translateY(5px)",
          pointerEvents: "none",
        }}
      >
        <p
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 500,
            fontSize: "13px",
            color: "#fff",
            lineHeight: 1.3,
          }}
        >
          {proj.title}
        </p>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "9px",
            letterSpacing: "0.2em",
            color: ACCENT,
            marginTop: "4px",
          }}
        >
          {proj.client} · {proj.year}
        </p>
      </div>
    </div>
  );
}

function MotionModalPlayer({ url, aspect }: { url: string; aspect?: string }) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const handleClick = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) { v.pause(); setPlaying(false); }
    else { v.play().catch(() => {}); setPlaying(true); }
  };
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };
  const parts = (aspect || "4/5").split("/").map(Number);
  const ratio = parts[0] / parts[1];
  const cap = aspect === "9/16" || aspect === "4/5" ? "500px" : "960px";
  return (
    <div
      className="relative overflow-hidden cursor-pointer"
      style={{
        aspectRatio: aspect || "4/5",
        background: "#111",
        width: `min(calc(72vh * ${ratio}), ${cap})`,
        maxWidth: "100%",
      }}
      onClick={handleClick}
    >
      <video
        ref={videoRef}
        src={url}
        className="w-full h-full object-contain"
        preload="auto"
        playsInline
        onEnded={() => setPlaying(false)}
      />
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transition: "opacity 0.3s ease",
          opacity: playing ? 0 : 1,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            border: `1.5px solid ${ACCENT}80`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(28,28,28,0.6)",
          }}
        >
          <Play size={22} style={{ color: ACCENT, marginLeft: "3px" }} />
        </div>
      </div>
      {playing && <MuteButton muted={muted} onToggle={toggleMute} />}
    </div>
  );
}

// ─── Motion Design Page ────────────────────────────────────────────────────────

function MotionPage() {
  const [modal, setModal] = useState<
    (typeof MOTION_PROJECTS)[0] | null
  >(null);

  return (
    <div
      className="min-h-screen"
      style={{ background: "#1c1c1c", color: "#f2f0ec" }}
    >
      {/* Reel */}
      <section
        style={{
          paddingTop: "96px",
          padding: "96px 32px 64px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.35em",
              color: "rgba(255,255,255,0.5)",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Showreel — 2026
          </p>
          <ReelPlayer url={MOTION_REEL_URL} />
        </div>
      </section>

      {/* 3×4 grid */}
      <section style={{ padding: "0 32px 112px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              borderTop: "1px solid rgba(255,255,255,0.14)",
              paddingTop: "28px",
              marginBottom: "24px",
            }}
          >
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 600,
                fontSize: "1.4rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Selected Work
            </h2>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                letterSpacing: "0.3em",
                color: "rgba(255,255,255,0.62)",
              }}
            >
              {MOTION_PROJECTS.length} projects
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              alignItems: "flex-start",
            }}
          >
            {MOTION_PROJECTS.map((proj) => {
              const landscape = proj.aspect === "16/9";
              return (
                <div
                  key={proj.id}
                  style={{
                    flex: landscape
                      ? "0 0 calc(66.67% - 3.33px)"
                      : "0 0 calc(33.33% - 6.67px)",
                    minWidth: 0,
                  }}
                >
                  <MotionGridCard
                    proj={proj}
                    onClick={() => setModal(proj)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {modal && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-8"
          style={{
            background: "rgba(28,28,28,0.88)",
            backdropFilter: "blur(10px)",
          }}
          onClick={() => setModal(null)}
        >
          <div
            style={{
              background: "#242424",
              width: "fit-content",
              maxWidth: `min(${modal.aspect === "9/16" || modal.aspect === "4/5" ? "500px" : "960px"}, 90vw)`,
              maxHeight: "90vh",
              overflowY: "auto",
              scrollbarWidth: "none",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {modal.video && (
              <MotionModalPlayer url={modal.video} aspect={modal.aspect} />
            )}
            <div style={{ padding: "32px 36px 36px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: "'Road Rage', sans-serif",
                      fontSize: "1.9rem",
                      letterSpacing: "0.07em",
                      textTransform: "uppercase",
                      color: "#fff",
                      lineHeight: 1,
                    }}
                  >
                    {modal.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "10px",
                      letterSpacing: "0.3em",
                      color: ACCENT,
                      textTransform: "uppercase",
                      marginTop: "8px",
                    }}
                  >
                    {modal.client} &nbsp;·&nbsp; {modal.year}
                  </p>
                </div>
                <button
                  onClick={() => setModal(null)}
                  style={{
                    color: "rgba(255,255,255,0.35)",
                    padding: "4px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    marginLeft: "16px",
                    flexShrink: 0,
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#fff")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color =
                      "rgba(255,255,255,0.35)")
                  }
                >
                  <X size={20} />
                </button>
              </div>
              <div
                style={{
                  width: "32px",
                  height: "1px",
                  background: ACCENT,
                  marginBottom: "20px",
                }}
              />
              <p
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: 1.75,
                  color: "rgba(255,255,255,0.55)",
                  whiteSpace: "pre-line",
                }}
              >
                {modal.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Illustration Modal ────────────────────────────────────────────────────────

function IllustrationModal({
  item,
  description,
  onClose,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
}: {
  item: (typeof ILLUSTRATION_ITEMS)[0];
  description: string;
  onClose: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}) {
  const navBtn: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 80,
    background: "rgba(28,28,28,0.6)",
    border: "1px solid rgba(255,255,255,0.18)",
    backdropFilter: "blur(8px)",
    color: "#fff",
    cursor: "pointer",
    width: "44px",
    height: "44px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s ease, border-color 0.2s ease",
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center"
      style={{
        background: "rgba(20,20,20,0.92)",
        backdropFilter: "blur(18px)",
        padding: "32px",
      }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "24px",
          right: "28px",
          zIndex: 80,
          background: "none",
          border: "none",
          color: "rgba(255,255,255,0.5)",
          cursor: "pointer",
          transition: "color 0.2s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "#fff")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color =
            "rgba(255,255,255,0.5)")
        }
      >
        <X size={20} />
      </button>

      {/* Prev */}
      {hasPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          style={{ ...navBtn, left: "20px" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "rgba(28,28,28,0.9)";
            e.currentTarget.style.borderColor = ACCENT;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "rgba(28,28,28,0.6)";
            e.currentTarget.style.borderColor =
              "rgba(255,255,255,0.18)";
          }}
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {/* Next */}
      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          style={{ ...navBtn, right: "20px" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "rgba(28,28,28,0.9)";
            e.currentTarget.style.borderColor = ACCENT;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "rgba(28,28,28,0.6)";
            e.currentTarget.style.borderColor =
              "rgba(255,255,255,0.18)";
          }}
        >
          <ChevronRight size={20} />
        </button>
      )}

      <div
        style={{
          maxWidth: "min(90vw, 1100px)",
          width: "100%",
          cursor: "default",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Full image — no cropping */}
        <img
          src={item.url.replace(/w=\d+&h=\d+/, "w=1400&h=1400")}
          alt={item.title}
          style={{
            display: "block",
            width: "100%",
            maxHeight: "68vh",
            objectFit: "contain",
          }}
        />

        {/* Permanent footer */}
        <div
          style={{
            padding: "20px 24px 18px",
            background: "rgba(20,20,20,0.6)",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "16px",
              marginBottom: "14px",
            }}
          >
            <h2
              style={{
                fontFamily: "'Road Rage', sans-serif",
                fontSize: "1.6rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#fff",
                lineHeight: 1,
              }}
            >
              {item.title}
            </h2>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "9px",
                letterSpacing: "0.3em",
                color: ACCENT,
                textTransform: "uppercase",
              }}
            >
              {item.year}
            </span>
          </div>
          <div
            style={{
              width: "24px",
              height: "1px",
              background: ACCENT,
              marginBottom: "14px",
            }}
          />
          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 400,
              fontSize: "13px",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.78)",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              paddingBottom: "8px",
              whiteSpace: "pre-line",
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Illustration Page ─────────────────────────────────────────────────────────

function IllustrationPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(
    null,
  );
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [modal, setModal] = useState<
    (typeof ILLUSTRATION_ITEMS)[0] | null
  >(null);

  const scrollIntervalRef = useRef<ReturnType<
    typeof setInterval
  > | null>(null);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 20);
    setShowRight(
      el.scrollLeft < el.scrollWidth - el.clientWidth - 20,
    );
  };

  useEffect(() => {
    handleScroll();
  }, []);

  const startScroll = (dir: "left" | "right") => {
    if (scrollIntervalRef.current) return;
    scrollIntervalRef.current = setInterval(() => {
      scrollRef.current?.scrollBy({
        left: dir === "left" ? -6 : 6,
      });
    }, 16);
  };

  const stopScroll = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const threshold = 80;
    if (x < threshold) {
      startScroll("left");
    } else if (x > rect.width - threshold) {
      startScroll("right");
    } else {
      stopScroll();
    }
  };

  useEffect(() => () => stopScroll(), []);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#1c1c1c", color: "#f2f0ec" }}
    >
      <div
        className="flex-1 flex flex-col justify-center"
        style={{ paddingTop: "96px" }}
      >
        <div
          style={{ padding: "0 32px", marginBottom: "36px" }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              borderTop: "1px solid rgba(255,255,255,0.14)",
              paddingTop: "28px",
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 600,
                fontSize: "1.4rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Selected Work
            </h2>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                letterSpacing: "0.3em",
                color: "rgba(255,255,255,0.62)",
              }}
            >
              {ILLUSTRATION_ITEMS.length} works
            </span>
          </div>
        </div>

        <div
          className="relative"
          style={{ paddingBottom: "80px" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={stopScroll}
        >
          {/* Left edge indicator — visual only, no pointer events */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "80px",
              zIndex: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(to right, rgba(28,28,28,0.55) 0%, transparent 100%)",
              opacity: showLeft ? 1 : 0,
              pointerEvents: "none",
              transition: "opacity 0.3s ease",
            }}
          >
            <ChevronLeft
              size={22}
              style={{ color: "rgba(255,255,255,0.55)" }}
            />
          </div>

          {/* Right edge indicator — visual only, no pointer events */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "80px",
              zIndex: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(to left, rgba(28,28,28,0.55) 0%, transparent 100%)",
              opacity: showRight ? 1 : 0,
              pointerEvents: "none",
              transition: "opacity 0.3s ease",
            }}
          >
            <ChevronRight
              size={22}
              style={{ color: "rgba(255,255,255,0.55)" }}
            />
          </div>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            style={{
              display: "flex",
              gap: "12px",
              overflowX: "auto",
              padding: "0 32px",
              scrollbarWidth: "none",
              alignItems: "flex-end",
              WebkitOverflowScrolling: "touch" as any,
              touchAction: "pan-x",
            }}
          >
            {ILLUSTRATION_ITEMS.map((item) => (
              <div
                key={item.id}
                className="relative flex-shrink-0 overflow-hidden cursor-pointer"
                style={{
                  height: "520px",
                  background: "#242424",
                }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setModal(item)}
              >
                <img
                  src={item.url}
                  alt={item.title}
                  style={{
                    height: "100%",
                    width: "auto",
                    display: "block",
                    transition:
                      "filter 0.55s ease, transform 0.65s ease",
                    filter:
                      hoveredId === item.id
                        ? "brightness(0.88) saturate(1.05)"
                        : "brightness(0.55) saturate(0.6) grayscale(30%)",
                    transform:
                      hoveredId === item.id
                        ? "scale(1.04)"
                        : "scale(1)",
                  }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0"
                  style={{
                    padding: "48px 18px 18px",
                    background:
                      "linear-gradient(to top, rgba(28,28,28,0.95) 0%, transparent 100%)",
                    transition:
                      "opacity 0.4s ease, transform 0.4s ease",
                    opacity: hoveredId === item.id ? 1 : 0,
                    transform:
                      hoveredId === item.id
                        ? "translateY(0)"
                        : "translateY(6px)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Barlow', sans-serif",
                      fontWeight: 500,
                      fontSize: "13px",
                      color: "#fff",
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "9px",
                      letterSpacing: "0.25em",
                      color: ACCENT,
                      marginTop: "4px",
                    }}
                  >
                    {item.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Illustration Modal */}
      {modal &&
        (() => {
          const idx = ILLUSTRATION_ITEMS.findIndex(
            (i) => i.id === modal.id,
          );
          const navigate = (next: number) => {
            setModal(ILLUSTRATION_ITEMS[next]);
          };
          return (
            <IllustrationModal
              item={modal}
              description={modal.description}
              onClose={() => setModal(null)}
              hasPrev={idx > 0}
              hasNext={idx < ILLUSTRATION_ITEMS.length - 1}
              onPrev={() => navigate(idx - 1)}
              onNext={() => navigate(idx + 1)}
            />
          );
        })()}
    </div>
  );
}

const isVideoUrl = (url: string) =>
  /\.(mp4|webm|mov|ogg)(\?.*)?$/i.test(url);

const isYouTubeUrl = (url: string) =>
  /youtube\.com|youtu\.be/.test(url);

const getYouTubeEmbedUrl = (url: string) => {
  // already an embed URL
  if (url.includes("youtube.com/embed/")) return url;
  // youtu.be/ID
  const short = url.match(/youtu\.be\/([^?&]+)/);
  if (short) return `https://www.youtube.com/embed/${short[1]}`;
  // youtube.com/watch?v=ID
  const watch = url.match(/[?&]v=([^?&]+)/);
  if (watch) return `https://www.youtube.com/embed/${watch[1]}`;
  return url;
};

// ─── Game Art Page ─────────────────────────────────────────────────────────────

function GameArtPage() {
  const [modal, setModal] = useState<
    (typeof GAME_PROJECTS)[0] | null
  >(null);
  const [modalImageIdx, setModalImageIdx] = useState(0);
  const [modalMuted, setModalMuted] = useState(true);
  const [hoveredId, setHoveredId] = useState<number | null>(
    null,
  );
  const openModal = (proj: (typeof GAME_PROJECTS)[0]) => {
    setModal(proj);
    setModalImageIdx(0);
    setModalMuted(true);
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "#1c1c1c", color: "#f2f0ec" }}
    >
      <section
        style={{ paddingTop: "96px", paddingBottom: "80px" }}
      >
        <div
          style={{ padding: "0 32px", marginBottom: "16px" }}
        >
          <div
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
              borderTop: "1px solid rgba(255,255,255,0.14)",
              paddingTop: "28px",
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 600,
                fontSize: "1.4rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Projects
            </h2>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                letterSpacing: "0.3em",
                color: "rgba(255,255,255,0.62)",
              }}
            >
              {GAME_PROJECTS.length} projects
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", height: `${GAME_PROJECTS.length * 330}px` }}>
        {GAME_PROJECTS.map((proj, i) => (
          <div
            key={proj.id}
            className="relative overflow-hidden cursor-pointer"
            style={{
              flex: hoveredId === proj.id ? "1.5" : hoveredId ? "0.75" : "1",
              transition: "flex 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
              display: "flex",
              justifyContent: "center",
              maxWidth: "1400px",
              margin: "0 auto",
              width: "100%",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              borderTop:
                i === 0
                  ? "1px solid rgba(255,255,255,0.05)"
                  : "none",
            }}
            onMouseEnter={() => setHoveredId(proj.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => openModal(proj)}
          >
            {/* Layer 1 — background cover image */}
            <img
              src={proj.coverImage}
              alt={proj.title}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                zIndex: 1,
                transition:
                  "filter 0.55s ease, transform 0.65s ease",
                filter:
                  hoveredId === proj.id
                    ? "grayscale(0%) brightness(0.6) saturate(1.1)"
                    : "grayscale(60%) brightness(0.32)",
                transform:
                  hoveredId === proj.id
                    ? "scale(1.02)"
                    : "scale(1)",
              }}
            />

            {/* Layer 2 — character art, rises from bottom */}
            <div
              style={{
                position: "absolute",
                top: "60%",
                right: "5%",
                width: "22vw",
                minWidth: "340px",
                maxWidth: "680px",
                height: "auto",
                aspectRatio: "1/1",
                zIndex: 2,
                pointerEvents: "none",
                transform:
                  hoveredId === proj.id
                    ? "translateY(-50%)"
                    : "translateY(100%)",
                transition:
                  "transform 0.52s cubic-bezier(0.22,0.61,0.36,1), opacity 0.4s ease",
                opacity: hoveredId === proj.id ? 1 : 0,
              }}
            >
              <img
                src={proj.characterArt}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  objectPosition: "center bottom",
                  maskImage:
                    "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.5) 14%, black 36%)",
                  WebkitMaskImage:
                    "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.5) 14%, black 36%)",
                }}
              />
            </div>

            {/* Layer 3 — left gradient shadow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                zIndex: 3,
                background:
                  "linear-gradient(to right, rgba(28,28,28,0.82) 0%, rgba(28,28,28,0.45) 35%, transparent 65%)",
              }}
            />

            {/* Layer 4 — text */}
            <div
              className="absolute inset-0 flex items-center"
              style={{ zIndex: 4, padding: "0 48px", textShadow: "0 2px 12px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.5)" }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  letterSpacing: "0.4em",
                  width: "56px",
                  flexShrink: 0,
                  transition: "color 0.35s ease",
                  color:
                    hoveredId === proj.id
                      ? ACCENT
                      : "rgba(255,255,255,0.35)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontFamily: "'Road Rage', sans-serif",
                    fontSize: "clamp(2rem, 3vw, 3.2rem)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    lineHeight: 1,
                    transition: "color 0.35s ease",
                    color:
                      hoveredId === proj.id
                        ? "#ffffff"
                        : "rgba(255,255,255,0.85)",
                  }}
                >
                  {proj.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "10px",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    marginTop: "10px",
                    transition: "color 0.35s ease",
                    color:
                      hoveredId === proj.id
                        ? ACCENT
                        : "rgba(255,255,255,0.58)",
                  }}
                >
                  {proj.subtitle}
                </p>
              </div>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "13px",
                  letterSpacing: "0.2em",
                  transition: "color 0.35s ease",
                  color:
                    hoveredId === proj.id
                      ? "rgba(255,255,255,0.62)"
                      : "rgba(255,255,255,0.28)",
                }}
              >
                {proj.year}
              </span>
            </div>

            {/* Layer 4 — accent underline */}
            <div
              className="absolute bottom-0 left-0 h-[2px]"
              style={{
                zIndex: 4,
                background: ACCENT,
                transition:
                  "width 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
                width: hoveredId === proj.id ? "100%" : "0%",
              }}
            />
          </div>
        ))}
        </div>
      </section>

      {/* Project Modal */}
      {modal && (
        <div
          className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto"
          style={{
            background: "rgba(28,28,28,0.22)",
            backdropFilter: "blur(12px)",
            padding: "40px 32px",
          }}
          onClick={() => setModal(null)}
        >
          <div
            style={{
              background: "#0f0f0f",
              border: "1px solid rgba(255,255,255,0.14)",
              maxWidth: "1200px",
              width: "100%",
              margin: "auto",
              
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative"
              style={{
                background: "#1c1c1c",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "72vh",
                overflow: "hidden",
              }}
            >
              {(() => {
                const src = modal.images[modalImageIdx];
                const mediaStyle: React.CSSProperties = {
                  display: "block",
                  maxWidth: "100%",
                  maxHeight: "72vh",
                  width: "auto",
                  height: "auto",
                };
                if (isYouTubeUrl(src)) return (
                  <div key={modalImageIdx} style={{ width: "100%", aspectRatio: "16/9", position: "relative", maxHeight: "72vh" }}>
                    <iframe
                      src={`${getYouTubeEmbedUrl(src)}?autoplay=1&mute=1&loop=1&rel=0`}
                      className="absolute inset-0 w-full h-full"
                      allow="autoplay; fullscreen"
                      style={{ border: "none" }}
                    />
                  </div>
                );
                if (isVideoUrl(src)) return (
                  <video
                    key={modalImageIdx}
                    src={src}
                    style={mediaStyle}
                    autoPlay
                    muted={modalMuted}
                    loop
                    playsInline
                  />
                );
                return (
                  <img
                    key={modalImageIdx}
                    src={src}
                    alt={`${modal.title} view ${modalImageIdx + 1}`}
                    style={mediaStyle}
                  />
                );
              })()}
              {isVideoUrl(modal.images[modalImageIdx]) && (
                <MuteButton
                  muted={modalMuted}
                  onToggle={(e) => { e.stopPropagation(); setModalMuted((m) => !m); }}
                />
              )}
              {modal.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setModalImageIdx((n) =>
                        Math.max(0, n - 1),
                      )
                    }
                    disabled={modalImageIdx === 0}
                    style={{
                      position: "absolute",
                      left: "16px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "rgba(28,28,28,0.65)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.6), 0 1px 4px rgba(0,0,0,0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      cursor: "pointer",
                      opacity: modalImageIdx === 0 ? 0.25 : 1,
                      transition: "opacity 0.2s ease",
                    }}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() =>
                      setModalImageIdx((n) =>
                        Math.min(
                          modal.images.length - 1,
                          n + 1,
                        ),
                      )
                    }
                    disabled={
                      modalImageIdx === modal.images.length - 1
                    }
                    style={{
                      position: "absolute",
                      right: "16px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "rgba(28,28,28,0.65)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.6), 0 1px 4px rgba(0,0,0,0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      cursor: "pointer",
                      opacity:
                        modalImageIdx ===
                        modal.images.length - 1
                          ? 0.25
                          : 1,
                      transition: "opacity 0.2s ease",
                    }}
                  >
                    <ChevronRight size={18} />
                  </button>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "16px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      display: "flex",
                      gap: "8px",
                    }}
                  >
                    {modal.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setModalImageIdx(idx)}
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          border: "none",
                          cursor: "pointer",
                          transition:
                            "background 0.2s ease, transform 0.2s ease",
                          background:
                            idx === modalImageIdx
                              ? ACCENT
                              : "rgba(255,255,255,0.5)",
                          transform:
                            idx === modalImageIdx
                              ? "scale(1.3)"
                              : "scale(1)",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.5)",
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div style={{ padding: "36px 40px 40px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: "24px",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: "'Road Rage', sans-serif",
                      fontSize: "2.4rem",
                      letterSpacing: "0.07em",
                      textTransform: "uppercase",
                      color: "#fff",
                      lineHeight: 1,
                    }}
                  >
                    {modal.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "10px",
                      letterSpacing: "0.3em",
                      color: ACCENT,
                      textTransform: "uppercase",
                      marginTop: "10px",
                    }}
                  >
                    {modal.subtitle}
                  </p>
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "10px",
                      letterSpacing: "0.25em",
                      color: "rgba(255,255,255,0.62)",
                      marginTop: "4px",
                    }}
                  >
                    {modal.year}
                  </p>
                </div>
                <button
                  onClick={() => setModal(null)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "rgba(255,255,255,0.5)",
                    cursor: "pointer",
                    padding: "4px",
                    marginLeft: "16px",
                    flexShrink: 0,
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#fff")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color =
                      "rgba(255,255,255,0.5)")
                  }
                >
                  <X size={20} />
                </button>
              </div>
              <div
                style={{
                  width: "32px",
                  height: "1px",
                  background: ACCENT,
                  marginBottom: "24px",
                }}
              />
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "9px",
                    letterSpacing: "0.35em",
                    color: "rgba(255,255,255,0.62)",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                    
                  }}
                >
                  Project Description
                </label>
                <p
                  style={{
                    width: "100%",
                    color: "rgba(255,255,255,0.6)",
                    fontFamily: "'Barlow', sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: 1.75,
                    whiteSpace: "pre-line",
                    
                  }}
                >
                  {modal.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <>
      {/* Global scroll-aware header — present on every page */}
      <GlobalHeader
        page={page}
        onBack={() => setPage("home")}
        aboutOpen={aboutOpen}
        onToggleAbout={() => setAboutOpen((o) => !o)}
      />

      {/* About panel + backdrop — rendered above everything */}
      {aboutOpen && (
        <>
          {/* Invisible click-away target — no darkening */}
          <div
            className="fixed left-0 right-0 bottom-0 z-40"
            style={{ top: "77px" }}
            onClick={() => setAboutOpen(false)}
          />
          <AboutPanel onClose={() => setAboutOpen(false)} />
        </>
      )}

      {page === "home" && <LandingPage onNavigate={setPage} />}
      {page === "motion" && <MotionPage />}
      {page === "illustration" && <IllustrationPage />}
      {page === "gameart" && <GameArtPage />}
    </>
  );
}