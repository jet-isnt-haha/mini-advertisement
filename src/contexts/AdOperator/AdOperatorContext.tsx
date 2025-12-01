import { createContext, useState, type ReactNode } from "react";
import AdOperator from "@/components/AdOperator";
import Storage from "@/utils/storageHelper";
import type { advertisementMeta } from "@/types";

interface AdOperatorContextType {
  openAdOperator: (data?: advertisementMeta) => void;
  closeAdOperator: () => void;
  advertisementList: advertisementMeta[];
  refreshAdList: () => void;
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

  return (
    <AdOperatorContext.Provider
      value={{
        openAdOperator,
        closeAdOperator,
        advertisementList,
        refreshAdList,
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
          Storage.setItem("AD-LIST", [...existingData, data]);
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
