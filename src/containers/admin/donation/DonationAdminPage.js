import DonationSearch from "@/containers/admin/donation/components/DonationSearch";
import DonationTable from "@/containers/admin/donation/components/DonationTable";
import donateFactory from "@/redux/donate/factory";
import { useEffect, useState } from "react";

export default function DonationAdminPage() {
  const [dataDonation, setDataDonation] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);
    try {
      const response = await donateFactory.getAllDonate();
      if (response?.code == 200) {
        setDataDonation(response?.result || []);
      } else {
        setDataDonation([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("xxx", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {/* <DonationSearch /> */}
      <DonationTable dataSource={dataDonation} loading={loading} />
    </div>
  );
}
