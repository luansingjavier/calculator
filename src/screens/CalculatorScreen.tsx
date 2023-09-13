import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import numberKeypad, {romanKeypad} from '../constants/keypad';
import Colors from '../constants/colors';
import Button from '../components/Button';
import {roman} from '../utils/convert';

const CalculatorScreen = () => {
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [operation, setOperation] = useState('');
  const [keypad, setKeypad] = useState(numberKeypad);
  const isRomanKeypad = keypad === romanKeypad;

  const arithmetics = ['+', '-', 'x', '/', '%'];
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
  };

  const handleNumberPress = (buttonValue: string) => {
    if (firstNumber.length < 10) {
      setFirstNumber(firstNumber + buttonValue);
    }
  };

  const handleOperationPress = (buttonValue: string) => {
    setOperation(buttonValue);
    setSecondNumber(firstNumber);
    setFirstNumber('');
  };

  const clear = () => {
    setFirstNumber('');
    setSecondNumber('');
    setOperation('');
  };

  const firstNumberDisplay = () => {
    if (firstNumber === '') {
      return (
        <Text style={styles.screenFirstNumber}>
          {isRomanKeypad ? roman(0) : '0'}
        </Text>
      );
    }

    const firstNumberVal = isRomanKeypad
      ? roman(Math.round(Number(firstNumber)))
      : firstNumber;

    if (firstNumber && firstNumber.length < 6) {
      return <Text style={styles.screenFirstNumber}>{firstNumberVal}</Text>;
    }

    if (firstNumber.length > 5 && firstNumber.length < 8) {
      return (
        <Text style={[styles.screenFirstNumber, {fontSize: 70}]}>
          {firstNumberVal}
        </Text>
      );
    }

    if (firstNumber.length > 7) {
      return (
        <Text style={[styles.screenFirstNumber, {fontSize: 50}]}>
          {firstNumberVal}
        </Text>
      );
    }
  };

  const getResult = () => {
    switch (operation) {
      case '+':
        clear();
        var result = parseFloat(secondNumber) + parseFloat(firstNumber);
        setFirstNumber('' + result);
        break;
      case '-':
        clear();
        var result = parseFloat(secondNumber) - parseFloat(firstNumber);
        setFirstNumber('' + result);
        break;
      case 'x':
        clear();
        var result = parseFloat(secondNumber) * parseFloat(firstNumber);
        setFirstNumber('' + result);
        break;
      case '/':
        clear();
        var result = parseFloat(secondNumber) / parseFloat(firstNumber);
        setFirstNumber('' + result);
        break;

      case '%':
        clear();
        var result = (parseFloat(secondNumber) * parseFloat(firstNumber)) / 100;
        setFirstNumber('' + result);
        break;
    }
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.main]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.result}>
        <Text style={styles.screenSecondNumber}>
          {isRomanKeypad
            ? roman(Math.round(Number(secondNumber)))
            : secondNumber}
          <Text style={styles.operation}>{operation}</Text>
        </Text>
        {firstNumberDisplay()}
      </View>
      <View style={styles.container}>
        {keypad.map((value, index) => {
          const isEqual = value === '=';
          const isClear = value === 'C';
          const isArithmetic = arithmetics.includes(value);
          const isSwitch = value === 'switch';
          const bgButton = isArithmetic ? styles.warning : styles.secondary;

          if (keypad == romanKeypad && numberKeypad[index] === '0') {
            return null;
          }

          return (
            <Button
              key={index}
              title={value}
              textProps={{
                style: styles.default,
              }}
              style={bgButton}
              onPress={() => {
                if (isClear) {
                  clear();
                } else if (isEqual) {
                  getResult();
                } else if (isArithmetic) {
                  handleOperationPress(value);
                } else if (isSwitch) {
                  keypad == romanKeypad
                    ? setKeypad(numberKeypad)
                    : setKeypad(romanKeypad);
                } else {
                  handleNumberPress(numberKeypad[index]);
                }
              }}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default CalculatorScreen;

const styles = StyleSheet.create({
  main: {
    justifyContent: 'flex-end',
    backgroundColor: Colors.white,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  secondary: {
    padding: 10,
    margin: 8,
    width: 70,
    height: 70,
    backgroundColor: Colors.platinum,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  warning: {
    padding: 10,
    margin: 8,
    width: 70,
    height: 70,
    backgroundColor: Colors.amber,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  default: {
    color: Colors.black,
    fontWeight: '600',
    fontSize: 16,
  },
  screenFirstNumber: {
    fontSize: 96,
    color: Colors.sonicSilver,
    fontWeight: '200',
    alignSelf: 'flex-end',
  },
  screenSecondNumber: {
    fontSize: 40,
    color: Colors.sonicSilver,
    fontWeight: '200',
    alignSelf: 'flex-end',
  },
  operation: {
    color: Colors.black,
    fontSize: 30,
    fontWeight: '500',
  },
  result: {
    height: 120,
    width: '100%',
    paddingHorizontal: 30,
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
});
