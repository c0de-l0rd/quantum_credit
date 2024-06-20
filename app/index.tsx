import React from "react";
import Card from "@/components/Card";
import { useEffect, useCallback, useMemo, useRef, useState } from "react";
import {db} from '@/firebase-config'
import {ref, set} from 'firebase/database'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {TextInput, Pressable} from 'react-native'
import LabeledTextInput from "@/components/LabeledTextInput";
import GetData from "@/api/getData";
import { onValue } from 'firebase/database';
import { randomUUID } from 'expo-crypto'
import RoundButton from "@/components/roundButton";


import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";





// MUST DELETE
// const lp = [
//   {
//     id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
//     name: "First Item",
//     phone: 968763903,
//     loanAmount: 30,
//     loanPeriod: "1 month",
//     interestRate: "30%",
//     payback: 30,
//     lentOn: "16th, June 2024",
//     dueOn: "16th, July 2024",
//   },
//   {
//     id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
//     name: "Second Item",
//     phone: 968763903,
//     loanAmount: 30,
//     loanPeriod: "1 month",
//     interestRate: "30%",
//     payback: 30,
//     lentOn: "16th, June 2024",
//     dueOn: "16th, July 2024",
//   },
//   {
//     id: "58694a0f-3da1-471f-bd96-145571e29d72",
//     name: "Third Item",
//     phone: 968763903,
//     loanAmount: 3000,
//     loanPeriod: "1 month",
//     interestRate: "30%",
//     payback: 3000,
//     lentOn: "16th, June 2024",
//     dueOn: "16th, July 2024",
//   },
// ];

interface Client {
  id: string;
  dueOn: string;
  firstName: string;
  interestRate: string;
  loanPeriod: string;
  lastName: string;
  lentOn: string;
  loanAmount: number;
  phone: number;
}


  // Get a database reference to our posts
let dataArray:any
  const dbRef = ref(db, 'clients');
  let response:any
  // Attach an asynchronous callback to read the data at our posts reference
   onValue(dbRef, (snapshot) => {
  response = snapshot.val()
  console.log('response', response);
  }, (errorObject) => {
  console.log('The read failed: ' + errorObject.name);
  });
  
  console.log("my response", response)
  
  if(response){

   dataArray = Object.values(response)?.map((obj:any) => ({
    id: obj?.id,
    dueOn: obj?.dueOn,
    firstName: obj?.firstName,
    interestRate: obj?.interestRate,
    loanPeriod: obj?.laonPeriod,
    lastName: obj?.lastame,
    lentOn: obj?.lentOn,
    loanAmount: obj?.loanAmount,
     phone: obj?.phone
     }));

    }

    else console.log("response is undefined")


