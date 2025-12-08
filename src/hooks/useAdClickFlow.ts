import { useCallback, useMemo } from "react";
import type { AdvertisementMeta } from "@/types";
import { countUpApi } from "@/apis";
import { NavigateByUrl } from "@/utils/navigateByUrl";

const CLICK_FLOW = ["video", "redirect", "count_up"] as const;

interface Dependencies {
  openVideoModal: (url: string) => Promise<void>;
}

export const useAdClickFlow = (
  ad: AdvertisementMeta,
  deps: Dependencies
) => {
  const { openVideoModal } = deps;

  const actions = useMemo(() => ({
    video: async () => {
      if (!ad.videosInfo || ad.videosInfo.length === 0) return;
      const randomVideo =
        ad.videosInfo[Math.floor(Math.random() * ad.videosInfo.length)];
      await openVideoModal(randomVideo.url);
    },

    redirect: async () => {
      if (!ad.redirectUrl) return;
      NavigateByUrl(ad.redirectUrl);
    },

    count_up: async () => {
      await countUpApi(ad.id);
    },
  }), [ad.id, ad.redirectUrl, ad.videosInfo, openVideoModal]);
  //执行流控制 
  const executeFlow = useCallback(async () => {
    for (const stepName of CLICK_FLOW) {
      const handler = actions[stepName];
      if (handler) {
        await handler();
      }
    }
  }, [actions]);

  return executeFlow;
};