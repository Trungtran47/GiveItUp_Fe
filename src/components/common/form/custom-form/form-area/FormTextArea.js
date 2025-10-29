import { useEffect, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Constants from "@/utils/Constants";
import Validator from "@/utils/Validate";
import { CommonStyles } from "@/utils/CommonStyles";

const FormTextArea = (props) => {
  const {
    style = {},
    defaultValue = "",
    fieldName,
    validate,
    placeholder = "Vui lòng nhập ...",
    format = "",
    readOnly = false,
    isTooltip = false,
    minHeight = 32,
    isFocusInput = false,
    maxLength,
  } = props;

  const {
    formState: { errors },
    control,
  } = useFormContext();

  const inputRef = useRef(null);

  // Focus khi có lỗi
  useEffect(() => {
    if (errors[fieldName]) {
      inputRef.current?.focus();
    }
  }, [errors, fieldName]);

  // Focus khi khởi tạo nếu isFocusInput = true
  useEffect(() => {
    if (isFocusInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocusInput]);

  return (
    <div className="Input w-100" style={{ minHeight }}>
      <Controller
        control={control}
        name={fieldName}
        rules={{
          validate: Validator.genValidate(validate, fieldName),
        }}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <textarea
            ref={(node) => {
              ref(node);
              inputRef.current = node;
            }}
            name={fieldName}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            onFocus={(e) => e.target.select()}
            disabled={readOnly}
            data-istooltip={isTooltip}
            maxLength={maxLength}
            style={{
              ...style,
              minHeight,
              textAlign:
                format === Constants.FormInputFormat.MONEY.VALUE
                  ? "right"
                  : "left",
            }}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-[0.5px] focus:ring-[#017C18] outline-none resize-none"
          />
        )}
      />

      {/* Thông báo lỗi */}
      {errors?.[fieldName] && (
        <p className="text-[10px] text-red-500 font-semibold -mt-1.5">
          {errors[fieldName].message}
        </p>
      )}
    </div>
  );
};

export default FormTextArea;
