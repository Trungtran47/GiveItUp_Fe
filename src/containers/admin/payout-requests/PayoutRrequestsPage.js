import useQuery from "@/components/hooks/use-query";
import PayoutRequestsTable from "@/containers/admin/payout-requests/components/PayoutRequestsTable";
import PostAdminTable from "@/containers/admin/post/components/PostAdminTable";
import PostDetailDrawer from "@/containers/admin/post/components/PostDetailDrawer";
import { getDataPayoutRequests } from "@/redux/payout/reducer";
import EventRegister, {
  EVENT_SHOW_POPUP,
  POPUP_CONFIRM,
  POPUP_CONFIRM_PAYOUT,
} from "@/utils/EventRegister";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const PayoutRequestsPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const query = useQuery();
  const handleApprove = (data, type) => {
    EventRegister.emit(EVENT_SHOW_POPUP, {
      type: POPUP_CONFIRM_PAYOUT,
      open: true,
      payload: {
        title: type === "APPROVE" ? "Xác nhận duyệt" : "Xác nhận từ chối",
        data: { ...data },
        type: type,
        getData,
      },
    });
  };
  const getData = () => {
    setLoading(true);
    dispatch(
      getDataPayoutRequests({
        query: query,
        onSuccess: () => setLoading(false),
        onError: () => setLoading(false),
      })
    );
  };
  useEffect(() => {
    getData();
  }, [query]);
  return (
    <div>
      <PayoutRequestsTable
        loading={loading}
        setOpen={setOpen}
        setSelectedPost={setSelectedPost}
        handleApprove={handleApprove}
      />
      <PostDetailDrawer
        open={open}
        onClose={() => setOpen(false)}
        data={selectedPost}
      />
    </div>
  );
};
export default PayoutRequestsPage;
