import React, {useContext, useState} from 'react';

import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import  Context  from '../utils/Context';



const UnAuthedProviders = ({ children }) => {
    // const triviaData = {
    //     category: "Geography",
    //     type: "multiple",
    //     difficulty: "medium",
    //     question: "What is the name of the former country that was succeeded by countries such as Serbia, Croatia and Slovenia?",
    //     correct_answer: "Yugoslavia",
    //     incorrect_answers: [
    //     "Czechoslovakia",
    //     "Abkhazia",
    //     "South Ossetia"
    //     ]
    //     }
    const [triviaData, setTriviaData] = useState();
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