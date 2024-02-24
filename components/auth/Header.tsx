import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type Props = { label: string; description: string };

function Header({ label, description }: Props) {
  return (
    <div className="flex flex-col gap-y text-center">
      <h1 className={cn(font.className, "text-2xl font-semibold")}>{label}</h1>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}

export default Header;
