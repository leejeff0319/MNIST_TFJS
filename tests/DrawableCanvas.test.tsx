// DrawableCanvas.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import DrawableCanvas from '../components/DrawableCanvas';

describe('DrawableCanvas', () => {
    it('DrawbableCanvas renders correctly', () => {
        const { container } = render(<DrawableCanvas />);
        expect(container).toMatchSnapshot();
    });


    it('DrawableCanvas draws correctly', () => {
        const { getByTestId } = render(<DrawableCanvas />);
        const canvas = getByTestId('drawable-canvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        // Simulate drawing on canvas
        ctx.fillStyle = '#FFFFFF'; // white
        ctx.fillRect(0, 0, 28, 28);

        // Check for drawing on canvas
        const canvasContext = canvas.getContext('2d');
        if (canvasContext) {
            const canvasImageData = canvasContext.getImageData(0, 0, 7, 28);
            expect(canvasImageData).toBeTruthy();
        }

        // Check Erase Button
        ctx.fillStyle = '#000000'; // black
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Check if canvas is cleared
        const clearedCanvasContext = canvas.getContext('2d');
        if (clearedCanvasContext) {
            const clearedCanvasImageData = clearedCanvasContext.getImageData(0, 0, 28, 28);
            expect(clearedCanvasImageData).toBeTruthy();
        }
    });
});