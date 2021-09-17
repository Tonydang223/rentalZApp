import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Home from './screens/Home';
import ListData from './screens/ListData';
import Search from './screens/Search';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading';
import * as SQLite from 'expo-sqlite'
import configDB from './dbconfig/db';
import TextForm from './components/Forms/TextForm';
import Details from './screens/ShowDetails/Details';

export default function App() {
  const [rentalData,setRentalData] = useState([])
  const[fontsLoading,setFontsLoading] = useState(false) 
  const TabBottom = createBottomTabNavigator();
  const Stack = createStackNavigator()
  const fullwidth = Dimensions.get('window').width
  /* 
  screenOptions={({route})=>({
    headerTitleAlign:'center',
  })}*/
 // route detail and update form
 const ListDataRoute = ()=>{
   return(
    <Stack.Navigator
    screenOptions={({route})=>({
      headerShown:false
    })}
    >
    <Stack.Screen name="ListData" component={ListData}/>
    <Stack.Screen name="Details" component={Details}/>
    <Stack.Screen name="TextForm" component={TextForm}/>
  </Stack.Navigator>
   )
 }
 // connect database sqlite
 const createTable = async ()=>{
   await configDB.dbOpen().transaction((tx)=>{
     tx.executeSql(
       `CREATE TABLE if NOT EXISTS rentalZs 
       (rental_id INTEGER PRIMARY KEY AUTOINCREMENT, propertyType TEXT(150) NOT NULL, bedRoom VARCHAR(100) NOT NULL, createdAt TIMESTAMP NOT NULL, monthlyPrice NUMERIC NOT NULL, furnitureType VARCHAR(100) NOT NULL, note TEXT(200), reporter TEXT(100) NOT NULL, updatedAt TIMESTAMP NOT NULL, image BLOB NOT NULL)`
     )
     console.log('connect successfully')
   })
 }
 const fetchData = async()=>{
   await configDB.dbOpen().transaction((tx)=>{
     tx.executeSql("SELECT * FROM rentalZs",[],
     (tx,result)=>{
       console.log("oke")
       console.log(JSON.stringify(result))
     }
     )
   })
 }
 useEffect(() => {
    createTable()
    fetchData()
 }, [])
  //font-family Loading
 const getFonts = async () => {
   await Font.loadAsync({
     'NotoSansJP-Regular': require('./assets/fonts/NotoSansJP-Regular.otf'),
     'NotoSansJP-Medium': require('./assets/fonts/NotoSansJP-Medium.otf'),
     'NotoSansJP-Bold': require('./assets/fonts/NotoSansJP-Bold.otf')
   })
   setFontsLoading(true)
 }


 if(fontsLoading){  
  return (
    <NavigationContainer >
      <TabBottom.Navigator
      initialRouteName="Home"
      screenOptions={({route})=>({
        // headerTitleAlign:'center',
        // headerStyle:{backgroundColor:'#000000'},
        // headerTintColor:'#fff',
        headerShown:false,
        tabBarIcon:({focused,color,size})=>{
          let iconName;
  
          if(route.name === "Home"){
            iconName = focused?'home':'home-outline'
          }else if(route.name === "ListData"){
            iconName = focused?'list':'list-outline'
          }else if(route.name === "Search"){
            iconName = focused?"search":"search-outline"
          }
  
          return (<Icon name={iconName} size={size} color={color}/>)
        },
        tabBarInactiveTintColor:'#383838',
        tabBarShowLabel:true,
        tabBarStyle:{width:fullwidth , paddingBottom:3,paddingTop:4, height:57},
        tabBarLabelStyle:{marginBottom:6}
      })}
      
      >
        <TabBottom.Screen 
         name="Home" component={Home}/>
        <TabBottom.Screen name="ListData" children={ListDataRoute}/>
        <TabBottom.Screen name="Search" component={Search}/>
      </TabBottom.Navigator>
    </NavigationContainer>
  ); 
 }else{
  return <AppLoading
    startAsync={getFonts}
    onError={(error)=>console.log(error)}
    onFinish={()=>setFontsLoading(true)}
  />
 }

 
  
}
