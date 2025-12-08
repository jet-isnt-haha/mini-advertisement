import { createContext, useEffect, useState, type ReactNode } from "react";
import AdOperator from "@/components/AdOperator";
import type { advertisementMeta } from "@/types";
import { Message } from "@arco-design/web-react";
import {
  countUpApi,
  createApi,
  deleteApi,
  editApi,
  getAllAdsApi,
} from "@/apis";
import { processAdList, type AdWithClick } from "@/utils/adListHelper";

interface AdOperatorContextType {
  openAdOperator: (data?: advertisementMeta) => void;
  closeAdOperator: () => void;
  adList: AdWithClick[];
  refreshAdList: () => void;
  deleteAdFromAdList: (id: string) => void;
  clickAdFromAdList: (id: string) => void;
}

const AdOperatorContext = createContext<AdOperatorContextType | undefined>(
  undefined
);

export const AdOperatorProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [initialData, setInitialData] = useState<advertisementMeta | undefined>(
    undefined
  );

  const [adList, setAdList] = useState<AdWithClick[]>([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const rawAds = await getAllAdsApi();
        const processedAds = processAdList(rawAds);
        setAdList(processedAds);
      } catch (error) {
        console.error("获取广告列表失败:", error);
      }
    };
    fetchAds();
  }, []);

  const openAdOperator = (data?: advertisementMeta) => {
    setInitialData(data);
    setVisible(true);
  };

  const closeAdOperator = () => {
    setVisible(false);
    setInitialData(undefined);
  };
  const refreshAdList = async () => {
    try {
      const rawAds = await getAllAdsApi();
      const processedAds = processAdList(rawAds);
      setAdList(processedAds);
    } catch (error) {
      console.error("获取广告列表失败:", error);
    }
  };

  const deleteAdFromAdList = async (id: advertisementMeta["id"]) => {
    await deleteApi(id);

    Message.success("删除成功");
    refreshAdList();
  };

  const clickAdFromAdList = async (id: advertisementMeta["id"]) => {
    await countUpApi(id);
    refreshAdList();
  };

  const handleSubmit = async (data: advertisementMeta) => {
    const existingData = await getAllAdsApi();
    const index = existingData.findIndex((item) => item.id === data.id);
    if (index !== -1) {
      // 如果存在相同ID的广告，进行更新操作
      await editApi(data);

      Message.success("更新成功");
    } else {
      await createApi(data);

      Message.success("创建成功");
    }
    refreshAdList();

    closeAdOperator();
  };

  return (
    <AdOperatorContext.Provider
      value={{
        openAdOperator,
        closeAdOperator,
        adList,
        refreshAdList,
        deleteAdFromAdList,
        clickAdFromAdList,
      }}
    >
      {children}
      <AdOperator
        visible={visible}
        initialValues={initialData}
        onClose={closeAdOperator}
        onSubmit={handleSubmit}
      />
    </AdOperatorContext.Provider>
  );
};

export default AdOperatorContext;
