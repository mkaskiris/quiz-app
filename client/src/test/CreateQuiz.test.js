import { default as CreateQuiz } from '../pages/CreateQuiz';
import { render, screen } from '@testing-library/react';

describe('CreateQuiz', () => {

    // beforeEach(()=>{
    //     render(<CreateQuiz />)
    // });

    // test('it renders a div with 2 elements', () => {
    // });

    test('it changes the difficulty value to the difficulty selected by the user', () => {
        renderWithProviders(<CreateQuiz />) //try it now
        userEvent.selectOptions(difficulty, 'Easy')   
        expect(difficulty.value).toEqual('Easy');  
    });

});