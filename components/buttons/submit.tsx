import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

interface myprops {
    onPress: ()=> void,
    text: string
}

function SubmitButton({onPress, text}:myprops){

    return(
        <Pressable style={styles.button}
            onPress={onPress}
              >
                <Text>{text}</Text>
              </Pressable>
    )
}


const styles = StyleSheet.create({
    button: {
        height: 50,
        width: 330,
        backgroundColor: '#F4CE14',
        marginTop: 35,
        marginHorizontal: 15,
        borderRadius: 12,
        paddingVertical: 4,
    
      },
})

export default SubmitButton