import FormInput from "@/components/common/form/custom-form/FormInput";
import FormGroupSearchRowTop from "@/components/common/form/form-search/CustomFormSearchTop";
import useQuery from "@/components/hooks/use-query";
import useCustomRouter from "@/components/hooks/use-router";
import Constants from "@/utils/Constants";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function AccountSearch() {
  const defaultValues = {
    name: "",
    phone: "",
  };
  const methods = useForm({ defaultValues });
  const router = useCustomRouter();
  const query = useQuery();

  const onSubmits = (data) => {
    let params = { ...router.getAll() };
    router.replace({
      params: {
        ...params,
        [`${Constants.ROUTER_URL.USER_NAME}`]: data?.name?.trim(),
        [`${Constants.ROUTER_URL.PHONE_NUMBER}`]: data?.phone?.trim(),
        [`${Constants.ROUTER_URL.PAGE}`]: Constants.PAGING.CURRENT_PAGE,
        [`${Constants.ROUTER_URL.PAGE_SIZE}`]: Constants.PAGING.ROW_PER_PAGE,
      },
    });
  };
  useEffect(() => {
    if (query?.get(Constants.ROUTER_URL.USER_NAME)) {
      methods.setValue("name", query?.get(Constants.ROUTER_URL.USER_NAME));
    } else {
      methods.setValue("name", defaultValues?.name);
    }
    if (query?.get(Constants.ROUTER_URL.PHONE_NUMBER)) {
      methods.setValue("phone", query?.get(Constants.ROUTER_URL.PHONE_NUMBER));
    } else {
      methods.setValue("phone", defaultValues?.phone);
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
          title="QUẢN LÝ TÀI KHOẢN NGƯỜI DÙNG"
          titleButton="Thiết lập lại"
          componentLeft={
            <div className="flex gap-2">
              <FormInput
                fieldName="name"
                placeholder="Nhập tên tài khoản"
                isSearch={true}
              />
              <FormInput
                fieldName="phone"
                placeholder="Nhập số điện thoại"
                isSearch={true}
              />
            </div>
          }
        />
      </form>
    </FormProvider>
  );
}
