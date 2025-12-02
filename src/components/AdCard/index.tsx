import { Card } from "@arco-design/web-react";
import MoreOperate from "./components/MoreOperate";
import type { advertisementMeta } from "@/types";
import { useAdOperator } from "@/contexts/AdOperator/useAdOperator";

const AdCard = (config: advertisementMeta) => {
  const { clickAdFromAdList } = useAdOperator();
  const { content, title, publisher, price, clickCount, redirectUrl } = config;
  return (
    <Card
      style={{ width: 360 }}
      title={title}
      extra={<MoreOperate {...config} />}
      hoverable={true}
      bodyStyle={{
        paddingInline: "30px",
        height: "180px",
      }}
      onClick={() => {
        // 确保带协议
        const ensureProtocol = (url?: string) => {
          if (!url) return url;
          if (/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(url)) return url; // 已有协议
          return `https://${url}`; // 默认加 https
        };

        const targetUrl = ensureProtocol(redirectUrl);

        if (targetUrl) {
          const newWin = window.open(targetUrl, "_blank");
          if (newWin) newWin.opener = null;
        } else {
          // 可加提示或 fallback
          console.warn("无效的跳转地址:", redirectUrl);
        }

        clickAdFromAdList(config.id);
      }}
      // ...existing code...
    >
      <div className="flex flex-col h-full">
        <div className="text-gray-300">{publisher}</div>
        <div className="flex-1 overflow-hidden">{content}</div>
        <div className="flex justify-between mt-auto">
          <div className="text-red-500">热度:{clickCount}</div>
          <div className="text-blue-500">出价:{price}</div>
        </div>
      </div>
    </Card>
  );
};

export default AdCard;
