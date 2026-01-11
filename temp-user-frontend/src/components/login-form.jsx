import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useLogin } from "./Context/LoginContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react"; // 👈 added
import { useState } from "react"; // 👈 added

export function LoginForm({ className, ...props }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user, token, logOutUser, loginUser } = useLogin();
  const navigate = useNavigate();

  // 👇 show/hide password state
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        const result = await res.json();

        if (!res.ok) {
          toast.error(result.message || "Invalid credentials");
          return;
        }

        loginUser(result.token, result.userDto);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={cn("flex flex-col gap-6 mt-5", className)} {...props}>
      <div className="overflow-hidden p-0 flex flex-col justify-center items-center w-full">
        <CardHeader className="flex flex-col items-center gap-2 text-center">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
        </CardHeader>

        <CardContent className="w-full md:w-full lg:w-1/3">
          <form className="p-6 md:p-8 mt-5" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="space-y-6">
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </Field>

              {/* PASSWORD FIELD WITH EYE BUTTON */}
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  {/* <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a> */}
                </div>

                {/* Wrapper to position eye button */}
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />

                  {/* Eye Button */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </Field>

              <Field>
                <Button type="submit">Login</Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/signin">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </div>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
      <Button
        type="button"
        onClick={() => {
          window.location.href =
            "http://localhost:8080/oauth2/authorization/google";
        }}
      >
        Login with Google
      </Button>
    </div>
  );
}
