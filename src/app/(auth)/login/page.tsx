"use client";
import AuthPage from "@/components/base/AuthPage";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function Message() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  return message ? <h4 className="bg-green-300 font-bold rounded-md p-4">{message}</h4> : null;
}

const Login = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Message />
      </Suspense>
      <AuthPage type="login" />
    </div>
  );
};

export default Login;
