import ButtonFooterGroup from "@/components/common/button/footer/ButtonFooterGroup";
import FormTextArea from "@/components/common/form/custom-form/form-area/FormTextArea";
import FormItem from "@/components/common/form/custom-form/form-item/FormItem";
import FormInput from "@/components/common/form/custom-form/FormInput";
import payOutFactory from "@/redux/payout/factory";
import Constants from "@/utils/Constants";
import { getToast, parseNumber } from "@/utils/Utils";
import Validator from "@/utils/Validate";
import { useEffect, useState } from "react";
import { FormProvider, set, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function PayoutRequestPopup(props) {
  const { payload, showVisible } = props;
  const user = useSelector((state) => state.user.dataUser);
  const [loading, setLoading] = useState(false);
  const methods = useForm();
  const onSubmits = async (data) => {
    setLoading(true);
    const total = payload?.data?.donatedAmount - payload?.data?.disbursedAmount;
    if (parseNumber(data.payoutAmount) > total) {
      getToast("Số tiền rút phải nhỏ hơn hoặc bằng số tiền còn lại", "error");
      setLoading(false);
      return;
    }
    const newData = {
      ...(payload?.payout?.id && { payoutId: payload?.payout?.id }),
      postId: payload?.data?.id,
      amount: parseNumber(data.payoutAmount),
      note: data.note,
    };
    try {
      const res = await (payload?.payout?.id
        ? payOutFactory.updatePayout(newData)
        : payOutFactory.authorRequest(newData));
      if (res.code == 200) {
        getToast(
          payload?.payout?.id
            ? "Cập nhật yêu cầu rút tiền thành công"
            : "Yêu cầu rút tiền thành công",
          "success"
        );
        payload?.getData && payload?.getData();
        setLoading(false);
        handleClose();
      }
    } catch (err) {
      setLoading(false);
      getToast("Đã có lỗi xảy ra, vui lòng thử lại", "error");
    }
  };
  const handleReset = () => {
    methods.reset({
      payoutAmount: "",
      note: "",
    });
  };

  const handleClose = () => {
    if (payload?.fallback) {
      payload?.fallback();
    }
    showVisible(false);
    handleReset();
  };
  useEffect(() => {
    if (payload?.payout) {
      methods.reset({
        payoutAmount: payload?.payout?.amount || "",
        note: payload?.payout?.note || "",
      });
    }
  }, [payload?.payout]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmits)}>
        <div className="p-2 bg-[#f0f1f3] min-w-[700px]">
          <div className="bg-[#ffffff] rounded-lg p-2">
            <div className="flex flex-col gap-3">
              <FormItem title="Số tiền " required>
                <FormInput
                  fieldName="payoutAmount"
                  maxValue={
                    payload?.data?.donatedAmount -
                    payload?.data?.disbursedAmount
                  }
                  format={Constants.FormInputFormat.MONEY.VALUE}
                  placeholder={"Nhập số tiền muốn rút..."}
                />
              </FormItem>
              <FormItem title="Lý do rút tiền" required>
                <FormTextArea
                  fieldName="note"
                  validate={[Validator.maxLength(2000), Validator.required()]}
                  placeholder={"Nhập lý do rút tiền..."}
                  required={true}
                  minHeight={60}
                  isFocusInput
                  style={{
                    border: "1px solid #AEB7C6",
                    width: "100%",
                    height: "100px",
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
        <ButtonFooterGroup onCancel={handleClose} saveLoading={loading} />
      </form>
    </FormProvider>
  );
}
