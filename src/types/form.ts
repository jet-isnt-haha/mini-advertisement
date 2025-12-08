export type FieldType = "input" | "text_area" | "upload" | "input_number";

export interface FieldRule {
  required?: boolean;
  message?: string;
  pattern?: RegExp;
  min?: number;
  max?: number;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  rules?: FieldRule[];
  component_props?: Record<string, any>;
}
