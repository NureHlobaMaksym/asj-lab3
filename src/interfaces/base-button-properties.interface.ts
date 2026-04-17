export interface BaseButtonProperties {
  label: string;
  type: 'button' | 'submit';
  variant: 'primary' | 'secondary' | 'danger' | 'ghost';
  disabled: boolean;
}
