"use client";
import ItempostsProfile from "@/containers/users/profile/favorites/components/ItemPostProfile";
import likeFactory from "@/redux/like/factory";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function FavoritesProfile() {
  const user = useSelector((state) => state.user.dataUser);
  const [dataFavorites, setDataFavorites] = useState([]);
  const getData = async () => {
    const res = await likeFactory.getPostLikedByUser(user.id);

    if (res?.code == 200) setDataFavorites(res?.result || []);
  };
  useEffect(() => {
    if (!user) return;
    getData();
  }, [user]);
  return (
    <div>
      <div className="h-[calc(87vh-56px)] overflow-y-auto  scroll-white">
        {dataFavorites?.Data?.length === 0 ? (
          <div className="text-center text-gray-500">
            Bạn chưa yêu thích bài viết nào.
            <br /> Hãy đi đến trang dự án và nhấn vào biểu tượng trái tim để yêu
            thích bài viết!
          </div>
        ) : (
          <div>
            {dataFavorites?.Data?.map((item) => (
              <div key={item.id} className="mb-4">
                <ItempostsProfile
                  key={item.id}
                  posts={item}
                  isFavorite={true}
                  getData={getData}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
