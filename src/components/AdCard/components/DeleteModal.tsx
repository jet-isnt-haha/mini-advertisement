import { Modal } from "@arco-design/web-react";
interface DeleteModalProps {
  visible: boolean;
  onClose: () => void;
  onOk: (e?: MouseEvent) => void;
}

const DeleteModal = ({ visible, onClose, onOk }: DeleteModalProps) => {
  return (
    <Modal
      title="删除广告"
      visible={visible}
      onOk={onOk}
      onCancel={onClose}
      okButtonProps={{ status: "danger" }}
    >
      请确认是否删除该条广告？
    </Modal>
  );
};

export default DeleteModal;
