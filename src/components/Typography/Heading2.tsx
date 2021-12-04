import * as React from 'react';

const Heading2: React.FunctionComponent = function ({ children }) {
  return (
    <h2 className="font-serif text-lg font-bold leading-relaxed mt-2.5 mb-2 text-black">
      {children}
    </h2>
  );
};

export default Heading2;
