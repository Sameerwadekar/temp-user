import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function SignupForm({ className, ...props }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // 👁️ Toggle States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    fetch("http://localhost:8080/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) throw new errors("Failed to register user");
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((error) => toast.error(error));
  };

  return (
    <div className={cn("flex flex-col gap-6 mt-5", className)} {...props}>
      <div className="overflow-hidden p-0 flex flex-col justify-center items-center w-full">
        <CardContent className="w-full md:w-full lg:w-1/3">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Enter your email below to create your account
                </p>
              </div>

              {/* Name */}
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  type="text"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name Must Be 3 letter",
                    },
                  })}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </Field>

              {/* Email */}
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
                <FieldDescription>
                  We'll use this to contact you. We will not share your email.
                </FieldDescription>
              </Field>

              {/* Password + Confirm Password */}
              <Field>
                <div className="grid grid-cols-2 gap-4">

                  {/* Password */}
                  <Field className="relative">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Password is required",
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          message:
                            "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
                        },
                      })}
                    />

                    {/* 👁️ Toggle Button */}
                    <button
                      type="button"
                      className="absolute top-10 left-[225px] text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>

                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </Field>

                  {/* Confirm Password */}
                  <Field className="relative">
                    <FieldLabel htmlFor="confirmPassword">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      type={showConfirm ? "text" : "password"}
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === watch("password") ||
                          "Passwords do not match",
                      })}
                    />

                    {/* 👁️ Toggle Button */}
                    <button
                      type="button"
                      className="absolute top-10 left-[225px] text-gray-600"
                      onClick={() => setShowConfirm(!showConfirm)}
                    >
                      {showConfirm ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>

                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </Field>

                </div>

                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>

              <Field>
                <Button type="submit">Create Account</Button>
              </Field>

              <FieldDescription className="text-center">
                Already have an account? <a href="/login">Sign in</a>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </div>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
