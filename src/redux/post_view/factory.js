import axiosClient from "@/adapter/axiosClient";
import Constants from "@/utils/Constants";

const postViewFactory = {
  // toggleLike: async (postId) => {
  //   const res = await axiosClient.post(`/like/toggleLike/${postId}`);
  //   return res.data;
  // },
  getPostViewByUserId: async (userId, query) => {
    let params = {
      CurrentPage: Constants.PAGING.CURRENT_PAGE,
      PageSize: Constants.PAGING.ROW_PER_PAGE,
    };
    if (query?.get(Constants.ROUTER_URL.PAGE)) {
      params.CurrentPage = query.get(Constants.ROUTER_URL.PAGE);
    }
    if (query?.get(Constants.ROUTER_URL.PAGE_SIZE)) {
      params.PageSize = query.get(Constants.ROUTER_URL.PAGE_SIZE);
    }
    const res = await axiosClient.get(`/post_view/user/${userId}/viewedPosts`, {
      params,
    });
    return res.data;
  },
};

export default postViewFactory;
