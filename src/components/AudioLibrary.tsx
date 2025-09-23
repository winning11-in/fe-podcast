import React, { useState } from "react";
import { Play, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  AudioLibraryContainer,
  LibraryHeader,
  TabNavigation,
  TabButton,
  SearchContainer,
  SearchInput,
  ContentHeader,
  ContentTitle,
  TrackCount,
  ContentSubtitle,
  AudioGrid,
  AudioCard,
  CardThumbnail,
  ThumbnailImage,
  PlayOverlay,
  CategoryBadge,
  CardContentStyled,
  TrackTitle,
  TrackAuthor,
  TrackDescription,
  VideoFeatured,
  FeaturedVideo,
  VideoEmbed,
  VideoSidebar,
  VideoSidebarTitle,
  VideoCardSmall,
  VideoThumbnailSmall,
  VideoDuration,
  VideoInfoSmall,
  VideoTitleSmall,
  VideoChannel,
  VideoViews,
} from "./AudioLibrary.styles";
import { INTERNET_AUDIO, WEB_DEVELOPMENT } from "../utils/Audio";

interface AudioTrack {
  id: string;
  title: string;
  author: string;
  description: string;
  duration: string;
  listeners: string;
  date: string;
  thumbnail: string;
  category: string;
  audioUrl?: string;
}

interface Video {
  id: string;
  title: string;
  channel: string;
  duration: string;
  views: string;
  thumbnail: string;
  embedUrl?: string;
}

