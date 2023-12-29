import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Icons } from "../../components/icons";
import { Button } from "../../components/ui/button";
import { useAuth } from "../context/AuthService";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

function SignIn() {
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async () => {
    try {
      const email = getValues("email");
      const password = getValues("password");
      if (Object.keys(errors).length === 0) {
        signIn(email, password);
      }
    } catch (error) {
      console.error("handleSubmit failed:", error.response);
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>
          Enter your email below to sign in your world.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid">
          <Button variant="outline">
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="m@example.com"
              {...register("email", {
                required: { value: true, message: "This is required." },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invaild email format.",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p key={type} className="text-red-700 text-sm">
                    {message}
                  </p>
                ))
              }
            />
          </div>
          <div className="grid gap-2 mt-6">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              placeholder="Must be at least 6 characters."
              {...register("password", {
                required: { value: true, message: "This is required." },
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters.",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p key={type} className="text-red-700 text-sm ">
                    {message}
                  </p>
                ))
              }
            />
          </div>
          <Button className="w-full mt-8" type="submit">
            Sign In
          </Button>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-s uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Don't have an account? &nbsp;
              <Link className="text-blue-600 hover:underline" to="/signup">
                Sign Up
              </Link>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SignIn;
