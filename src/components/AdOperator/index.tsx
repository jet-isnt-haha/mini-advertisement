import type { advertisementMeta } from "@/types";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Space,
  Spin,
  Upload,
} from "@arco-design/web-react";
import type { UploadItem } from "@arco-design/web-react/es/Upload";

import { useState, useEffect } from "react";
import { useFormConfig } from "./hooks/useFormConfig";
import { useFormProcessor } from "./hooks/useFormProcessor";
import DynamicAdForm from "./components/DynamicAdForm";

const FormItem = Form.Item;
const TextArea = Input.TextArea;

interface AdFormValues extends Omit<advertisementMeta, "videosInfo"> {
  videosInfo?: UploadItem[];
}
interface AdOperatorProps {
  visible?: boolean;
  onClose?: () => void;
  onSubmit?: (data: advertisementMeta) => void;
  initialValues?: advertisementMeta;
}

const AdOperator = ({
  visible = true,
  onClose,
  onSubmit,
  initialValues,
}: AdOperatorProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { config, loading: configLoading } = useFormConfig();
  const { processFormData } = useFormProcessor({
    initialValues,
    fieldConfig: config || [],
  });
  // 监听 initialValues 变化，更新表单
  useEffect(() => {
    if (visible && initialValues) {
      const formValues: AdFormValues = {
        ...initialValues,
      };
      form.setFieldsValue(formValues);
    } else if (visible && !initialValues) {
      form.resetFields();
    }
  }, [visible, initialValues, form]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validate();

      const processedData = await processFormData(values);

      console.log("submit ", processedData);
      //将AdFormValues类型转变为元数据类型
      onSubmit?.(processedData);
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

  const renderDefaultForm = () => {
    return (
      <Form
        form={form}
        layout="horizontal"
        labelAlign="right"
        requiredSymbol={false}
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
          label="上传视频"
          field="videosInfo"
          triggerPropName="fileList"
          rules={[{ required: true, message: "请上传视频" }]}
        >
          <Upload
            listType="picture-card"
            multiple
            name="video"
            autoUpload={false}
          />
        </FormItem>
        <FormItem
          label="落地页"
          field="redirectUrl"
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
    );
  };

  const renderForm = () => {
    if (configLoading) {
      return (
        <div style={{ textAlign: "center", padding: "50px 0" }}>
          <Spin tip="加载表单配置中..." />
        </div>
      );
    }
    if (config && config.length > 0) {
      return (
        <DynamicAdForm
          fieldConfigs={config}
          form={form}
          loading={loading}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      );
    }

    return renderDefaultForm();
  };

  return (
    <Modal
      visible={visible}
      title={initialValues ? "编辑广告" : "新建广告"}
      onCancel={handleCancel}
      footer={null}
      style={{ width: 600 }}
    >
      {renderForm()}
    </Modal>
  );
};

export default AdOperator;
