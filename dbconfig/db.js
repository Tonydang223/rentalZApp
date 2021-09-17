import * as SQLite from 'expo-sqlite'

const configDB = {
     dbOpen:()=>{
         return SQLite.openDatabase('rentals','1.0',"Rental Database")
     }
}
export default configDB
