import PostOwnerCard from "./PostOwnerCard";

export default function PostList({
  dataSource,
  loading,
  onEdit,
  onDelete,
  onRequestPayout,
  onDeletePayout,
  onConfirmTransfer,
  onCreatePostUpdate,
}) {
  return (
    <div className="flex flex-col gap-6">
      {dataSource?.Data?.map((post) => (
        <PostOwnerCard
          key={post.id}
          post={post}
          onEdit={(p) => onEdit(p)}
          onDelete={(p) => onDelete(p)}
          onRequestPayout={onRequestPayout}
          onDeletePayout={onDeletePayout}
          onConfirmTransfer={onConfirmTransfer}
          onCreatePostUpdate={onCreatePostUpdate}

          //   onView={(p) => console.log("View", p)}
        />
      ))}
    </div>
  );
}
