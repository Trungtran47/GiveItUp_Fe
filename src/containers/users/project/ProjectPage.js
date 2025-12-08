import useQuery from "@/components/hooks/use-query";
import ProjectContent from "@/containers/users/project/componets/ProjectContent";
import postFactory from "@/redux/post/factory";
import { getDataPosts } from "@/redux/post/reducer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function ProjectPage() {
  const query = new useQuery();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getData = () => {
    setLoading(true);
    dispatch(
      getDataPosts({
        query: query,
        onSuccess: () => setLoading(false),
        onError: () => setLoading(false),
      })
    );
  };
  useEffect(() => {
    getData();
  }, [query]);

  return (
    <>
      {/* <Header /> */}
      <ProjectContent />
      {/* <Footer /> */}
    </>
  );
}
