import * as React from 'react';

const Heading4: React.FunctionComponent = function ({ children }) {
  return (
    <h4 className="font-serif text-xs font-regular leading-relaxed text-black">
      {children}
    </h4>
  );
};

export default Heading4;
