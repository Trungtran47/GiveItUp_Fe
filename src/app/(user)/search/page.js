"use client";
import dynamic from "next/dynamic";
import LoadingPage from "../../../components/loading/LoadingPage";

const ProjectSearch = dynamic(
  () => import("../../../containers/users/project-search/ProjectSearch"),
  {
    ssr: false,
    loading: () => <LoadingPage Loading={true} />,
  }
);

export default function Page() {
  return <ProjectSearch />;
}
