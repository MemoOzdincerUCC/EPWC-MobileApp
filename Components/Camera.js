import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RNCamera } from "react-native-camera";
import { analyzeProduct } from "../Supports/api";
import ImageCropPicker from "react-native-image-crop-picker";
import { GoogleCloudVision } from "react-native-google-cloud-vision";
import { create } from "react-native-tesseract-ocr";

const Camera = () => {
  const [scannedProduct, setScannedProduct] = useState(null);
  const cameraRef = useRef(null);
  const tesseract = create({
    workerPath: require("path-to-tesseract-worker.js"),
    langPath: require("path-to-tesseract-language-data"),
    onProgress: (progress) => console.log(progress),
  });

  const takePicture = async () => {
    try {
      if (cameraRef.current) {
        const options = { quality: 0.5, base64: true };
        const data = await cameraRef.current.takePictureAsync(options);
  
        // Use the react-native-image-crop-picker library to allow the user to select
        // a region of the image to analyze
        ImageCropPicker.openCropper({
          path: data.uri,
          width: 300,
          height: 400,
        }).then(image => {
          // Once the user has selected a region of the image, get the base64-encoded
          // image data and pass it to the analyzeProduct function
          const imageData = `data:${image.mime};base64,${image.data}`;
          analyzeProduct(imageData);
        });
      }
    } catch (error) {
      // Handle any errors that occur while capturing or analyzing the image
      console.error(error);
    }
  };  
   // extract information from the product image

      // Use Google Cloud Vision to identify text and labels in the image
      GoogleCloudVision.setCredentials(require('./Auth/service-account.json'));
      GoogleCloudVision.labelDetection(data.base64).then(
        (response) => {
          setScannedProduct(response);
        },
        (error) => {
          console.log(error);
        }
      );

      // Use the tesseract library to identify text in the image
      tesseract
        .recognize(data.base64)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

        setScannedProduct(product);
        }
        };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: "Permission to use camera",
          message: "We need your permission to use your camera",
          buttonPositive: "Ok",
          buttonNegative: "Cancel",
        }}
        androidRecordAudioPermissionOptions={{
          title: "Permission to use audio recording",
          message: "We need your permission to use your audio",
          buttonPositive: "Ok",
          buttonNegative: "Cancel",
        }}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
          <Text style={styles.buttonText}>DONE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  captureButton: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20,
  },
  buttonText: {
    fontSize: 14,
  },
});
