"use client";
import ButtonFooterGroup from "@/components/common/button/footer/ButtonFooterGroup";
import FormTextArea from "@/components/common/form/custom-form/form-area/FormTextArea";
import FormItem from "@/components/common/form/custom-form/form-item/FormItem";
import FormInput from "@/components/common/form/custom-form/FormInput";
import FormSelect from "@/components/common/form/custom-form/select/FormSelect";
import CustomDatePicker from "@/components/common/form/date-picker/DatePicker";
import FormUploadFile from "@/components/common/form/form-upload/FormUploadFile";
import FormUploadImage from "@/components/common/form/form-upload/FormUploadImage";
import categoryFactory from "@/redux/category/factory";
import locationFactory from "@/redux/location/factory";
import userFactory from "@/redux/user/factory";
import { getDataUser } from "@/redux/user/reducer";
import Constants from "@/utils/Constants";
import { getToast } from "@/utils/Utils";
import Validator from "@/utils/Validate";
import { use, useEffect, useState } from "react";
import { FormProvider, set, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

export default function PopupCreateAuthor(props) {
  const { payload, showVisible } = props;
  const methods = useForm();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.dataUser);
  const dispatch = useDispatch();
  const province = methods.watch("organizationProvince");
  const ward = methods.watch("organizationWard");
  const inputValue = methods.watch("organizationAddressDetail");
  const [provincesData, setProvinces] = useState([]);
  const [wardsData, setWards] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const query = new URLSearchParams();
        query.set("pageSize", Constants.MAX_VALUE_QUANTITY.MAX_VALUE);

        const data = await categoryFactory.getAllCategories(query);
        setCategories(data?.result?.Data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, [showVisible]);

  const dataCategoriesOptions = categories.map((category) => ({
    label: category.categoryName,
    key: category.id,
  }));
  const { handleSubmit, register, control, setValue } = methods;

  const onSubmits = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      const fullAddress = [
        data.organizationAddressDetail,
        data.organizationWard,
        data.organizationProvince,
      ]
        .filter(Boolean)
        .join(", ");
      formData.append("organizationAddress", fullAddress);
      if (data.organizationLogo?.file instanceof File) {
        formData.append("organizationLogo", data.organizationLogo.file);
      } else if (typeof data.organizationLogo === "string") {
        formData.append("organizationLogoUrl", data.organizationLogo);
      }
      if (data.verificationFile?.file instanceof File) {
        formData.append("verificationFile", data.verificationFile.file);
      } else if (typeof data.verificationFile === "string") {
        formData.append("verificationFileUrl", data.verificationFile);
      }
      for (const key in data) {
        if (
          [
            "organizationProvince",
            "organizationWard",
            "organizationAddressDetail",
            "organizationLogo",
            "verificationFile",
            "status", // tránh gửi trùng
          ].includes(key)
        ) {
          continue;
        }
        const value = data[key];
        if (typeof value === "string" || typeof value === "number") {
          formData.append(key, value);
        }
      }
      if (payload?.userData) {
        formData.append("status", 30);
      }
      const response = await userFactory.registerAuthor(user?.id, formData);
      if (response.code === 200) {
        handleClose();
        getToast("Đăng ký tác giả thành công!", "success");
        dispatch(getDataUser());
      } else {
        getToast("Đăng ký tác giả không thành công!", "error");
      }
    } catch (error) {
      getToast(error.message || "Có lỗi xảy ra!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    methods.reset({
      organizationLogo: null,
      organizationName: "",
      category: null,
      establishmentDate: null,
      organizationAddress: "",
      organizationEmail: "",
      registrationCode: "",
      organizationPhone: "",
      verificationFile: null,
      linkInfoOrganization: "",
      organizationDescription: "",
    });
  };

  const handleClose = () => {
    if (payload?.fallback) {
      payload?.fallback();
    }
    showVisible(false);
    handleReset();
  };
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
  useEffect(() => {
    if (payload?.userData) {
      const userData = payload.userData;
      setValue("organizationName", userData.organizationName || "");
      setValue("category", userData?.category?.id || null);
      setValue("establishmentDate", userData.establishmentDate || null);
      setValue("organizationEmail", userData.organizationEmail || "");
      setValue("registrationCode", userData.registrationCode || "");
      setValue("organizationPhone", userData.organizationPhone || "");
      setValue("linkInfoOrganization", userData.linkInfoOrganization || "");
      setValue("organizationLogo", userData.organizationLogo || null);
      setValue("verificationFile", userData.verificationFile || null);
      setValue(
        "organizationDescription",
        userData.organizationDescription || ""
      );
      if (userData.organizationAddress) {
        const parts = userData.organizationAddress
          .split(",")
          .map((p) => p.trim());

        setValue("organizationProvince", parts[2]);
        // Tìm ward theo tên
        setValue("organizationWard", parts[1]);

        // Set phần detail
        setValue("organizationAddressDetail", parts[0] || "");
      }
    }
  }, [payload?.userData]);
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmits)}
        encType="multipart/form-data"
      >
        <div className="p-2 bg-[#f0f1f3] min-w-[900px]">
          <div className="bg-[#ffffff] rounded-lg p-2 flex flex-col gap-4">
            <div className="flex gap-4 ">
              <FormUploadImage
                fieldName="organizationLogo"
                title="Tải ảnh đại diện"
              />

              <FormItem title="Tên tổ chức" required={true}>
                <FormInput
                  fieldName="organizationName"
                  placeholder="Nhập tên tổ chức"
                  required={true}
                />
              </FormItem>
            </div>
            <div className="w-full grid grid-cols-2 gap-4">
              <FormItem title="Lĩnh vực HD" required={true}>
                <FormSelect
                  fieldName="category"
                  placeholder="Chọn lĩnh vực hoạt động"
                  options={dataCategoriesOptions || []}
                  required={true}
                />
              </FormItem>
              <FormItem title="Ngày thành lập" required={true}>
                <CustomDatePicker
                  fieldName="establishmentDate"
                  required={true}
                />
              </FormItem>

              <FormItem title="Email tổ chức" required={true}>
                <FormInput
                  fieldName="organizationEmail"
                  placeholder="Nhập email"
                  required={true}
                />
              </FormItem>
              <FormItem title="Mã đăng ký" required={true}>
                <FormInput
                  fieldName="registrationCode"
                  placeholder="Nhập mã đăng ký"
                  required={true}
                />
              </FormItem>
              <FormItem title="Số điện thoại" required={true}>
                <FormInput
                  fieldName="organizationPhone"
                  placeholder="Nhập số điện thoại"
                  required={true}
                />
              </FormItem>
              <FormItem title="Thông tin XT" required={true}>
                <FormUploadFile
                  fieldName="verificationFile"
                  placeholder="Tải tệp xác thực"
                />
              </FormItem>
              <FormItem title="Địa điểm" required={true}>
                <FormSelect
                  fieldName="organizationProvince"
                  placeholder="Chọn tỉnh/thành phố"
                  options={provincesData || []}
                  required={true}
                />
              </FormItem>
              <FormItem title="Link mạng XH">
                <FormInput
                  fieldName="linkInfoOrganization"
                  placeholder="Nhập link nếu có"
                  required={true}
                />
              </FormItem>
              <FormItem title="Phường/Xã" required={true}>
                <FormSelect
                  fieldName="organizationWard"
                  placeholder="Chọn phường/xã"
                  options={wardsData || []}
                  required={true}
                />
              </FormItem>
              <FormItem title="Địa chỉ chi tiết" required={true}>
                <FormInput
                  fieldName="organizationAddressDetail"
                  placeholder="Nhập địa chỉ chi tiết "
                  required={true}
                />
              </FormItem>
            </div>
            <div className="flex items-start">
              <FormItem title="Mô tả" required>
                <FormTextArea
                  fieldName="organizationDescription"
                  validate={[Validator.maxLength(3000), Validator.required()]}
                  placeholder={"Nhập..."}
                  required={true}
                  minHeight={60}
                  isFocusInput
                  style={{
                    border: "1px solid #AEB7C6",
                    width: "740px",
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
