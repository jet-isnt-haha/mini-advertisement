/* eslint-disable react-hooks/purity */
import { Card } from "@arco-design/web-react";
import MoreOperate from "./components/MoreOperate";
import CardContent from "./components/CardContent";
import { useVideoModal } from "../../hooks/useVideoModal";
import type { AdvertisementMeta } from "@/types";
import { useAdClickFlow } from "@/hooks/useAdClickFlow";

const AdCard = (config: AdvertisementMeta) => {
  const { content, title, publisher, price, clickCount } = config;

  const { openVideoModal, contextHolder } = useVideoModal();

  const handleCardClick = useAdClickFlow(config, { openVideoModal });

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
