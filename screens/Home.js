import React from 'react';
import { StyleSheet, Text, View,Dimensions } from 'react-native';
import TextForm from './../components/Forms/TextForm';

export default function Home() {
  const heightFull = Dimensions.get('screen').height
  console.log(heightFull)

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>RentalZ</Text>
      <TextForm/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    height:'100%'
  },
  headingText:{
      marginTop:8,
      fontSize:25,
      fontFamily:'NotoSansJP-Bold',
      width:100
  }
});
