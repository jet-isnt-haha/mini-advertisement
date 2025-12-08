import AdCard from "@/components/AdCard";
import { useAdOperator } from "@/contexts/AdOperator/useAdOperator";
import type { AdWithClick } from "@/utils/adListHelper";

import { Button } from "@arco-design/web-react";

const Home = () => {
  const { openAdOperator, adList } = useAdOperator();
  return (
    <div className="p-8">
      <Button type="primary" onClick={() => openAdOperator()}>
        新增广告
      </Button>
      <div className=" space-x-4 flex flex-row flex-wrap mt-8 gap-y-8">
        {adList.map((ad: AdWithClick) => (
          <AdCard key={ad.id} {...ad} />
        ))}
      </div>
    </div>
  );
};

export default Home;
