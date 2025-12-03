import React, { useMemo, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Select } from "antd";
import Validator from "@/utils/Validate";
import styles from "./FormSelect.module.scss";
import Utils from "@/utils/Utils";
import { CommonStyles } from "@/utils/CommonStyles";
import IcDown from "@/assets/icons/ic-down";

const { Option } = Select;

function FormSelect(props) {
  const {
    fieldName,
    validate = [],
    placeholder,
    options = [],
    required = false,
    onClear,
    className,
    onChangeInput,
    isTooltip = false,
    isSearchOpitons,
    rules = [],
    disabled = false,
    isPortal = true,
    isClearable = true,
    handleActionChange,
    isMulti = false,
    defaultValue,
    height = 32,
  } = props;

  const {
    control,
    formState: { errors },
  } = useFormContext();
  const wrapRef = useRef();

  const memoOptions = useMemo(
    () => options?.map((o) => ({ ...o, value: o?.key })),
    [options]
  );

  return (
    <div className={`${styles.Input} w-full`} ref={wrapRef}>
      <div className={`h-full w-full ${className}`}>
        <Controller
          name={fieldName}
          control={control}
          rules={{
            required: required ? "* Trường này là bắt buộc" : false, // thêm dòng này
            validate: Validator.genValidate(validate, fieldName),
          }}
          render={({ field: { onChange, value } }) => {
            const selectedValue = isMulti ? value ?? [] : value ?? undefined;

            return (
              <Select
                mode={isMulti ? "multiple" : undefined}
                allowClear={isClearable}
                showSearch
                className={styles.selectFiel}
                disabled={disabled}
                maxTagCount="responsive"
                suffixIcon={<IcDown />}
                placeholder={placeholder}
                // value={
                //   isMulti
                //     ? selectedValue
                //     : memoOptions.find((opt) => opt.value == selectedValue) ||
                //       undefined
                // }
                value={selectedValue}
                onChange={(newValue) => {
                  onChange(newValue);
                  handleActionChange?.(newValue);
                  Utils.triggerSubmit(wrapRef);
                }}
                onSearch={(val) => {
                  if (onChangeInput) {
                    onChangeInput(val);
                  }
                }}
                style={{
                  width: "100%",
                  height,
                  fontSize: CommonStyles.fontSizeBase,
                }}
                styles={{
                  popup: {
                    root: {
                      fontSize: "13px",
                      borderRadius: 6,
                    },
                  },
                }}
                optionFilterProp="label"
                options={memoOptions.map((opt) => ({
                  value: opt.value,
                  label: opt.label,
                }))}
                getPopupContainer={() => document.body}
                status={errors[fieldName] ? "error" : ""}
              />
            );
          }}
        />
        {errors[fieldName]?.message && (
          <div
            style={{
              color: CommonStyles.dangerColor,
              fontSize: CommonStyles.fontSizeTiny,
            }}
          >
            {errors[fieldName]?.message}
          </div>
        )}
      </div>
    </div>
  );
}

FormSelect.defaultProps = {
  placeholder: "Vui lòng nhập ...",
};

export default FormSelect;
