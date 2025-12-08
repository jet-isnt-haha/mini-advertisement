//动态渲染表单
import type { FieldConfig, FieldType } from "@/types/form";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Space,
  Upload,
  type FormInstance,
} from "@arco-design/web-react";
import type { AdFormValues } from "../type";

const FormItem = Form.Item;
const TextArea = Input.TextArea;

const ComponentByType: Record<FieldType, React.FC> = {
  input: Input,
  text_area: TextArea,
  input_number: InputNumber,
  upload: Upload,
};

interface DynamicFormProps {
  fieldConfigs: FieldConfig[];
  form: FormInstance<AdFormValues>;
  loading?: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

const DynamicAdForm = ({
  fieldConfigs,
  form,
  loading = false,
  onCancel,
  onSubmit,
}: DynamicFormProps) => {
  const renderField = (field: FieldConfig) => {
    const { type, component_props = {} } = field;
    const Component = ComponentByType[type] || Input;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <Component {...(component_props as any)} />;
  };

  return (
    <Form
      form={form}
      layout="horizontal"
      labelAlign="right"
      requiredSymbol={false}
    >
      {fieldConfigs.map((field) => (
        <FormItem
          key={field.label + field.name}
          field={field.name}
          label={field.label}
          rules={field.rules}
          {...field.item_props}
        >
          {renderField(field)}
        </FormItem>
      ))}
      <FormItem wrapperCol={{ offset: 5 }}>
        <Space size="large">
          <Button onClick={onCancel}>取消</Button>
          <Button type="primary" loading={loading} onClick={onSubmit}>
            提交
          </Button>
        </Space>
      </FormItem>
    </Form>
  );
};

export default DynamicAdForm;
