import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Space,
} from "@arco-design/web-react";
import { useState } from "react";

const FormItem = Form.Item;
const TextArea = Input.TextArea;

export interface AdFormData {
  title: string;
  publisher: string;
  content: string;
  redirectUrl: string;
  price: number;
}

interface AdOperatorProps {
  visible?: boolean;
  onClose?: () => void;
  onSubmit?: (data: AdFormData) => void;
  initialValues?: AdFormData;
}

const AdOperator = ({
  visible = true,
  onClose,
  onSubmit,
  initialValues,
}: AdOperatorProps) => {
  const [form] = Form.useForm<AdFormData>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validate();
      console.log(values);
      onSubmit?.(values);
      form.resetFields();
    } catch (error) {
      console.error("表单验证失败:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose?.();
  };

  return (
    <Modal
      visible={visible}
      title="编辑广告"
      onCancel={handleCancel}
      footer={null}
      style={{ width: 600 }}
    >
      <Form
        form={form}
        layout="horizontal"
        labelAlign="right"
        requiredSymbol={false}
        initialValues={initialValues}
      >
        <FormItem
          label="广告标题"
          field="title"
          rules={[{ required: true, message: "请输入广告标题" }]}
        >
          <Input placeholder="请输入广告标题" />
        </FormItem>
        <FormItem
          label="发布人"
          field="publisher"
          rules={[{ required: true, message: "请输入发布人" }]}
        >
          <Input placeholder="请输入发布人" />
        </FormItem>
        <FormItem
          label="内容文案"
          field="content"
          rules={[{ required: true, message: "请输入内容文案" }]}
        >
          <TextArea placeholder="请输入内容文案" rows={3} />
        </FormItem>
        <FormItem
          label="落地页"
          field="landingPage"
          rules={[{ required: true, message: "请输入落地页" }]}
        >
          <TextArea placeholder="请输入落地页" rows={2} />
        </FormItem>
        <FormItem
          label="出价"
          field="price"
          rules={[{ required: true, message: "请输入出价" }]}
        >
          <InputNumber
            min={0}
            placeholder="请输入出价"
            suffix="元"
            style={{ width: "100%" }}
          />
        </FormItem>
        <FormItem wrapperCol={{ offset: 5 }}>
          <Space size="large">
            <Button onClick={handleCancel}>取消</Button>
            <Button type="primary" loading={loading} onClick={handleSubmit}>
              提交
            </Button>
          </Space>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default AdOperator;
