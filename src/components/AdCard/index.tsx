/* eslint-disable react-hooks/purity */
import { Card } from "@arco-design/web-react";
import MoreOperate from "./components/MoreOperate";
import CardContent from "./components/CardContent";
import type { advertisementMeta } from "@/types";
import { useAdOperator } from "@/contexts/AdOperator/useAdOperator";
import { useMemo } from "react";
import { useVideoModal } from "./hooks/useVideoModal";

const AdCard = (config: advertisementMeta) => {
  const {
    content,
    title,
    publisher,
    price,
    clickCount,
    redirectUrl,
    videosInfo,
  } = config;

  const { clickAdFromAdList } = useAdOperator();
  const { openVideoModal, contextHolder } = useVideoModal();

  // 随机选择视频
  const randomVideo = useMemo(
    () => videosInfo[Math.floor(Math.random() * videosInfo.length)],
    [videosInfo]
  );

  const handleCardClick = () => {
    openVideoModal(randomVideo.url, redirectUrl);
    clickAdFromAdList(config.id);
  };

  return (
    <>
      {contextHolder}
      <Card
        style={{ width: 360 }}
        title={title}
        extra={<MoreOperate {...config} />}
        hoverable={true}
        bodyStyle={{
          paddingInline: "30px",
          height: "180px",
        }}
        onClick={handleCardClick}
      >
        <CardContent
          publisher={publisher}
          content={content}
          clickCount={clickCount}
          price={price}
        />
      </Card>
    </>
  );
};

export default AdCard;
