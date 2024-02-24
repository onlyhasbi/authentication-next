import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa";

type Props = {
  isVisible?: boolean;
};

function SocialMedia({ isVisible = false }: Props) {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="flex gap-x-3 justify-center w-full">
      <Button size="lg" variant="outline" className="w-full" onClick={() => {}}>
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button size="lg" variant="outline" className="w-full" onClick={() => {}}>
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
}

export default SocialMedia;
