import useQuery from "@/components/hooks/use-query";
import AccountAuthorSearch from "@/containers/admin/account_organization/components/AccountAuthorSearch";
import AccountAuthorTable from "@/containers/admin/account_organization/components/AccountAuthorTable";
import { getAllAuthor } from "@/redux/user/reducer";
import EventRegister, {
  EVENT_SHOW_POPUP,
  POPUP_DETAIL_ACCOUNT_AUTHOR,
} from "@/utils/EventRegister";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function AccountAuthorPage() {
  const [loading, setLoading] = useState(false);
  const query = useQuery();
  const dispatch = useDispatch();
  const getData = () => {
    setLoading(true);
    dispatch(
      getAllAuthor({
        query: query,
        onSuccess: () => setLoading(false),
        onError: () => setLoading(false),
      })
    );
  };
  const handleViewDetail = (record) => {
    EventRegister.emit(EVENT_SHOW_POPUP, {
      type: POPUP_DETAIL_ACCOUNT_AUTHOR,
      open: true,
      payload: {
        data: record,
        title: "Chi tiết tài khoản ",
        getData,
      },
    });
  };
  useEffect(() => {
    getData();
  }, [query]); // dependency là query (object) → có thể serialize nếu muốn tránh loop

  return (
    <div>
      <AccountAuthorSearch />
      <AccountAuthorTable
        loading={loading}
        handleViewDetail={handleViewDetail}
      />
    </div>
  );
}
