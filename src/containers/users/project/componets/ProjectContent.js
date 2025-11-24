"use client";

import { getDataCategories } from "@/redux/category/reducer";
import ProjectCard from "./ProjectCard";

const CATEGORY_ITEMS = [
  { id: "health", label: "Y tế", Icon: HeartIcon },
  { id: "education", label: "Giáo dục", Icon: EducationIcon },
  { id: "environment", label: "Môi trường", Icon: LeafIcon },
  { id: "community", label: "Cộng đồng", Icon: CommunityIcon },
  { id: "disaster", label: "Thiên tai", Icon: ShieldIcon },
  { id: "charity", label: "Từ thiện", Icon: CharityIcon },
  { id: "children", label: "Trẻ em", Icon: ChildrenIcon },
  { id: "family", label: "Gia đình", Icon: FamilyIcon },
];

const PROJECT_SECTIONS = [
  {
    id: "medical",
    title: "Các hoạt động gây quỹ y tế",
    projects: [
      {
        id: 1,
        image: "/image/img_fb.png",
        title:
          "Lũ dữ đánh sập cầu ở Lạng Sơn, nhiều hộ dân bị ảnh hưởng nặng nề",
        group: "Nhóm SOS Lạng Sơn",
        raised: 350_000_000,
        goal: 500_000_000,
      },
      {
        id: 2,
        image: "/image/img_fb.png",
        title:
          "Lũ dữ đánh sập cầu ở Lạng Sơn, nhiều hộ dân bị ảnh hưởng nặng nề",
        group: "Nhóm SOS Lạng Sơn",
        raised: 350_000_000,
        goal: 500_000_000,
      },
      {
        id: 3,
        image: "/image/img_fb.png",
        title:
          "Lũ dữ đánh sập cầu ở Lạng Sơn, nhiều hộ dân bị ảnh hưởng nặng nề",
        group: "Nhóm SOS Lạng Sơn",
        raised: 350_000_000,
        goal: 500_000_000,
      },
      {
        id: 4,
        image: "/image/img_fb.png",
        title:
          "Lũ dữ đánh sập cầu ở Lạng Sơn, nhiều hộ dân bị ảnh hưởng nặng nề",
        group: "Nhóm SOS Lạng Sơn",
        raised: 350_000_000,
        goal: 500_000_000,
      },
    ],
  },
  {
    id: "education",
    title: "Các hoạt động gây quỹ giáo dục",
    projects: [
      {
        id: 1,
        image: "/image/img_fb.png",
        title:
          "Lũ dữ đánh sập cầu ở Lạng Sơn, nhiều hộ dân bị ảnh hưởng nặng nề",
        group: "Nhóm SOS Lạng Sơn",
        raised: 350_000_000,
        goal: 500_000_000,
      },
      {
        id: 2,
        image: "/image/img_fb.png",
        title:
          "Lũ dữ đánh sập cầu ở Lạng Sơn, nhiều hộ dân bị ảnh hưởng nặng nề",
        group: "Nhóm SOS Lạng Sơn",
        raised: 350_000_000,
        goal: 500_000_000,
      },
      {
        id: 3,
        image: "/image/img_fb.png",
        title:
          "Lũ dữ đánh sập cầu ở Lạng Sơn, nhiều hộ dân bị ảnh hưởng nặng nề",
        group: "Nhóm SOS Lạng Sơn",
        raised: 350_000_000,
        goal: 500_000_000,
      },
      {
        id: 4,
        image: "/image/img_fb.png",
        title:
          "Lũ dữ đánh sập cầu ở Lạng Sơn, nhiều hộ dân bị ảnh hưởng nặng nề",
        group: "Nhóm SOS Lạng Sơn",
        raised: 350_000_000,
        goal: 500_000_000,
      },
    ],
  },
  {
    id: "disaster",
    title: "Các hoạt động gây quỹ thiên tai",
    projects: [
      {
        id: 1,
        image: "/image/img_fb.png",
        title:
          "Lũ dữ đánh sập cầu ở Lạng Sơn, nhiều hộ dân bị ảnh hưởng nặng nề",
        group: "Nhóm SOS Lạng Sơn",
        raised: 350_000_000,
        goal: 500_000_000,
      },
      {
        id: 2,
        image: "/image/img_fb.png",
        title:
          "Lũ dữ đánh sập cầu ở Lạng Sơn, nhiều hộ dân bị ảnh hưởng nặng nề",
        group: "Nhóm SOS Lạng Sơn",
        raised: 350_000_000,
        goal: 500_000_000,
      },
      {
        id: 3,
        image: "/image/img_fb.png",
        title:
          "Lũ dữ đánh sập cầu ở Lạng Sơn, nhiều hộ dân bị ảnh hưởng nặng nề",
        group: "Nhóm SOS Lạng Sơn",
        raised: 350_000_000,
        goal: 500_000_000,
      },
      {
        id: 4,
        image: "/image/img_fb.png",
        title:
          "Lũ dữ đánh sập cầu ở Lạng Sơn, nhiều hộ dân bị ảnh hưởng nặng nề",
        group: "Nhóm SOS Lạng Sơn",
        raised: 350_000_000,
        goal: 500_000_000,
      },
    ],
  },
];

