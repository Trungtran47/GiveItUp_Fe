import ButtonFooterGroup from "@/components/common/button/footer/ButtonFooterGroup";
import FormTextArea from "@/components/common/form/custom-form/form-area/FormTextArea";
import FormItem from "@/components/common/form/custom-form/form-item/FormItem";
import FormUploadImageFull from "@/components/common/form/form-upload/FormUploadImageFull";
import payOutFactory from "@/redux/payout/factory";
import postUpdateFactory from "@/redux/post_update/factory";
import { getToast, parseNumber } from "@/utils/Utils";
import Validator from "@/utils/Validate";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function CreatePostUpdatePopup(props) {
  const { payload, showVisible } = props;
  const user = useSelector((state) => state.user.dataUser);
  const [loading, setLoading] = useState(false);
  const methods = useForm();
  // const [qrCode, setQrCode] = useState(null);

  const onSubmits = async (data) => {
    setLoading(true);
    const formData = new FormData();
    payload?.data?.id && formData.append("id", payload.data.id);
    formData.append("content", data.content || "");
    formData.append("postId", payload?.postId || "");
    formData.append("payoutId", payload?.payoutId || "");

    if (data.image?.file) {
      formData.append("imagePostUpdate", data.image.file); // <-- FILE
    }
    try {
      const res = await (payload?.data?.id
        ? postUpdateFactory.updatePostUpdate(
            user?.organization?.id,
            payload?.data?.id,
            formData
          )
        : postUpdateFactory.create(user?.organization?.id, formData));
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
      image: "",
      content: "",
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
        image: payload.data.imagePostUpdateUrl || null,
        content: payload.data.content || "",
      });
    }
  }, [payload?.data]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmits)}>
        <div className="p-2 bg-[#f0f1f3] w-[800px]">
          <div className="bg-[#ffffff] rounded-lg p-2">
            <div className="flex flex-col gap-3">
              <FormUploadImageFull
                fieldName="image"
                placeholder="Tải ảnh xác minh..."
                className="w-full h-[250px] bg-white p-2 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center"
              />

              <div className="flex w-full flex-col gap-4">
                <FormTextArea
                  fieldName="content"
                  validate={[Validator.maxLength(2000), Validator.required()]}
                  placeholder={"Nhập content..."}
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
              </div>
            </div>
          </div>
        </div>
        <ButtonFooterGroup onCancel={handleClose} saveLoading={loading} />
      </form>
    </FormProvider>
  );
}
