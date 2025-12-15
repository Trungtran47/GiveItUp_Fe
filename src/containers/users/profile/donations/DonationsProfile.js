import CustomPagination from "@/components/pagination/custom-pagination";
import DonateItems from "@/containers/users/profile/donations/components/DonateItems";
import donateFactory from "@/redux/donate/factory";
import Constants from "@/utils/Constants";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function DonationsProfile() {
  const user = useSelector((state) => state.user.dataUser);
  const [dataDonates, setDataDonates] = useState([]);
  const getData = async (id) => {
    const query = new URLSearchParams();
    query.set(Constants.ROUTER_URL.USER_ID, id);
    const res = await donateFactory.getAllDonate(query);
    if (res?.code == 200) {
      setDataDonates(res?.result);
    }
  };
  useEffect(() => {
    if (user?.id) {
      getData(user?.id);
    }
  }, [user?.id]);
  return (
    <div>
      {!dataDonates?.Data || dataDonates?.Data.length == 0 ? (
        <div className=" text-gray-700 items-center">Bạn chưa quyên góp</div>
      ) : (
        <>
          <div className="h-[calc(87vh-56px)] overflow-y-auto  scroll-white">
            {dataDonates?.Data?.map((item) => {
              return (
                <div key={item?.id} className="mb-4 ">
                  <DonateItems donate={item} />
                </div>
              );
            })}
          </div>
          <div className="flex border-t border-gray-300">
            {dataDonates?.Paging && (
              <CustomPagination Total={dataDonates?.Paging?.TotalRecord || 0} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
