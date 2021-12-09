import * as React from 'react';

const Heading3: React.FunctionComponent = function ({ children }) {
  return (
    <h3 className="font-serif text-xs font-regular leading-relaxed text-black">
      {children}
    </h3>
  );
};

export default Heading3;