const AudioLibrary = () => {
  const [activeTab, setActiveTab] = useState<"audio" | "videos">("audio");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const getDefaultAudioThumbnail = () => {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="300" height="200" fill="url(#grad)"/>
        <circle cx="150" cy="100" r="30" fill="rgba(255,255,255,0.2)"/>
        <polygon points="140,85 140,115 165,100" fill="white"/>
        <text x="150" y="140" text-anchor="middle" fill="white" font-family="Arial" font-size="12">Audio Track</text>
      </svg>
    `)}`;
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = getDefaultAudioThumbnail();
  };

  const audioTracks: AudioTrack[] = [
    {
      id: "1",
      title: "इंटरनेट का जादू - कैसे काम करता है हमारा डिजिटल संसार",
      author: "Digital Education Hindi",
      description:
        "ARPANET से लेकर आज के इंटरनेट तक - समझिए कैसे काम करता है हमारा डिजिटल संसार।",
      duration: "25:30",
      listeners: "3,547",
      date: "2024-09-20",
      thumbnail:
        "https://res.cloudinary.com/dgvoocfla/image/upload/c_thumb,w_300,h_200/v1758557619/%E0%A4%87%E0%A4%82%E0%A4%9F%E0%A4%B0%E0%A4%A8%E0%A5%87%E0%A4%9F_%E0%A4%95%E0%A4%BE_%E0%A4%9C%E0%A4%BE%E0%A4%A6%E0%A5%82__%E0%A4%95%E0%A5%88%E0%A4%B8%E0%A5%87_%E0%A4%95%E0%A4%BE%E0%A4%AE_%E0%A4%95%E0%A4%B0%E0%A4%A4%E0%A4%BE_%E0%A4%B9%E0%A5%88_%E0%A4%B9%E0%A4%AE%E0%A4%BE%E0%A4%B0%E0%A4%BE_%E0%A4%A1%E0%A4%BF%E0%A4%9C%E0%A4%BF%E0%A4%9F%E0%A4%B2_%E0%A4%B8%E0%A4%82%E0%A4%B8%E0%A4%BE%E0%A4%B0_-_ARPANET__kajgmt.mp4",
      category: "Technology",
      audioUrl: INTERNET_AUDIO,
    },
    {
      id: "2",
      title: "CORS क्या है? क्यों जरूरी है? - वेब सिक्यूरिटी",
      author: "Web Security Hindi",
      description:
        "CORS की पूरी जानकारी - क्यों जरूरी है, कैसे काम करता है, और वेब सिक्यूरिटी में इसकी भूमिका।",
      duration: "18:42",
      listeners: "2,891",
      date: "2024-09-21",
      thumbnail:
        "https://res.cloudinary.com/dgvoocfla/image/upload/c_thumb,w_300,h_200/v1758559504/CORS_%E0%A4%95%E0%A5%8D%E0%A4%AF%E0%A4%BE_%E0%A4%B9%E0%A5%88__%E0%A4%95%E0%A5%8D%E0%A4%AF%E0%A5%8B%E0%A4%82_%E0%A5%9B%E0%A4%B0%E0%A5%82%E0%A4%B0%E0%A5%80_%E0%A4%B9%E0%A5%88__%E0%A5%9B%E0%A5%80%E0%A4%B0%E0%A5%8B_%E0%A4%B8%E0%A5%87_%E0%A4%8F%E0%A4%A1%E0%A4%B5%E0%A4%BE%E0%A4%82%E0%A4%B8_%E0%A4%A4%E0%A4%95__%E0%A4%B5%E0%A5%87%E0%A4%AC_%E0%A4%B8%E0%A4%BF%E0%A4%95%E0%A5%8D%E0%A4%AF%E0%A5%8B%E0%A4%B0%E0%A4%BF%E0%A4%9F%E0%A5%80_vqfxlu.mp4",
      category: "Web Security",
      audioUrl: WEB_DEVELOPMENT,
    },
  ];

  const videos: Video[] = [
    {
      id: "1",
      title: "Machine Learning Algorithms Explained",
      channel: "TechEd Academy",
      duration: "15:42",
      views: "1.2M",
      thumbnail: "/api/placeholder/300/200",
    },
    {
      id: "2",
      title: "React Hooks Deep Dive Tutorial",
      channel: "WebDev Masters",
      duration: "22:18",
      views: "890K",
      thumbnail: "/api/placeholder/300/200",
    },
    {
      id: "3",
      title: "Cloud Computing Best Practices",
      channel: "Cloud Academy",
      duration: "18:35",
      views: "654K",
      thumbnail: "/api/placeholder/300/200",
    },
  ];

  const filteredAudioTracks = audioTracks.filter(
    (track) =>
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.channel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTrackClick = (track: AudioTrack) => {
    navigate(`/audio-player/${track.id}`);
  };

  return (
    <AudioLibraryContainer>
      <LibraryHeader>
        <TabNavigation>
          <TabButton
            isActive={activeTab === "audio"}
            onClick={() => setActiveTab("audio")}
            startIcon={<span style={{ fontSize: "16px" }}>🎵</span>}
          >
            Audio Library
          </TabButton>
          <TabButton
            isActive={activeTab === "videos"}
            onClick={() => setActiveTab("videos")}
            startIcon={<span style={{ fontSize: "16px" }}>📺</span>}
          >
            Related Videos
          </TabButton>
        </TabNavigation>

        <SearchContainer>
          <Search
            style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
              color: "currentColor",
              zIndex: 1,
              fontSize: 20,
            }}
          />
          <SearchInput
            placeholder="Search educational content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="outlined"
            size="small"
          />
        </SearchContainer>
      </LibraryHeader>

      {activeTab === "audio" && (
        <>
          <ContentHeader>
            <ContentTitle variant="h4">
              <span style={{ fontSize: "28px" }}>📊</span>
              Audio Library
            </ContentTitle>
            <TrackCount>
              {filteredAudioTracks.length} tracks available
            </TrackCount>
          </ContentHeader>

          <AudioGrid>
            {filteredAudioTracks.map((track) => (
              <AudioCard key={track.id} onClick={() => handleTrackClick(track)}>
                <CardThumbnail>
                  <ThumbnailImage
                    src={track.thumbnail}
                    alt={track.title}
                    onError={handleImageError}
                  />
                  <CategoryBadge label={track.category} size="small" />
                  <PlayOverlay size="large">
                    <Play size={24} />
                  </PlayOverlay>
                </CardThumbnail>
                <CardContentStyled>
                  <TrackTitle variant="h6">{track.title}</TrackTitle>
                  <TrackAuthor variant="body2">by {track.author}</TrackAuthor>
                  <TrackDescription variant="body2">
                    {track.description}
                  </TrackDescription>
                </CardContentStyled>
              </AudioCard>
            ))}
          </AudioGrid>
        </>
      )}

      {activeTab === "videos" && (
        <>
          <ContentHeader>
            <ContentTitle variant="h4">Related Educational Videos</ContentTitle>
            <ContentSubtitle>
              Enhance your learning with visual tutorials and demonstrations
            </ContentSubtitle>
          </ContentHeader>

          <VideoFeatured>
            <FeaturedVideo>
              <VideoEmbed>
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Featured Educational Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </VideoEmbed>
            </FeaturedVideo>

            <VideoSidebar>
              <VideoSidebarTitle variant="h6">More Videos</VideoSidebarTitle>
              {filteredVideos.map((video) => (
                <VideoCardSmall key={video.id}>
                  <VideoThumbnailSmall>
                    <ThumbnailImage
                      src={video.thumbnail}
                      alt={video.title}
                      onError={handleImageError}
                    />
                    <VideoDuration>{video.duration}</VideoDuration>
                  </VideoThumbnailSmall>
                  <VideoInfoSmall>
                    <VideoTitleSmall variant="subtitle2">
                      {video.title}
                    </VideoTitleSmall>
                    <VideoChannel variant="body2">{video.channel}</VideoChannel>
                    <VideoViews variant="caption">
                      {video.views} views
                    </VideoViews>
                  </VideoInfoSmall>
                </VideoCardSmall>
              ))}
            </VideoSidebar>
          </VideoFeatured>
        </>
      )}
    </AudioLibraryContainer>
  );
};

export default AudioLibrary;
