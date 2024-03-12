import React, { useState } from 'react';
import { Button, message, Steps, theme } from 'antd';

interface Step {
  title: string;
  content: React.ReactNode;
}

interface StepperProps {
  steps: Step[];
}

const Stepper: React.FC<StepperProps> = ({ steps }) => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    // lineHeight: '100vh',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  return (
    <>
      {/* <StepComponent /> */}
      <Steps current={current} items={items} />
      {/* <div style={contentStyle}>{steps[current].content}</div> */}
      {steps[current].content}
      <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && <Button onClick={() => next()}>Next</Button>}
        {current === steps.length - 1 && (
          <Button onClick={() => message.success('Processing complete!')}>Done</Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
};

export default Stepper;
