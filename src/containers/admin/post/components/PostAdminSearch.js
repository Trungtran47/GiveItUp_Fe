import IcPlus from "@/assets/icons/ic-plus";
import ButtonCommon from "@/components/common/button/ButtonCommon";
import FormInput from "@/components/common/form/custom-form/FormInput";
import FormSelect from "@/components/common/form/custom-form/select/FormSelect";
import CustomDatePicker from "@/components/common/form/date-picker/DatePicker";
import FormGroupSearchRowTop from "@/components/common/form/form-search/CustomFormSearchTop";
import useQuery from "@/components/hooks/use-query";
import useCustomRouter from "@/components/hooks/use-router";
import categoryFactory from "@/redux/category/factory";
import Constants from "@/utils/Constants";
import Utils from "@/utils/Utils";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function PostAdminSearch({ onCreate }) {
  const [dataCategories, setDataCategories] = useState([]);

  const defaultValues = {
    postTitle: "",
    categoryId: "",
    endDate: "",
    status: "",
    typeSort: null,
  };
  const methods = useForm({ defaultValues });
  const router = useCustomRouter();
  const query = useQuery();

  const onSubmits = (data) => {
    let params = { ...router.getAll() };
    router.replace({
      params: {
        ...params,
        [`${Constants.ROUTER_URL.CATEGORY_ID}`]: data?.categoryId || "",
        [`${Constants.ROUTER_URL.POST_TITLE}`]: data?.postTitle?.trim() || "",
        [`${Constants.ROUTER_URL.END_DATE}`]:
          Utils.getDateDayjs(data?.endDate, 3) || "",
        [`${Constants.ROUTER_URL.STATUS}`]: data?.status || "",
        [`${Constants.ROUTER_URL.TYPE_SORT}`]: data?.typeSort || "",
        [`${Constants.ROUTER_URL.PAGE}`]: Constants.PAGING.CURRENT_PAGE,
        [`${Constants.ROUTER_URL.PAGE_SIZE}`]: Constants.PAGING.ROW_PER_PAGE,
      },
    });
  };
  useEffect(() => {
    if (query?.get(Constants.ROUTER_URL.CATEGORY_ID)) {
      methods.setValue(
        "categoryId",
        query?.get(Constants.ROUTER_URL.CATEGORY_ID)
      );
    } else {
      methods.setValue("categoryId", defaultValues?.categoryId);
    }
    if (query?.get(Constants.ROUTER_URL.POST_TITLE)) {
      methods.setValue(
        "postTitle",
        query?.get(Constants.ROUTER_URL.POST_TITLE)
      );
    } else {
      methods.setValue("postTitle", defaultValues?.postTitle);
    }
    if (query?.get(Constants.ROUTER_URL.END_DATE)) {
      methods.setValue("endDate", query?.get(Constants.ROUTER_URL.END_DATE));
    } else {
      methods.setValue("endDate", defaultValues?.endDate);
    }
    if (query?.get(Constants.ROUTER_URL.STATUS)) {
      methods.setValue("status", query?.get(Constants.ROUTER_URL.STATUS));
    } else {
      methods.setValue("status", defaultValues?.status);
    }
    if (query?.get(Constants.ROUTER_URL.TYPE_SORT)) {
      methods.setValue("typeSort", query?.get(Constants.ROUTER_URL.TYPE_SORT));
    } else {
      methods.setValue("typeSort", defaultValues?.typeSort);
    }
  }, [query]);
  const resetForm = () => {
    methods.reset();
    router.replace({
      params: {},
    });
  };
  const categoryOptions = dataCategories?.map((category) => ({
    value: category.id,
    label: category.categoryName,
    key: category.id,
  }));
  useEffect(() => {
    const fetchData = async () => {
      const data = await categoryFactory.getAllCategories();
      setDataCategories(data?.result?.Data || []);
    };
    fetchData();
  }, []);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmits)}>
        <FormGroupSearchRowTop
          resetForm={resetForm}
          // title="QUAN LÝ BÀI VIẾT"
          // titleButton="Thiết lập lại"
          componentLeft={
            <div className="flex gap-4 items-center">
              <div className="w-64">
                <FormInput
                  fieldName="postTitle"
                  isSearch={true}
                  placeholder="Search..."
                />
              </div>
              <div className="w-40">
                <CustomDatePicker
                  fieldName="endDate"
                  placeholder="Kết thúc vào ngày"
                  handleActionChange={() => {
                    const data = methods.getValues();
                    onSubmits(data); // tự submit form
                  }}
                />
              </div>
              <div className="w-50">
                <FormSelect
                  fieldName="categoryId"
                  placeholder="Danh mục"
                  options={categoryOptions || []}
                  handleActionChange={() => {
                    const data = methods.getValues();
                    onSubmits(data);
                  }}
                />
              </div>
              <div className="w-50">
                <FormSelect
                  fieldName="status"
                  placeholder="Trạng thái"
                  options={[
                    { label: "Đang chờ duyệt", key: 10 },
                    { label: "Đang hoạt động", key: 20 },
                    { label: "Hết hạn", key: 30 },
                    { label: "Đã hoàn thành", key: 50 },
                    { label: "Từ chối duyệt", key: 90 },
                    { label: "Bài viết bị chặn", key: 91 },
                  ]}
                  handleActionChange={() => {
                    const data = methods.getValues();
                    onSubmits(data);
                  }}
                />
              </div>
              <div className="w-50">
                <FormSelect
                  fieldName="typeSort"
                  placeholder="Sắp xếp theo"
                  options={[
                    { label: "Quỹ mục tiêu tăng dần", key: 1 },
                    { label: "Quỹ mục tiêu giảm dần", key: 2 },
                    { label: "Số tiền đã quyên góp tăng dần", key: 3 },
                    { label: "Số tiền đã quyên góp giảm dần", key: 4 },
                  ]}
                  handleActionChange={() => {
                    const data = methods.getValues();
                    onSubmits(data);
                  }}
                />
              </div>
            </div>
          }
        />
      </form>
    </FormProvider>
  );
}
