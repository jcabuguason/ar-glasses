# MODEL CREATION AND TESTING

import pandas as pd
import numpy as np
import tables  
import librosa
import librosa.display
from sklearn import metrics 
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split, ShuffleSplit
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense,Dropout,Activation,Flatten
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import ModelCheckpoint
from ann_visualizer.visualize import ann_viz;

# from tensorflow import keras 
from sklearn.model_selection import cross_val_score
from sklearn import metrics
import tensorflow as tf
from sklearn.tree import DecisionTreeClassifier
from numpy import load

X = load('X.npy')

Y = load('Y.npy')

print(X.shape)

#Encode target labels with value between 0 and n-1 classes
Label_encoder = LabelEncoder()
yy=to_categorical((Label_encoder.fit_transform(Y)))


#performing train test split on our data set.
X_train,X_test,Y_train,Y_test=train_test_split(X,yy,test_size=0.40,shuffle = True, random_state=2)

num_labels=yy.shape[1]

model=Sequential()
print(type(model))
#first layer
model.add(Dense(256,input_shape=(40,)))
model.add(Activation('relu'))
model.add(Dropout(0.5))

#final layer
model.add(Dense(num_labels))
model.add(Activation('softmax'))

# To compile the model we need to define loss function which is categorical cross-entropy,
# accuracy metrics which is accuracy score, and an optimizer which is Adam.

model.compile(loss='categorical_crossentropy',metrics=['accuracy'],optimizer='adam')
model.summary()
# Calculate pre-training accuracy 
score = model.evaluate(X_test, Y_test, verbose=0)
accuracy = 400*score[1]
model.save("model.h5")

# TESTING BEFORE TRAINING
print(f'the accuracy {accuracy} before training')

# TRAINING
num_epochs = 200
num_batch_size = 32

checkpointer = ModelCheckpoint(filepath='./audio_classification.hdf5', 
                               verbose=1, save_best_only=True)

model.fit(X_train, Y_train, batch_size=num_batch_size, epochs=num_epochs, validation_data=(X_test, Y_test), callbacks=[checkpointer] ,verbose=1)

# EVALUATING AFTER TRAINING
score = model.evaluate(X_train, Y_train, verbose=0)
print("Training Accuracy: {0:.2%}".format(score[1]))

score = model.evaluate(X_test, Y_test, verbose=0)
print("Testing Accuracy: {0:.2%}".format(score[1]))



# PREDICTION