export default function ProjectContent() {
  return (
    <div className="bg-linear-to-b pt-[56px] bg-[#FFFFFF]">
      <div className="text-center mx-auto bg-[#CCF88E] w-full py-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
          Các hoạt động gây quỹ theo danh mục
        </h1>
        <p className="mt-3 text-sm md:text-base text-gray-600 leading-relaxed">
          Mọi người ở khắp mọi nơi, đều dễ dàng tìm được những hoàn cảnh cần bạn
          giúp đỡ
        </p>
      </div>
      <div className="max-w-[1158px] mx-auto px-5 md:px-6 lg:px-0 py-2">
        <section className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {CATEGORY_ITEMS.map(({ id, label, Icon }) => (
            <div
              key={id}
              className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white py-8 transition-shadow duration-300 hover:shadow-sm"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F0FEE8] text-green-600">
                <Icon />
              </span>
              <span className="text-sm font-medium text-gray-700">{label}</span>
            </div>
          ))}
        </section>

        <div className="mt-16 space-y-14">
          {PROJECT_SECTIONS.map((section) => (
            <section key={section.id} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                  {section.title}
                </h2>
                <button
                  type="button"
                  className="hidden md:inline-flex text-sm font-medium text-green-600 hover:text-green-700"
                >
                  Xem thêm &gt;&gt;
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {section.projects.map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))}
              </div>

              <button
                type="button"
                className="md:hidden text-sm font-medium text-green-600 hover:text-green-700"
              >
                Xem thêm &gt;&gt;
              </button>
            </section>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <button
            type="button"
            className="px-8 py-3 rounded-full border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition"
          >
            Hiển thị thêm danh mục
          </button>
        </div>
      </div>
    </div>
  );
}

function HeartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-6 w-6"
    >
      <path d="M12 21s-6.5-4.35-9-8.28C1.07 10.2 1 7.8 2.4 6.2 3.7 4.8 5.8 4.4 7.4 5.2 8.4 5.7 9.2 6.6 12 9.4c2.8-2.8 3.6-3.7 4.6-4.2 1.6-.8 3.7-.4 5 1 1.4 1.6 1.3 4-.6 6.52C18.5 16.65 12 21 12 21z" />
    </svg>
  );
}

function EducationIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-6 w-6"
    >
      <path d="M3 8l9-4 9 4-9 4-9-4z" />
      <path d="M7 10.5v4.5c0 .8 1.8 1.5 5 1.5s5-0.7 5-1.5v-4.5" />
      <path d="M21 8v5" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-6 w-6"
    >
      <path d="M5 19c7-2 11-6 13-13" />
      <path d="M5 19c-1-6 2-11 8-13" />
      <path d="M5 19c3 0 7-4 7-7" />
    </svg>
  );
}

function CommunityIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-6 w-6"
    >
      <circle cx="6" cy="8" r="2.5" />
      <circle cx="18" cy="8" r="2.5" />
      <path d="M2 19c0-2.8 2.2-5 5-5s5 2.2 5 5" />
      <path d="M12 19c0-2.8 2.2-5 5-5s5 2.2 5 5" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-6 w-6"
    >
      <path d="M12 21c-5-2-8-5-8-11V5l8-3 8 3v5c0 6-3 9-8 11z" />
      <path d="M9 11l2 2 4-4" />
    </svg>
  );
}

function CharityIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-6 w-6"
    >
      <path d="M4 13c0-1.7 2.5-3 6-3s6 1.3 6 3-2.5 3-6 3-6-1.3-6-3z" />
      <path d="M10 10V5c0-1.5 1.2-2.8 2.8-3C14.6 1.8 16 3.1 16 4.8V7" />
      <path d="M16 11c2.2 0 4 1 4 2.5S18.2 16 16 16" />
    </svg>
  );
}

function ChildrenIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-6 w-6"
    >
      <circle cx="8" cy="7" r="2.5" />
      <circle cx="16" cy="7" r="2.5" />
      <path d="M4 21v-2c0-2.2 1.8-4 4-4s4 1.8 4 4v2" />
      <path d="M12 21v-2c0-2.2 1.8-4 4-4s4 1.8 4 4v2" />
    </svg>
  );
}

function FamilyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-6 w-6"
    >
      <circle cx="8" cy="9" r="2.5" />
      <circle cx="16" cy="9" r="2.5" />
      <path d="M4 21v-3c0-2.2 1.8-4 4-4s4 1.8 4 4v3" />
      <path d="M12 21v-3c0-2.2 1.8-4 4-4s4 1.8 4 4v3" />
    </svg>
  );
}
