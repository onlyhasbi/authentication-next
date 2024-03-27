import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa";
import { DEFAULT_REDIRECT } from "@/route";
import { signIn } from "next-auth/react";

type Props = {
  isVisible?: boolean;
};

function SocialMedia({ isVisible = false }: Props) {
  const onClick = async (provider: "google" | "github") => {
    await signIn(provider, {
      callbackUrl: DEFAULT_REDIRECT,
      redirect: true,
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="flex gap-x-3 justify-center w-full">
      <Button
        size="lg"
        variant="outline"
        className="w-full"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="w-full"
        onClick={() => onClick("github")}
      >
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
}

export default SocialMedia;
