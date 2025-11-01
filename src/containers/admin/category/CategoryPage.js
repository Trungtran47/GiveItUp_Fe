import useQuery from "@/components/hooks/use-query";
import CategorySearch from "@/containers/admin/category/components/CategorySearch";
import CategoryTable from "@/containers/admin/category/components/CategoryTable";
import categoryFactory from "@/redux/category/factory";
import { getDataCategories } from "@/redux/category/reducer";
import EventRegister, {
  EVENT_SHOW_POPUP,
  POPUP_CONFIRM,
  POPUP_CREATE_CATEGORY,
} from "@/utils/EventRegister";
import getMegNo from "@/utils/Message";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function CategoryPage() {
  const [loading, setLoading] = useState(false);
  const query = useQuery();
  const dispatch = useDispatch();

  const getData = () => {
    setLoading(true);
    dispatch(
      getDataCategories({
        query: query,
        onSuccess: () => setLoading(false),
        onError: () => setLoading(false),
      })
    );
  };
  const handleCreateCategory = (data) => {
    EventRegister.emit(EVENT_SHOW_POPUP, {
      type: POPUP_CREATE_CATEGORY,
      open: true,
      payload: {
        title: data ? "Cập nhật lĩnh vực" : "Thêm lĩnh vực mới",
        data,
        getData,
      },
    });
  };
  const handleDeleteCategory = (data) => {
    if (!data?.id) {
      getMegNo("error", "Không xác định được lĩnh vực cần xóa");
      return;
    }
    EventRegister.emit(EVENT_SHOW_POPUP, {
      type: POPUP_CONFIRM,
      payload: {
        title: "Xác nhận",
        data: {
          message: `Bạn có chắc chắn muốn xóa lĩnh vực "${data?.categoryName}" không?`,
        },
        callback: async (_props) => {
          try {
            const response = dispatch(
              categoryFactory.deleteCategoryById(data.id)
            );
            if (response?.code === 200) {
              getMegNo("Xóa lĩnh vực thành công", "success");
              getData();
            } else {
              getMegNo("Xóa lĩnh vực thất bại", "error");
            }
          } catch (error) {
            getMegNo("Đã xảy ra lỗi khi xóa lĩnh vực", "error");
          }
        },
      },
    });
  };

  useEffect(() => {
    getData();
  }, [query]); // dependency là query (object) → có thể serialize nếu muốn tránh loop

  return (
    <>
      <CategorySearch onCreate={handleCreateCategory} />
      <CategoryTable
        loading={loading}
        onDelete={handleDeleteCategory}
        onEdit={handleCreateCategory}
      />
    </>
  );
}
