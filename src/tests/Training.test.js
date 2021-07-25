// importing component to test (react must be in scope)
import App from "../components/App";
import React from "react";
import {screen, render, getAllByRole} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import * as _ from 'ramda'


describe('When form is submitted', ()=>{
    test('training is displayed', async()=>{
        render(<App />)
        const training = screen.getByTestId('training');
        expect(training).toHaveClass('hidden');
        const submitButton = screen.getByTestId('submit-button')
        userEvent.click(submitButton);
        expect(training).not.toHaveClass('hidden');
    })
    test('restrictions are correct, eg.: only strokes selected appear in training', async()=>{
        render(<App />)
        // by default only freestyle selected, check that freestyle appears and that other strokes are not present inside training
        const submitButton = screen.getByTestId('submit-button')
        userEvent.click(submitButton);
        const trainingString = screen.getByTestId('training').innerHTML.toString();
        expect(trainingString.includes('Freestyle')).toBeTruthy(); 
        expect(trainingString.includes('Backstroke')).not.toBeTruthy(); 
        expect(trainingString.includes('Breaststroke')).not.toBeTruthy(); 
        expect(trainingString.includes('Butterfly')).not.toBeTruthy(); 
    })
    test('none of the exercises present are repeated', ()=>{
        render(<App />)
        const submitButton = screen.getByTestId('submit-button')
        userEvent.click(submitButton);
        const container = document.querySelector('#training')
        // select all freestyle exercises inside training and drop repeats
        let freestyleExercises = getAllByRole(container,'heading', {name: /freestyle/i});
        freestyleExercises = _.map((el)=>el.textContent, freestyleExercises);
        const exsLength = freestyleExercises.length
        const notRepeatingExsLength = _.dropRepeats(freestyleExercises).length
        expect(exsLength).toBe(notRepeatingExsLength);
        // console.log(freestyleExercises);
    })
    // test('total meters are correct based on input', ()=>{
    //     // default 2200
    //     // total meters 2200
    // })
})