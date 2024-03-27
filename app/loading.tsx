import Container from "@/components/Container";
import loading from "@/assets/common/loading.gif";
import Image from "next/image";
import React from "react";

function SignInLoading() {
  return (
    <Container>
      <Image src={loading} width={50} height={50} alt="loading-gif" />
    </Container>
  );
}

export default SignInLoading;
