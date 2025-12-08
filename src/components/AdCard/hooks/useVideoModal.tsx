import { Modal, type ModalHookReturnType } from "@arco-design/web-react";
import { useRef } from "react";
import VideoPlayer from "@/components/VideoPlayer";

type ModalInstance = ReturnType<NonNullable<ModalHookReturnType["info"]>>;
export type VideoModalOptions = {
  handleEnded: () => void;
};

export const useVideoModal = () => {
  const [modal, contextHolder] = Modal.useModal();
  const modalInstanceRef = useRef<ModalInstance | null | undefined>(null);

  //等待视频结束才会触发下个事件
  const openVideoModal = (videoUrl: string): Promise<void> => {
    return new Promise((resolve) => {
      modalInstanceRef.current = modal.info?.({
        icon: null,
        content: (
          <VideoPlayer
            videoResource={videoUrl}
            onEnded={() => {
              Modal.destroyAll();
              resolve();
            }}
          />
        ),
        maskClosable: false,
        escToExit: false,
        style: { width: "800px" },
        footer: null,
      });
    });
  };

  return { openVideoModal, contextHolder };
};
