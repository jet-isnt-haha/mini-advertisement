import { Button } from "@arco-design/web-react";
import { useEffect, useRef, useState } from "react";
import { IconMute, IconSound } from "@arco-design/web-react/icon";
interface VideoPlayerProps {
  videoResource: string;
  onEnded?: () => void;
}

const VideoPlayer = ({ videoResource, onEnded }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);
  return (
    <div className="relative">
      <video
        ref={videoRef}
        src={videoResource}
        autoPlay
        muted={isMuted}
        playsInline
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
        disableRemotePlayback
        onEnded={onEnded}
        onContextMenu={(e) => e.preventDefault()} // 禁用右键菜单
        style={{
          width: "100%",
          display: "block",
          pointerEvents: "none", // 禁用视频交互
        }}
      />

      {/* 自定义进度条 */}
      <div
        style={{
          position: "absolute",
          left: 0,
          width: "100%",
          height: "4px",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: "#1890ff",
            transition: "width 0.1s linear",
          }}
        />
      </div>
      <Button
        shape="circle"
        type="secondary"
        icon={isMuted ? <IconMute /> : <IconSound />}
        onClick={() => setIsMuted((prev) => !prev)}
        style={{
          position: "absolute",
          right: 0,
          top: 0,
        }}
      />
    </div>
  );
};

export default VideoPlayer;
