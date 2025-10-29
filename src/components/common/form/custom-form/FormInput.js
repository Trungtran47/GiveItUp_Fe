import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Constants from "../../../../utils/Constants";
import { convertNumberToString } from "../../../../utils/String";
import Validator from "../../../../utils/Validate";
import { Form, Input } from "antd";
import IcEye from "../../../../../public/icons/IcEye";
import IcEyeSlash from "../../../../../public/icons/ic-eye-slash";
// import classes from "./FormInput.module.scss";
// import IconSearch from "@/assets/icons/ic-search";
import IcSearchInput from "@/assets/icons/ic-search-input";

const FormInput = ({
  defaultValue,
  fieldName,
  validate,
  placeholder,
  format,
  readOnly,
  size,
  required,
  isSearch = false,
  isSubmit = true,
  handleBlur,
  disabled,
  height,
  label,
  maxValue,
  onChangeValue,
  isPassword,
  autoComplete,
  handleClick = () => {},
}) => {
  const {
    formState: { errors },
    control,
    setValue,
  } = useFormContext();
  const [isShowPassword, setIsShowPassword] = useState(false);
  useEffect(() => {
    if (defaultValue !== undefined && defaultValue !== null) {
      setValue(fieldName, defaultValue);
    }
  }, [defaultValue, fieldName]);

  return (
    <Controller
      control={control}
      name={fieldName}
      defaultValue={defaultValue}
      rules={{
        validate: Validator.genValidate(
          validate?.length ? validate : required ? [Validator.required()] : [],
          fieldName
        ),
      }}
      render={({ field: { onChange, onBlur, value, ref } }) => {
        const onChangeHandler = (e) => {
          const rawVal = e.target.value;

          if (format === Constants.FormInputFormat.MONEY.VALUE) {
            let val = rawVal.replace(/[^0-9]/g, "").replace(/^0+/, "");

            if (!val) {
              onChange("");
              onChangeValue?.("");
              return;
            }

            if (maxValue && maxValue !== 0 && Number(val) > Number(maxValue)) {
              val = maxValue.toString();
            }

            const formattedVal = val.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            onChange(formattedVal);
            onChangeValue?.(formattedVal);
          } else if (format === Constants.FormInputFormat.PHONE.VALUE) {
            let val = rawVal.replace(/[^0-9]/g, "");
            if (val.length > 10) {
              val = val.slice(0, 10);
            }
            // let formattedVal = val;
            // if (val.length >= 7) {
            //     formattedVal = val.replace(
            //         /(\d{3})(\d{3})(\d{0,4})/,
            //         "$1-$2-$3"
            //     );
            // } else if (val.length >= 4) {
            //     formattedVal = val.replace(
            //         /(\d{3})(\d{0,3})/,
            //         "$1-$2"
            //     );
            // }

            onChange(val);
            onChangeValue?.(val);
          } else if (format === Constants.FormInputFormat.DECIMAL.VALUE) {
            if (rawVal === "" || parseFloat(rawVal) === 0) {
              onChange(0);
              onChangeValue?.(0);
            } else if (rawVal !== "" && parseFloat(rawVal) > 0) {
              const val = parseFloat(rawVal);
              onChange(convertNumberToString(val.toString()));
              onChangeValue?.(convertNumberToString(val.toString()));
            } else if (rawVal === null || rawVal === undefined) {
              onChange(0);
              onChangeValue?.(0);
            } else {
              onChange(rawVal);
              onChangeValue?.(rawVal);
            }
          } else {
            onChange(rawVal);
            onChangeValue?.(rawVal);
          }
        };
        const onKeyPressHandler = (e) => {
          if (
            format === Constants.FormInputFormat.MONEY.VALUE &&
            !/^[0-9.]*$/i.test(e.key)
          ) {
            e.preventDefault();
          }
        };

        const error = errors[fieldName];

        return (
          <Form.Item
            // className={classes.formItem}

            label={label}
            validateStatus={error ? "error" : ""}
            help={
              error?.message && (
                <p className="text-[10px] text-red-500 font-semibold -mt-0.5">
                  {error.message}
                </p>
              )
            }
            required={required}
            style={{ marginBottom: 0 }}
            onClick={handleClick}
          >
            <Input
              // className={classes.customHoverInput}
              placeholder={placeholder}
              type={
                isPassword ? (isShowPassword ? "text" : "password") : "text"
              }
              value={value || ""}
              readOnly={readOnly}
              size={size}
              disabled={disabled}
              defaultValue={defaultValue}
              autoComplete={autoComplete}
              /** ✅ Nếu là search thì thêm icon ở đầu */
              prefix={
                isSearch ? (
                  <div className="-ml-2">
                    <IcSearchInput />
                  </div>
                ) : null
              }
              suffix={
                isPassword ? (
                  <div
                    onClick={() => setIsShowPassword((prev) => !prev)}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                    }}
                  >
                    {isShowPassword ? <IcEye /> : <IcEyeSlash />}
                  </div>
                ) : null
              }
              onKeyDown={(e) => {
                if (!isSubmit && e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              style={{
                height,
                textAlign:
                  format === Constants.FormInputFormat.MONEY.VALUE
                    ? "right"
                    : "left",
              }}
              onChange={onChangeHandler}
              onBlur={(e) => {
                onBlur(e);
                if (typeof handleBlur === "function") {
                  handleBlur(e.target.value);
                }
              }}
              onKeyPress={onKeyPressHandler}
              ref={ref}
            />
          </Form.Item>
        );
      }}
    />
  );
};

FormInput.propTypes = {
  defaultValue: PropTypes.any,
  fieldName: PropTypes.string.isRequired,
  label: PropTypes.string,
  validate: PropTypes.func,
  placeholder: PropTypes.string,
  format: PropTypes.string,
  readOnly: PropTypes.bool,
  size: PropTypes.oneOf(["small", "middle", "large"]),
  required: PropTypes.bool,
  isSearch: PropTypes.bool,
  isSubmit: PropTypes.bool,
  handleBlur: PropTypes.func,
  disabled: PropTypes.bool,
  height: PropTypes.number,
  maxValue: PropTypes.number,
  onChangeValue: PropTypes.func,
};

FormInput.defaultProps = {
  defaultValue: "",
  validate: null,
  placeholder: "Vui lòng nhập ...",
  label: "",
  format: "",
  readOnly: false,
  size: "small",
  required: false,
  isSearch: false,
  isSubmit: true,
  handleBlur: () => {},
  disabled: false,
  height: 32,
  maxValue: null,
  onChangeValue: () => {},
};

export default FormInput;
