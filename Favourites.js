//This is an example code for NavigationDrawer//
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View,Image, Text,AsyncStorage,FlatList,Button,TouchableWithoutFeedback } from 'react-native';
// import all basic components
import {NavigationEvents} from 'react-navigation';

export default class Favourites extends Component {

  constructor(props) {
    
    super(props);
    this.state = {
      contactsArray: [],

    }

}

componentDidMount() {
  // try {
  //   const myArray = await AsyncStorage.getItem('@MySuperStore:key');
  //   if (myArray !== null) {
  //     // We have data!!
    
  //   }
  // } catch (error) {
  //   // Error retrieving data
  // }
  //var myArray = ['one','two','three'];
  //AsyncStorage.setItem('user',JSON.stringify(myArray));

  this.displayData();
}
componentWillMount(){ 
  this.displayData();
} 

displayData = async ()=>{  
  try{  
    const myArray = await AsyncStorage.getItem('user');  
    if (myArray !== null) { 
    var parsed = JSON.parse(myArray);  
   // alert(JSON.stringify(parsed));   
    }
    else{
      alert("No Contacts Found."); 
    }
    this.setState({contactsArray: parsed});
  }  
  catch(error){  
    alert(error)  
  }  
} 
onSave() {
  this.displayData();
}
  //Screen2 Component
  render() {
    return (
       <View style={styles.MainContainer}>
          <NavigationEvents onDidFocus={() => this.displayData} />
                  <Button style={styles.bottomView}
                  title="Refresh"
                  onPress={this.onSave.bind(this)}
                  />
              
          <FlatList
                   data={this.state.contactsArray}
          
                   width='100%'
          
                   extraData={this.state.contactsArray}
          
                   keyExtractor={(index) => index.toString()}
          
                   renderItem={({ item,index }) => 
                   
                   <View style = {styles.mainConatinerStyle}>
                   <Image
                   source = { item.loadingImage 
              ? 
              {uri: 'data:image/jpeg;base64,' + item.resourcePath.data, } 
              : 
               require('./image/default_img.png')}
                
                style={{ width: 40, height: 40,borderRadius: 40/2 }}
               
              />
                   <View style={styles.flatview}>
                     <Text style={styles.contactName} >Name: {item.name} </Text>
                   <Text style={styles.phones} >Mob:{item.mobile} </Text>
                   
                   </View>
                   </View>
                   
                   }
                   ItemSeparatorComponent={this.renderSeparator}  
                   keyExtractor={(item,index)=>item.index}
                 />
      </View>
    );
  }
}

const styles = StyleSheet.create({ 
  MainContainer:
  {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F5FCFF',
      paddingTop:  20 
  },
  contactName: {
      fontSize:16,
      color: 'blue' 
  },
  phones: {
      fontSize: 16,
      color: 'red'
    },
    flatview: {
      justifyContent: 'center',
      padding: 10,
      borderRadius: 2,
    },
    mainConatinerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
  },
    rowContainer: {
      height: 40,
      flexDirection: "row",
      marginTop:30,
      padding:20,
      justifyContent:'center',
      alignItems: 'center',
    },
    bottomView:{
      
           width: '100%', 
           height: 50, 
           backgroundColor: '#FF9800', 
           justifyContent: 'center', 
           alignItems: 'center',
           position: 'absolute',
           bottom: 0
         }
})