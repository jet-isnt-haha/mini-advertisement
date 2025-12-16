//广告元数据
export interface AdvertisementMeta {
  id: string;
  title: string;
  publisher: string;
  content: string;
  redirectUrl: string;
  price: number;
  clickCount: number;
  videosInfo?: VideoInfoMeta[];
  sourceId?: string; // 来源ID(被复制的广告ID)
}

export interface VideoInfoMeta {
  uid: string;
  name: string;
  url: string;
}
