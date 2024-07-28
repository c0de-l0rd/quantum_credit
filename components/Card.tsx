import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

interface CardInterface {
  name: string,
  phone: number,
  loanAmount: number,
  interestRate: number,
  lentOn: string,
  dueOn: string,
}

function Card({
  name,
  phone,
  loanAmount,
  interestRate,
  lentOn,
  dueOn,
}: CardInterface) {

      // TODO : add calculation for loan period
      // const loanPeiod = () => {}

  return (
    <View style={styles.card}>
      <Text>{name}</Text>
      <Text>{phone}</Text>
      <Text style={styles.details}>K{loanAmount} at {interestRate} for {/*period*/}</Text>
      <Text style={styles.payback}>Payback: K 900</Text>
      <View style={styles.dates}>
      <Text style={styles.dateText}>lent on: {lentOn}</Text>
      <Text style={styles.dateText}>due on: {dueOn}</Text>
      </View>
    </View>
  );
}

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "grey",
    borderRadius: 11,
    marginBottom: 20,
    marginHorizontal: 20,
    padding: 11
  },
  credentials: {
    
  },
  details: {
    marginHorizontal: 'auto',
    fontSize: 16,
  },
  payback: {
    marginHorizontal: 'auto',
    fontSize: 22,
    fontWeight: 'bold'
  },
  dates: {
    marginHorizontal: 'auto',
    marginTop: 11,
  },
  dateText:{
    fontSize: 11,
  }
});
