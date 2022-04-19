import React, { FunctionComponent } from 'react';

type ClassBGProps = {
  color: string;
  className?: string;
};

const ClassBG: FunctionComponent<ClassBGProps> = (props) => {
  const { color = 'white', className = '', children } = props;

  return (
    <div className={className} style={{ backgroundColor: color }}>
      {children}
    </div>
  );
};
export default ClassBG;
