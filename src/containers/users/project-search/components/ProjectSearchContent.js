"use client";
import useQuery from "@/components/hooks/use-query";
import useCustomRouter from "@/components/hooks/use-router";
import ContentListPosts from "@/containers/users/home/components/ContentListPosts";
import ListPostSearch from "@/containers/users/project-search/components/ListPostSearch";
import postFactory from "@/redux/post/factory";
import searchHistoryFactory from "@/redux/search_history/factory";
import Constants from "@/utils/Constants";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function ProjectSearchContent() {
  const [dataPosts, setDataPosts] = useState([]);
  const [dataSearch, setDataSearch] = useState(null);
  const { register, handleSubmit, setValue } = useForm();
  const query = useQuery();
  const router = useCustomRouter();

  // Fetch API theo query params
  const fetchData = async () => {
    const data = await searchHistoryFactory.search(query);
    if (data?.code == 200) {
      setDataSearch(data?.result);
    }
  };
  // Submit search → replace URL param
  const onSearch = (data) => {
    router.replace({
      params: {
        [Constants.ROUTER_URL.KEYWORD]: data.search?.trim(),
        [Constants.ROUTER_URL.PAGE]: 1,
        [Constants.ROUTER_URL.PAGE_SIZE]: 10,
      },
    });
  };

  // Đồng bộ input search với URL khi load lại trang
  useEffect(() => {
    if (query.get(Constants.ROUTER_URL.KEYWORD)) {
      setValue("search", query.get(Constants.ROUTER_URL.KEYWORD));
    } else {
      setValue("search", "");
    }
  }, [query]);
  useEffect(() => {
    if (query) {
      fetchData();
    }
  }, [query]); // Mỗi lần URL param thay đổi → gọi lại API
  useEffect(() => {
    const fetchData = async () => {
      const data = await postFactory.recommendPosts();
      setDataPosts(data?.result);
    };
    fetchData();
  }, []);
  return (
    <div className=" mx-auto py-10 pt-[56px] max-w-[1158px]">
      {/* Tiêu đề */}
      <h1 className="text-2xl font-semibold text-center text-gray-900 mb-1">
        Tìm kiếm thông tin quỹ
      </h1>
      <p className="text-gray-500 text-center mb-6">
        Tìm người gây quỹ theo tên, địa điểm, chức danh, từ khóa
      </p>
      {/* Thanh tìm kiếm */}
      <form onSubmit={handleSubmit(onSearch)}>
        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              {...register("search")}
              placeholder="Tìm kiếm"
              className="w-[576px] text-gray-700 rounded-full border border-gray-300 pl-10 pr-4 py-2 focus:ring-1 focus:ring-green-600 focus:outline-none"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
              />
            </svg>
          </div>
        </div>
      </form>
      {/* Tabs */}
      {dataSearch?.Data?.length > 0 ? (
        <ListPostSearch dataPosts={dataSearch} />
      ) : (
        <ContentListPosts dataPosts={dataPosts} />
      )}
    </div>
  );
}
