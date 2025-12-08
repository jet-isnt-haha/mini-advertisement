import type { UploadItem } from "@arco-design/web-react/es/Upload/interface";
import type { AdvertisementMeta } from "@/types/entity";

export interface AdFormValues extends Omit<AdvertisementMeta, "videosInfo"> {
    videosInfo?: UploadItem[];
  }