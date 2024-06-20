import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface CardInterface {
  name: string,
  phone: number,
  loanAmount: number,
  loanPeriod: string,
  interestRate: string,
  lentOn: string,
  dueOn: string,
}

function Card({
  name,
  phone,
  loanAmount,
  loanPeriod,
  interestRate,
  lentOn,
  dueOn,
}: CardInterface) {
  return (
    <View style={styles.card}>
      <Text>{name}</Text>
      <Text>{phone}</Text>
      <Text style={styles.details}>K{loanAmount} at {interestRate} for {loanPeriod}</Text>
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
