import * as React from 'react';

const Box: React.FunctionComponent<any> = function ({
  children,
  ...props
}) {
  return (
    <div>
      {children}
    </div>
  );
};

export default Box;
