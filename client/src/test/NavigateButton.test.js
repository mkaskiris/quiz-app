/**
 * @jest-environment jsdom
 */

import { default as NavigateButton } from '../components/NavigateButton';
import { render, screen } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event'
//const NavigateButton = require('../components/NavigateButton')

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('NavButtons', () => {
    test('On clicking, calls handleClick function', ()=>{
        // const mockNavigate = jest.fn()
        render(<NavigateButton />)
        // const click = jest.spyOn(NavigateButton, 'handleClick')
        const button = screen.getByRole('button')
        userEvent.click(button)
        //expect('hello').toBe('hello')
        // expect(click).toHaveBeenCalled()
    });
});