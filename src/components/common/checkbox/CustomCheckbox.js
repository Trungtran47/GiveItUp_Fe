import { Checkbox } from "antd";
import PropTypes from "prop-types";
import "./CustomCheckbox.css";

export default function CustomCheckbox({ fieldName, children, ...props }) {
  return (
    <Checkbox {...props} className="custom-checkbox">
      {children}
    </Checkbox>
  );
}

CustomCheckbox.propTypes = {
  fieldName: PropTypes.string.isRequired,
  children: PropTypes.node,
};
