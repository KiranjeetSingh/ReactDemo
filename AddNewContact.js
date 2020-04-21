//This is an example code for NavigationDrawer//
import React, { Component } from 'react';
//import react in our code.
import { View, Text, TouchableOpacity,TouchableHighlight, TextInput, StyleSheet,Button,Alert,AsyncStorage, Image,ActivityIndicator} from 'react-native'
import ImagePicker from 'react-native-image-picker';
// import all basic components

export default class AddNewContact extends React.Component {
  //Screen2 Component
  static navigationOptions = ({navigation, screenProps}) => {  
    const { params = {} } = navigation.state;
    if (!navigation.state.params) {
      navigation.state.params = {}
    }
    return {
      title: 'Add New Contact', 
      headerRight: ( 
        <View style={styles.twoButtonView}>
        
            <TouchableOpacity onPress={() => params.handleSave()}>
              <Text>Mark Favourite</Text>
            </TouchableOpacity>
         
        </View>
      ),
    }
  };
  constructor () {
    super()
  
    this.state = {
      name: '',
      mobile: '',
      landline: '',
      isFav:false,
      resourcePath: {},
      loadingImage : false
      
    }
  }
  selectFile = () => {
    var options = {
      title: 'Select Image',
    
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, res => {
      console.log('Response = ', res);

      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        let source = res;
        this.setState({
          resourcePath: source,
          loadingImage: true
        });
      }
    });
  };
  
  toggleStatus() {
    this.setState(pre => {
      pre.status = !pre.status
      this.props.navigation.setParams({
        status: pre.status
      })
      return pre
    })

    console.log('toggleStatus: ' + this.state.status);
  }
 
//   state = { 
//     name: '',
//     mobile: '',
//     landline: '',
//     isFav:false
//  }
 fetchData = async ()=>{  
  try{  
    let contact = await AsyncStorage.getItem('user');  
    let parsed = JSON.parse(contact);  
    alert(parsed.name);  
  }  
  catch(error){  
    alert(error)  
  }  
} 
 componentDidMount() {
  this.props.navigation.setParams({ handleSave: this.showAlert.bind(this) });

 // this.fetchData();
  }
   showAlert() {
     if(this.state.isFav){
this.setState({ isFav: false }, function () {
  Alert.alert("unMarked as Favourite ")    
});
     }
     else{
      this.setState({ isFav: true }, function () {
        Alert.alert("Marked as Favourite ")
      }); 
     }
    }
 handleName = (text) => {
    this.setState({ name: text })
 }
 handleMobile = (text) => {
    this.setState({ mobile: text })
 }
 handleLandline = (text) => {
  this.setState({ landline: text })
}
//var ki = {}
//ki["name"]=data.name

onSave() {
  //const { name, mobile } = this.state;

  //Alert.alert('Credentials', `${name} + ${mobile}`);
  // let obj = {  
  //   'name': this.state.name,  
  //   'mobile':this.state.mobile,    
  // }  
  // /*AsyncStorage.setItem('user',user);*/  
  // AsyncStorage.setItem('user',JSON.stringify(obj));
  
  const { navigation } = this.props;
  navigation.goBack();
  navigation.state.params.onSelect({ 'name': this.state.name,'mobile':this.state.mobile,'isFav':this.state.isFav,'resourcePath':this.state.resourcePath,'loadingImage':this.state.loadingImage });
}
// render() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Test</Text>

//         <TouchableHighlight onPress={()=>this.toggleStatus()}>
//           <Text> Click Me Toggle </Text>
//         </TouchableHighlight>
//     </View>
//   );
// }
  render() {
    return (
      <View style={styles.root}>
         <View style={ styles.imageContainer} >
         <TouchableOpacity  onPress={this.selectFile}>
               <Image
               source = { this.state.loadingImage 
          ? 
          {uri: 'data:image/jpeg;base64,' + this.state.resourcePath.data, } 
          : 
           require('./image/default_img.png')}
            
            style={{ width: 100, height: 100,borderRadius: 100/2 }}
           
          />
          </TouchableOpacity>
          </View>
  <View style={styles.rowContainer}>
    <Text style={styles.text}>Name</Text>
    <TextInput
      autoCorrect={false}
      onChangeText={this.handleName}
      value={this.state.name}
      style={styles.textInput}
    />
  </View>
  <View style={styles.rowContainer}>
    <Text style={styles.text}>Mobile</Text>
    <TextInput
      autoCorrect={false}
      onChangeText={this.handleMobile}
      value={this.state.mobile}
      style={styles.textInput}
    />
  </View>
  <View style={styles.rowContainer}>
    <Text style={styles.text}>Landline</Text>
    <TextInput
      autoCorrect={false}
      onChangeText={this.handleLandline}
      value={this.state.landline}
      style={styles.textInput}
    />
  </View>
  <View style={ styles.rowContainer} >
                  <Button style={styles.bottomView}
                  title="Save"
                  onPress={this.onSave.bind(this)}
                  />
               </View>
</View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
  },
  rowContainer: {
    height: 40,
    flexDirection: "row",
    marginTop:30,
    padding:20,
    justifyContent:'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: 110,
    flexDirection: "row",
    marginTop:30,
    padding:20,
    justifyContent:'center',
    alignItems: 'center',
  },
  text:{

    width:60
  },
  bottomView:{
    
         width: '100%', 
         height: 50, 
         backgroundColor: '#FF9800', 
         justifyContent: 'center', 
         alignItems: 'center',
         position: 'absolute',
         bottom: 0
       },
    
  Button: {
    position: 'absolute',
    bottom:0,
    left:0,
},
  
  textInput: {
    flex: 1,
    backgroundColor: 'white', 
    borderColor: 'black',
    marginLeft:10,
    height: 40,
     borderColor: 'gray',
      borderWidth: 1
  }
})