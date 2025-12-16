import type { FIELD_TYPE } from "@/constants";
import type { FormItemProps } from "@arco-design/web-react/es/Form/interface";
import type {
  InputProps,
  TextAreaProps,
} from "@arco-design/web-react/es/Input/interface";
import type { InputNumberProps } from "@arco-design/web-react/es/InputNumber/interface";
import type { UploadProps } from "@arco-design/web-react/es/Upload/interface";

export interface FieldRule {
  type?: string;
  required?: boolean;
  message?: string;
  match?: RegExp;
  min?: number;
  max?: number;
}

export interface BaseFieldConfig {
  name: string;
  label: string;
  type: FieldType;
  rules?: FieldRule[];
  item_props?: FormItemProps;
}

export interface InputFieldConfig extends BaseFieldConfig {
  type: FIELD_TYPE.INPUT;
  component_props?: InputProps;
}

export interface TextAreaFieldConfig extends BaseFieldConfig {
  type: FIELD_TYPE.TEXT_AREA;
  component_props?: TextAreaProps;
}

export interface UploadFieldConfig extends BaseFieldConfig {
  type: FIELD_TYPE.UPLOAD;
  component_props?: UploadProps;
}

export interface InputNumberFieldConfig extends BaseFieldConfig {
  type: FIELD_TYPE.INPUT_NUMBER;
  component_props?: InputNumberProps;
}

export type FieldConfig =
  | InputFieldConfig
  | TextAreaFieldConfig
  | UploadFieldConfig
  | InputNumberFieldConfig;

export type FieldType = FieldConfig["type"];
