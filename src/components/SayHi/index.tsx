import * as React from 'react';

const SayHi = function () {
  return (
    <section className="font-serif max-w-screen-sm text-4xl font-bold leading-tight text-black my-40">
      点击此处
      {' '}
      <a
        className="underline"
        aria-label="Send an E-Mail to hello@rathes.me"
        href="mailto:ad546971975@icloud.com"
      >
        与我联系
      </a>
      ，进行一些更为深入的探讨。
    </section>
  );
};

export default SayHi;
