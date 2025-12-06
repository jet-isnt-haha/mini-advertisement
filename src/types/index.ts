export interface advertisementMeta {
  id: string;
  title: string;
  publisher: string;
  content: string;
  redirectUrl: string;
  price: number;
  clickCount: number;
  videosInfo: videoInfoMeta[];
}

export interface videoInfoMeta {
  uid: string;
  name: string;
  url: string;
}
