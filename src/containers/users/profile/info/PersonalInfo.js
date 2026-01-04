"use client";
import { getToast } from "@/utils/Utils";
import { useDispatch, useSelector } from "react-redux";
// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";
import ProfileTab from "@/containers/users/profile/info/components/ProfileTab";
import userFactory from "@/redux/user/factory";
import { getDataUser } from "@/redux/user/reducer";
import EventRegister, {
  EVENT_SHOW_POPUP,
  POPUP_BANK_ACCOUNT,
  POPUP_CREATE_AUTHOR,
} from "@/utils/EventRegister";
import { useForm } from "react-hook-form";
export default function PersonalInfo() {
  const methods = useForm();

  const user = useSelector((state) => state.user.dataUser);
  const dispatch = useDispatch();
  const handleCreateAuthor = (data) => {
    EventRegister.emit(EVENT_SHOW_POPUP, {
      type: POPUP_CREATE_AUTHOR,
      open: true,
      payload: {
        userData: { ...data },
        title: data ? "Cập nhật Author" : "Tạo Author",
      },
    });
  };
  const handleShowBankAccount = (organizationId) => {
    EventRegister.emit(EVENT_SHOW_POPUP, {
      type: POPUP_BANK_ACCOUNT,
      open: true,
      payload: {
        organizationId: organizationId,
        title: "Thông tin tài khoản ngân hàng",
      },
    });
  };
  const onSubmits = (data) => {};
  const handleSubmit = async (data, type) => {
    const formData = new FormData();
    switch (type) {
      case "displayName":
        const fullName = data?.trim() || "";
        const nameParts = fullName.split(/\s+/).filter(Boolean);
        let lName = "";
        let fName = "";
        if (nameParts.length > 1) {
          lName = nameParts.pop(); // Lấy phần cuối làm tên
          fName = nameParts.join(" "); // Phần còn lại là họ + tên đệm
        } else {
          // Trường hợp chỉ có 1 từ
          lName = nameParts[0] || "";
          fName = "";
        }
        formData.append("firstName", fName);
        formData.append("lastName", lName);
        break;
      case "imageUser":
        if (data?.file) {
          formData.append("imageUser", data?.file);
        } else {
          formData.append("deleteImage", "true");
        }
        break;
      case "dob":
        formData.append("dob", data);
        break;
      case "gender":
        formData.append("gender", data);
        break;
      case "phoneNumber":
        formData.append("phoneNumber", data);
        break;
      case "address":
        formData.append("address", data);
        break;
      default:
        break;
    }
    const res = await userFactory.updateUser(user.id, formData);
    if (res?.code == 200) {
      dispatch(getDataUser());
      switch (type) {
        case "displayName":
          getToast("Yêu cầu thay đổi tên thành công", "success");
          break;
        case "imageUser":
          getToast("Thành công", "success");
          break;
        case "dob":
          getToast("Cập nhật ngày sinh thành công", "success");
          break;
        case "gender":
          getToast("Cập nhật giới tính thành công", "success");
          break;
        case "phoneNumber":
          getToast("Cập nhật số điện thoại thành công", "success");
          break;
        case "address":
          getToast("Cập nhật địa chỉ thành công", "success");
          break;
      }
    } else {
      getToast("Cập nhật thất bại", "error");
    }
  };
  return (
    <>
      <ProfileTab
        user={user}
        methods={methods}
        onSubmits={onSubmits}
        handleSubmit={handleSubmit}
        handleCreateAuthor={handleCreateAuthor}
        handleShowBankAccount={handleShowBankAccount}
      />
    </>
  );
}
