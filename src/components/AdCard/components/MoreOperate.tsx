import { Button, Dropdown, Menu } from "@arco-design/web-react";
import { useState } from "react";
import DeleteModal from "./DeleteModal";

const MoreOperate = () => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleMenuClick = (key: string) => {
    if (key === "1") {
      // 编辑操作
      console.log("编辑操作");
    } else if (key === "2") {
      // 复制操作
      console.log("复制操作");
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
    <>
      <Dropdown droplist={OperateList} position="bl" trigger="click">
        <Button shape="round" type="primary">
          操作
        </Button>
      </Dropdown>
      <DeleteModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onOk={() => {
          console.log("确认删除");
          setDeleteModalVisible(false);
        }}
      />
    </>
  );
};

export default MoreOperate;
