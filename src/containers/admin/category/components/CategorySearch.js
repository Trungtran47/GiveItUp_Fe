import IcPlus from "@/assets/icons/ic-plus";
import ButtonCommon from "@/components/common/button/ButtonCommon";
import FormInput from "@/components/common/form/custom-form/FormInput";
import FormGroupSearchRowTop from "@/components/common/form/form-search/CustomFormSearchTop";
import useQuery from "@/components/hooks/use-query";
import useCustomRouter from "@/components/hooks/use-router";
import Constants from "@/utils/Constants";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function CategorySearch({ onCreate }) {
  const defaultValues = {
    categoryName: "",
  };
  const methods = useForm({ defaultValues });
  const router = useCustomRouter();
  const query = useQuery();

  const onSubmits = (data) => {
    let params = { ...router.getAll() };
    router.replace({
      params: {
        ...params,
        [`${Constants.ROUTER_URL.CATEGORY_NAME}`]: data?.categoryName?.trim(),
        [`${Constants.ROUTER_URL.PAGE}`]: Constants.PAGING.CURRENT_PAGE,
        [`${Constants.ROUTER_URL.PAGE_SIZE}`]: Constants.PAGING.ROW_PER_PAGE,
      },
    });
  };
  useEffect(() => {
    if (query?.get(Constants.ROUTER_URL.CATEGORY_NAME)) {
      methods.setValue(
        "categoryName",
        query?.get(Constants.ROUTER_URL.CATEGORY_NAME)
      );
    } else {
      methods.setValue("categoryName", defaultValues?.categoryName);
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
          title="DANH MỤC LĨNH VỰC"
          // titleButton="Thiết lập lại"
          componentLeft={
            <FormInput
              fieldName="categoryName"
              placeholder="Nhập tên lĩnh vực"
              isSearch={true}
            />
          }
          componentRight={
            <ButtonCommon
              onClick={() => onCreate(null)}
              startIcon={<IcPlus />}
              title="Thêm mới"
              style={{ height: "32px" }}
            />
          }
        />
      </form>
    </FormProvider>
  );
}
