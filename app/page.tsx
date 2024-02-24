import { Button } from "@/components/ui/button";

export default function Home() {
  return (
   <div className="w-full h-screen flex flex-col justify-center items-center text-center gap-5">
     <p className="text-2xl font-semibold">Learning Auth</p>
     <Button>Submit</Button>
   </div>
  );
}
