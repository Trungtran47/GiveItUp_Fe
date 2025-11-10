"use client";
import LoadingPage from "@/components/loading/LoadingPage";
import dynamic from "next/dynamic";

const ProjectDetailPage = dynamic(
  () => import("../../../../containers/users/project-detail/ProjectDetail"),
  {
    ssr: false,
    loading: () => <LoadingPage Loading={true} />,
  }
);

export default function Page() {
  return <ProjectDetailPage />;
}
