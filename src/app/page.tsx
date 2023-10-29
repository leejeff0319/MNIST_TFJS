"use client";
import React, { Component } from 'react';
import dynamic from 'next/dynamic';
import DrawableCanvas from '../../components/DrawableCanvas';
import Image from 'next/image';

const TensorFlowComponent = dynamic(() => import('../../components/TensorFlowComponent'), {
  ssr: false,
  loading: () => <p>Loading...</p>
});

interface State {
  imageData?: ImageData;
}

class HomePage extends Component<{}, State> {
  state: State = {};

  handleNewImage = (newImageData: ImageData) => {
    // Handle the new image data here
    console.log(newImageData);
    // Update the state with the new ImageData
    this.setState({ imageData: newImageData });
  };

  render() {
    return (
      <main className=" h-screen flex flex-col items-center w-screen">
        <div className='text-4xl text-center text-white mb-5 mt-5'>
          <h1>MNIST Digit Recognition using TensorflowJS</h1>
          <div style={{background:'#2C2F31'}} className='flex justify-center mt-3 p-4 w-screen'>
            <Image src='/MNIST_image.png' width={700} height={700} alt="image of MNIST dataset" />
          </div>
        </div>

        <div className="flex justify-center space-x-20 w-full px-20">
          {/* Drawing Canvas Column */}
          <div className="w-2/5">
            <h3 className="mx-4 text-4xl mb-2">Try writing a number!</h3>
            <div className='flex justify-center'>
              <DrawableCanvas onNewImage={this.handleNewImage} />
            </div>
            
          </div>

          {/* TensorFlow Prediction Column */}
          <div className="w-3/5">
            <TensorFlowComponent imageData={this.state.imageData} />
          </div>
        </div>
      </main>
    );
  }
}

export default HomePage;
