import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type ContainerProps = {
  children: React.ReactNode;
};

/* eslint-disable no-unused-vars */
enum Colors {
  White = '#ffffff',
  Grey = '#fafafa',
}
/* eslint-enable no-unused-vars */

const BackgroundLayout: React.FC<any> = (props: ContainerProps) => {
  const location = useLocation();
  const [background, setBackground] = useState<Colors>(Colors.Grey);

  useEffect(() => {
    setBackground(Colors.Grey);
  }, [location.pathname]);
  return (
    <>
      <div style={{ background: background }}>{props.children}</div>
    </>
  );
};

export default BackgroundLayout;
