import type { advertisementMeta } from "@/types";
import { NavigateByUrl } from "./navigateByUrl";
import { countUpApi } from "@/apis";

interface StepDependencies {
  openVideoModal?: (videoUrl: string) => Promise<void>;
}
const CLICK_FLOW = ["video", "redirect", "count_up"];

const createSteps = (deps: StepDependencies) => ({
  video: async (ad: advertisementMeta) => {
    if (!ad.videosInfo || ad.videosInfo.length === 0) return;

    const randomVideo =
      ad.videosInfo[Math.floor(Math.random() * ad.videosInfo.length)];
    if (deps.openVideoModal) {
      await deps.openVideoModal(randomVideo.url);
    }
  },

  redirect: async (ad: advertisementMeta) => {
    if (!ad.redirectUrl) return;
    NavigateByUrl(ad.redirectUrl);
  },

  count_up: async (ad: advertisementMeta) => {
    await countUpApi(ad.id);
  },
});

export const buildAdClickFlow = (
  ad: advertisementMeta,
  deps: StepDependencies = {}
) => {
  const step = createSteps(deps);
  return async () => {
    for await (const action of CLICK_FLOW) {
      const handler = step[action];
      await handler(ad);
    }
  };
};

export interface AdWithClick extends advertisementMeta {
  onClick: () => Promise<void>;
}

export const processAdList = (rawAds: advertisementMeta[]): AdWithClick[] => {
  return rawAds.map((ad) => ({
    ...ad,
    onClick: buildAdClickFlow(ad),
  }));
};
