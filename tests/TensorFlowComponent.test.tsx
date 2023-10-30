import React from 'react';
import { render, waitFor, findByText, getByText, fireEvent, act } from '@testing-library/react';
import TensorFlowComponent from '../components/TensorFlowComponent';
import DrawableCanvas from '../components/DrawableCanvas';

// mock model fetch
jest.mock('@tensorflow/tfjs', () => {
    const originalModule = jest.requireActual('@tensorflow/tfjs');

    return {
        ...originalModule,
        loadLayersModel: jest.fn(() => Promise.resolve({})),
    };
});

describe('TensorFlowComponent', () => {

    // Render TensorFlowComponent
    it('TensorFlowComponent renders correctly', async () => {
        const { findByText } = render(<TensorFlowComponent />);

        // Check for "Results" text after async operations
        const resultsElement = await findByText("Results");
        expect(resultsElement).toBeTruthy();
    });

    // Check for update with canvas input
   
});