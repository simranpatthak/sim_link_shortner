"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "../../styles/nprogress.css";
export default function Loader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    NProgress.start();

    const timer = setTimeout(() => {
      setLoading(false);
      NProgress.done();
    }, 500); 

    return () => clearTimeout(timer);
  }, [pathname]);

  return loading ? <div className="h-1 w-full fixed top-[60px] left-0 " /> : null;
}
