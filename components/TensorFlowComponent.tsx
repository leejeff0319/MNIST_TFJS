"use client";
import React, { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

// Define the prop types
interface TensorFlowComponentProps {
    imageData?: ImageData;  // The '?' makes it optional
}


const TensorFlowComponent: React.FC<TensorFlowComponentProps> = ({ imageData }) => {
    const [model, setModel] = useState<tf.LayersModel | null>(null);
    const [predictions, setPredictions] = useState<number[] | null>(null);

    useEffect(() => {
        async function loadModel() {
            const loadedModel = await tf.loadLayersModel('/MNIST_Model/Trained_TFJS/tfjs_mnist_30ep/model.json');
            setModel(loadedModel);
        }

        loadModel();
    }, []);

    const predict = async (imgData: ImageData) => {
        if (!model) {
            console.error("Model isn't loaded yet");
            return;
        }

        const preds = tf.tidy(() => {
            let img = tf.browser.fromPixels(imgData, 1)
                .reshape([1, 28, 28, 1])
                .cast('float32')
                .div(255);

            const output = model.predict(img) as tf.Tensor;
            return Array.from(output.dataSync());
        });

        console.log("Predictions:", preds);
        setPredictions(preds);
    };

    // Call predict function when imageData prop changes
    useEffect(() => {
        if (imageData) {
            predict(imageData);
        }
    }, [imageData]);



    return (
        <div data-testid='tensorflow-component'>
            <h1 className='text-4xl'>Results</h1>
            {predictions && (
                <div>
                    <div style={{ width: '100%', height: '400px' }}>
                        <Bar
                            data={{
                                labels: predictions.map((_, index) => ` ${index}`),
                                datasets: [
                                    {
                                        label: 'Predictions',
                                        data: predictions,
                                        backgroundColor: 'rgba(0, 188, 212,  0.4)',
                                        borderColor: 'rgba(0, 188, 212, 1)',
                                        borderWidth: 1,
                                        hoverBackgroundColor: 'rgba(0, 188, 212, 0.6)',
                                        hoverBorderColor: 'rgba(0, 188, 212, 1)',
                                    }
                                ]
                            }}
                            width={500}
                            height={300}
                            options={{
                                maintainAspectRatio: true,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        grid: {
                                            display: true,
                                            color: 'rgba(255, 255, 255, 0.2)'
                                        }
                                    },
                                    x: {
                                        grid: {
                                            display: false  // Hide the x-axis grid lines
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                    <div className='flex-col' style={{ fontSize: '2rem' }}>
                        <h4 className="mb-2">Predictions:</h4>
                        <div className="flex">

                            {/* First column */}
                            <div>
                                {predictions.slice(0, 5).map((pred, index) => (
                                    <div key={index} style={{ fontSize: '1.25rem', marginRight:'5em', marginBottom: '0.5rem' }}>
                                        <strong>{index}: </strong> {pred.toFixed(4)}
                                    </div>
                                ))}
                            </div>

                            {/* Second column */}
                            <div>
                                {predictions.slice(5, 10).map((pred, index) => (
                                    <div key={index + 5} style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                                        <strong>{index + 5}: </strong> {pred.toFixed(4)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default TensorFlowComponent;
