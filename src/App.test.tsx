import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import TimeDiff from './pages/atoms/time-diff';

test('time diff time', () => {
  let now = Date.now()
  render(<TimeDiff loading={false} now={now} epoch={now} />)
  let h4 = screen.getByTestId('timediff') 
  expect(h4).toHaveTextContent('00 : 00 : 00') 
});
