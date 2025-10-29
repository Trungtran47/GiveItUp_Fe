"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import React from "react";

export default function useCustomRouter() {
  const MODE_ALL = "all";
  const MODE_HAVE_VALUE = "have";

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // 🔹 Chuyển searchParams → object
  const paramsToObject = React.useCallback((sp) => {
    const result = {};
    sp.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }, []);

  const query = React.useMemo(() => searchParams, [searchParams]);

  const get = (field) => query.get(field);

  const getAll = () => paramsToObject(query);

  const convertObjToString = (_obj, mode = MODE_ALL) => {
    const newQuery = new URLSearchParams();
    for (const key in _obj) {
      if (mode === MODE_ALL) {
        newQuery.set(key, _obj[key]);
      } else if (_obj[key]) {
        newQuery.set(key, _obj[key]);
      }
    }
    return newQuery.toString();
  };

  // 🔹 Thay URL (không reload)
  const replace = ({ params = {} }) => {
    const queryStr = convertObjToString(params, MODE_HAVE_VALUE);
    router.replace(`${pathname}?${queryStr}`);
  };

  // 🔹 Điều hướng sang trang khác
  const push = ({ pathname: toPath, params = {} }) => {
    const queryStr = convertObjToString(params, MODE_HAVE_VALUE);
    router.push(`${toPath}?${queryStr}`);
  };

  // 🔹 Cho phép chia sẻ router
  const pushShell = ({ pathname: toPath, params = {} }) => {
    if (AppConfig?.SHARE_ROUTER) {
      AppConfig.SHARE_ROUTER.push({
        pathname: toPath,
        params: params,
      });
    } else {
      push({ pathname: toPath, params });
    }
  };

  const goBack = () => router.back();

  return {
    get,
    getAll,
    replace,
    push,
    pushShell,
    goBack,
  };
}
