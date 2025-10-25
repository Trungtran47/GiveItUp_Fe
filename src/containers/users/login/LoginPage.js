import Text from "@/components/common/text-common/text/Text";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import ButtonCommon from "../../../components/common/button/ButtonCommon";
import FormInput from "../../../components/common/form/custom-form/FormInput";
import { signIn } from "../../../redux/auth/reducer";
import classes from "./LoginPage.module.scss";
import { jwtDecode } from "jwt-decode";
// import ggIcon from "../../../public/image/img_gg.png";
// import fbIcon from "../../../public/image/img_fb.png";

import Image from "next/image";
// import ggIcon from "@/assets/image/img_png.png";

export default function LoginPage() {
  const methods = useForm();
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmits = (data) => {
    const newData = {
      username: data?.username,
      password: data?.password,
    };
    dispatch(
      signIn({
        data: newData,
        // onSuccess: (re) => {
        //   if (re?.result?.role?.name === "ADMIN") {
        //     router.replace("/");
        //   }
        // },
        onSuccess: (token) => {
          try {
            const decoded = jwtDecode(token);
            console.log("decoded:", decoded);
            const role = decoded?.scope;
            if (role === "ROLE_ADMIN") {
              router.replace("/admin/dashboard");
            } else if (role === "ROLE_USER") {
              router.replace("/");
            } else if (role === "ROLE_AUTHOR") {
              router.replace("/");
            } else {
              router.replace("/"); // mặc định
            }
          } catch (err) {
            console.error("Decode token lỗi:", err);
          }
        },
        onError: (err) => {
          console.log("xxx", err);
        },
      })
    );
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmits)}>
        <div className={classes.container}>
          <div className={classes.content}>
            <div className={classes.itemLeft}>
              <Image
                src="/image/img_fb.png"
                alt="Google"
                width={756}
                height={748}
                unoptimized
              />
            </div>

            <div className={classes.itemRight}>
              <div className={classes.formBox}>
                <div className="flex flex-col items-center">
                  <Image
                    src="/image/logo_login.png"
                    alt="Google"
                    width={154}
                    height={40}
                    unoptimized
                  />
                  <h2 className={classes.title}>
                    CHÀO MỪNG BẠN ĐẾN VỚI GIVEITUP
                  </h2>
                  <Text>Vui lòng đăng nhập / đăng ký để tiếp tục</Text>
                </div>
                <button
                  type="button" // ← quan trọng
                  className={`${classes.btn} ${classes.google}`}
                  onClick={() => {
                    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`;
                  }}
                >
                  <Image
                    src="/image/img_gg.png"
                    alt="Google"
                    width={20}
                    height={20}
                    unoptimized
                  />
                  Tiếp tục với Google
                </button>
                <button
                  type="button" // ← quan trọng
                  className={`${classes.btn} ${classes.facebook}`}
                >
                  <Image
                    src="/image/img_fb.png"
                    alt="Google"
                    width={20}
                    height={20}
                    unoptimized
                  />
                  Tiếp tục với Facebook
                </button>
                <div className="flex items-center my-8 gap-1">
                  <div className="flex-1 h-px bg-blue-400"></div>
                  <span className="mx-2 text-gray-500 text-sm">Hoặc</span>
                  <div className="flex-1 h-px bg-blue-400"></div>
                </div>

                <div className={classes.formInput}>
                  <div className="flex flex-col gap-2">
                    <FormInput
                      fieldName="username"
                      required={true}
                      placeholder="Nhập tên tài khoản"
                      height={32}
                    />
                    <FormInput
                      fieldName="password"
                      required={true}
                      placeholder="Mật khẩu"
                      isPassword={true}
                      height={32}
                    />
                  </div>
                  <ButtonCommon title="Tiếp tục" type="submit" />
                </div>
                <div className="flex items-start">
                  <Text>
                    Bạn chưa có tài khoản?{" "}
                    <a
                      onClick={() => router.push("/register")}
                      className="text-blue-500! hover:underline! cursor-pointer"
                    >
                      Đăng ký ngay
                    </a>
                  </Text>
                </div>
              </div>
            </div>
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
      </form>
    </FormProvider>
  );
}
