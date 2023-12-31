I decided to start my Machine Learning journey with the Handwritten Digit Recognition Project. I developed the model on this Kaggle dataset first, and then trained the model using the MNIST dataset using Google Colab. I then converted the trained model to a */TensorflowJS*/ (tfjs) file and loaded it onto my website using */tf.loadLayersModel.*/

I thought that just training a model was too generic and common. I wanted to make something that was more interactive and fun for the user. So I decided to add a canvas on which the user can write their number on it, and it would be converted into a 28x28 image that can be interpreted by the train model to produce an output. I also wanted to show visually the predictions of the model to engage the user more.

You can take a look at the model I built to train on the MNIST set on Kaggle (LINK). This model was trained using the Google Colab platform (LINK) due to compatibility issues on my own machine. Please keep in mind that the model predicts best when writing in bigger sizes.

Briefly explain how model was made. 

