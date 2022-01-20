import React, {useContext, useState} from 'react';

import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import  Context  from '../utils/Context';



const UnAuthedProviders = ({ children }) => {

  const mockContext ={
    questions: [
        {
        player: {
            name: "James", 
            questionNo: 1},
        category: "Entertainment: Music",
        type: "multiple",
        difficulty: "easy",
        question: "Who had a 1983 hit with the song &#039;Africa&#039;?",
        correct_answer: "Toto",
        incorrect_answers: [
        "Foreigner",
        "Steely Dan",
        "Journey"
        ]
        }], 
        scores: [{James: 1}, {Meni: 2}, {Raj: 3}], 
        amount: 10
  } 
  const [triviaData, setTriviaData] = useState(mockContext);
  return (
          <Context.Provider value={{triviaData, setTriviaData}}>
              {children}
          </Context.Provider>
  )
}

// const renderWithReduxProvider = (ui, options={}) => {
//     let TestWrapper = TestProviders(options)
//     render(ui, { wrapper: TestWrapper, ...options })
// }

import axios from 'axios';
jest.mock('axios')
axios.get.mockResolvedValue({ data: [ { latlng: [123, 456] }]})

const renderWithProviders = (ui, options) => render(ui, { wrapper: UnAuthedProviders, ...options })

global.renderWithProviders = renderWithProviders
global.React = React;