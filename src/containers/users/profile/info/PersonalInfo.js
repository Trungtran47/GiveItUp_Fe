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
        userData: data,
        title: data ? "Cập nhật Author" : "Tạo Author",
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
          getToast("Cập nhật ảnh đại diện thành công", "success");
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
      />
    </>
    // <FormProvider {...methods}>
    //   <form
    //     onSubmit={methods.handleSubmit(onSubmits)}
    //     encType="multipart/form-data"
    //   >
    //     <div className="min-h-screen w-full py-10 px-4 md:px-10">
    //       <div className="bg-white p-6">
    //         <div className="flex flex-row items-center gap-3 p-2 border-b bg-[#f9f9f9] rounded-xl">
    //           <div className="relative">
    //             <div className="w-[100px] h-[100px]">
    //               <FormUploadImage
    //                 fieldName="imageUser"
    //                 title="Tải ảnh đại diện"
    //                 defaultImage={user?.imageUser}
    //                 onSave={(data) => handleSubmit(data, "imageUser")}
    //               />
    //             </div>
    //             {/* <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 border cursor-pointer">
    //               <IcEdit className="w-5 h-5 text-gray-600" />
    //             </div> */}
    //           </div>

    //           <EditableField
    //             label="TÊN HIỂN THỊ"
    //             value={(user?.firstName || "") + " " + (user?.lastName || "")}
    //             onSave={(v) => handleSubmit(v, "displayName")}
    //           />
    //         </div>

    //         {/* ACCOUNT MANAGEMENT */}
    //         {/* <div className="mt-6">
    //       {/* Email */}
    //         <h2 className="text-xl font-semibold mb-4 text-gray-700 mt-4">
    //           Quản lý tài khoản
    //         </h2>
    //         <div className="mb-4 flex items-center gap-4 text-gray-500 text-sm">
    //           <div>
    //             <MailCheckIcon className="w-5" />
    //           </div>
    //           <div>
    //             <p className="text-sm text-gray-500">EMAIL</p>
    //             <p className="mt-1 font-medium text-gray-700">{user?.email}</p>
    //           </div>
    //         </div>

    //         {/* ===== PERSONAL INFORMATION ===== */}
    //         <div className="">
    //           <h2 className="text-xl font-semibold mb-4 text-gray-700">
    //             Thông tin cá nhân
    //           </h2>

    //           <div className="space-y-6 text-gray-700">
    //             {/* Họ và tên */}
    //             {/* <div className="flex items-center gap-4 text-gray-500 text-sm">
    //               <div>
    //                 <UserCheck2Icon className="w-5" />
    //               </div>
    //               <div>
    //                 HỌ VÀ TÊN
    //                 <p className="mt-1 font-medium">
    //                   {(user?.firstName || "") + " " + (user?.lastName || "")}
    //                 </p>
    //               </div>
    //             </div> */}

    //             {/* Ngày sinh */}
    //             <EditableUserInfoItem
    //               label="NGÀY SINH"
    //               value={user?.dob}
    //               icon={<CalendarDays className="w-5" />}
    //               type="date"
    //               onSave={(val) => handleSubmit(val, "dob")}
    //               formatValue={(val) => Utils.getDateDayjs(val)}
    //             />

    //             <EditableUserInfoItem
    //               label="GIỚI TÍNH"
    //               value={user?.gender}
    //               icon={<User className="w-5" />}
    //               type="select"
    //               options={[
    //                 { label: "Nam", value: 1 },
    //                 { label: "Nữ", value: 2 },
    //                 { label: "Khác", value: 3 },
    //               ]}
    //               onSave={(val) => handleSubmit(val, "gender")}
    //               formatValue={(val) =>
    //                 val == 1 ? "Nam" : val == 2 ? "Nữ" : "Khác"
    //               }
    //             />

    //             <EditableUserInfoItem
    //               label="SỐ ĐIỆN THOẠI"
    //               value={user?.phoneNumber}
    //               icon={<Phone className="w-5" />}
    //               type="text"
    //               onSave={(val) => handleSubmit(val, "phoneNumber")}
    //             />

    //             <EditableUserInfoItem
    //               label="ĐỊA CHỈ"
    //               value={user?.address}
    //               icon={<MapPin className="w-5" />}
    //               type="selectLocation"
    //               onSave={(val) => handleSubmit(val, "address")}
    //             />
    //           </div>
    //         </div>

    //         {/* Thông tin tổ chức */}
    //         <div className="bg-white shadow-sm rounded-2xl p-6 md:p-8">
    //           {Constants.ROLES.USER.includes(user?.role) &&
    //           user?.status === Constants.STATUS_USER.USER ? (
    //             <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
    //               <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
    //                 Trở thành tác giả ngay hôm nay!
    //               </h2>
    //               <p className="text-gray-600 max-w-md">
    //                 Đăng ký tài khoản Author để chia sẻ dự án, bài viết và kết
    //                 nối với cộng đồng.
    //               </p>
    //               <ButtonCommon
    //                 startIcon={<PlusCircle className="w-5 h-5" />}
    //                 title="Đăng ký Author"
    //                 onClick={() => handleCreateAuthor(null)}
    //               />
    //             </div>
    //           ) : user?.status === Constants.STATUS_USER.PENDING ? (
    //             <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
    //               <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-yellow-600">
    //                 Tài khoản của bạn đang chờ duyệt
    //               </h2>
    //               <p className="text-gray-600 max-w-md">
    //                 Vui lòng chờ quản trị viên xác nhận tài khoản của bạn. Bạn
    //                 sẽ nhận được thông báo khi tài khoản được duyệt.
    //               </p>
    //             </div>
    //           ) : (
    //             <div className="flex flex-col md:flex-row gap-6">
    //               {user?.organizationLogo && (
    //                 <ZoomableImage
    //                   src={user?.organizationLogo}
    //                   alt={user?.organizationLogoPublicId || "logo"}
    //                   width={100}
    //                   height={100}
    //                   className="rounded-xl border shadow-sm object-cover"
    //                 />
    //               )}
    //               <div className="flex-1 space-y-2">
    //                 <div className="flex items-center gap-2">
    //                   <h3 className="text-xl font-semibold text-gray-800">
    //                     {user?.organizationName}
    //                   </h3>
    //                   {user?.status === Constants.STATUS_USER.AUTHOR && (
    //                     <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
    //                       <CheckCircle className="w-4 h-4" /> Đã xác minh
    //                     </span>
    //                   )}
    //                 </div>

    //                 <p className="text-gray-600">
    //                   {user?.organizationDescription}
    //                 </p>

    //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mt-4 text-gray-700">
    //                   <p>
    //                     <span className="font-medium">Lĩnh vực:</span>{" "}
    //                     {user?.category?.categoryName}
    //                   </p>
    //                   <p>
    //                     <span className="font-medium">Thành lập:</span>{" "}
    //                     {new Date(user?.establishmentDate).toLocaleDateString(
    //                       "vi-VN"
    //                     )}
    //                   </p>
    //                   <p>
    //                     <span className="font-medium">Địa điểm:</span>{" "}
    //                     {user?.organizationAddress}
    //                   </p>
    //                   <p>
    //                     <span className="font-medium">Mã đăng ký:</span>{" "}
    //                     {user?.registrationCode}
    //                   </p>
    //                   <p>
    //                     <span className="font-medium">Email:</span>{" "}
    //                     {user?.organizationEmail}
    //                   </p>
    //                   <p>
    //                     <span className="font-medium">Số điện thoại:</span>{" "}
    //                     {user?.organizationPhone}
    //                   </p>
    //                 </div>
    //               </div>
    //             </div>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   </form>
    // </FormProvider>
  );
}
