import ButtonCommon from "@/components/common/button/ButtonCommon";
import CustomLoadingButton from "@/components/common/button/loading/LoadingButton";
import FormInput from "@/components/common/form/custom-form/FormInput";
import FormSelect from "@/components/common/form/custom-form/select/FormSelect";
import CustomDatePicker from "@/components/common/form/date-picker/DatePicker";
import { registerUser } from "@/redux/user/reducer";
import Constants from "@/utils/Constants";
import getMegNo from "@/utils/Message";
import { getToast } from "@/utils/Utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

export default function RegisterPage() {
  const loading = useSelector((state) => state.auth.loading);
  const methods = useForm();
  const router = useRouter();
  const dispatch = useDispatch();
  const onSubmits = (data) => {
    const fullName = data?.username?.trim() || "";
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
    const newData = {
      username: data?.name,
      password: data?.password,
      firstName: fName,
      lastName: lName,
      email: data?.email,
      phoneNumber: data?.phone,
      gender: data?.gender || 0,
      role: data?.role || "USER",
      dob: data?.birthday,
    };
    dispatch(
      registerUser({
        data: newData,
        onSuccess: (token) => {
          if (token && !loading) {
            router.replace("/");
          }
        },
        onError: (err) => {
          getToast(getMegNo(err?.code), "error");
          // console.log("xxx", err);
        },
      })
    );
  };
  return (
    <FormProvider {...methods}>
      <div className="relative min-h-screen flex items-center justify-center bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/image/image_register.png')] bg-cover bg-center opacity-20"></div>
        <div className="relative bg-white/90 backdrop-blur-md shadow-lg rounded-3xl px-10! pb-2! w-full max-w-3xl border border-gray-200 animate-fadeSlide">
          <div className="flex justify-center mb-6">
            <Image
              src="/image/logo_login.png"
              alt="Google"
              width={214}
              height={143}
              unoptimized
            />
          </div>
          <div className="text-start mb-6 pb-5!">
            <h3 className="text-2xl font-bold text-gray-800">
              Tạo tài khoản mới
            </h3>
            <p className="text-sm text-gray-500">
              Bạn đã có tài khoản?{" "}
              <a
                onClick={() => router.push("/login")}
                className="text-blue-500! hover:underline! cursor-pointer"
              >
                Vui lòng đăng nhập
              </a>
            </p>
          </div>
          {/* Form */}
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            onSubmit={methods.handleSubmit(onSubmits)}
          >
            <FormInput
              fieldName="name"
              placeholder="Vui lòng nhập tên đăng nhập"
              required={true}
            />
            <FormInput
              fieldName="email"
              placeholder="Vui lòng nhập email"
              required={true}
            />

            <FormInput
              fieldName="username"
              placeholder="Vui lòng nhập họ và tên"
              required={true}
            />
            <FormSelect
              fieldName="gender"
              placeholder="Vui lòng chọn giới tính"
              options={Constants.GENDER || []}
              required={true}
            />

            <FormInput
              fieldName="phone"
              placeholder="Vui lòng nhập số điện thoại"
              required={true}
            />
            <CustomDatePicker fieldName="birthday" required={true} />
            <FormInput
              fieldName="password"
              placeholder="Vui lòng nhập mật khẩu"
              isPassword={true}
              required={true}
            />
            {/* <FormSelect
              fieldName="role"
              placeholder="Vui lòng chọn vai trò"
              options={Constants.ROLE || []}
              required={true}
            /> */}

            <FormInput
              fieldName="passwordre"
              placeholder="Vui lòng nhập lại mật khẩu"
              isPassword={true}
              required={true}
            />
            <div className="md:col-span-2 flex justify-center">
              <CustomLoadingButton title="Tiếp tục" type="submit" />
            </div>
          </form>
        </div>

        <style>{`
        @keyframes fadeSlide {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeSlide {
          animation: fadeSlide 0.8s ease-in-out;
        }
      `}</style>
      </div>
    </FormProvider>
  );
}
