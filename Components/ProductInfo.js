import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";

const ProductInfo = (props) => {
  const { product, onPress } = props;

  const productList = [
    { label: "Product Name", value: product.name },
    { label: "Plastic Content", value: `${product.plasticContent}%` },
    { label: "Recyclability", value: product.recyclability ? "Yes" : "No" },
  ];

  return (
    <View>
      {productList.map((item, i) => (
        <ListItem
          key={i}
          title={item.label}
          rightTitle={item.value}
          onPress={onPress}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {