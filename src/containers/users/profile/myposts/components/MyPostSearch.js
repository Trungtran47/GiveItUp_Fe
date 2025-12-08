import IcPlus from "@/assets/icons/ic-plus";
import ButtonCommon from "@/components/common/button/ButtonCommon";
import FormInput from "@/components/common/form/custom-form/FormInput";
import FormGroupSearchRowTop from "@/components/common/form/form-search/CustomFormSearchTop";
import useQuery from "@/components/hooks/use-query";
import useCustomRouter from "@/components/hooks/use-router";
import Constants from "@/utils/Constants";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function MyPostSearch({ onCreate }) {
  const defaultValues = {
    keyword: "",
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
            <FormInput
              fieldName="keyword"
              placeholder="Title bài viết"
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
