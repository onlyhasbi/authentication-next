import { PropsWithChildren } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Header from "./Header";
import SocialMedia from "./SocialMedia";
import Redirect from "./Redirect";

type Props = {
  title: string;
  description: string;
  pathLabel: string;
  path: string;
  isSocial?: boolean;
} & PropsWithChildren;

function SignCard({
  title,
  description,
  path,
  pathLabel,
  isSocial,
  children,
}: Props) {
  return (
    <Card className="w-[350px] shadow-md">
      <CardHeader>
        <Header label={title} description={description} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex flex-col gap-y-2">
        <SocialMedia isVisible={isSocial} />
        <Redirect href={path} label={pathLabel} />
      </CardFooter>
    </Card>
  );
}

export default SignCard;
