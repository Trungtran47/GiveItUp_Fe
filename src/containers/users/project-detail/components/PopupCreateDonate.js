import CustomCheckbox from "@/components/common/checkbox/CustomCheckbox";
import FormTextArea from "@/components/common/form/custom-form/form-area/FormTextArea";
import FormInput from "@/components/common/form/custom-form/FormInput";
import Constants from "@/utils/Constants";
import Validator from "@/utils/Validate";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
export default function PopupCreateDonate(props) {
  const { payload, showVisible } = props;
  const [loading, setLoading] = useState(false);
  const [accountAuthor, setAccountAuthor] = useState(payload?.data || {});
  const user = useSelector((state) => state.user.dataUser);
  const [showQR, setShowQR] = useState(false);
  const [qrData, setQrData] = useState("");
  const [disabledInput, setDisabledInput] = useState(false);
  const methods = useForm();

  const onSubmit = (data) => {
    setDisabledInput(true);
    // Validate số tiền
    const amount = Number(data.amount.replace(/,/g, ""));
    if (amount < 10000) {
      alert("Số tiền tối thiểu là 10.000 VND");
      return;
    }

    const bank = "TPBank";
    const account = "00000019505";
    const accountName = accountAuthor?.accountHolderName || "Người nhận";
    const addInfo = data.message || "";
    // Encode các giá trị để tránh ký tự đặc biệt
    const encode = encodeURIComponent;
    // Tạo QR code URL chuẩn VietQR
    const qrValue = `https://img.vietqr.io/image/${encode(bank)}-${encode(
      account
    )}-compact2.jpg?amount=${amount}&addInfo=${encode(
      addInfo
    )}&accountName=${encode(accountName)}`;

    // Set state để hiển thị QR
    setQrData(qrValue);
    setShowQR(true);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="p-2 bg-[#f0f1f3] min-w-[900px]">
          <div className="bg-[#ffffff] rounded-lg p-4 flex flex-col gap-4">
            {/* Main Content Section */}
            <div className="flex gap-4">
              {/* Left Section */}
              <div className="flex-4/6 flex flex-col gap-3">
                {/* Top Section */}
                <div className="border-b border-gray-300 pb-4">
                  <h2 className="text-lg font-semibold text-[#017C18]">
                    Hướng dẫn sử dụng mã QR
                  </h2>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-orange-200 text-orange-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        1
                      </span>
                      <p className="text-sm text-gray-700">
                        Nhập đầy đủ thông tin
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-orange-200 text-orange-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        2
                      </span>
                      <p className="text-sm text-gray-700">
                        Ấn tiếp tục để lấy mã QR
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-orange-200 text-orange-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        3
                      </span>
                      <p className="text-sm text-gray-700">
                        Mở ứng dụng ngân hàng và quét mã QR
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  Cảm ơn bạn đã quan tâm và muốn đóng góp cho dự án này. Vui
                  lòng điền thông tin dưới đây để hoàn tất quyên góp.
                </p>
                <div className={`flex  gap-2`}>
                  <div className="flex-1 flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Số tiền quyên góp*
                    </label>
                    <FormInput
                      fieldName="amount"
                      format={Constants.FormInputFormat.MONEY.VALUE}
                      defaultValue="10,000"
                      required={true}
                      placeholder="Nhập tay (tối thiểu số tiền: 10.000 VND)"
                      height={38}
                      disabled={disabledInput}
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Họ và tên
                    </label>
                    <FormInput
                      defaultValue={
                        user?.firstName + " " + user?.lastName || ""
                      }
                      fieldName="fullName"
                      required={true}
                      placeholder="Nhập họ và tên"
                      height={38}
                      disabled={disabledInput}
                    />
                  </div>
                </div>
                <div
                  className={`flex flex-col gap-2 ${
                    disabledInput ? "opacity-50 pointer-events-none" : ""
                  }`}
                >
                  <label className="text-sm font-medium text-gray-700">
                    Lời nhắn
                  </label>
                  <FormTextArea
                    fieldName="message"
                    validate={[
                      Validator.maxLength(20000),
                      Validator.required(),
                    ]}
                    placeholder={"Nhập nội dung..."}
                    required={true}
                    minHeight={100}
                    disabled={disabledInput}
                    isFocusInput
                    style={{
                      border: "1px solid #017C18",
                      width: "100%",
                      height: "100px",
                      padding: "8px 12px 8px 12px",
                      resize: "vertical",
                      borderRadius: "8px",
                      outline: "none",
                    }}
                  />
                </div>
                <div>
                  <CustomCheckbox fieldName="hideInfo">
                    Ẩn thông tin trên web
                  </CustomCheckbox>
                </div>

                <button
                  type="submit"
                  className="bg-[#017C18] text-white rounded-md py-2 mt-4 cursor-pointer"
                >
                  Tiếp tục
                </button>
              </div>
              {/* Right Section */}
              <div className="flex-2/6 flex flex-col gap-3">
                <div className="flex-1 flex flex-col items-center justify-center gap-3">
                  {showQR ? (
                    <img
                      src={qrData}
                      alt="QR Code"
                      className="w-[240px] h-[240px]"
                    />
                  ) : (
                    <div className="border border-gray-400 h-[150px] w-[150px] flex items-center justify-center relative rounded-lg">
                      <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-gray-400"></div>
                      <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-gray-400"></div>
                      <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-gray-400"></div>
                      <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-gray-400"></div>
                      <div className="flex items-center justify-center">
                        {/* QR Code Placeholder */}

                        <div className="h-[120px] w-[120px] flex items-center justify-center rounded-md">
                          <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                            QR Code
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex-1 flex justify-between border-t border-gray-300">
                  <p className="text-sm text-gray-700 mt-2">Chủ tài khoản</p>
                  <p className="text-sm text-gray-700 mt-2">
                    {accountAuthor?.accountHolderName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
