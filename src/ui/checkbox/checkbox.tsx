type CheckboxProps = {
  /**
   * Specifies whether the checkbox is selected
   */
  checked: boolean;
  /**
   * The label to display next to the checkbox
   */
  label: string;
  /**
   * The callback function that is triggered when the state changes
   */
  onChange: (res: boolean) => void;
};

export const Checkbox = ({ checked, label, onChange }: CheckboxProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label>
      <input type="checkbox" checked={checked} onChange={() => onChange(!checked)} />
      <span>{label}</span>
    </label>
  );
};
