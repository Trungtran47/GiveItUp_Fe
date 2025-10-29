import ButtonFooterGroup from "@/components/common/button/footer/ButtonFooterGroup";
import FormTextArea from "@/components/common/form/custom-form/form-area/FormTextArea";
import FormItem from "@/components/common/form/custom-form/form-item/FormItem";
import FormInput from "@/components/common/form/custom-form/FormInput";
import categoryFactory from "@/redux/category/factory";
import Constants from "@/utils/Constants";
import { getToast } from "@/utils/Utils";
import Validator from "@/utils/Validate";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function CreateCategoryPopup(props) {
  const { payload, showVisible } = props;
  const methods = useForm();
  const [loading, setLoading] = useState(false);
  const onSubmits = async (data) => {
    setLoading(true);
    const newData = {
      categoryName: data?.categoryName,
      description: data?.categoryDescription,
      status: Constants.STATUS_CATEGORY.ACTIVE,
    };
    const responses = await categoryFactory.createCategory(newData);
    if (responses?.code === 200) {
      setLoading(false);
      payload?.getData();
      getToast("Tạo lĩnh vực thành công", "success");
      showVisible();
    } else {
      setLoading(false);
      getToast(responses?.result?.message || "Tạo lĩnh vực thất bại", "error");
    }
  };
  const handleClose = () => {
    if (payload?.fallback) {
      payload?.fallback();
    }
    showVisible(false);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmits)}>
        <div className="p-2 bg-[#f0f1f3] min-w-[700px]">
          <div className="bg-[#ffffff] rounded-lg p-2">
            <div className="flex flex-col gap-3">
              <FormItem title="Tên lĩnh vực" name="categoryName" required>
                <FormInput
                  fieldName="categoryName"
                  required={true}
                  // validate={[Validator.required("* Không được để trống")]}
                  placeholder="Nhập tên lĩnh vực"
                />
              </FormItem>
              <FormItem title="Mô tả" name="categoryDescription" required>
                <FormTextArea
                  fieldName="categoryDescription"
                  validate={[Validator.maxLength(2000), Validator.required()]}
                  placeholder={"Nhập..."}
                  required={true}
                  minHeight={60}
                  isFocusInput
                  style={{
                    border: "1px solid #AEB7C6",
                    width: "540px",
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
        <ButtonFooterGroup
          onCancel={handleClose}
          {...(!payload?.data && {
            saveAndContinueLoading: loading,
            showSaveAndContinueButton: true,
          })}
          saveLoading={loading}
        />
      </form>
    </FormProvider>
  );
}
