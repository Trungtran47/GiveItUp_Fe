import MyPostSearch from "@/containers/users/profile/myposts/components/MyPostSearch";
import PostTable from "@/containers/users/profile/myposts/components/PostTable";
import postFactory from "@/redux/post/factory";
import EventRegister, {
  EVENT_SHOW_POPUP,
  POPUP_CONFIRM,
  POPUP_CREATE_POST,
} from "@/utils/EventRegister";
import getMegNo from "@/utils/Message";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function MyPostsProfile() {
  const [search, setSearch] = useState("");
  const user = useSelector((state) => state.user.dataUser);
  const [datas, setDatas] = useState([]);
  const dispatch = useDispatch();
  const handleCreatePost = (data) => {
    EventRegister.emit(EVENT_SHOW_POPUP, {
      type: POPUP_CREATE_POST,
      open: true,
      payload: {
        title: data ? "Cập nhật Bài đăng" : "Tạo Bài đăng mới",
        data: data,
        fetchPosts,
      },
    });
  };
  const handleDeletePost = (data) => {
    console.log("0");

    if (!data?.id) {
      console.log("1");
      getMegNo("Không xác định được bài đăng cần xóa", "error");
      return;
    }

    EventRegister.emit(EVENT_SHOW_POPUP, {
      type: POPUP_CONFIRM,
      payload: {
        title: "Xác nhận",
        data: {
          message: `Bạn có chắc chắn muốn xóa bài đăng "${data?.title}" không?`,
        },
        callback: async (_props) => {
          try {
            const response = dispatch(postFactory.deletePostById(data.id));
            if (response?.code === 200) {
              getMegNo("Xóa bài đăng thành công", "success");
              fetchPosts();
            } else {
              getMegNo("Xóa bài đăng thất bại", "error");
            }
          } catch (error) {
            getMegNo("Đã xảy ra lỗi khi xóa bài đăng", "error");
          }
        },
      },
    });
  };
  const fetchPosts = async () => {
    const data = await postFactory.getPostByUserId(+user?.id);
    setDatas(data?.result || []);
  };

  useEffect(() => {
    if (user?.id) {
      fetchPosts();
    }
  }, [user?.id]);

  return (
    <div>
      <MyPostSearch onCreate={handleCreatePost} />
      <PostTable
        dataSource={datas}
        loading={false}
        onEdit={handleCreatePost}
        onDelete={handleDeletePost}
      />
    </div>
  );
}
