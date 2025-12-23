import useQuery from "@/components/hooks/use-query";
import MyPostSearch from "@/containers/users/profile/my_posts/components/MyPostSearch";
import PostList from "@/containers/users/profile/my_posts/components/PostList";
import PostTable from "@/containers/users/profile/my_posts/components/PostTable";
import payOutFactory from "@/redux/payout/factory";
import postFactory from "@/redux/post/factory";
import EventRegister, {
  EVENT_SHOW_POPUP,
  POPUP_CONFIRM,
  POPUP_CREATE_POST,
  POPUP_CREATE_POST_UPDATE,
  POPUP_REQUEST_PAYOUT,
} from "@/utils/EventRegister";
import getMegNo from "@/utils/Message";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function MyPostsProfile() {
  const [search, setSearch] = useState("");
  const query = useQuery();

  const user = useSelector((state) => state.user.dataUser);
  const [datas, setDatas] = useState([]);
  const dispatch = useDispatch();
  const handleCreatePost = (data) => {
    EventRegister.emit(EVENT_SHOW_POPUP, {
      type: POPUP_CREATE_POST,
      open: true,
      payload: {
        title: data ? "Cập nhật Bài đăng" : "Tạo Bài đăng mới",
        data: data ? { ...data } : null,
        fetchPosts,
      },
    });
  };
  const onRequestPayout = (post, payout) => {
    console.log("post", post);
    EventRegister.emit(EVENT_SHOW_POPUP, {
      type: POPUP_REQUEST_PAYOUT,
      open: true,
      payload: {
        title: `Yêu cầu rút tiền từ bài đăng ${post.title}`,
        data: { ...post },
        payout: { ...payout },
        getData: fetchPosts,
      },
    });
  };
  const onDeletePayout = (payout) => {
    EventRegister.emit(EVENT_SHOW_POPUP, {
      type: POPUP_CONFIRM,
      payload: {
        title: "Xác nhận",
        data: {
          message: `Bạn có chắc chắn muốn xoá yêu cầu rút ${payout.amount} này không?`,
        },
        callback: async (_props) => {
          try {
            const response = await payOutFactory.deletePayout(
              user?.id,
              payout.id
            );
            if (response?.code == 200) {
              getMegNo("Xoá yêu cầu rút tiền thành công", "success");
              fetchPosts();
            } else {
              getMegNo("Xoá yêu cầu rút tiền thất bại", "error");
            }
          } catch (error) {
            getMegNo("Đã xảy ra lỗi khi xoá yêu cầu rút tiền", "error");
          }
        },
      },
    });
  };
  const onConfirmTransfer = async (payout) => {
    EventRegister.emit(EVENT_SHOW_POPUP, {
      type: POPUP_CONFIRM,
      payload: {
        title: "Xác nhận",
        data: {
          message: `Xác nhận đã nhận ${payout.adminTransferAmount} VND?`,
        },
        callback: async (_props) => {
          try {
            const response = await payOutFactory.authorConfirm(
              user?.organization?.id,
              payout.id
            );
            if (response?.code == 200) {
              getMegNo("Xác nhận thành công", "success");
              fetchPosts();
            } else {
              getMegNo("Xác nhận thất bại", "error");
            }
          } catch (error) {
            getMegNo("Đã xảy ra lỗi khi xác nhận yêu cầu rút tiền", "error");
          }
        },
      },
    });
  };
  const handleDeletePost = (data) => {
    if (!data?.id) {
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
  const onCreatePostUpdate = (postId, payoutId, title, data) => {
    EventRegister.emit(EVENT_SHOW_POPUP, {
      type: POPUP_CREATE_POST_UPDATE,
      open: true,
      payload: {
        title: `Tạo cập nhật cho: ${title}`,
        data: { ...data },
        postId: postId,
        payoutId: payoutId,
        getData: fetchPosts,
      },
    });
  };
  const fetchPosts = async (query) => {
    const data = await postFactory.getPostByOrganizationId(
      +user?.organization?.id,
      query
    );
    setDatas(data?.result || []);
  };

  useEffect(() => {
    if (user?.organization?.id) {
      fetchPosts(query);
    }
  }, [user?.organization?.id, query]);

  return (
    <div className="flex flex-col items-center pb-5">
      <div className="w-full max-w-5xl px-4 mt-6 mb-4">
        <MyPostSearch onCreate={handleCreatePost} />
        {/* <PostTable
          dataSource={datas}
          loading={false}
          onEdit={handleCreatePost}
          onDelete={handleDeletePost}
        /> */}
      </div>
      {!datas?.Data || datas?.Data.length == 0 ? (
        <div className="mt-20 text-gray-700">Không có bài đăng nào</div>
      ) : (
        <PostList
          dataSource={datas}
          loading={false}
          onEdit={handleCreatePost}
          onDelete={handleDeletePost}
          onRequestPayout={onRequestPayout}
          onDeletePayout={onDeletePayout}
          onConfirmTransfer={onConfirmTransfer}
          onCreatePostUpdate={onCreatePostUpdate}
        />
      )}
    </div>
  );
}
