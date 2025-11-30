import React from "react";
import PostItem from "@/containers/users/home/components/PostItem";

const ContentListPosts = React.memo(({ dataPosts }) => {
  if (!dataPosts || dataPosts.length === 0) {
    return null; // Hoặc hiển thị một thông báo "Không có bài viết"
  }
  return (
    <div className="flex flex-col py-10">
      <h2 className="text-2xl font-bold mb-4 text-black">
        Khám phá các hoạt động gây quỹ lấy cảm hứng từ những điều bạn quan tâm
      </h2>
      {/* <div className="flex justify-between">
        <div>hi</div>
        <div>hi</div>
      </div> */}
      <div className="flex gap-8">
        <div className="flex-1">
          {dataPosts.length > 0 && (
            <PostItem
              key={dataPosts[0].id}
              id={dataPosts[0].id}
              image={
                dataPosts[0].images.find((img) => img.isThumbnail).imageUrl
              }
              title={dataPosts[0].title}
              group={dataPosts[0].category?.categoryName}
              raised={dataPosts[0]?.donatedAmount} // nếu bạn chưa có số tiền quyên góp → set 0
              goal={dataPosts[0].targetAmount}
              thumb={true}
            />
          )}
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {dataPosts.slice(1).map((post) => (
              <PostItem
                key={post.id}
                id={post.id}
                image={post.images.find((img) => img.isThumbnail).imageUrl}
                title={post.title}
                group={post.category?.categoryName}
                raised={post?.donatedAmount} // nếu bạn chưa có số tiền quyên góp → set 0
                goal={post.targetAmount}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

ContentListPosts.displayName = "ContentListPosts";

export default ContentListPosts;
