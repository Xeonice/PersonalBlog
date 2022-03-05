import * as React from 'react';

const Box: React.FunctionComponent<any> = function ({
  children,
}) {
  return (
    <div>
      {children}
    </div>
  );
};

export default Box;
