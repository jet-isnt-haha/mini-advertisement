import { uploadFileApi } from "@/apis";
import type { advertisementMeta } from "@/types";
import { uploadFileHelper } from "@/utils/uploadFileHelper";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Space,
  Upload,
} from "@arco-design/web-react";
import type {
  UploadInstance,
  UploadItem,
} from "@arco-design/web-react/es/Upload";

import { useState, useEffect, useRef } from "react";
import { useFormConfig } from "./hooks/useFormConfig";

const FormItem = Form.Item;
const TextArea = Input.TextArea;

interface AdFormValues extends Omit<advertisementMeta, "videosInfo"> {
  videosInfo: UploadItem[];
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
  const [form] = Form.useForm<AdFormValues>();
  const [loading, setLoading] = useState(false);
  const upLoadRef = useRef<UploadInstance | null>(null);
  const { config } = useFormConfig();
  // 监听 initialValues 变化，更新表单
  useEffect(() => {
    if (visible && initialValues) {
      const formValues: AdFormValues = {
        ...initialValues,
        videosInfo: initialValues.videosInfo.map((videoInfo) => ({
          uid: videoInfo.uid,
          name: videoInfo.name,
          status: "done",
          url: videoInfo.url,
        })),
      };
      form.setFieldsValue(formValues);
    } else if (visible && !initialValues) {
      form.resetFields();
    }
  }, [visible, initialValues, form]);
  const washVideoFile = async (files: UploadItem[]) => {
    const results: advertisementMeta["videosInfo"][] = [];

    for (const file of files) {
      if (file.originFile) {
        //新上传文件批处理
        const result = await uploadFileHelper(file.originFile, uploadFileApi);
        if (result) results.push(result);
      } else if (file.url && file.uid && file.name) {
        const videoInfo = { url: file.url, name: file.name, uid: file.uid };
        results.push([videoInfo]);
      }
    }

    return results.flat();
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validate();
      const videosInfo = await washVideoFile(values.videosInfo);
      const submitData: advertisementMeta = {
        ...values,
        clickCount: initialValues?.clickCount ?? Math.floor(Math.random() * 50),
        id: initialValues?.id || Date.now().toString(),
        videosInfo,
      };
      console.log("submit ", submitData);
      //将AdFormValues类型转变为元数据类型
      onSubmit?.(submitData);
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

  const renderComponent = (
    type: "input" | "text_area" | "upload" | "input_number",
    props: any
  ) => {
    const ComponentByType = {
      input: <Input {...props} />,
      text_area: <TextArea {...props} />,
      upload: <Upload {...props} />,
      input_number: <InputNumber {...props} />,
    };

    return ComponentByType[type];
  };

  const renderFormFromConfig = () => {
    if (config == undefined) {
      return undefined;
    }
    console.log(config);
    return (
      <Form
        form={form}
        layout="horizontal"
        labelAlign="right"
        requiredSymbol={false}
      >
        {config.map((item: any) => {
          const { name, label, type, rules, component_props } = item;
          return (
            <FormItem key={label} field={name} label={label} rules={rules}>
              {renderComponent(type, component_props)}
            </FormItem>
          );
        })}
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
            ref={upLoadRef}
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

  return (
    <Modal
      visible={visible}
      title={initialValues ? "编辑广告" : "新建广告"}
      onCancel={handleCancel}
      footer={null}
      style={{ width: 600 }}
    >
      {renderFormFromConfig() || renderDefaultForm()}
    </Modal>
  );
};

export default AdOperator;
