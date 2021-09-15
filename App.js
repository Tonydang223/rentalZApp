import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Home from './screens/Home';
import ListData from './screens/ListData';
import Search from './screens/Search';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading';
// npm i react-native-vector-icons --save
export default function App() {
  const[fontsLoading,setFontsLoading] = useState(false) 
  const TabBottom = createBottomTabNavigator();
  const fullwidth = Dimensions.get('window').width
  /* 
  screenOptions={({route})=>({
    headerTitleAlign:'center',
  })}
  
  */
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
        <TabBottom.Screen name="ListData" component={ListData}/>
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
