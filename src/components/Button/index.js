import React from 'react';
import { Button } from 'antd';

export default function CustomButton(props) {
  const { text, type, disabled } = props || {};

  return (
    <Button type={type || 'primary'} disabled={disabled || false}>
      {text}
    </Button>
  );
}
