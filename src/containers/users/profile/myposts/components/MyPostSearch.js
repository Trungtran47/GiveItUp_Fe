import IcPlus from "@/assets/icons/ic-plus";
import ButtonCommon from "@/components/common/button/ButtonCommon";
import FormInput from "@/components/common/form/custom-form/FormInput";
import FormSelect from "@/components/common/form/custom-form/select/FormSelect";
import FormGroupSearchRowTop from "@/components/common/form/form-search/CustomFormSearchTop";
import useQuery from "@/components/hooks/use-query";
import useCustomRouter from "@/components/hooks/use-router";
import Constants from "@/utils/Constants";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function MyPostSearch({ onCreate }) {
  const defaultValues = {
    keyword: "",
    status: null,
  };
  const methods = useForm({ defaultValues });
  const router = useCustomRouter();
  const query = useQuery();

  const onSubmits = (data) => {
    let params = { ...router.getAll() };
    router.replace({
      params: {
        ...params,
        [`${Constants.ROUTER_URL.KEYWORD}`]: data?.keyword?.trim(),
        [`${Constants.ROUTER_URL.STATUS}`]: data?.status || "",
        [`${Constants.ROUTER_URL.PAGE}`]: Constants.PAGING.CURRENT_PAGE,
        [`${Constants.ROUTER_URL.PAGE_SIZE}`]: Constants.PAGING.ROW_PER_PAGE,
      },
    });
  };
  useEffect(() => {
    if (query?.get(Constants.ROUTER_URL.KEYWORD)) {
      methods.setValue("keyword", query?.get(Constants.ROUTER_URL.KEYWORD));
    } else {
      methods.setValue("keyword", defaultValues?.keyword);
    }
    if (query?.get(Constants.ROUTER_URL.STATUS)) {
      methods.setValue(
        "status",
        parseInt(query?.get(Constants.ROUTER_URL.STATUS))
      );
    } else {
      methods.setValue("status", defaultValues?.status);
    }
  }, [query]);
  const resetForm = () => {
    methods.reset();
    router.replace({
      params: {},
    });
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmits)}>
        <FormGroupSearchRowTop
          resetForm={resetForm}
          title="TIÊU ĐỀ BÀI VIẾT"
          // titleButton="Thiết lập lại"
          componentLeft={
            <div className="flex gap-2">
              <div className="w-60">
                <FormInput
                  fieldName="keyword"
                  placeholder="Title bài viết"
                  isSearch={true}
                />
              </div>
              <div className="w-40">
                <FormSelect
                  fieldName="status"
                  placeholder="Trạng thái"
                  options={[
                    { label: "Đang hoạt động", key: 20 },
                    { label: "Hết hạn", key: 30 },
                    { label: "Đã hoàn thành", key: 50 },
                    { label: "Ẩn", key: 90 },
                  ]}
                  handleActionChange={() => {
                    const data = methods.getValues();
                    onSubmits(data);
                  }}
                />
              </div>
            </div>
          }
          componentRight={
            <ButtonCommon
              onClick={() => onCreate(null)}
              startIcon={<IcPlus />}
              title="Tạo mới"
              style={{ height: "32px" }}
            />
          }
        />
      </form>
    </FormProvider>
  );
}
