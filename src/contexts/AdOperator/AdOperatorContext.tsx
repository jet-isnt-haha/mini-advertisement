import { createContext, useState, type ReactNode } from "react";
import AdOperator from "@/components/AdOperator";
import Storage from "@/utils/storageHelper";
import type { advertisementMeta } from "@/types";
import { Message } from "@arco-design/web-react";

interface AdOperatorContextType {
  openAdOperator: (data?: advertisementMeta) => void;
  closeAdOperator: () => void;
  advertisementList: advertisementMeta[];
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

  const [advertisementList, setAdvertisementList] = useState<
    advertisementMeta[]
  >(() => Storage.getItem<advertisementMeta[]>("AD-LIST") ?? []);
  const openAdOperator = (data?: advertisementMeta) => {
    setInitialData(data);
    setVisible(true);
  };

  const closeAdOperator = () => {
    setVisible(false);
    setInitialData(undefined);
  };
  const refreshAdList = () => {
    setAdvertisementList(Storage.getItem<advertisementMeta[]>("AD-LIST") ?? []);
  };

  const deleteAdFromAdList = (id: string) => {
    const existingData = Storage.getItem<advertisementMeta[]>("AD-LIST") ?? [];
    const updatedData = existingData.filter((item) => item.id !== id);
    Storage.setItem("AD-LIST", updatedData);
    refreshAdList();
    Message.success("删除成功");
  };

  const clickAdFromAdList = (id: string) => {
    const existingData = Storage.getItem<advertisementMeta[]>("AD-LIST") ?? [];
    const index = existingData.findIndex((item) => item.id === id);
    if (index !== -1) {
      existingData[index].clickCount += 1;
      Storage.setItem("AD-LIST", existingData);
      refreshAdList();
    }
  };

  return (
    <AdOperatorContext.Provider
      value={{
        openAdOperator,
        closeAdOperator,
        advertisementList,
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
        onSubmit={(data) => {
          const existingData =
            Storage.getItem<advertisementMeta[]>("AD-LIST") ?? [];
          const index = existingData.findIndex((item) => item.id === data.id);
          if (index !== -1) {
            // 如果存在相同ID的广告，进行更新操作
            existingData[index] = data;
            Storage.setItem("AD-LIST", existingData);
            Message.success("更新成功");
          } else {
            Storage.setItem("AD-LIST", [...existingData, data]);
            Message.success("创建成功");
          }
          const Data = Storage.getItem<advertisementMeta[]>("AD-LIST");
          Data?.sort(
            (a, b) =>
              b.price +
              (b.price + b.clickCount) * 0.44 -
              (a.price + (a.price + a.clickCount) * 0.44)
          );
          Storage.setItem("AD-LIST", Data);
          // 直接更新状态，不需要事件
          refreshAdList();
          closeAdOperator();
        }}
      />
    </AdOperatorContext.Provider>
  );
};

export default AdOperatorContext;
