import { Card } from "@arco-design/web-react";
import MoreOperate from "./components/MoreOperate";

interface AdCardProps {
  title: string;
  content: string;
  publisher: string;
  price: number;
  clickCount: number;
}

const AdCard = ({
  content,
  title,
  publisher,
  price,
  clickCount,
}: AdCardProps) => {
  return (
    <Card
      style={{ width: 360 }}
      title={title}
      extra={<MoreOperate />}
      hoverable={true}
      bodyStyle={{
        paddingInline: "30px",
        height: "180px",
      }}
    >
      <div className="flex flex-col h-full">
        <div className="text-gray-300">{publisher}</div>
        <div className="flex-1 overflow-hidden">{content}</div>
        <div className="flex justify-between mt-auto">
          <div className="text-red-500">热度:{price}</div>
          <div className="text-blue-500">出价:{clickCount}</div>
        </div>
      </div>
    </Card>
  );
};

export default AdCard;
