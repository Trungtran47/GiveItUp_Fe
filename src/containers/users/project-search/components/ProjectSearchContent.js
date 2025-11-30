"use client";
import ContentListPosts from "@/containers/users/home/components/ContentListPosts";
import postFactory from "@/redux/post/factory";
import Constants from "@/utils/Constants";
import { useEffect, useState } from "react";

export default function ProjectSearchContent() {
  const [tab, setTab] = useState("noibat");
  const [dataPosts, setDataPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const query = new URLSearchParams();
      query.set(Constants.ROUTER_URL.PAGE, 1);
      query.set(Constants.ROUTER_URL.PAGE_SIZE, 5);
      query.set(Constants.ROUTER_URL.RANDOM, true);
      const data = await postFactory.getAllPosts(query);
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
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="w-full rounded-full border border-gray-300 pl-10 pr-4 py-2 focus:ring-1 focus:ring-green-600 focus:outline-none"
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

      {/* Tabs */}
      <div className="flex justify-center gap-3 mb-6">
        <button
          onClick={() => setTab("noibat")}
          className={`px-4 py-1 rounded-full font-medium text-sm ${
            tab === "noibat"
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Nổi bật
        </button>
        <button
          onClick={() => setTab("ganday")}
          className={`px-4 py-1 rounded-full font-medium text-sm ${
            tab === "ganday"
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Gần đây
        </button>
      </div>

      {/* Grid chính chia 2 nửa */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
      {/* Nửa trái: card lớn */}
      {/* <div>
          <PostItem {...projects[0]} thumb />
        </div> */}

      {/* Nửa phải: 4 card nhỏ (2x2) */}
      <ContentListPosts dataPosts={dataPosts?.Data} />
    </div>
    // </div>
  );
}
