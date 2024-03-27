import React from "react";

type Props = { email: string; link: string };

function EmailTemplate({ email, link }: Props) {
  return (
    <div>
      <h3>Hello {email}</h3>
      <p>
        Confirm your account by click this link <a href={link}>here</a>
      </p>
    </div>
  );
}

export default EmailTemplate;
