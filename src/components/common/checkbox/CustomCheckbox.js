import { Checkbox } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";
import "./CustomCheckbox.css";

export default function CustomCheckbox({
  fieldName,
  children,
  onChange,
  ...props
}) {
  const [checked, setChecked] = useState(false); // mặc định false

  const handleChange = (e) => {
    setChecked(e.target.checked); // cập nhật true/false
    if (onChange) {
      onChange(e.target.checked); // trả về true/false cho parent nếu cần
    }
  };

  return (
    <Checkbox
      {...props}
      className="custom-checkbox"
      checked={checked}
      onChange={handleChange}
    >
      {children}
    </Checkbox>
  );
}

CustomCheckbox.propTypes = {
  fieldName: PropTypes.string.isRequired,
  children: PropTypes.node,
  onChange: PropTypes.func, // optional callback
};
