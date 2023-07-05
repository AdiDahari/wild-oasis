import { toast } from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("User successfully updated");
      queryClient.setQueriesData("user", user);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, updateUser };
};
