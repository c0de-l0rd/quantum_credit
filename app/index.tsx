import React from "react";
import Card from "@/components/Card";
import { useEffect, useCallback, useMemo, useRef, useState } from "react";
import { db } from '@/firebase-config'
import { ref, set } from 'firebase/database'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TextInput, Pressable, Modal, Touchable } from 'react-native'
import LabeledTextInput from "@/components/LabeledTextInput";
import GetData from "@/api/getData";
import { onValue } from 'firebase/database';
import { randomUUID } from 'expo-crypto'
import { Picker } from '@react-native-picker/picker';
import { Dropdown } from 'react-native-element-dropdown';
import { MdOutlineFilterList } from "react-icons/md";
import DatePicker from "react-native-modern-datepicker"
import { getToday, getFormatedDate } from 'react-native-modern-datepicker'
import { usePushNotifications } from "@/usePushNotifications";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import {RootStackParamList, CardDetailsType } from '@/assets/types/navigations' 

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

type IndexNavigationProp = NavigationProp<RootStackParamList, 'index'>;


function Index() {

  const { expoPushToken, notification } = usePushNotifications();
  const notificationData = JSON.stringify(notification, undefined, 2);

  const [fName, setfName] = useState<string>('');
  const [lName, setlName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [period, setPeriod] = useState<number | undefined>();
  const [lentOn, setLentOn] = useState<string>('Enter loan date');
  const [dueOn, setDueOn] = useState<string>('Enter loan due date');
  const [data, setData] = useState<Client[]>()
  const [dataCopy, setDataCopy] = useState<Client[]>()

  const [fNameError, setfNameError] = useState<string>();
  const [lNameError, setlNameError] = useState<string>();
  const [phoneError, setPhoneError] = useState<string>();
  const [loanAmountError, setLoanAmountError] = useState<string>();
  const [interestRateError, setInterestRateError] = useState<string>();
  const [lentOnError, setLentOnError] = useState<string>();
  const [dueOnError, setDueOnError] = useState<string>();

  const [searchText, setSearchText] = useState('');

  const [filterValue, setFilterValue] = useState();

  const [value, setValue] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [date, setDate] = useState('')
  const [choseDate, setChoseDate] = useState('') //used to decide which date to pick for either dueOn or lentOn

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['100%'], [])

  // get data from firebase as an array of objects

  useEffect(() => {
    // Get a database reference to our posts
    const dbRef = ref(db, 'clients');
    let response: any
    // Attach an asynchronous callback to read the data at our posts reference
    onValue(dbRef, (snapshot) => {
      response = snapshot.val()
      console.log(response);
      if (response) {

        let dataArray = Object.values(response)?.map((obj: any) => ({
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
    console.log("me", data)
  }, [])


  const AddClient = () => {

    //perform form validation
    setfNameError(firstNameFormValidation(fName))
    setlNameError(lastNameFormValidation(lName))
    setLentOnError(lentOnFormValidation(lentOn))
    setDueOnError(dueOnFormValidation(dueOn))
    setInterestRateError(interestRateFormValidation(interestRate))
    setLoanAmountError(loanAmountFormValidation(loanAmount))
    setPhoneError(phoneFormValidation(phone))

    if(fNameError || lNameError || lentOnError || dueOnError || interestRateError || loanAmountError || phoneError){
      console.log("wont send info to DB")
      return
    }

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
    setLoanAmount('')
    setInterestRate('')
    setPeriod(undefined)
    setLentOn('')
    setDueOn('')
  }

  //firstName form validation
  const firstNameFormValidation = (firstName:string): string => {
    const nameRegex = /^[a-zA-Z'-]+$/;

    if (!firstName) {
      return "Name is required.";
    }
    if (firstName.length < 2) {
      return "Name must be at least 2 characters long.";
    }
    if (firstName.length > 50) {
      return "Name cannot be longer than 50 characters.";
    }
    if (!nameRegex.test(firstName)) {
      return "Name can only contain alphabetic characters, hyphens, and apostrophes.";
    }
    return '';
    
  }

  //lastName form validation
  const lastNameFormValidation = (firstName:string): string => {
    const nameRegex = /^[a-zA-Z'-]+$/;

    if (!firstName) {
      return "Name is required.";
    }
    if (firstName.length < 2) {
      return "Name must be at least 2 characters long.";
    }
    if (firstName.length > 50) {
      return "Name cannot be longer than 50 characters.";
    }
    if (!nameRegex.test(firstName)) {
      return "Name can only contain alphabetic characters, hyphens, and apostrophes.";
    }
    return '';
    
  }

  //lentOn form validation
  const lentOnFormValidation = (lentOn:any): string => {

    if(!lentOn){
      return 'date is required'
    }

    return ''
  }

  //dueOn form validation
  const dueOnFormValidation = (dueOn:any): string => {

    if(!dueOn){
      return 'date is required'
    }

    if(new Date(dueOn) <= new Date(lentOn)){
      return 'due date can not be before or equal to lent date'
    }

    return ''
  }

   //interestRate form validation
   const interestRateFormValidation = (interestRate:string ): string => {

    if(!interestRate){
      return 'interest is required'
    }

    const input = interestRate.toString()

    if(input.length < 1 || input.length > 5){
          return 'interest rate should be between 1 and 4 digits long'
        }
    if (+interestRate/1 != 0){ //checks if digit is a decimal.
      if (/^0/.test(input)) {
      return 'The leading digit can not be zero.'
    }} else {
      const [integerPart, decimalPart] = input.split('.');

        // Integer part can be "0" or should not start with zero if it's more than one digit
  if (integerPart.length > 1 && integerPart.startsWith('0')) {
    return 'enter a valid number';
  }
      if (!/[1-9]/.test(decimalPart)) {
        return 'enter a valid decimal number';
      }
    }

    return ''
  }

  //interestRate form validation
  const loanAmountFormValidation = (loanAmount:string): string => {

    if(!loanAmount){
      return 'amount is required'
    }

    const input = loanAmount.toString()

    if(input.length < 1 || input.length > 6){
          return 'interest rate should be between 1 and 4 digits long'
        }

      if (/^0/.test(input)) {
        return 'The leading digit can not be zero.'
    }

    if(!/^\d+$/.test(input)){
      return 'enter numbers only'
  }
    return ''
  }

  function phoneFormValidation(phone:string): string {
    const zambianPhoneNumberRegex = /^(0(97|96|95|77|75|76)\d{7}|02[12]\d{7})$/;

      if(!phone){
        return 'phone is required'
      }
     if(!zambianPhoneNumberRegex.test(phone)){
      return 'please enter a valid phone number'
     }

     return ''
  }

  // callback to handle button press
  const handleOpenBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleSheetChange = (index: any) => {
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
      if (!searchText) {
        setData(dataCopy)
      }
      else {
        setData(updatedData)
      }
    }, [searchText]);
  };


  let clearSearchBar = () => {
    setSearchText('')
    setData(dataCopy)
  }

  searchFunction();
  const today = new Date()
  const minDate = getFormatedDate(new Date(today.setDate(today.getDate())), 'DD/MM/YYYY')
  const handleModalOpen = (field:string): void => {
    setModalOpen(true)
    if(field === 'lentOn'){
          setChoseDate('lentOn')
        }
       else setChoseDate('dueOn') 
  }

  const navigation = useNavigation<IndexNavigationProp>();
  const handleNavigation = (cardDetails: CardDetailsType)=> {


    navigation.navigate('loan_details', {cardDetails})

  }



  return (
    <>
      {console.log('my data', data)}
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>

          {isOpen ? null : <Pressable style={styles.roundButton}
            onPress={handleOpenBottomSheet}>
          </Pressable>}

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
            <Pressable style={{ marginStart: 240, position: 'absolute', marginTop: 6, }}
              onPress={clearSearchBar}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>X</Text>
            </Pressable>

          </View>

          <FlatList
            data={data}
            renderItem={({ item }) => (
              <Pressable onPress={()=> handleNavigation(item)}>
              <Card
                name={item.firstName}
                phone={item.phone}
                loanAmount={item.loanAmount}
                interestRate={item.interestRate}
                lentOn={item.lentOn}
                dueOn={item.dueOn}
                />
                </Pressable>
            )}
            keyExtractor={(item) => item.id}
          />

          <BottomSheet style={{ padding: 11 }} snapPoints={snapPoints}
            onChange={handleSheetChange}
            enablePanDownToClose={true}
            index={-1}
            ref={bottomSheetRef}
          >
            <BottomSheetView >

              <View style={styles.row}>
              <View style={styles.iputContainer}>
                <Text style={styles.text}>First Name</Text>
                <TextInput style={styles.input}
                  value={fName}
                  onChangeText={(text: any) => setfName(text)}
                  placeholder="Enter first name"
                  />
                  <Text style={styles.formError}>{fNameError}</Text>
                  </View>
                
                  <View style={styles.iputContainer}>
                <Text style={styles.text}>Last Name</Text>
                <TextInput style={styles.input}
                  value={lName}
                  onChangeText={(text: any) => setlName(text)}
                  placeholder="Enter last name"
                  />
                  <Text style={styles.formError}>{lNameError}</Text>
                  </View>
              </View>

              <View style={{flexDirection:'column'}}>
              <Text style={styles.text}>Phone</Text>
              <TextInput style={styles.input}
                value={phone}
                onChangeText={text => setPhone(text)}
                placeholder={"phone number"}
                maxLength={10}
                multiline={false}
                inputMode={"tel"}
              />
             <Text style={styles.formError}>{phoneError}</Text>
              </View>

              <View style={styles.row}>
              <View style={styles.iputContainer}>
                <Text style={styles.text}>Loan amount</Text>
                <TextInput style={styles.input}
                  value={loanAmount}
                  onChangeText={(text: any) => setLoanAmount(text)}
                  placeholder="Enter first name"
                  maxLength={6}
                  inputMode={"tel"}
                />
                <Text style={styles.formError}>{loanAmountError}</Text>
                </View>

                <View style={styles.iputContainer}>
                <Text style={styles.text}>Interest rate (%)</Text>
                <TextInput style={styles.input}
                  value={interestRate}
                  onChangeText={(text: any) => setInterestRate(text)}
                  placeholder="Enter last name"
                  inputMode={"tel"}
                />
                <Text style={styles.formError}>{interestRateError}</Text>
                </View>

              </View>

              <View style={styles.row}>
              <View style={styles.iputContainer}>
                <Text style={styles.text}>Lent on</Text>
                  <Pressable style={styles.input} onPress={() => handleModalOpen('lentOn')}
                ><Text>{lentOn}</Text></Pressable>
                <Text style={styles.formError}>{dueOnError}</Text>
                </View>

                <View style={styles.iputContainer}>
                <Text style={styles.text}>Due on</Text>
                  <Pressable style={styles.input} onPress={() => handleModalOpen('dueOn')}
                ><Text>{dueOn}</Text></Pressable>
                <Text style={styles.formError}>{dueOnError}</Text>
                </View>
              </View>
              <Pressable style={styles.button}
                onPress={AddClient}
              >
                <Text style={{ fontSize: 25, color: 'white', alignSelf: 'center' }}>Add Client</Text>
              </Pressable>
              <Modal
              visible={modalOpen}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>

              <DatePicker 
              mode="calendar"
              selected={date}
             // onDateChange={handleDateChange}
              onSelectedChange={(date) => {
                if(choseDate === 'lentOn')
                  setLentOn(date)
                else setDueOn(date)
              }}
              />

              <Pressable onPress={() => setModalOpen(false)}>
                <Text style={{color: '#1DA1F2'}}>close</Text>
              </Pressable>

                  </View>
              </View>
    
              </Modal>

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
  text: {
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
   // marginBottom: 2,
    paddingHorizontal: 10,
  },
  minput: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#D9D9D9',
    marginStart: 20,
    height: 40,
    marginHorizontal: 15,
    marginBottom: 5,
    padding: 5,
  },
  button: {
    height: 50,
    width: 330,
    backgroundColor: '#F4CE14',
    marginTop: 35,
    marginHorizontal: 15,
    borderRadius: 12,
    paddingVertical: 4,

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
    width: 70,
    backgroundColor: '#F4CE14',
    marginHorizontal: 15,
    borderRadius: 50,
    paddingVertical: 4,
    position: 'absolute',
    zIndex: 1,
    bottom: 20,
    right: 20,
  },
  searchBar: {
    width: 270,
    height: 35,
    borderRadius: 30,
    //backgroundColor:'#EEE',
    backgroundColor: "grey",
    marginBottom: 30,
    marginTop: 30,
    marginHorizontal: 'auto',
    paddingStart: 10,
  },
  formError: {
    color: 'red',
    fontSize: 10,
    marginTop: 25,
  },
  iputContainer: {
    flexDirection: 'column'
  },
  containFlex:{
flex: 1,
backgroundColor: '#fff',
alignItems: 'center',
justifyContent: 'center',

},

centeredView: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
marginTop: 22,
},
modalView: {
margin: 20,
backgroundColor: 'white',
borderRadius: 20,
width: '90%',
padding: 35,
alignItems: 'center',
shadowColor: '#000',
shadowOpacity: 0.25,
shadowRadius: 4,
elevation:5,
},
shadowOffset: {
width: 6,
height: 2,
},
shadow:{
shadowOpacity: 0.25,
shadowRadius: 4,
elevation:5,
}
});

export default Index;
