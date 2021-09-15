import React, { useState } from 'react'
import { StyleSheet, View, Text, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { formatISO9075 } from 'date-fns'
import DateTimePicker from '@react-native-community/datetimepicker'
const TimePicker = (props) => {
    const {dateTime,values,setValues} = props
    const [mode,setMode] = useState('date')
    const [visible, setVisible] = useState(false)
    const onChange = (e,selectedDate)=>{
        const currentDate = selectedDate || dateTime
        console.log({dateSelected:selectedDate})
        if(Platform.OS === "android"){
            setVisible(false)
        }
        setValues({...values,dateTime:currentDate})

    }
    const showMode = (currrentMode)=>{
        setVisible(true)
        setMode(currrentMode)
    }
    const showDatePicker = ()=>{
        showMode('date')
    }
    const showTimePicker = ()=>{
        showMode('time')
    }
    return (
       <View style={styles.wrapper}>
          <Text style={styles.dateTime}>{dateTime && formatISO9075(dateTime)}</Text>
          <View style={styles.iconContainer}>
             <Icon name="calendar-outline" size={23} color='black' onPress={showDatePicker}/>
             <Icon style={{marginLeft:10, marginRight:-6}} name="time-outline" size={23} 
             color='black'
             onPress={showTimePicker}
             />
          </View>
          {visible && (
              <DateTimePicker
                testID="dateTimePicker"
                value={dateTime}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
          )}
          
       </View>
    )
}
const styles = StyleSheet.create({
    wrapper: {
      display:'flex',
      flexDirection:'row',
      height:48,
      width:260,
      borderRadius:2,
      padding:10,
      borderColor:'#000000',
      borderStyle:'solid',
      borderWidth:1,
      marginTop:8,
      borderRadius: 4,
      marginBottom:-4,
      paddingTop:12
    },
    label:{
      marginTop:5,
    },
    iconContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly',
        width: '22%',
    },
    dateTime:{
        width:'78%',
        paddingTop:2
    }
  });
export default TimePicker
