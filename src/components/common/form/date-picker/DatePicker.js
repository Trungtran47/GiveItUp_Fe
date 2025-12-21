import { IconButton } from "@mui/material";
import { ConfigProvider, DatePicker, Input } from "antd";
import viVN from "antd/locale/vi_VN";
import IconDatePicker from "@/assets/icons/ic-date-picker";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import moment from "moment";
import "moment/locale/vi";
import PropTypes from "prop-types";
import { useState } from "react";
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

  // Xóa bỏ state 'date' và 'displayValue' dư thừa gây lỗi
  // Chỉ giữ lại state quản lý việc đóng mở popup
  const [openDatePicker, setOpenDatePicker] = useState(false);

  return (
    <div>
      <Controller
        name={fieldName}
        control={control}
        defaultValue={defaultValue || ""}
        rules={{
          required: required ? "* Trường này là bắt buộc" : false,
          validate: Validator.genValidate(validate, fieldName),
        }}
        render={({ field: { onChange, value } }) => {
          // --- LOGIC MỚI: Tính toán giá trị hiển thị trực tiếp từ 'value' của RHF ---

          let dateObj = null; // Giá trị dạng dayjs cho DatePicker
          let displayString = ""; // Giá trị dạng text cho Input

          if (value) {
            const datePart = Utils.getDateDayjs(value, 3);
            if (datePart) {
              dateObj = dayjs(datePart);
              // Format lại để hiển thị lên input (VD: DD/MM/YYYY)
              displayString = Utils.getDateDayjs(dateObj, 1);
            }
          }

          const onDateChange = (val) => {
            setOpenDatePicker(false);
            // Cập nhật trực tiếp vào React Hook Form
            onChange(Utils.getDateDayjs(val, 3));
            handleActionChange?.();
          };

          return (
            <>
              <div
                className={`boxDateTime${errors[fieldName] ? " error" : ""}${
                  disabled ? " disabled" : ""
                }`}
              >
                <Input
                  value={displayString} // Dùng biến tính toán, không dùng state
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
                  // Mở datepicker khi focus vào input (tuỳ chọn)
                  onClick={() => !disabled && setOpenDatePicker(true)}
                  readOnly // Input này thường chỉ để hiển thị, tránh user gõ sai format
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
                    value={dateObj} // Dùng biến tính toán, không dùng state
                    format="DD/MM/YYYY"
                    disabled={disabled}
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
  minDate: PropTypes.object, // minDate của antd thường là object dayjs
};
