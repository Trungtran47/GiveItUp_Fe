import ButtonFooterGroup from "@/components/common/button/footer/ButtonFooterGroup";
import FormItem from "@/components/common/form/custom-form/form-item/FormItem";
import FormInput from "@/components/common/form/custom-form/FormInput";
import bankAccountFactory from "@/redux/bank_account/factory";
import { getToast } from "@/utils/Utils";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function CreateBankAccountPopup(props) {
  const { payload, showVisible } = props;
  const methods = useForm();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.dataUser);

  const onSubmits = async (data) => {
    setLoading(true);
    const newData = {
      ...(payload?.data?.id && { id: payload.data.id }),
      user: user?.id,
      accountHolderName: data.accountHolderName,
      bankAccountNumber: data.bankAccountNumber,
      bankName: data.bankName,
      accountCode: data.accountCode,
    };
    const responses = await (payload.data?.id
      ? bankAccountFactory.updateBankAccount(newData)
      : bankAccountFactory.createBankAccount(newData));
    console.log("responses", responses);

    if (responses?.code == 200) {
      setLoading(false);
      getToast(
        payload?.data
          ? "Cập nhật tài khoản thành công"
          : "Tạo tài khoản thành công",
        "success"
      );
      payload?.getData();
      handleClose();
    } else {
      setLoading(false);
      getToast(responses?.result?.message || "Thất bại", "error");
    }
  };
  const handleReset = () => {
    methods.reset({
      accountHolderName: "",
      bankAccountNumber: "",
      bankName: "",
      accountCode: "",
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
    if (payload?.data) {
      methods.setValue("accountHolderName", payload.data.accountHolderName);
      methods.setValue("bankAccountNumber", payload.data.bankAccountNumber);
      methods.setValue("bankName", payload.data.bankName);
      methods.setValue("accountCode", payload.data.accountCode);
    }
  }, [payload?.data]);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmits)}>
        <div className="p-2 bg-[#f0f1f3] min-w-[700px]">
          <div className="bg-[#ffffff] rounded-lg p-2">
            <div className="flex flex-col gap-3">
              <FormItem title="Chủ tài khoản" required>
                <FormInput
                  fieldName="accountHolderName"
                  required={true}
                  // validate={[Validator.required("* Không được để trống")]}
                  placeholder="Nhập tên chủ tài khoản"
                />
              </FormItem>
              <FormItem title="Số tài khoản" required>
                <FormInput
                  fieldName="bankAccountNumber"
                  required={true}
                  // validate={[Validator.required("* Không được để trống")]}
                  placeholder="Nhập số tài khoản"
                />
              </FormItem>
              <FormItem title="Tên ngân hàng" required>
                <FormInput
                  fieldName="bankName"
                  required={true}
                  // validate={[Validator.required("* Không được để trống")]}
                  placeholder="Nhập tên ngân hàng"
                />
              </FormItem>
              <FormItem title="Mã tài khoản" required>
                <FormInput
                  fieldName="accountCode"
                  required={true}
                  // validate={[Validator.required("* Không được để trống")]}
                  placeholder="Nhập mã tài khoản"
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
