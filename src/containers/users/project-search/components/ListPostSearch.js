import CustomPagination from "@/components/pagination/custom-pagination";
import PostItem from "@/containers/users/home/components/PostItem";

export default function ListPostSearch({ dataPosts }) {
  return (
    <>
      <div className="my-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 border-t ">
        {dataPosts?.Data?.map((item) => (
          <PostItem
            key={item.id}
            id={item.id}
            image={item.images?.[0]?.imageUrl || "/images/default-image.png"}
            title={item.title}
            group={item.category?.categoryName}
            raised={item?.donatedAmount} // nếu bạn chưa có số tiền quyên góp → set 0
            goal={item.targetAmount}
          />
        ))}
      </div>
      <div className="flex border-t border-gray-300">
        {dataPosts?.Paging && (
          <CustomPagination Total={dataPosts?.Paging?.TotalRecord || 0} />
        )}
      </div>
    </>
  );
}
