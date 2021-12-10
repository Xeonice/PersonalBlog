import * as React from 'react';
import StyledLink from '../Link';
import SayHiStyle from './index.module.css';

const SayHi = function () {
  return (
    <section className={SayHiStyle.Wrapper}>
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
