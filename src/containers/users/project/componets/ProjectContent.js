"use client";

import FormInput from "@/components/common/form/custom-form/FormInput";
import FormSelect from "@/components/common/form/custom-form/select/FormSelect";
import FormGroupSearchRowTop from "@/components/common/form/form-search/CustomFormSearchTop";
import useQuery from "@/components/hooks/use-query";
import useCustomRouter from "@/components/hooks/use-router";
import CustomPagination from "@/components/pagination/custom-pagination";
import PostItem from "@/containers/users/home/components/PostItem";
import categoryFactory from "@/redux/category/factory";
import Constants from "@/utils/Constants";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function ProjectContent() {
  const dataPosts = useSelector((state) => state.post.postData);
  const [dataCategories, setDataCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState();
  const defaultValues = {
    categoryId: "",
    postTitle: "",
    typeSort: null,
  };
  const methods = useForm({ defaultValues });
  const router = useCustomRouter();
  const query = useQuery();
  const typeSort = methods.watch("typeSort");

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const query = new URLSearchParams();
  //     if (categorySelected) {
  //       query.set(Constants.ROUTER_URL.CATEGORY_ID, categorySelected);
  //     }
  //     if (postTitle) {
  //       query.set(Constants.ROUTER_URL.POST_TITLE, postTitle);
  //     }
  //     if (typeSort !== undefined) {
  //       switch (typeSort) {
  //         case 0:
  //           query.set(Constants.ROUTER_URL.SORT_TARGET_AMOUNT, false);
  //           break;
  //         case 1:
  //           query.set(Constants.ROUTER_URL.SORT_TARGET_AMOUNT, true);
  //           break;
  //         case 2:
  //           query.set(Constants.ROUTER_URL.SORT_DONATED_AMOUNT, false);
  //           break;
  //         case 3:
  //           query.set(Constants.ROUTER_URL.SORT_DONATED_AMOUNT, true);
  //       }
  //     }
  //     const data = await postFactory.getAllPosts(query);
  //     setDataPosts(data?.result);
  //   };
  //   fetchPosts();
  // }, [categorySelected, typeSort, postTitle]);
  const onSubmits = (data) => {
    let params = { ...router.getAll() };
    router.replace({
      params: {
        ...params,
        [`${Constants.ROUTER_URL.CATEGORY_ID}`]: categorySelected,
        [`${Constants.ROUTER_URL.POST_TITLE}`]: data?.postTitle?.trim(),
        [`${Constants.ROUTER_URL.TYPE_SORT}`]: data?.typeSort,
        [`${Constants.ROUTER_URL.PAGE}`]: Constants.PAGING.CURRENT_PAGE,
        [`${Constants.ROUTER_URL.PAGE_SIZE}`]: Constants.PAGING.ROW_PER_PAGE,
      },
    });
  };
  const resetForm = () => {
    methods.reset();
    setCategorySelected(null);
    router.replace({
      params: {},
    });
  };
  useEffect(() => {
    if (query?.get(Constants.ROUTER_URL.CATEGORY_NAME)) {
      methods.setValue(
        "categoryId",
        query?.get(Constants.ROUTER_URL.CATEGORY_NAME)
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
    if (query?.get(Constants.ROUTER_URL.TYPE_SORT)) {
      methods.setValue(
        "sortTargetAmount",
        query?.get(Constants.ROUTER_URL.TYPE_SORT)
      );
    } else {
      methods.setValue("sortTargetAmount", defaultValues?.typeSort);
    }
  }, [query, categorySelected]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await categoryFactory.getAllCategories();
      setDataCategories(data?.result?.Data || []);
    };
    fetchData();
  }, []);
  // const dataCategoriesOptions = dataCategories?.map((category) => ({
  //   label: category.categoryName,
  //   key: category.id,
  // }));
  useEffect(() => {
    const data = methods.getValues();
    onSubmits(data);
  }, [categorySelected, typeSort]);

  return (
    <div className="bg-linear-to-b pt-8 bg-[#FFFFFF] w-[1158px]">
      <div className="text-center mx-auto bg-[#CCF88E] w-full py-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
          Các hoạt động gây quỹ theo danh mục
        </h1>
        <p className="mt-3 text-sm md:text-base text-gray-600 leading-relaxed">
          Mọi người ở khắp mọi nơi, đều dễ dàng tìm được những hoàn cảnh cần bạn
          giúp đỡ
        </p>
      </div>
      <div className="max-w-[1158px] mx-auto  md:px-6 lg:px-0 ">
        <section className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {dataCategories?.map(({ id, categoryName }) => (
            <div
              key={id}
              className={`flex items-center justify-center gap-2 rounded-xl border bg-white ${
                categorySelected === id ? "border-green-600" : "border-gray-200"
              } py-2 transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer`}
              onClick={() =>
                categorySelected == id
                  ? setCategorySelected(null)
                  : setCategorySelected(id)
              }
            >
              {/* Circle with initials */}
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 text-lg font-semibold">
                {categoryName.charAt(0)}
              </span>
              <span className="text-sm font-medium text-gray-700">
                {categoryName}
              </span>
            </div>
          ))}
        </section>

        <div className="pt-8 pb-2 space-y-14 border-b border-gray-300 ">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmits)}>
              <FormGroupSearchRowTop
                resetForm={resetForm}
                title="Tìm kiếm các bài viết gây quỹ"
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
                    <div className="w-50">
                      <FormSelect
                        fieldName="typeSort"
                        placeholder="Danh mục"
                        options={[
                          { label: "Quỹ mục tiêu tăng dần", key: 1 },
                          { label: "Quỹ mục tiêu giảm dần", key: 2 },
                          { label: "Số tiền đã quyên góp tăng dần", key: 3 },
                          { label: "Số tiền đã quyên góp giảm dần", key: 4 },
                        ]}
                      />
                    </div>
                  </div>
                }
              />
            </form>
          </FormProvider>
        </div>
        {/*  Danh sách bài post */}
        <div className="my-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 border-t ">
          {dataPosts?.Data?.map((item) => (
            <PostItem
              key={item.id}
              id={item.id}
              image={
                item.images?.find((img) => img.isThumbnail)?.imageUrl ||
                item.images?.[0]?.imageUrl ||
                "/images/default-image.png"
              }
              title={item.title}
              group={item.category?.categoryName}
              raised={item?.donatedAmount} // nếu bạn chưa có số tiền quyên góp → set 0
              goal={item.targetAmount}
            />
          ))}
        </div>
        <div className="flex border-t border-gray-300">
          {dataPosts?.Paging && (
            <CustomPagination Total={dataPosts?.Paging?.TotalRecord || 0} />
          )}
        </div>
      </div>
    </div>
  );
}
