import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, ScrollView,Dimensions, TouchableOpacity, Pressable, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Ionicons';
import TimePicker from '../TimePicker/TimePicker';
import { format,parseISO,parse,parseJSON,formatISO9075 } from 'date-fns'
import { ROOM_OPTIONS } from '../../constants/options';
import { FUR_OPTIONS } from '../../constants/furOption';
const TextForm = () => {
    const initialValues = {
        propertyType:'',
        bedRooms:null, 
        dateTime: new Date(Date.now()),
        monthlyPrice:'', 
        furnitureType:null,   
        note:'',     
        reporter:'',
        updatedAt: new Date(Date.now()).toISOString(),
        img:'../../assets/images/imgbackgroundRent.jpg'
    }
    const [values,setValues] = useState(initialValues)
    
    console.log(values)
    const date = values.dateTime.toISOString();
    const dateParse = parseISO(date);
    const formatDate = formatISO9075(dateParse)
    console.log(formatDate)
    console.log({date:date})
    const onChange =(text)=>(value)=>{ 
        setValues({...values,[text]:value})
    }
    const placeholder={
        label:'Select any bedroom...',  
        value:null
    }

    return (
        <View style={styles.containerForm}>
            <ScrollView contentContainerStyle={styles.viewScroll}>
            <View style={styles.formInside}>
            <Text style={styles.label}>Property Type</Text>
            <TextInput style={styles.input} 
                name="propertyType"
                value={values.propertyType}
                placeholder="Typing any property type..."
                onChangeText={onChange('propertyType')}
            />
            <Text style={styles.label}>Rooms</Text>
            <RNPickerSelect
            style={pickerStyles}
            useNativeAndroidPickerStyle={false}
            onValueChange={(value) => setValues({...values,bedRooms:value})}
            items={ROOM_OPTIONS}
            placeholder={placeholder}
            value={values.bedRooms}
            textInputProps={{ underlineColor: 'black' }}
            Icon={() => {
              return <Icon
              style={{
                  marginTop:16,
                  marginRight:5
              }}
               name="chevron-down-outline" size={24} color="black" />;
            }}
            />
            <Text style={styles.label}>Date and Time</Text>
            <TimePicker dateTime={values.dateTime} setValues={setValues} values={values}/>
            <Text style={styles.label}>Monthly Price</Text>
            <TextInput style={styles.input} 
                name="propertyType"
                value={values.monthlyPrice}
                placeholder="Typing monthly price here..."
                onChangeText={onChange('monthlyPrice')}

            />
            <Text style={styles.label}>Furniture Types</Text>
            <RNPickerSelect
            style={pickerStyles}
            useNativeAndroidPickerStyle={false}
            onValueChange={(value) => setValues({...values,furnitureType:value})}
            items={FUR_OPTIONS}
            placeholder={placeholder}
            value={values.furnitureType}
            textInputProps={{ underlineColor: 'black' }}
            Icon={() => {
              return <Icon
              style={{
                  marginTop:16,
                  marginRight:5
              }}
               name="chevron-down-outline" size={24} color="black" />;
            }}
            />
            <Text style={styles.label}>Notes</Text>
            <TextInput style={styles.inputTextArea}
                name="note"
                value={values.note}
                multiline
                placeholder="You can write down the note here..."
                onChangeText={onChange('note')}

            />
            <Text style={styles.label}>Reporter</Text>
            <TextInput style={styles.input} 
                name="reporter"
                value={values.reporter}
                placeholder="Typing your name here..."
                onChangeText={onChange('reporter')}
            />
            </View>
            </ScrollView>
            <View style={styles.btn}>
                <Pressable
                style={({pressed})=>[
                    {
                       backgroundColor: pressed?
                       "rgb(0,0,0,0.2)":
                       "#06a9c9",
                    },
                    styles.pressBtn
                ]}
                >
                    <Text style={styles.text}>CREATE</Text>
                </Pressable>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    containerForm: {
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      marginTop:-17,
      height:540
    },
    viewScroll:{
        flexGrow:1
    },
    formInside:{
        display:'flex',
        flexDirection:'column',
        padding:15
    },
    label:{
      marginTop:9,
    },
    btn:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    pressBtn:{
        width:200,
        height:45,
        borderRadius:4,
        borderColor:'#000000',
        borderStyle:'solid',
        marginTop:95
    },
    text:{
        textAlign:'center',
        fontSize:17,
        color:'#fff',
        paddingTop:10
    },
    input:{
       height:48,
       width:260,
       padding:10,
       borderColor:'#000000',
       borderStyle:'solid',
       borderWidth:1,
       marginTop:8,
       borderRadius: 4,
       marginBottom:-4
    },
    inputTextArea:{
        height:80,
        width:260,
        borderColor:'#000000',
        borderStyle:'solid',
        borderWidth:1,
        padding:10,
        marginTop:8,
        borderRadius: 4,
        marginBottom:-4
    }
  });
  const pickerStyles = StyleSheet.create({
    inputAndroid: {
        fontSize: 14,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: 'black',
        marginTop:6,
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
        height:48 // to ensure the text is never behind the icon
      },
  });
export default TextForm
