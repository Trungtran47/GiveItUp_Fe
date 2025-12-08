import useQuery from "@/components/hooks/use-query";
import PostAdminSearch from "@/containers/admin/post/components/PostAdminSearch";
import PostAdminTable from "@/containers/admin/post/components/PostAdminTable";
import PostDetailDrawer from "@/containers/admin/post/components/PostDetailDrawer";
import { getAllPosts } from "@/redux/post/reducer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const PostAdminPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const query = useQuery();
  const getData = () => {
    setLoading(true);
    dispatch(
      getAllPosts({
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
    <div>
      <PostAdminSearch />
      <PostAdminTable
        loading={loading}
        setOpen={setOpen}
        setSelectedPost={setSelectedPost}
      />
      <PostDetailDrawer
        open={open}
        onClose={() => setOpen(false)}
        data={selectedPost}
      />
    </div>
  );
};
export default PostAdminPage;
