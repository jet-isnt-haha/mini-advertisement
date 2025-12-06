import { Modal, type ModalHookReturnType } from "@arco-design/web-react";
import { useRef } from "react";
import VideoPlayer from "@/components/VideoPlayer";
import { NavigateByUrl } from "@/utils/navigateByUrl";

type ModalInstance = ReturnType<NonNullable<ModalHookReturnType["info"]>>;

export const useVideoModal = () => {
  const [modal, contextHolder] = Modal.useModal();
  const modalInstanceRef = useRef<ModalInstance | null | undefined>(null);

  const openVideoModal = (videoUrl: string, redirectUrl: string) => {
    modalInstanceRef.current = modal.info?.({
      icon: null,
      content: (
        <VideoPlayer
          videoResource={videoUrl}
          onEnded={() => {
            Modal.destroyAll();
            NavigateByUrl(redirectUrl);
          }}
        />
      ),
      maskClosable: false,
      escToExit: false,
      style: { width: "800px" },
      footer: null,
    });
  };

  return { openVideoModal, contextHolder };
};
