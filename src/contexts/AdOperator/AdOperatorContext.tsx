import { createContext, useState, type ReactNode } from "react";
import AdOperator, { type AdFormData } from "@/components/AdOperator";
import Storage from "@/utils/storageHelper";

interface AdOperatorContextType {
  openAdOperator: (data?: AdFormData) => void;
  closeAdOperator: () => void;
  advertisementList: AdFormData[];
  refreshAdList: () => void;
}

const AdOperatorContext = createContext<AdOperatorContextType | undefined>(
  undefined
);

export const AdOperatorProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [initialData, setInitialData] = useState<AdFormData | undefined>(
    undefined
  );

  const [advertisementList, setAdvertisementList] = useState<AdFormData[]>(
    () => Storage.getItem<AdFormData[]>("AD-LIST") ?? []
  );
  const openAdOperator = (data?: AdFormData) => {
    setInitialData(data);
    setVisible(true);
  };

  const closeAdOperator = () => {
    setVisible(false);
    setInitialData(undefined);
  };
  const refreshAdList = () => {
    setAdvertisementList(Storage.getItem<AdFormData[]>("AD-LIST") ?? []);
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
          const existingData = Storage.getItem<AdFormData[]>("AD-LIST") ?? [];
          Storage.setItem("AD-LIST", [...existingData, data]);
          // 直接更新状态，不需要事件
          refreshAdList();
          closeAdOperator();
        }}
      />
    </AdOperatorContext.Provider>
  );
};

export default AdOperatorContext;
