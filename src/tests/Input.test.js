// importing component to test (react must be in scope)
import App from "../components/App";
import React from "react";
import {screen, render} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('Input button', ()=>{
    test('level 4 is checked when clicked', ()=>{
        render(<App />);
        const level4Radio = screen.getByRole('radio', {name: /4/});
        userEvent.click(level4Radio);
        // check if it is checked
        expect(level4Radio).toBeChecked();
    });
    test('butterfly is checked when clicked', ()=>{
        render(<App />);
        const butterflyCheckbox = screen.getByRole('checkbox', {name: /Butterfly/});
        userEvent.click(butterflyCheckbox);
        // check if it is checked
        expect(butterflyCheckbox).toBeChecked();
    });
    test('arms is checked when clicked', ()=>{
        render(<App />);
        const armsCheckbox = screen.getByRole('checkbox', {name: /Arms/});
        userEvent.click(armsCheckbox);
        // check if it is checked
        expect(armsCheckbox).toBeChecked();
    })
})

describe('When form is submitted,', ()=>{
    test('it is no longer present in the document', ()=>{
        render(<App />)
        const submitButton = screen.getByTestId('submit-button')
        userEvent.click(submitButton);
        expect(submitButton).not.toBeInTheDocument();
    })
    test('Generate again and Reset buttons are present in the document', ()=>{
        render(<App />)
        const submitButton = screen.getByTestId('submit-button')
        userEvent.click(submitButton);
        const generateAgainButton = screen.getByRole('button', {name: /Generate your workout again/})
        expect(generateAgainButton).toBeInTheDocument()
        const resetButton = screen.getByRole('button', {name: /Reset/})
        expect(resetButton).toBeInTheDocument()
    })
    test('and reset button is clicked, it causes the form to render again', ()=>{
        render(<App />)
        const submitButton = screen.getByTestId('submit-button')
        userEvent.click(submitButton);
        const resetButton = screen.getByRole('button', {name: /Reset/})
        userEvent.click(resetButton);
        const levelsLabel = screen.getByRole('heading', {name: /Your level:/})
        expect(levelsLabel).toBeInTheDocument();
    })
    test('but no strokes are selected, the form is still rendered', ()=>{
        render(<App />)
        const freestyleCheckbox = screen.getByRole('checkbox', {name: /Freestyle/})
        userEvent.click(freestyleCheckbox);
        expect(freestyleCheckbox).not.toBeChecked();
        const submitButton = screen.getByTestId('submit-button')
        userEvent.click(submitButton);
        expect(freestyleCheckbox).toBeInTheDocument();
    })
})