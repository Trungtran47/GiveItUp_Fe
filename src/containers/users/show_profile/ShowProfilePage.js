import PostItem from "@/containers/users/home/components/PostItem";
import followFactory from "@/redux/follow/factory";
import postFactory from "@/redux/post/factory";
import userFactory from "@/redux/user/factory";
import { getToast } from "@/utils/Utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ShowProfilePage() {
  const { id } = useParams();
  const user = useSelector((state) => state.user.dataUser);

  const [dataUser, setDataUser] = useState(null);
  const getUserData = async () => {
    const res = await userFactory.getUserById(id);
    if (res?.code == 200) {
      setDataUser(res?.result);
    }
  };
  const toggleFollow = async () => {
    if (user?.id == id) {
      getToast("Bạn không thể theo dõi chính mình", "error");
      return;
    }
    const res = await followFactory.toggleFollow(user?.id, id);
    if (res?.code == 200) {
      getUserData();
    }
  };
  const [dataPosts, setDataPosts] = useState(null);
  const getPostsData = async () => {
    const res = await postFactory.getPostByUserId(id, null);
    if (res?.code == 200) {
      setDataPosts(res?.result);
    }
  };
  useEffect(() => {
    if (id) {
      getUserData();
      getPostsData();
    }
  }, [id]);
  const isAuthor = dataUser?.role && dataUser?.role.includes("AUTHOR");
  return (
    <div className="w-[600px] mx-auto bg-white rounded-lg overflow-hidden mt-10">
      {/* Cover */}
      <div className="w-full h-40 bg-green-200 relative z-0">
        {/* Avatar */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-50px] z-10">
          {/* Wrap avatar with white background */}
          <div className="bg-white rounded-full p-1 shadow-md">
            <img
              src={isAuthor ? dataUser?.organizationLogo : dataUser?.imageUser}
              alt="avatar"
              className="w-28 h-28 rounded-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="mt-16 flex flex-col items-center px-4">
        {/* Name + Edit button */}
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold text-gray-600">
            {dataUser?.firstName} {dataUser?.lastName}
          </h1>
          {/* <button className="p-2 rounded-full border hover:bg-gray-100">
            ✏️
          </button> */}
        </div>

        {/* Bio */}
        {/* <div className="border rounded-xl p-6 w-full max-w-xl mt-5 text-center">
          <p className="text-gray-500">Tell others what you care about.</p>
          <button className="mt-3 px-4 py-2 border rounded-full hover:bg-gray-100">
            + Add bio
          </button>
        </div> */}

        {/* Followers */}
        <div className="flex items-center gap-6 mt-4 font-bold text-gray-700">
          <span>{dataUser?.totalFollowers} Người theo dõi</span>
          <span>{dataUser?.totalFollowing} Đang theo dõi</span>
        </div>

        {/* Visibility */}
        {/* <div className="flex items-center gap-2 mt-3 text-gray-600 text-sm">
          <span>🔒 Your profile is private.</span>
          <button className="underline">Change visibility</button>
        </div> */}

        {/* Share profile */}
        <button
          className="mt-4 px-6 py-2 bg-green-700 rounded-full border font-medium hover:bg-green-800 cursor-pointer"
          onClick={toggleFollow}
        >
          {dataUser?.isFollowing ? "Đang theo dõi" : "Theo dõi"}
        </button>

        {/* Discover more people */}
        <div className="w-full max-w-3xl mt-10 bg-gray-50 p-5 rounded-xl">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold">Discover more people</h2>
            <button className="text-gray-600">⌃</button>
          </div>

          {/* Horizontal scroll list */}
          <div className="flex overflow-x-auto gap-4 mt-4 pb-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="min-w-[150px] bg-white rounded-xl p-4 shadow"
              >
                <div className="flex justify-end">
                  <button className="text-gray-400">✕</button>
                </div>

                <div className="flex flex-col items-center">
                  <img
                    src="https://via.placeholder.com/80"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <p className="mt-2 font-medium">User {i}</p>

                  <button className="mt-3 w-full bg-green-700 text-white py-1.5 rounded-full">
                    Follow
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* <button className="mt-3 px-4 py-1 border rounded-full text-sm hover:bg-gray-100">
            See all
          </button> */}
        </div>

        {/* Placeholder for next sections */}
        <div className="flex flex-col gap-3 w-full max-w-3xl mt-10">
          {dataPosts?.Data?.map((item) => (
            <PostItem
              key={item.id}
              id={item.id}
              image={
                item.images?.find((img) => img.isThumbnail)?.imageUrl ||
                item.images?.[0]?.imageUrl ||
                "/images/default-image.png"
              }
              title={item.title}
              group={item.category?.categoryName}
              raised={item?.donatedAmount} // nếu bạn chưa có số tiền quyên góp → set 0
              goal={item.targetAmount}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
