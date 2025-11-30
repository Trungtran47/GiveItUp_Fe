import CustomPagination from "@/components/pagination/custom-pagination";
import PostViewList from "@/containers/users/profile/post_view/components/PostViewList";
import postViewFactory from "@/redux/post_view/factory";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function PostViewProfile() {
  const user = useSelector((state) => state.user.dataUser);
  const [dataPostView, setDataPostView] = useState([]);
  const getData = async (id) => {
    const res = await postViewFactory.getPostViewByUserId(id);
    if (res?.code == 200) setDataPostView(res?.result || []);
  };
  useEffect(() => {
    if (!user) return;
    getData(user?.id);
  }, [user]);

  return (
    <div>
      <div className="h-[calc(87vh-56px)] overflow-y-auto  scroll-white">
        <PostViewList posts={dataPostView?.Data} />
      </div>
      <div className="flex border-t border-gray-300">
        {dataPostView?.Paging && (
          <CustomPagination Total={dataPostView?.Paging?.TotalRecord || 0} />
        )}
      </div>
    </div>
  );
}
