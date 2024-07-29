import React from 'react'
import {Text, SafeAreaView} from 'react-native'
import { useRoute, RouteProp} from '@react-navigation/native';
import {RootStackParamList, } from '@/assets/types/navigations'
import SubmitButton from '@/components/buttons/submit';
import { ref, remove, set } from 'firebase/database'
import { db } from '@/firebase-config'
import { randomUUID } from 'expo-crypto'
import useUpdateDB from '@/hooks/useUpdateDB';

type LoanDetailsRouteProp = RouteProp<RootStackParamList, 'loan_details'>;

function Loan_details ({navigation}:any) {
    const route = useRoute<LoanDetailsRouteProp>();

   const {cardDetails} = route.params


      /**
 * inserts an item into Firebase Realtime Database then deletes the same item in the running loans DB
 * @param void
 */

      const setPath = 'defaulted_loans/' + cardDetails.id
      const removePath = 'clients/' + cardDetails.id

    const handleOnpress = ()=> {
        useUpdateDB({setPath,removePath, cardDetails})
    }
   
        
    return(
        <SafeAreaView style={{ position: 'absolute', margin: 50}}>
        <Text style={{color: 'white',}}>this is a detailed screen</Text>
        <Text style={{color: 'red',}}>{cardDetails.phone}</Text>

        <SubmitButton onPress={handleOnpress} text='update'/>
        </SafeAreaView>
    )
}


export default Loan_details