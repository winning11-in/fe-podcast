export interface Track {
  id: string;
  title: string;
  author: string;
  description: string;
  duration: string;
  listeners: string;
  date: string;
  thumbnail: string;
  category: string;
  audioUrl: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  trackCount: number;
  duration: string;
  thumbnail: string;
  createdBy: string;
  createdAt: string;
  tracks: Track[];
  isPublic: boolean;
  tags: string[];
}

// Sample tracks data
export const SAMPLE_TRACKS: Track[] = [
  {
    id: "t1",
    title: "Digital Dreams",
    author: "Synthwave Collective",
    description: "An electronic track with synthwave vibes",
    duration: "4:23",
    listeners: "1.2K",
    date: "2024-01-15",
    thumbnail: "/assets/react.svg",
    category: "Electronic",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
  },
  {
    id: "t2",
    title: "Neon Nights",
    author: "Cyber Punk",
    description: "Retro cyberpunk electronic music",
    duration: "3:45",
    listeners: "890",
    date: "2024-02-20",
    thumbnail: "/assets/ml.png",
    category: "Synthwave",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-04.wav",
  },
  {
    id: "t3",
    title: "Future Bass",
    author: "Wave Rider",
    description: "Modern future bass beats",
    duration: "5:12",
    listeners: "2.1K",
    date: "2024-03-10",
    thumbnail: "/assets/cloud.png",
    category: "Electronic",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-03.wav",
  },
  {
    id: "t4",
    title: "Retro Wave",
    author: "80s Revival",
    description: "Classic 80s style retro wave",
    duration: "4:01",
    listeners: "750",
    date: "2024-01-08",
    thumbnail: "/assets/hook.png",
    category: "Retro",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-02.wav",
  },
  {
    id: "t5",
    title: "Ambient Flow",
    author: "Chill Masters",
    description: "Relaxing ambient music for focus",
    duration: "6:30",
    listeners: "650",
    date: "2024-04-05",
    thumbnail: "/assets/Internet.png",
    category: "Ambient",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-01.wav",
  },
  {
    id: "t7",
    title: "Machine Learning Models",
    author: "AI Podcast",
    description: "Introduction to machine learning models",
    duration: "12:34",
    listeners: "5.2K",
    date: "2024-05-10",
    thumbnail: "/assets/AIIMAGE.jpg",
    category: "Machine Learning",
    audioUrl:
      "https://res.cloudinary.com/dgvoocfla/video/upload/v1758821057/Machine_Learning_Models_rcsgub.mp4",
  },
  {
    id: "t8",
    title: "Types of Machine Learning Models",
    author: "Data Science Weekly",
    description: "Understanding different types of machine learning models",
    duration: "14:13",
    listeners: "3.8K",
    date: "2024-05-15",
    thumbnail: "/assets/ml.png",
    category: "Machine Learning",
    audioUrl:
      "https://res.cloudinary.com/dgvoocfla/video/upload/v1758821057/Types_of_machine_learning_model_ypgn9k.mp4",
  },
  {
    id: "t9",
    title: "Regression",
    author: "Tech Talks",
    description: "Deep dive into regression algorithms",
    duration: "20:32",
    listeners: "7.1K",
    date: "2024-05-20",
    thumbnail: "/assets/AIIMAGE.jpg",
    category: "Machine Learning",
    audioUrl:
      "https://res.cloudinary.com/dgvoocfla/video/upload/v1758821060/Regression_ydmhig.mp4",
  },
  {
    id: "t10",
    title: "Binary Classification",
    author: "AI Insights",
    description: "Understanding binary classification techniques",
    duration: "17:14",
    listeners: "4.5K",
    date: "2024-05-25",
    thumbnail: "/assets/web-d.png",
    category: "Machine Learning",
    audioUrl:
      "https://res.cloudinary.com/dgvoocfla/video/upload/v1758821051/Binary_classification_ohoamw.mp4",
  },
  {
    id: "t11",
    title: "Multiclass Classification",
    author: "ML Masters",
    description: "Exploring multi-class classification methods",
    duration: "24:14",
    listeners: "3.2K",
    date: "2024-05-30",
    thumbnail: "/assets/ml.png",
    category: "Machine Learning",
    audioUrl:
      "https://res.cloudinary.com/dgvoocfla/video/upload/v1758821070/Multiclass_classification_sdqy9h.mp4",
  },
  {
    id: "t12",
    title: "Clustering",
    author: "Data Science Hub",
    description: "Introduction to clustering algorithms",
    duration: "18:32",
    listeners: "4.1K",
    date: "2024-06-05",
    thumbnail: "/assets/AIIMAGE.jpg",
    category: "Machine Learning",
    audioUrl:
      "https://res.cloudinary.com/dgvoocfla/video/upload/v1758821055/Clustering_zfdd3n.mp4",
  },
  {
    id: "t13",
    title: "Deep Learning",
    author: "AI Research",
    description: "Exploring deep learning concepts and architectures",
    duration: "13:26",
    listeners: "6.8K",
    date: "2024-06-10",
    thumbnail: "/assets/ml.png",
    category: "Machine Learning",
    audioUrl:
      "https://res.cloudinary.com/dgvoocfla/video/upload/v1758821040/Deep_learning_g31qwi.mp4",
  },
  {
    id: "t14",
    title: "Artificial Intelligence",
    author: "Future Tech",
    description: "Comprehensive overview of artificial intelligence",
    duration: "17:01",
    listeners: "8.5K",
    date: "2024-06-15",
    thumbnail: "/assets/AIIMAGE.jpg",
    category: "Machine Learning",
    audioUrl:
      "https://res.cloudinary.com/dgvoocfla/video/upload/v1758822269/%E0%A4%A8%E0%A5%8D%E0%A4%AF%E0%A5%82%E0%A4%B0%E0%A4%B2_%E0%A4%A8%E0%A5%87%E0%A4%9F%E0%A4%B5%E0%A4%B0%E0%A5%8D%E0%A4%95_%E0%A4%B8%E0%A5%80%E0%A4%96%E0%A4%A4%E0%A5%87_%E0%A4%95%E0%A5%88%E0%A4%B8%E0%A5%87_%E0%A4%B9%E0%A5%88%E0%A4%82__%E0%A4%AC%E0%A5%88%E0%A4%95%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A5%8B%E0%A4%AA%E0%A5%88%E0%A4%97%E0%A5%87%E0%A4%B6%E0%A4%A8__%E0%A4%B2%E0%A5%89%E0%A4%B8_%E0%A4%AB%E0%A4%82%E0%A4%95%E0%A5%8D%E0%A4%B6%E0%A4%A8_%E0%A4%94%E0%A4%B0_%E0%A4%97%E0%A5%8D%E0%A4%B0_teor5q.mp4",
  },
];

// Sample playlists data
export const SAMPLE_PLAYLISTS: Playlist[] = [
 
  {
    id: "p5",
    title: "Machine Learning",
    description:
      "A curated collection of machine learning podcasts and educational content",
    trackCount: 8,
    duration: "2h 12m",
    thumbnail: "/assets/AIIMAGE.jpg",
    createdBy: "You",
    createdAt: "2024-09-25",
    tracks: SAMPLE_TRACKS.slice(6, 14), // t7, t8, t9, t10, t11, t12, t13, t14
    isPublic: true,
    tags: ["machine learning", "AI", "data science", "education"],
  },
];

// Helper functions
export const getPlaylistById = (id: string): Playlist | undefined => {
  return SAMPLE_PLAYLISTS.find((playlist) => playlist.id === id);
};

export const getTracksByIds = (trackIds: string[]): Track[] => {
  return SAMPLE_TRACKS.filter((track) => trackIds.includes(track.id));
};

export const getPlaylistsByTag = (tag: string): Playlist[] => {
  return SAMPLE_PLAYLISTS.filter((playlist) =>
    playlist.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase()))
  );
};
