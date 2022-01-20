/**
 * @jest-environment jsdom
 */

import { default as Welcome } from '../pages/Welcome';
import { render, screen } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Welcome', () => {

    // beforeEach(()=>{
    //     render(<Welcome />)
    // });

    test('it renders a div with 2 elements', () => {
        render(<Welcome />)
        const div = screen.getByRole('button-container')
        expect(div.nodeName).toEqual("DIV")
        expect(div.childElementCount).toEqual(2);
    });

    test('renders 2 buttons', () => {
        render(<Welcome />)
        const button1 = screen.getByText('Create Quiz')
        expect(button1.nodeName).toEqual("BUTTON");

        const button2 = screen.getByText('Leaderboard')
        expect(button2.nodeName).toEqual("BUTTON");
    });
});