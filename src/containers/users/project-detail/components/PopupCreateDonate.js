import IconArrowLeft from "@/assets/icons/IconArrowLeft";
import ButtonCommon from "@/components/common/button/ButtonCommon";
import CustomCheckbox from "@/components/common/checkbox/CustomCheckbox";
import FormTextArea from "@/components/common/form/custom-form/form-area/FormTextArea";
import FormInput from "@/components/common/form/custom-form/FormInput";
import paymentFactory from "@/redux/payment/factory";
import subscribeOrderStatus from "@/redux/payment/subscribeOrderStatus";
import Constants from "@/utils/Constants";
import Utils, { getToast, parseNumber } from "@/utils/Utils";
import Validator from "@/utils/Validate";
import { QRCode } from "antd";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
export default function PopupCreateDonate(props) {
  const { payload, showVisible } = props;
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.dataUser);
  const [qrData, setQrData] = useState("");
  const [disabledInput, setDisabledInput] = useState(false);
  const methods = useForm({ defaultValues: { amount: 10000 } });
  const onSubmit = (data) => {
    // setDisabledInput(true);
    // // Validate số tiền
    // const amount = Number(data.amount.replace(/,/g, ""));
    // if (amount < 10000) {
    //   alert("Số tiền tối thiểu là 10.000 VND");
    //   return;
    // }
    // const bank = "TPBank";
    // const account = "00000019505";
    // const accountName = accountAuthor?.accountHolderName || "Người nhận";
    // const addInfo = data.message || "";
    // // Encode các giá trị để tránh ký tự đặc biệt
    // const encode = encodeURIComponent;
    // // Tạo QR code URL chuẩn VietQR
    // const qrValue = `https://img.vietqr.io/image/${encode(bank)}-${encode(
    //   account
    // )}-compact2.jpg?amount=${amount}&addInfo=${encode(
    //   addInfo
    // )}&accountName=${encode(accountName)}`;
    // // Set state để hiển thị QR
    // setQrData(qrValue);
    // setShowQR(true);
  };
  const handleQrCode = async () => {
    if (qrData?.qrCode) {
      try {
        // Hủy payment trên server
        await paymentFactory.cancelPayment(qrData?.orderCode);
      } catch (error) {
        console.error("xxx", error);
      }
      // Quay lại
      setQrData(null);
      setDisabledInput(false);
      setLoading(false);
      return;
    }
    setDisabledInput(true);
    setLoading(true);
    try {
      const amount = parseNumber(methods.getValues("amount"));
      if (amount < 5000) {
        getToast("Số tiền tối thiểu là 5.000 VND", "warning");
        setDisabledInput(false);
        setLoading(false);
        return;
      }
      const postData = {
        orderCode: Utils.generateOrderCode(),
        amount: amount,
        description: methods.watch("message") || "",
      };
      // Gọi API để lấy QR code
      const res = await paymentFactory.getQrCode(postData);
      setQrData(res?.data);
    } catch (error) {
      console.error("xxx", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!qrData?.orderCode) return;
    const sse = subscribeOrderStatus(qrData.orderCode, (newStatus) => {
      console.log("Trạng thái mới:", newStatus);
      if (newStatus === "SUCCESS") {
        getToast("Đóng góp thành công! Cảm ơn bạn đã ủng hộ.", "success");
      }
      if (newStatus === "FAILED") {
        getToast("Thanh toán thất bại, vui lòng thử lại.", "error");
      }
      if (newStatus === "EXPIRED") {
        getToast("QR đã hết hạn, vui lòng tạo QR mới.", "warning");
      }
      if (newStatus === "PROCESSING") {
        setLoading(true);
      }
    });

    console.log("sse", sse);

    return () => sse.close(); // đóng SSE khi unmount
  }, [qrData?.orderCode]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="p-2 bg-[#f0f1f3] max-w-[800px]">
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
                {qrData ? (
                  <div className="flex flex-col gap-2 bg-gray-300 p-4 rounded mb-4">
                    <div className="flex justify-between pb-1 border-b border-gray-400">
                      <p className="font-normal text-[16px]">
                        Số tiền quyên góp:
                      </p>
                      <p className="font-semibold  text-[16px]">
                        {parseNumber(
                          methods.getValues("amount")
                        ).toLocaleString("vi-VN")}{" "}
                        VND
                      </p>
                    </div>
                    <div className="flex justify-between pb-1 border-b border-gray-400">
                      <p className="font-normal  text-[16px]">Họ và tên:</p>
                      <p className="font-semibold  text-[16px]">
                        {methods.getValues("fullName")}
                      </p>
                    </div>
                    <div className="flex justify-between  ">
                      <p className="font-normal  text-[16px]">Lời nhắn:</p>
                      <p className="font-semibold  text-[16px]">
                        {methods.getValues("message") || "Không có"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className={`flex gap-2`}>
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
                  </div>
                )}

                <ButtonCommon
                  onClick={handleQrCode}
                  type="button"
                  {...(qrData?.qrCode && { startIcon: <IconArrowLeft /> })}
                  loading={loading}
                  // disabled={loading}
                  title={qrData?.qrCode ? "Quay lại" : "Tiếp tục"}
                />
              </div>
              {/* Right Section */}
              <div className="flex-2/6 flex flex-col gap-3">
                <div className="flex-1 flex flex-col items-center justify-center gap-3">
                  {qrData?.qrCode ? (
                    <QRCode value={qrData?.qrCode} size={160} />
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
                            Qr code
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex px-4 justify-between border-t border-gray-300">
                    <p className="text-sm text-gray-700 mt-2">Chủ tài khoản</p>
                    <p className="text-sm text-gray-700 mt-2">
                      Trần Đình Trung
                    </p>
                  </div>
                  {qrData?.qrCode && (
                    <div className="flex px-4 justify-between">
                      <p className="text-sm text-gray-700 mt-2">Mã giao dịch</p>
                      <p className="text-sm text-gray-700 mt-2">
                        {qrData?.orderCode}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
