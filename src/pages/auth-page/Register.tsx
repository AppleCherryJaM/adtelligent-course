import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "../../lib/zodSchema";

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-sm bg-white p-6 rounded shadow">
      <div className="flex flex-col gap-1">
        <label className="text-gray-900 font-medium">Email</label>
        <input {...register("email")} type="email" className="border border-gray-300 rounded px-3 py-2 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-300" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-gray-900 font-medium">Password</label>
        <input {...register("password")} type="password" className="border border-gray-300 rounded px-3 py-2 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-300" />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-gray-900 font-medium">Confirm password</label>
        <input {...register("confirmPassword")} type="password" className="border border-gray-300 rounded px-3 py-2 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-300" />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
      </div>

      <button type="submit" className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
