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
      bodyStyle={{ paddingInline: "30px" }}
    >
      <div className="text-gray-300">{publisher}</div>
      {content}
      <div className="flex justify-between mt-4">
        <div className="text-red-500">热度:{price}</div>
        <div className="text-blue-500">出价:{clickCount}</div>
      </div>
    </Card>
  );
};

export default AdCard;
