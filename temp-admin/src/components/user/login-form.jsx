import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export function LoginForm({ className, ...props }) {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const auth_password = import.meta.env.VITE_PASSWORD;
const auth_secret = import.meta.env.VITE_SECRET;

  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log(data);
    const password = watch("password");
    const secret = watch("secret");
    if(password !== auth_password) {
      toast("Wrong Password")
    } else if (secret !== auth_secret){
      toast("Wrong Secret")
    } else if (password === auth_password && secret === auth_secret) {
      setTimeout(()=>{
        navigate("orders")
      },2000)
    }
    else {
      setTimeout(()=>{
        navigate("/")
      },2000)
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field className="space-y-1">
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter valid Email",
                    },
                  })}
                />
              </Field>
              {errors.email && (
                <p className="text-red-500 text-sm -mt-1">{errors.email.message}</p>
              )}
              <Field className="space-y-1">
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "password is required",
                  })}
                />
              </Field>
              {errors.password && (<p className="text-red-500 text-sm -mt-1">{errors.password.message}</p>)}
              <Field className="space-y-1">
                <div className="flex items-center">
                  <FieldLabel htmlFor="secret">Secret</FieldLabel>
                </div>
                <Input
                  id="secret"
                  type="password"
                  {...register("secret", {
                   required: "secret is required",
                  })}
                />
              </Field>
              {errors.secret && (<p className="text-red-500 text-sm -mt-1">{errors.secret.message}</p>)}
              <Field>
                <Button type="submit">Login</Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
       <ToastContainer />
    </div>
  );
}
