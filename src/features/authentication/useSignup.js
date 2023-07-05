import { useMutation } from "@tanstack/react-query";
import { signup as SignupApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export const useSignup = () => {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: SignupApi,
    onSuccess: (user) => {
      toast.success(
        "User succesfully created! Please verify the email address"
      );
    },
  });

  return { signup, isLoading };
};
