"use client";
import AuthPage from "@/components/base/AuthPage";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Login = () => {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setMessage(searchParams.get("message"));
  }, [searchParams]);

  return (
    <div>
      {message ? <h4 className="bg-green-300 font-bold rounded-md p-4">{message}</h4> : ""}
      <AuthPage type={"login"} />
    </div>
  );
};

export default Login;
