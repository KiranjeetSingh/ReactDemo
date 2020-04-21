import React from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    Platform, 
    PermissionsAndroid,
    TouchableOpacity,
    Image,
    Alert,
    TouchableWithoutFeedback,
    AsyncStorage,
} from 'react-native'; 


 
import { FloatingAction } from "react-native-floating-action";

const styles = StyleSheet.create({ 
    itemContainer: {
        margin: 10
    },
    
      TouchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
      },
    
      FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50, 
        //backgroundColor:'black'
      },
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
    mainConatinerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    phones: {
        fontSize: 16,
        color: 'red'
      },
      contact_details: {
        textAlign: 'center',
        color: 'red',
        margin: 10,
      },
      flatview: {
        justifyContent: 'center',
        padding: 10,
        borderRadius: 2,
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

export default class ContactList extends React.Component {

  constructor(props) { 
    
    super(props);
 
    this.array = [],
 
      this.state = {
        contactsArray: [],

      }
 
  }
  
    onSelect = data => {
      // try {
      //   await AsyncStorage.setItem('@MySuperStore:key', JSON.stringify(myArray));
      // } catch (error) {
      //   // Error saving data
      // }
      this.setState({
        contactsArray: [ 
          ...this.state.contactsArray,
          data 
        ]
      }, function () {
        var myloop = [];
        for (let i = 0; i < this.state.contactsArray.length; i++) {
         if(this.state.contactsArray[i].isFav){
           myloop.push(this.state.contactsArray[i]);
         }
          }
          
          
        //const favArray = this.state.contactsArray.filter(person => person.isFav)
        AsyncStorage.setItem('user',JSON.stringify(myloop));
      })

      
      
    // const favArray = _.filter(this.state.contactsArray, { isFav: true })
        // try {
      //   await AsyncStorage.setItem('user', JSON.stringify(favArray));
      // } catch (error) {
      //   // Error saving data
      // }
       
    }; 

    onUpdate = data => {
      const newArray = Array.from(this.state.contactsArray);
      newArray [data.index] = data;
   this.setState({contactsArray: newArray}, function () {
        var myloop = [];
        for (let i = 0; i < this.state.contactsArray.length; i++) {
         if(this.state.contactsArray[i].isFav){
           myloop.push(this.state.contactsArray[i]);
         }
          }
          
          
        //const favArray = this.state.contactsArray.filter(person => person.isFav)
        AsyncStorage.setItem('user',JSON.stringify(myloop));
      });
    };

    clickHandler = () => {
        //function to handle click on floating Action Button
       // Alert.alert('Floating Button Clicked');
       this.props.navigation.navigate("AddNewContact", { onSelect: this.onSelect });
      // this.props.navigation.navigate("AddNewContact") 
      };
    
      componentDidMount(){
        this.setState({ contacts: [...this.array] })

        // if(Platform.OS === 'ios'){
        //   Contacts.getAll((err, contacts) => {
        //     if (err) {
        //       throw err;
        //     }
        //     // contacts returned
        //     this.setState({contacts})
        //   })
        // }else if(Platform.OS === 'android'){
        //   PermissionsAndroid.request(
        //     PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        //     {
        //       title: 'Contacts',
        //       message: 'This app would like to view your contacts.'
        //     }
        //   ).then(() => {
            
        //   })
        // }
        }

    // getList = () => {
    //     Contacts.getAll((err, contacts) => {
    //         if (err === 'denied') {
    //             console.log("cannot access");
    //         } else {
    //             this.setState({ contacts });
    //             console.log(contacts);
    //         }
    //     })
    // }
  //Screen1 Component 
  GetItem(item,index) {
    
    //Alert.alert("Clicked Item:::"+index);
    this.props.navigation.navigate("UpdateContact", { onUpdate: this.onUpdate,
    data:item,
    index:index
    }); 
    
    
     }

     renderSeparator = () => {  
      return (  
          <View  
              style={{  
                  height: 1,  
                  width: "100%",  
                  backgroundColor: "#000",  
              }}  
          />  
      );  
  };  
render() {
    return (
        <View style={styles.MainContainer}>
          <FlatList
                   data={this.state.contactsArray}
          
                   width='100%'
          
                   extraData={this.state.contactsArray}
          
                   keyExtractor={(index) => index.toString()}
          
                   renderItem={({ item,index }) => 
                
                   <TouchableWithoutFeedback onPress={ () => this.GetItem(item,index)}>
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
                   <Text style={styles.phones} >Mob: {item.mobile} </Text>
                   
                   </View>
                   </View>
                   </TouchableWithoutFeedback>
                   }
                   ItemSeparatorComponent={this.renderSeparator}  
                   keyExtractor={(item,index)=>item.index}
                 />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={this.clickHandler}
          style={styles.TouchableOpacityStyle}>
          <Image
            //We are making FAB using TouchableOpacity with an image
            //We are using online image here
             source={{
uri:'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
            }}
            //You can use you project image Example below
            //source={require('./images/float-add-icon.png')}
            style={styles.FloatingButtonStyle}
          />
        </TouchableOpacity>
      </View>
        
    )
}
}
