import * as React from 'react';
import StyledLink from '../Link';

const SayHi = function () {
  return (
    <section className="font-serif max-w-screen-sm text-4xl font-bold leading-tight text-black my-40">
      点击此处
      {' '}
      <StyledLink href="mailto:ad546971975@icloud.com" underline>
        与我联系
      </StyledLink>
      ，进行一些更为深入的探讨。
    </section>
  );
};

export default SayHi;
