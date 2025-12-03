import { Button, Dropdown, Menu } from "@arco-design/web-react";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import { useAdOperator } from "@/contexts/AdOperator/useAdOperator";
import type { advertisementMeta } from "@/types";

const MoreOperate = (config: advertisementMeta) => {
  const { openAdOperator, deleteAdFromAdList } = useAdOperator();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleMenuClick = (key: string, e: React.MouseEvent) => {
    if (key === "1") {
      // 编辑操作
      openAdOperator(config);
    } else if (key === "2") {
      // 复制操作
      openAdOperator({ ...config, id: Date.now().toString() });
    } else if (key === "3") {
      // 删除操作
      setDeleteModalVisible(true);
    }
  };

  const OperateList = (
    <Menu onClickMenuItem={handleMenuClick}>
      <Menu.Item key="1">编辑</Menu.Item>
      <Menu.Item key="2">复制</Menu.Item>
      <Menu.Item key="3">删除</Menu.Item>
    </Menu>
  );

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Dropdown droplist={OperateList} position="bl" trigger="click">
        {/* 这个按钮上的 stopPropagation 现在可以移除了，因为父 div 会处理 */}
        <Button shape="round" type="primary">
          操作
        </Button>
      </Dropdown>
      <DeleteModal
        visible={deleteModalVisible}
        onClose={() => {
          setDeleteModalVisible(false);
        }}
        onOk={() => {
          deleteAdFromAdList(config.id);
          setDeleteModalVisible(false);
        }}
      />
    </div>
  );
};

export default MoreOperate;