console.log("me",dataArray)


 
function Index() {

    const [fName, setfName] = useState<string>('');
    const [lName, setlName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [loanAmount, setLoanAmount] = useState<number | undefined>();
    const [interestRate, setInterestRate] = useState<number | undefined>();
    const [period, setPeriod] = useState<number | undefined>();
    const [lentOn, setLentOn] = useState<string | undefined>();
    const [dueOn, setDueOn] = useState<string>();
    const [data, setData] = useState<Client[]>()

  const snapPoints = useMemo(()=> ['25%', '100%'], [])

  // get data from firebase as an array of objects

  // useEffect( ()=>{
  //   // Get a database reference to our posts
  
  //   const dbRef = ref(db, 'clients');
  //   let response:any
  //   // Attach an asynchronous callback to read the data at our posts reference
  //    onValue(dbRef, (snapshot) => {
  //   response = snapshot.val()
  //   console.log(response);
  //   }, (errorObject) => {
  //   console.log('The read failed: ' + errorObject.name);
  //   });
    
  //   console.log("my response", response)
    
  //   if(response){

  //   let dataArray = Object.values(response)?.map((obj:any) => ({
  //     id: obj?.id,
  //     dueOn: obj?.dueOn,
  //     firstName: obj?.firstName,
  //     interestRate: obj?.interestRate,
  //     loanPeriod: obj?.laonPeriod,
  //     lastName: obj?.lastame,
  //     lentOn: obj?.lentOn,
  //     loanAmount: obj?.loanAmount,
  //      phone: obj?.phone
  //      }));

  //      setData(dataArray)
  //     }

  //     else console.log("response is undefined")
  
  
  // console.log("me",data)
  // }, [])
  
  
  const AddClient = () => {
  
    const uuid = randomUUID();

    set(ref(db, 'clients/' + uuid), {
      id: uuid,
      firstName: fName,
      lastame: lName,
      phone: phone,
      loanAmount: loanAmount,
      interestRate: interestRate,
      laonPeriod: period,
      lentOn: lentOn,
      dueOn: dueOn,
    })

    setfName('')
    setlName('')
    setPhone('')
    setLoanAmount(undefined)
    setInterestRate(undefined)
    setPeriod(undefined)
    setLentOn('')
    setDueOn('')
  }
  return (
    <>
    {console.log('my data',dataArray)}
      <GestureHandlerRootView style={{ flex: 1 }}>
    <SafeAreaView style={styles.container}>
      <RoundButton/>
      <FlatList
        data={dataArray}
        renderItem={({ item }) => (
          <Card
            name={item.firstName}
            phone={item.phone}
            loanAmount={item.loanAmount}
            loanPeriod={item.loanPeriod}
            interestRate={item.interestRate}
            lentOn={item.lentOn}
            dueOn={item.dueOn}
          />
        )}
        keyExtractor={(item) => item.id}
        />
    
     {/* <BottomSheet style={{padding: 11}} snapPoints={snapPoints}
     enablePanDownToClose={true}
     >
      <BottomSheetView >

<View style={styles.row}>
            <LabeledTextInput
              label="First Name"
              value={fName}
              onChangeText={(text:any)=> setfName(text)}
              placeholder="Enter first name"
            />
            <LabeledTextInput
              label="Last Name"
              value={lName}
              onChangeText={(text:any)=> setlName(text)}
              placeholder="Enter last name"
            />
          </View>

            <Text style={styles.text}>Phone</Text>
            <TextInput style={styles.input}
              value={phone}
              onChangeText={text => setPhone(text)}
              placeholder={"phone number"}
            maxLength={10}
            multiline={false}
            inputMode={"tel"}
              />

<View style={styles.row}>
            <LabeledTextInput
              label="Loan amount"
              value={loanAmount}
              onChangeText={(text:any)=> setLoanAmount(text)}
              placeholder="Enter first name"
              inputMode={"tel"}
            />
            <LabeledTextInput
              label="Interest rate (%)"
              value={interestRate}
              onChangeText={(text:any)=> setInterestRate(text)}
              placeholder="Enter last name"
              inputMode={"tel"}
            />
            <LabeledTextInput
              label="Period"
              value={period}
              onChangeText={(text:any)=> setPeriod(text)}
              placeholder="Enter last name"
              inputMode={"tel"}
            />
          </View>

          <View style={styles.row}>
            <LabeledTextInput
              label="Lent on"
              value={lentOn}
              onChangeText={(text:any)=> setLentOn(text)}
              placeholder="Enter first name"
            />
            <LabeledTextInput
              label="due on"
              value={dueOn}
              onChangeText={(text:any)=> setDueOn(text)}
              placeholder="Enter last name"
            />
          </View>
          <Pressable style={styles.button}
             onPress={AddClient}
            >
                    <Text style={{fontSize:25, color: 'white', alignSelf: 'center' }}>Add Client</Text>
                </Pressable>
       
          
      </BottomSheetView>
    </BottomSheet> */}
    </SafeAreaView>
    </GestureHandlerRootView>
  
      </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  nameInput: {
    height: 40,
    width: 150,
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  nameGroup: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'space-between',
    marginLeft: 15,
  },
  text:{
    fontSize: 12,
    color: '#000000',
    marginStart: 2,
    marginVertical: 5,
},
input: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#D9D9D9',
    marginRight: 10,
    height: 40,
    marginBottom: 20,
    paddingHorizontal: 10,
},
minput: {
  borderWidth: 2,
  borderRadius: 5,
  borderColor: '#D9D9D9',
  marginStart: 20,
  height: 40,
  marginHorizontal:15,
  marginBottom: 5,
  padding: 5,
},
button:{
    height: 50,
    width:330,
    backgroundColor:'#F4CE14',
    marginTop:35,
    marginHorizontal: 15,
    borderRadius:12,
    paddingVertical:4,    
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flexDirection: 'column',
  },
  inputContainer: {
    flex: 1,
    marginRight: 10, // Adjust spacing between the input fields
  },
});

export default Index;
