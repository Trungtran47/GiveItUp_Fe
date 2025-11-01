import useQuery from "@/components/hooks/use-query";
import AccountSearch from "@/containers/admin/account/components/AccountSearch";
import AccountTable from "@/containers/admin/account/components/AccountTable";
import { getAllUser } from "@/redux/user/reducer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function AccountPage() {
  const [loading, setLoading] = useState(false);
  const query = useQuery();
  const dispatch = useDispatch();
  const getData = () => {
    setLoading(true);
    dispatch(
      getAllUser({
        query: query, // gửi tất cả param trực tiếp
        onSuccess: () => setLoading(false),
        onError: () => setLoading(false),
      })
    );
  };

  useEffect(() => {
    getData();
  }, [query]); // dependency là query (object) → có thể serialize nếu muốn tránh loop

  return (
    <div>
      <AccountSearch />
      <AccountTable loading={loading} />
    </div>
  );
}
