// 历史表单配置缓存模块(用于缓存与新表单配置不同的旧的已创建的表单项)
import CryptoJS from "crypto-js";

import type { FieldConfig } from "@/types";
import Storage from "./storageHelper";

export const formHistoryConfigCache: FieldConfig[][] = [];

interface FormConfig {
  id: string;
  config: FieldConfig[];
  refCount: number;
  formIds: string[];
  createAt: number;
  updateAt: number;
}

interface FormConfigCache {
  configs: Record<string, FormConfig>;
  formMapping: Record<string, string>;
}

const FORM_CONFIG_CACHE_KEY = "form_config_cache_key";

const generateConfigHash = (config: FieldConfig[]): string => {
  return CryptoJS.MD5(JSON.stringify(config)).toString();
};

const getStorage = (): FormConfigCache => {
  const data = Storage.getItem<FormConfigCache>(FORM_CONFIG_CACHE_KEY);
  return data ?? { configs: {}, formMapping: {} };
};

const saveStorage = (storage: FormConfigCache) => {
  Storage.setItem<FormConfigCache>(FORM_CONFIG_CACHE_KEY, storage);
};

// 添加或复用表单配置
export const cacheFormConfig = (formId: string, config: FieldConfig[]) => {
  const storage = getStorage();
  const configHash = generateConfigHash(config);

  if (storage.formMapping[formId]) return; // 已存在该表单配置映射，直接返回(编辑操作直接返回)

  if (storage.configs[configHash]) {
    //已有该配置，增加引用计数
    storage.configs[configHash].refCount += 1;
    storage.configs[configHash].formIds.push(formId);
    storage.configs[configHash].updateAt = Date.now();
  } else {
    storage.configs[configHash] = {
      id: configHash,
      config,
      refCount: 1,
      formIds: [formId],
      createAt: Date.now(),
      updateAt: Date.now(),
    };
  }
  storage.formMapping[formId] = configHash;
  saveStorage(storage);
  return configHash;
};

// 更新表单配置引用计数
export const removeFormConfig = (formId: string) => {
  const storage = getStorage();
  const configHash = storage.formMapping[formId];
  if (!configHash || !storage.configs[configHash]) return;

  const config = storage.configs[configHash];
  config.refCount -= 1;
  config.formIds = config.formIds.filter((id) => id !== formId);

  if (config.refCount <= 0) {
    delete storage.configs[configHash];
  }
  delete storage.formMapping[formId];
  saveStorage(storage);
};

export const getCachedFormConfig = (formId: string): FieldConfig[] => {
  const storage = getStorage();
  const configHash = storage.formMapping[formId];

  return configHash ? storage.configs[configHash].config : [];
};
