import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import configDB from '../dbconfig/db';

export default function ListData() {
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Data</Text>
      <Image style={styles.stretch} source={{uri:'https://img.lovepik.com/photo/50090/8657.jpg_wh860.jpg'}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  headingText:{
      marginTop:20,
      fontSize:18,
      fontWeight:'900'
  },
  stretch: {
    width: 50,
    height: 200,
    resizeMode: 'stretch',
  },
});
