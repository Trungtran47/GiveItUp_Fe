import { IconButton } from "@mui/material";
import { ConfigProvider, DatePicker, Input } from "antd";
import viVN from "antd/locale/vi_VN";
import IconDatePicker from "@/assets/icons/ic-date-picker";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import moment from "moment";
import "moment/locale/vi";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CommonStyles } from "@/utils/CommonStyles";
import Utils from "@/utils/Utils";
import Validator from "@/utils/Validate";
import Text from "@/components/common/text-common/text/Text";
import "./DatePicker.scss";

dayjs.extend(isSameOrAfter);
moment.locale("vi");
export default function CustomDatePicker({
  fieldName,
  disabled = false,
  placeholder = "DD/MM/YYYY",
  defaultValue,
  validate = [],
  minDate,
  required = false,
  handleActionChange,
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const wrapRef = useRef();
  const syncedRef = useRef(false);
  const prevValueRef = useRef(null);

  const parseDefaultValue = () => {
    if (!defaultValue) return null;

    const datePart = Utils.getDateDayjs(defaultValue, 3);

    const parsedDate = datePart ? dayjs(datePart) : null;
    return parsedDate;
  };
  const [date, setDate] = useState(null);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    const d = parseDefaultValue();
    setDate(d);
  }, []);

  useEffect(() => {
    setDisplayValue(
      date && Utils.getDateDayjs(date, 1)
        ? `${Utils.getDateDayjs(date, 1)}`
        : null
    );
  }, [date]);

  return (
    <div ref={wrapRef}>
      <Controller
        name={fieldName}
        control={control}
        defaultValue={defaultValue || ""}
        rules={{
          required: required ? "* Trường này là bắt buộc" : false, // thêm dòng này
          validate: Validator.genValidate(validate, fieldName),
        }}
        render={({ field: { onChange, value } }) => {
          const onDateChange = (val) => {
            setDate(val);
            setOpenDatePicker(false);
            onChange(Utils.getDateDayjs(val, 3));
            syncedRef.current = false;
            // Utils.triggerSubmit(wrapRef);
            handleActionChange?.();
          };

          if (value !== prevValueRef.current) {
            prevValueRef.current = value;
            syncedRef.current = false;
          }
          if (!syncedRef.current) {
            syncedRef.current = true;

            if (!value) {
              setDate(null);
            } else {
              const datePart = Utils.getDateDayjs(value, 3);
              if (datePart) setDate(dayjs(datePart));
            }
          }

          return (
            <>
              <div
                className={`boxDateTime${errors[fieldName] ? " error" : ""}${
                  disabled ? " disabled" : ""
                }`}
              >
                <Input
                  value={displayValue}
                  disabled={disabled}
                  placeholder={placeholder}
                  style={{
                    padding: "4px 0 4px 11px",
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "transparent",
                    cursor: disabled ? "not-allowed" : "pointer",
                    fontFamily: CommonStyles.fontFamily,
                  }}
                />

                <IconButton
                  onClick={() => {
                    if (!disabled) {
                      setOpenDatePicker(true);
                    }
                  }}
                >
                  <IconDatePicker />
                </IconButton>
                <ConfigProvider locale={viVN}>
                  <DatePicker
                    open={openDatePicker}
                    onOpenChange={(open) => {
                      if (!open) setOpenDatePicker(false);
                    }}
                    onChange={onDateChange}
                    value={date}
                    format="DD/MM/YYYY"
                    disabled={disabled}
                    // getPopupContainer={(trigger) =>
                    //     trigger.parentNode
                    // }
                    minDate={minDate}
                    maxTagCount="responsive"
                    style={{
                      visibility: "hidden",
                      position: "absolute",
                      left: 0,
                      top: 32,
                      width: 0,
                      height: 0,
                      padding: 0,
                      margin: 0,
                      border: "none",
                    }}
                  />
                </ConfigProvider>
              </div>
              {errors[fieldName] && (
                <div className="-mt-2">
                  <Text
                    style={{
                      color: CommonStyles.dangerColor,
                      fontSize: CommonStyles.fontSizeTiny,
                    }}
                  >
                    {errors[fieldName].message}
                  </Text>
                </div>
              )}
            </>
          );
        }}
      />
    </div>
  );
}
CustomDatePicker.propTypes = {
  fieldName: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  validate: PropTypes.array,
  minDate: PropTypes.string,
};
