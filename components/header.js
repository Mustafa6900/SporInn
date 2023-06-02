import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackButton from './backbutton';
const Header = ({ title }) => {
  return (
    <View style={styles.container}>
          

      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF6F25',
    height: 90,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    letterSpacing: 0.4,
    marginTop: 40,
  },
});

export default Header;
