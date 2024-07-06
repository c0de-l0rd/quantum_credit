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
import {Picker} from '@react-native-picker/picker';
import { Dropdown } from 'react-native-element-dropdown';
import { MdOutlineFilterList } from "react-icons/md";




import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";

interface Client {
  id: string;
  dueOn: string;
  firstName: string;
  interestRate: number;
  loanPeriod: string;
  lastName: string;
  lentOn: string;
  loanAmount: number;
  phone: number;
}

const modalData = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
];
 
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
    const [dataCopy, setDataCopy] = useState<Client[]>()

    const [searchText, setSearchText] = useState('');

    const [filterValue, setFilterValue] = useState();

    const [value, setValue] = useState(null);

    const [isOpen, setIsOpen] = useState(false);


  const snapPoints = useMemo(()=> ['100%'], [])

  // get data from firebase as an array of objects

  useEffect( ()=>{
    // Get a database reference to our posts
    const dbRef = ref(db, 'clients');
    let response:any
    // Attach an asynchronous callback to read the data at our posts reference
     onValue(dbRef, (snapshot) => {
    response = snapshot.val()
    console.log(response);
    if(response){

      let dataArray = Object.values(response)?.map((obj:any) => ({
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
  
         setData(dataArray)
         setDataCopy(dataArray)
        }

        else console.log("response is undefined")

    }, (errorObject) => {
    console.log('The read failed: ' + errorObject.name);
    });
    
    console.log("my response", response)
    console.log("me",data)
  }, [])
  
  
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

  const bottomSheetRef = useRef<BottomSheet>(null);

  // callback to handle button press
  const handleOpenBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleSheetChange = (index:any) => {
    console.log(`BottomSheet index: ${index}`);
    if (index === -1) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const searchFunction = () => {

    let updatedData = dataCopy?.filter((item) => {
      let text = searchText.toLowerCase();
      let name = item.firstName ? item.firstName.toLowerCase() : '';

      return name.indexOf(text) > -1;
    });
  
    useEffect(() => {

      //update the data array with search result, but if seracrh text is empty, set data to original data.
      if (!searchText){
        setData(dataCopy)
      }
      else{
        setData(updatedData)
      }
    }, [searchText]);
  };
  

  let clearSearchBar = ()=>{
      setSearchText('')
      setData(dataCopy)
  }

    searchFunction();

  return (
    <>
    {console.log('my data',data)}
      <GestureHandlerRootView style={{ flex: 1 }}>
    <SafeAreaView style={styles.container}>

      {isOpen ? null : <Pressable style={styles.roundButton}
             onPress={handleOpenBottomSheet}>
                </Pressable> }

                <View style={styles.searchBar}>
                <TextInput
              underlineColorAndroid='transparent'
              placeholder="Search Here..."
              autoComplete='off'
              autoCorrect={false}
              maxLength={30}
              autoFocus={false}
              onChangeText={setSearchText}
              value={searchText}
              />
              <Pressable style={{marginStart: 240, position:'absolute', marginTop:6, }}
             onPress={clearSearchBar}>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>X</Text>
                </Pressable>

              </View>

            

  
      <FlatList
        data={data}
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
    
      <BottomSheet style={{padding: 11}} snapPoints={snapPoints}
    onChange={handleSheetChange}
     enablePanDownToClose={true}
     index={-1}
     ref={bottomSheetRef}
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
    </BottomSheet>
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
  roundButton: {
    height: 70,
    width:70,
    backgroundColor:'#F4CE14',
    marginHorizontal: 15,
    borderRadius:50,
    paddingVertical:4,
    position: 'absolute',
    zIndex: 1,
    bottom: 20,
    right: 20,
  },
  searchBar:{
    width:270,
    height: 35,
    borderRadius: 30,
    //backgroundColor:'#EEE',
    backgroundColor: "grey",
    marginBottom: 30,
    marginTop: 30,
    marginHorizontal:'auto',
    paddingStart: 10
    
    

},
});

export default Index;
