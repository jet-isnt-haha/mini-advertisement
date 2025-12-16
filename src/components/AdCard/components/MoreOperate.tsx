import { Button, Dropdown, Menu } from "@arco-design/web-react";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import { useAdOperator } from "@/contexts/AdOperator/useAdOperator";
import type { AdvertisementMeta } from "@/types";

const MoreOperate = (config: AdvertisementMeta) => {
  const { openAdOperator, deleteAdFromAdList } = useAdOperator();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleMenuClick = (key: string) => {
    if (key === "1") {
      // 编辑操作
      openAdOperator(config);
    } else if (key === "2") {
      // 复制操作
      openAdOperator({
        ...config,
        id: Date.now().toString(),
        sourceId: config.id,
      });
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
