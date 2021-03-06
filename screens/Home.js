import React from 'react';
import { StyleSheet, Text, View,Dimensions } from 'react-native';
import TextForm from './../components/Forms/TextForm';

export default function Home({navigation}) {
  const {height,width} = Dimensions.get('screen')

  return (
    <View style={[styles.container,{width:width}]}>
      <Text style={styles.headingText}>RentalZ</Text>
      <TextForm navigation={navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    height:'100%',
  },
  headingText:{
      marginTop:8,
      fontSize:25,
      fontFamily:'NotoSansJP-Bold',
      width:100
  }
});
