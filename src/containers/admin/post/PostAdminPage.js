import useQuery from "@/components/hooks/use-query";
import PostAdminSearch from "@/containers/admin/post/components/PostAdminSearch";
import PostAdminTable from "@/containers/admin/post/components/PostAdminTable";
import PostDetailDrawer from "@/containers/admin/post/components/PostDetailDrawer";
import postFactory from "@/redux/post/factory";
import { getAllPosts } from "@/redux/post/reducer";
import { getToast } from "@/utils/Utils";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const PostAdminPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const query = useQuery();
  const onUpdateStatus = async (postId, newStatus, reason) => {
    try {
      const res = await postFactory.updateStatus(postId, newStatus, reason);
      if (res.code == 200) {
        getToast("Cập nhật trạng thái bài viết thành công", "success");
        getData();
      } else {
        getToast(
          res.message || "Cập nhật trạng thái bài viết thất bại",
          "error"
        );
      }
    } catch (error) {
      getToast("Cập nhật trạng thái bài viết thất bại", "error");
    }
  };
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
        onUpdateStatus={onUpdateStatus}
      />
      <PostDetailDrawer
        open={open}
        onClose={() => setOpen(false)}
        id={selectedPost}
      />
    </div>
  );
};
export default PostAdminPage;
