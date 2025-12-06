interface CardContentProps {
  publisher: string;
  content: string;
  clickCount: number;
  price: number;
}

const CardContent = ({
  publisher,
  content,
  clickCount,
  price,
}: CardContentProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="text-gray-300">{publisher}</div>
      <div className="flex-1 overflow-hidden">{content}</div>
      <div className="flex justify-between mt-auto">
        <div className="text-red-500">热度:{clickCount}</div>
        <div className="text-blue-500">出价:{price}</div>
      </div>
    </div>
  );
};

export default CardContent;
