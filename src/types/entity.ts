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
}

export interface VideoInfoMeta {
  uid: string;
  name: string;
  url: string;
}