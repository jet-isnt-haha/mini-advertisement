import AdCard from "@/components/AdCard";
import type { AdFormData } from "@/components/AdOperator";
import { useAdOperator } from "@/contexts/AdOperator/useAdOperator";

import { Button } from "@arco-design/web-react";

const Home = () => {
  const { openAdOperator, advertisementList } = useAdOperator();

  return (
    <div className="p-8">
      <Button type="primary" onClick={() => openAdOperator()}>
        新增广告
      </Button>
      <div className=" space-x-4 flex flex-row">
        {advertisementList.map((ad: AdFormData) => (
          <AdCard
            key={ad.title}
            title={ad.title}
            content={ad.content}
            publisher={ad.publisher}
            price={ad.price}
            clickCount={50}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
