import React, { useRef } from 'react';
import Xarrow, { useXarrow, Xwrapper } from 'react-xarrows';

const MyComponent = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const updateXarrow = useXarrow();

  return (
    <Xwrapper>
      <div ref={ref1} style={{ position: 'absolute', top: 100, left: 100 }}>
        Element 1
      </div>
      <div ref={ref2} style={{ position: 'absolute', top: 200, left: 300 }}>
        Element 2
      </div>
      <Xarrow
        start={ref1}
        end={ref2}
        startAnchor="bottom"
        endAnchor="top"
        path="smooth"
        color="blue"
      />
      <button onClick={updateXarrow}>Update Arrow</button> {/* Trigger update */}
    </Xwrapper>
  );
};

export default MyComponent;