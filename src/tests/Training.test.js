// importing component to test (react must be in scope)
import App from "../components/App";
import React from "react";
import {screen, render, getAllByText, getAllByRole} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import * as _ from 'ramda'


describe('When form is submitted', ()=>{
    test('training is rendered', ()=>{
        render(<App />)
        const level4Radio = screen.getByRole('radio', {name: /4/});
        userEvent.click(level4Radio);
         const submitButton = screen.getByTestId('submit-button')
        userEvent.click(submitButton);

    })
    test('restrictions are correct: strokes not selected are not in the document', ()=>{
        // by default only freestyle selected, check that other strokes are not present in the DOM
         const submitButton = screen.getByTestId('submit-button')
        userEvent.click(submitButton);
        const backstrokeQuery = getAllByText(/backstroke/i)
        const breaststrokeQuery = getAllByText(/breaststroke/i)
        const butterflyQuery = getAllByText(/butterfly/i)
        expect(backstrokeQuery).not.toBeInTheDocument();
        expect(breaststrokeQuery).not.toBeInTheDocument();
        expect(butterflyQuery).not.toBeInTheDocument();

    })
    test('none of the exercises present are repeated', ()=>{
         const submitButton = screen.getByTestId('submit-button')
        userEvent.click(submitButton);
        // select all freestyle exercises and drop repeats
        const freestyleExercises = getAllByRole('heading', {name: /freestyle/i});
        const exsLength = freestyleExercises.length
        const notRepeatingExsLength = _.dropRepeats(freestyleExercises).length
        expect(exsLength).toBe(notRepeatingExsLength);
    })
    // test('total meters are correct based on input', ()=>{
    //     // default 2200
    //     // total meters 2200
    // })
})