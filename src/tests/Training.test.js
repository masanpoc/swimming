// importing component to test (react must be in scope)
import App from '../components/App'
import React from 'react'
// methods used in testing
import { render, fireEvent, screen } from '@testing-library/react'
// custom jest matchers
import '@testing-library/jest-dom/extend-expect'
import { expect } from '@jest/globals'

describe(
    'Training parts',
    () => {
        test(
            'Input generates training',
            ()=>{
                render(<App />)
                const generateButton = screen.getByRole('button', {name: /Add/})
                fireEvent.click(generateButton)
                const warmup = screen.getAllByText(/freestyle/i)[0]
                expect(warmup).toBeInTheDocument()
            }
        )
    }
)

