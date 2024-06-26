import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, Button, ToastAndroid, View, TextInput, FlatList } from 'react-native';

export default function App() {
  const inputAccessoryViewID = 'uniqueID';
  const initialText = 1;
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);
  function showToast(msg) {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  }

  function addItem() {
    if(text){
      showToast('Item add successfully!')
    setItems([...items,text])
    setText('')
    }
    else{
      showToast('Item is empty')
    }
  }
  return (
    <>

      <View style={styles.container}>
        <Text  style={{
            padding: 16,
            marginTop: 50,
            width: "auto",
            marginBottom: 10,
            fontSize: 32,
            display:"flex",
            alignItems:"center",
            justifyContent:"center"
          }}>Todo App</Text>
        <TextInput
          style={{
            padding: 16,
            marginTop: 50,
            borderStyle: 'solid',
            borderColor: "black",
            borderWidth: 1,
            width: 300,
            marginBottom: 10
          }}
          onChangeText={setText}
          value={text}
          placeholder={'Add Items...'}
        />
        <Button
          onPress={addItem} title="Add item" />

        <StatusBar style="auto" />
       
      </View>
      <View style={styles.itemContainer} >
        {items?.map((item,index) => {
          return <>
            <Text style={styles.title} key={index}>
              {item}
            </Text>
          </>
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',

  },

  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: ''
  },
  itemContainer: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
});
