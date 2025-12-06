import ButtonFooterGroup from "@/components/common/button/footer/ButtonFooterGroup";
import FormTextArea from "@/components/common/form/custom-form/form-area/FormTextArea";
import FormItem from "@/components/common/form/custom-form/form-item/FormItem";
import FormInput from "@/components/common/form/custom-form/FormInput";
import FormUploadImageFull from "@/components/common/form/form-upload/FormUploadImageFull";
import payOutFactory from "@/redux/payout/factory";
import Constants from "@/utils/Constants";
import { getToast, parseNumber } from "@/utils/Utils";
import Validator from "@/utils/Validate";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function PayoutConfirmPopup(props) {
  const { payload, showVisible } = props;
  const isApprove = payload?.type == "APPROVE";
  const user = useSelector((state) => state.user.dataUser);
  const [loading, setLoading] = useState(false);
  const methods = useForm();
  // const [qrCode, setQrCode] = useState(null);

  const onSubmits = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("payoutId", payload.data?.id || "");
    formData.append("approved", isApprove ? "true" : "false");
    formData.append("noteAdmin", data.noteAdmin || "");
    if (isApprove) {
      formData.append(
        "adminTransferAmount",
        parseNumber(data.adminTransferAmount) || 0
      );
    }
    if (isApprove && data.verifyImages?.file) {
      formData.append("transferProofImage", data.verifyImages.file); // <-- FILE
    }
    try {
      const res = await payOutFactory.adminProcessRequest(user?.id, formData);
      if (res.code == 200) {
        getToast("Thành công", "success");
        payload?.getData && payload?.getData();
        setLoading(false);
        handleClose();
      } else {
        setLoading(false);
        getToast("Đã có lỗi xảy ra, vui lòng thử lại", "error");
      }
    } catch (err) {
      setLoading(false);
      getToast("Đã có lỗi xảy ra, vui lòng thử lại", "error");
    }
  };

  const handleReset = () => {
    methods.reset({
      adminTransferAmount: "",
      noteAdmin: "",
      verifyImages: null,
    });
  };

  const handleClose = () => {
    if (payload?.fallback) {
      payload?.fallback();
    }
    setLoading(false);
    showVisible(false);
    handleReset();
  };
  useEffect(() => {
    if (payload?.data) {
      methods.reset({
        verifyImages: payload?.data?.transferProofImageUrl || null,
        adminTransferAmount: payload?.data?.adminTransferAmount || "",
        noteAdmin: payload?.data?.noteAdmin || "",
      });
    }
  }, [payload?.data]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmits)}>
        <div className="p-2 bg-[#f0f1f3] w-[800px]">
          <div className="bg-[#ffffff] rounded-lg p-2">
            <div className="flex gap-3">
              {/* LEFT: Upload ảnh xác minh */}
              {isApprove && (
                <FormUploadImageFull
                  fieldName="verifyImages"
                  placeholder="Tải ảnh xác minh..."
                  className="w-[300px] h-[150px] bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center"
                />
              )}

              <div className="flex w-full flex-col gap-4">
                {isApprove && (
                  <FormItem title="Số tiền " required>
                    <FormInput
                      fieldName="adminTransferAmount"
                      maxValue={payload?.data?.amount || null}
                      defaultValue={payload?.data?.amount || ""}
                      format={Constants.FormInputFormat.MONEY.VALUE}
                      placeholder={"Nhập số tiền muốn rút..."}
                    />
                  </FormItem>
                )}
                <FormItem
                  title={isApprove ? "Ghi chú" : "Lý do không duyệt"}
                  required
                >
                  <FormTextArea
                    fieldName="noteAdmin"
                    validate={[Validator.maxLength(2000), Validator.required()]}
                    placeholder={
                      isApprove
                        ? "Nhập ghi chú..."
                        : "Nhập lý do không duyệt..."
                    }
                    required={true}
                    minHeight={100}
                    isFocusInput
                    style={{
                      border: "1px solid #AEB7C6",
                      width: "100%",
                      height: "200px",
                      padding: "8px 12px 8px 12px",
                      resize: "vertical",
                      borderRadius: "8px",
                      outline: "none",
                    }}
                  />
                </FormItem>
              </div>
            </div>
          </div>
        </div>
        <ButtonFooterGroup onCancel={handleClose} saveLoading={loading} />
      </form>
    </FormProvider>
  );
}
