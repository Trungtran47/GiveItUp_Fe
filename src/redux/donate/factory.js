import axiosClient from "../../adapter/axiosClient";

const donateFactory = {
  getAllDonate: async () => {
    const res = await axiosClient.get(
      `/api/qr/payment?bank=${bank}&account=${account}&amount=${amount}&addInfo=${encodeURIComponent(
        addInfo
      )}`
    );
    return res.data;
  },
};

export default donateFactory;
