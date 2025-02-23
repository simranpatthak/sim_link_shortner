"use client";

import { useState, SyntheticEvent } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";


interface AuthPageProps {
  type: "login" | "register";
}

export default function AuthPage({ type }: AuthPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<registerErrorType>({});
  
  const router = useRouter()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (type === "register") {
      axios
        .post("/api/auth/register", formData)
        .then((res) => {
          setLoading(false);
          const response = res.data;
          
          if (response.status === 200) {
            router.push(`/login?message=${response.message}`);
          }else if (response.status === 400) {
         console.log(response);
        setError(response?.errors);
        
       }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
    if (type === "login") {
      axios
        .post("/api/auth/login", formData)
        .then((res) => {
          setLoading(false);
          const response = res.data;
          
          if (response.status === 200) {
     signIn("credentials",{
      email:formData.email,
      password:formData.password,
      callbackUrl:"/dashboard",
      redirect: true
     })
        
          }else if (response.status === 400) {
         console.log(response);
        setError(response?.errors);
        
       }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-96 p-6 shadow-lg">
      {
        error?.message ? <div className="bg-red-100 text-red-500 p-4 rounded-md">{error?.message}</div>:""
      }
        <CardHeader>
          <CardTitle>{type === "login" ? "Login" : "Register"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {type === "register" && (
              <>
              <Input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}

                />
              <span className="text-red-500 font-semibold text-sm">
                { error?.name}
              </span>
                </>
            )}
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
                      <span className="text-red-500 font-semibold text-sm">
                { error?.email}
              </span>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}

            />
                      <span className="text-red-500 font-semibold text-sm">
                { error?.password}
              </span>
            {type === "register" && (
              <>
              <Input
                type="password"
                name="password_confirmation"
                placeholder="confirm Password"
                value={formData.password_confirmation}
                onChange={handleChange}
          
                />
          <span className="text-red-500 font-semibold text-sm">
                { error?.password_confirmation}
              </span>
                </>
            )}
            {type === "login" && (
              <div className="text-center mt-2 text-sm">
                <Link href="/forgot-password" className="text-blue-600">
                  Forgot password?
                </Link>
              </div>
            )}
            {
              loading?
            <Button type="submit" className="w-full bg-gray-800">
              loading...
            </Button>:
            <Button type="submit" className="w-full">
            {type === "login" ? "Login" : "Register"}
            </Button>
            }
          </form>
          <div className="mt-4">
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
              Login using Google
            </Button>
          </div>
          <div className="text-center mt-4 text-sm">
            {type === "login" ? (
              <p>
                New user?{" "}
                <Link href="/register" className="text-blue-600">
                  Register here
                </Link>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600">
                  Login here
                </Link>
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
