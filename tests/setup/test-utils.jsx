import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

function renderWithUser(ui, options) {
  return {
    user: userEvent.setup(),
    ...render(ui, options),
  };
}

export * from '@testing-library/react';
export { userEvent, renderWithUser as render };
