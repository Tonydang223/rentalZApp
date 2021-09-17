import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, ScrollView,Dimensions, TouchableOpacity, Pressable, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Ionicons';
import TimePicker from '../TimePicker/TimePicker';
import { format,parseISO,parse,parseJSON,formatISO,formatISO9075 } from 'date-fns'
import { ROOM_OPTIONS } from '../../constants/options';
import { FUR_OPTIONS } from '../../constants/furOption';
import configDB from '../../dbconfig/db';
const TextForm = (props) => {
    const {navigation} = props
    const initialValues = {
        propertyType:'',
        bedRooms:null, 
        dateTime: new Date(Date.now()),
        monthlyPrice:'', 
        furnitureType:null,   
        note:'',     
        reporter:'',
        updatedAt: new Date(Date.now()).toISOString(),
        img:'https://img.lovepik.com/photo/50090/8657.jpg_wh860.jpg'
    }
    const [values,setValues] = useState(initialValues)
    // console.log({num:parseFloat(number)})
    // console.log(values.updatedAt)
    console.log(values)
    
    // const date = values.dateTime.toISOString();
    // const dateParse = parseISO(date);
    // const formatDate = formatISO9075(dateParse)
    const onChange =(text)=>(value)=>{ 
        setValues({...values,[text]:value})
    }
    const placeholder=(name)=> {
        const objPlaceHolder = {
            label:`Select any ${name}`,
            value:null
        }
        return objPlaceHolder
    }
    
    const insertData= async(value)=>{
        const {propertyType,bedRooms,furnitureType,note,reporter,updatedAt,img,monthlyPrice,dateTime} = value
        const floatPrice = parseFloat(monthlyPrice)
        const stringTime = dateTime.toISOString()
        try {
            await configDB.dbOpen().transaction((tx)=>{
                tx.executeSql(
                    `INSERT INTO rentalZs 
                    (propertyType,bedRoom,createdAt,monthlyPrice,furnitureType,note,reporter,updatedAt,image)
                    VALUES (?,?,?,?,?,?,?,?,?)
                    `,
                    [propertyType,bedRooms,stringTime,floatPrice,furnitureType,note,reporter,updatedAt,img],
                    (tx,result)=>{
                        console.log(result)
                        navigation.navigate("ListData")
                    }
                )
                console.log("Insert Successful!!!")
            })
        } catch (error) {
            console.log(error)
        }
    }
    const onSubmit = async (value) => {
        if(!value) return
        if(value.propertyType ==="" || value.note ==="" ||value.reporter ==="" ||value.monthlyPrice === "" ){
            Alert.alert(
                "Error Message !!!",
                "Please don't leave any empty field",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => console.log("OK Pressed")}
                ]
            );

        }else if(value.bedRooms === null || value.furnitureType === null ){
            Alert.alert(
                "Error Message !!!",
                "Please select a room or furniture type or Monthly Price must not empty",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => console.log("OK Pressed")}
                ]
              );
        }
        else if(values.dateTime.getDate() === new Date(Date.now()).getDate()){
            Alert.alert(
                "Error Message !!!",
                `Your time is present time 
                if you want to change you click cancel to change time.
                Otherwise you want set present to create then click ok
                `
                ,
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => insertData(value)}
                ]
              );
        }
        else{
            console.log(value)
            insertData(value)
            setValues(initialValues)
        }
    }
    

    return (
        <View style={styles.containerForm}>
            <ScrollView contentContainerStyle={styles.viewScroll}>
            <View style={styles.formInside}>
            <Text style={styles.label}>Property Type</Text>
            <TextInput style={[styles.input]} 
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
            placeholder={placeholder('bedroom')}
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
            <TimePicker dateTime={values.dateTime} 
            setValues={setValues} 
            values={values}
            />
            <Text style={styles.label}>Monthly Price</Text>
            <TextInput style={[styles.input]} 
                name="propertyType"
                value={values.monthlyPrice}
                keyboardType="numeric"
                placeholder="Typing monthly price here..."
                onChangeText={onChange('monthlyPrice')}

            />
            <Text style={styles.label}>Furniture Types</Text>
            <RNPickerSelect
            style={pickerStyles}
            useNativeAndroidPickerStyle={false}
            onValueChange={(value) => setValues({...values,furnitureType:value})}
            items={FUR_OPTIONS}
            placeholder={placeholder('furniture type')}
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
            <TextInput style={[styles.inputTextArea]}
                name="note"
                value={values.note}
                multiline
                placeholder="You can write down the note here..."
                onChangeText={onChange('note')}

            />
            <Text style={styles.label}>Reporter</Text>
            <TextInput style={[styles.input]} 
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
                       opacity:values.propertyType
                ||values.bedRooms
                ||values.note
                ||values.note
                ||values.bedRooms
                ||values.monthlyPrice
                ||values.furnitureType
                ?1:0.5
                    },
                    styles.pressBtn
                ]}
                onPress={()=>onSubmit(values)}
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
      alignItems:'center',
      marginTop:-17,
      height:540,
      width:'100%'
    },
    viewScroll:{
        flexGrow:1,
        width:'100%'
    },
    formInside:{
        display:'flex',
        flexDirection:'column',
        marginLeft:56,
        marginRight:56,
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
        marginTop:95,
        marginLeft:5
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
