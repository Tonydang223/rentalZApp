import React from 'react'
import {View,Text,TouchableOpacity,Image, StyleSheet} from 'react-native'
const Details = () => {
    return (
       <View style={styles.wrapper}>
           <Text style={styles.textHeading}>Details</Text>
       </View> 
    )
}

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        alignItems:'center'
    },
    textHeading:{
        fontSize:25
    }
})

export default Details
