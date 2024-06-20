import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

function RoundButton() {
  return (
    <Pressable style={styles.button}
            //  onPress={}
            >
                    <Text style={{fontSize:25, color: 'white', alignSelf: 'center' }}>Add Client</Text>
                </Pressable>
  )
}

const styles = StyleSheet.create({
    button:{
        height: 50,
        width:50,
        backgroundColor:'#F4CE14',
        marginTop:35,   
      },
})

export default RoundButton
