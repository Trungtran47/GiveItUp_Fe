"use client";

import FormInput from "@/components/common/form/custom-form/FormInput";
import FormSelect from "@/components/common/form/custom-form/select/FormSelect";
import CustomPagination from "@/components/pagination/custom-pagination";
import PostItem from "@/containers/users/home/components/PostItem";
import categoryFactory from "@/redux/category/factory";
import postFactory from "@/redux/post/factory";
import Constants from "@/utils/Constants";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

// const CATEGORY_ITEMS = [
//   { id: "health", label: "Y tế", Icon: HeartIcon },
//   { id: "education", label: "Giáo dục", Icon: EducationIcon },
//   { id: "environment", label: "Môi trường", Icon: LeafIcon },
//   { id: "community", label: "Cộng đồng", Icon: CommunityIcon },
//   { id: "disaster", label: "Thiên tai", Icon: ShieldIcon },
//   { id: "charity", label: "Từ thiện", Icon: CharityIcon },
//   { id: "children", label: "Trẻ em", Icon: ChildrenIcon },
//   { id: "family", label: "Gia đình", Icon: FamilyIcon },
// ];

export default function ProjectContent() {
  const [dataPosts, setDataPosts] = useState([]);
  const [dataCategories, setDataCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState();
  const methods = useForm();
  const { watch } = methods;
  const typeSort = watch("typeSort");
  const postTitle = watch("postTitle");
  useEffect(() => {
    const fetchPosts = async () => {
      const query = new URLSearchParams();
      if (categorySelected) {
        query.set(Constants.ROUTER_URL.CATEGORY_ID, categorySelected);
      }
      if (postTitle) {
        query.set(Constants.ROUTER_URL.POST_TITLE, postTitle);
      }
      if (typeSort !== undefined) {
        switch (typeSort) {
          case 0:
            query.set(Constants.ROUTER_URL.SORT_TARGET_AMOUNT, false);
            break;
          case 1:
            query.set(Constants.ROUTER_URL.SORT_TARGET_AMOUNT, true);
            break;
          case 2:
            query.set(Constants.ROUTER_URL.SORT_DONATED_AMOUNT, false);
            break;
          case 3:
            query.set(Constants.ROUTER_URL.SORT_DONATED_AMOUNT, true);
        }
      }
      const data = await postFactory.getAllPosts(query);
      setDataPosts(data?.result);
    };
    fetchPosts();
  }, [categorySelected, typeSort, postTitle]);

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
            <form>
              <div className="flex ">
                <div className="flex-1 "> </div>
                <div className="flex-1 flex gap-4">
                  <FormInput
                    fieldName="postTitle"
                    isSearch={true}
                    placeholder="Search..."
                  />
                  <FormSelect
                    fieldName="typeSort"
                    placeholder="Danh mục"
                    options={[
                      { label: "Quỹ mục tiêu tăng dần", key: 0 },
                      { label: "Quỹ mục tiêu giảm dần", key: 1 },
                      { label: "Số tiền đã quyên góp tăng dần", key: 2 },
                      { label: "Số tiền đã quyên góp giảm dần", key: 3 },
                    ]}
                  />
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
        {/*  Danh sách bài post */}
        <div className="my-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 border-t ">
          {dataPosts?.Data?.map((item) => (
            <PostItem
              key={item.id}
              id={item.id}
              image={item.images?.[0]?.imageUrl || "/images/default-image.png"}
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
        {/* <div className="mt-16 flex justify-center">
          <button
            type="button"
            className="px-8 py-3 rounded-full border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition"
          >
            Hiển thị thêm danh mục
          </button>
        </div> */}
      </div>
    </div>
  );
}

// function HeartIcon() {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.5"
//       className="h-6 w-6"
//     >
//       <path d="M12 21s-6.5-4.35-9-8.28C1.07 10.2 1 7.8 2.4 6.2 3.7 4.8 5.8 4.4 7.4 5.2 8.4 5.7 9.2 6.6 12 9.4c2.8-2.8 3.6-3.7 4.6-4.2 1.6-.8 3.7-.4 5 1 1.4 1.6 1.3 4-.6 6.52C18.5 16.65 12 21 12 21z" />
//     </svg>
//   );
// }

// function EducationIcon() {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.5"
//       className="h-6 w-6"
//     >
//       <path d="M3 8l9-4 9 4-9 4-9-4z" />
//       <path d="M7 10.5v4.5c0 .8 1.8 1.5 5 1.5s5-0.7 5-1.5v-4.5" />
//       <path d="M21 8v5" />
//     </svg>
//   );
// }

// function LeafIcon() {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.5"
//       className="h-6 w-6"
//     >
//       <path d="M5 19c7-2 11-6 13-13" />
//       <path d="M5 19c-1-6 2-11 8-13" />
//       <path d="M5 19c3 0 7-4 7-7" />
//     </svg>
//   );
// }

// function CommunityIcon() {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.5"
//       className="h-6 w-6"
//     >
//       <circle cx="6" cy="8" r="2.5" />
//       <circle cx="18" cy="8" r="2.5" />
//       <path d="M2 19c0-2.8 2.2-5 5-5s5 2.2 5 5" />
//       <path d="M12 19c0-2.8 2.2-5 5-5s5 2.2 5 5" />
//     </svg>
//   );
// }

// function ShieldIcon() {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.5"
//       className="h-6 w-6"
//     >
//       <path d="M12 21c-5-2-8-5-8-11V5l8-3 8 3v5c0 6-3 9-8 11z" />
//       <path d="M9 11l2 2 4-4" />
//     </svg>
//   );
// }

// function CharityIcon() {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.5"
//       className="h-6 w-6"
//     >
//       <path d="M4 13c0-1.7 2.5-3 6-3s6 1.3 6 3-2.5 3-6 3-6-1.3-6-3z" />
//       <path d="M10 10V5c0-1.5 1.2-2.8 2.8-3C14.6 1.8 16 3.1 16 4.8V7" />
//       <path d="M16 11c2.2 0 4 1 4 2.5S18.2 16 16 16" />
//     </svg>
//   );
// }

// function ChildrenIcon() {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.5"
//       className="h-6 w-6"
//     >
//       <circle cx="8" cy="7" r="2.5" />
//       <circle cx="16" cy="7" r="2.5" />
//       <path d="M4 21v-2c0-2.2 1.8-4 4-4s4 1.8 4 4v2" />
//       <path d="M12 21v-2c0-2.2 1.8-4 4-4s4 1.8 4 4v2" />
//     </svg>
//   );
// }

// function FamilyIcon() {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.5"
//       className="h-6 w-6"
//     >
//       <circle cx="8" cy="9" r="2.5" />
//       <circle cx="16" cy="9" r="2.5" />
//       <path d="M4 21v-3c0-2.2 1.8-4 4-4s4 1.8 4 4v3" />
//       <path d="M12 21v-3c0-2.2 1.8-4 4-4s4 1.8 4 4v3" />
//     </svg>
//   );
// }
