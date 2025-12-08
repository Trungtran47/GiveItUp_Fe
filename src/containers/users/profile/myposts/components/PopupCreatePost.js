"use client";
import ButtonFooterGroup from "@/components/common/button/footer/ButtonFooterGroup";
import FormTextArea from "@/components/common/form/custom-form/form-area/FormTextArea";
import FormItem from "@/components/common/form/custom-form/form-item/FormItem";
import FormInput from "@/components/common/form/custom-form/FormInput";
import FormSelect from "@/components/common/form/custom-form/select/FormSelect";
import CustomDatePicker from "@/components/common/form/date-picker/DatePicker";
import FormUploadMultiImage from "@/components/common/form/form-upload/FormUploadMultiImage";
import FormUploadVideo from "@/components/common/form/form-upload/FormUploadVideo";
import Text from "@/components/common/text-common/text/Text";
import bankAccountFactory from "@/redux/bank_account/factory";
import categoryFactory from "@/redux/category/factory";
import locationFactory from "@/redux/location/factory";
import postFactory from "@/redux/post/factory";
import Constants from "@/utils/Constants";
import Utils, { getToast, parseNumber } from "@/utils/Utils";
import Validator from "@/utils/Validate";
import { useEffect, useState } from "react";
import { FormProvider, set, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function PopupCreatePost(props) {
  const { payload, showVisible } = props;

  const methods = useForm();
  const { handleSubmit, control, setValue, watch } = methods;
  const [categories, setCategories] = useState([]);
  const user = useSelector((state) => state.user.dataUser);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [provincesData, setProvinces] = useState([]);
  const [wardsData, setWards] = useState([]);
  const province = methods.watch("province");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const query = new URLSearchParams();
        query.set("pageSize", Constants.MAX_VALUE_QUANTITY.MAX_VALUE);

        const data = await categoryFactory.getAllCategories(query);
        const bankAccountsData =
          await bankAccountFactory.getBankAccountsByUserId(user.id);
        setCategories(data?.result?.Data || []);
        setBankAccounts(bankAccountsData?.result || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, [user.id, showVisible]);
  const dataCategoriesOptions = categories.map((category) => ({
    label: category.categoryName,
    key: category.id,
  }));
  const dataBankAccountsOptions = bankAccounts.map((bankAccount) => ({
    label: `${bankAccount.accountHolderName} - ${bankAccount.bankAccountNumber}`,
    key: bankAccount.id,
  }));
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      const fullAddress = [data.address, data.ward, data.province]
        .filter(Boolean)
        .join(", ");
      formData.append("address", fullAddress);
      if (payload?.data?.id) formData.append("id", payload?.data?.id);
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("targetAmount", parseNumber(data.targetAmount));
      formData.append("user", user?.id);
      formData.append("category", data.category);
      formData.append("bankAccount", data.bankAccountId);
      formData.append("endDate", Utils.getDateDayjs(data.endDate, 20));
      console.log("data");

      // ✅ Video
      if (data.video?.file) {
        formData.append("video", data.video.file);
      } else if (payload?.data?.publicVideoId) {
        // Nếu video cũ vẫn giữ
        formData.append("publicVideoId", payload?.data?.publicVideoId);
      }

      // =============================
      // ✅ ẢNH: Gửi ảnh cũ + ảnh mới
      // =============================
      if (data.images && data.images.length > 0) {
        data.images.forEach((img, index) => {
          //  1) Nếu là ảnh thumbnail
          if (img.isThumb) {
            formData.append(`images[${index}].isThumbnail`, true);
          }
          //  2) Nếu có publicId → là ảnh cũ
          if (img.publicId) {
            formData.append(`images[${index}].publicId`, img.publicId);
          }

          //  3) Nếu có file → là ảnh mới
          if (img.file) {
            formData.append(`images[${index}].file`, img.file);
          }
        });
      }

      // Gọi API
      const response = payload?.data?.id
        ? await postFactory.updatePost(payload.data.id, formData)
        : await postFactory.createPost(formData);

      if (response?.code == 200) {
        handleClose();
        getToast(
          payload?.data?.id
            ? "Cập nhật bài đăng thành công!"
            : "Tạo bài đăng thành công!",
          "success"
        );
        payload?.fetchPosts();
      } else {
        getToast(
          payload?.data?.id
            ? "Cập nhật bài đăng không thành công!"
            : "Tạo bài đăng không thành công!",
          "error"
        );
      }
    } catch (err) {
      getToast(err.message || "Có lỗi xảy ra!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    methods.reset({
      title: "",
      description: "",
      targetAmount: "",
      category: null,
      bankAccountId: null,
      video: null,
      images: [],
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
    console.log("payload", payload);

    if (payload?.data) {
      const data = payload?.data;
      setValue("title", data.title);
      setValue("description", data.description);
      setValue("targetAmount", data.targetAmount);
      setValue("category", data.category?.id);
      setValue("bankAccountId", data.bankAccount?.id);
      setValue("video", data.video);
      setValue("endDate", data.endDate);
      setValue(
        "images",
        data.images?.map((img) => ({
          ...img,
          url: img.imageUrl, // chuyển imageUrl → url để component hiểu
          isThumb: img.isThumbnail, // map đúng tên
        })) || []
      );
      if (data.address) {
        const parts = data.address.split(",").map((p) => p.trim());

        setValue("province", parts[2]);
        setValue("ward", parts[1]);
        setValue("address", parts[0] || "");
      }
    } else {
      handleReset();
    }
  }, [payload]);
  const getProvinces = async () => {
    const data = await locationFactory.getProvinces();
    if (data?.code === 200) {
      setProvinces(
        data.result?.map((item) => ({
          value: item.id,
          label: `${item.name}`,
          key: item.name,
        }))
      );
    }
  };
  const getWards = async (provinceId) => {
    const data = await locationFactory.getWards(provinceId);
    if (data?.code === 200) {
      setWards(
        data.result?.map((item) => ({
          value: item.name,
          label: `${item.name}`,
          key: item.name,
        }))
      );
    }
  };

  useEffect(() => {
    getProvinces();
  }, []);
  const findProvinceValueByName = (name) => {
    const provinceItem = provincesData.find((item) => item.label === name);
    return provinceItem ? provinceItem.value : null; // trả về value hoặc null nếu không tìm thấy
  };
  useEffect(() => {
    if (province) {
      const value = findProvinceValueByName(province);
      if (value) {
        getWards(value);
      }
    }
  }, [province]);
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-2 bg-[#f0f1f3] min-w-[900px] max-h-[80vh] overflow-y-auto">
          <div className="bg-[#ffffff] rounded-lg p-2 flex flex-col gap-4">
            <FormUploadMultiImage fieldName="images" />
            <FormInput
              fieldName="title"
              placeholder="Tiêu đề bài đăng"
              required={true}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormItem title="Lĩnh vực HD" required={true}>
                <FormSelect
                  fieldName="category"
                  placeholder="Chọn lĩnh vực hoạt động"
                  options={dataCategoriesOptions || []}
                  required={true}
                />
              </FormItem>
              <FormItem title="Ngày kết thúc" required={true}>
                <CustomDatePicker fieldName="endDate" required={true} />
              </FormItem>
              <FormItem title="Tài khoản NH" required={true}>
                <FormSelect
                  fieldName="bankAccountId"
                  required={true}
                  placeholder="Chọn tài khoản ngân hàng"
                  options={dataBankAccountsOptions || []}
                />
              </FormItem>
              {/* <FormItem title="Ngày bắt đầu" required={true}>
                <CustomDatePicker fieldName="startDate" required={true} />
              </FormItem> */}

              <FormItem title="Số tiền mục tiêu" required={true}>
                <FormInput
                  fieldName="targetAmount"
                  placeholder="Nhập số tiền mục tiêu"
                  format={Constants.FormInputFormat.MONEY.VALUE}
                  required={true}
                />
              </FormItem>
              <FormItem title="Tỉnh/thành phố" required={true}>
                <FormSelect
                  fieldName="province"
                  placeholder="Chọn tỉnh/thành phố"
                  options={provincesData || []}
                  required={true}
                />
              </FormItem>
              <FormItem title="Xã/Phường" required={true}>
                <FormSelect
                  fieldName="ward"
                  placeholder="Chọn xã/phường"
                  options={wardsData || []}
                  required={true}
                />
              </FormItem>
              <FormItem title="Địa chỉ cụ thể" required={true}>
                <FormInput
                  fieldName="address"
                  placeholder="Nhập địa chỉ cụ thể"
                  required={true}
                />
              </FormItem>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormUploadVideo fieldName="video" title="Tải lên video " />
            </div>
            <FormTextArea
              fieldName="description"
              validate={[Validator.maxLength(20000), Validator.required()]}
              placeholder={"Nhập nội dung..."}
              required={true}
              minHeight={100}
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
          </div>
        </div>
        <ButtonFooterGroup onCancel={handleClose} saveLoading={loading} />
      </form>
    </FormProvider>
  );
}
