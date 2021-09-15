import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ListData() {
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Data</Text>
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
  }
});
