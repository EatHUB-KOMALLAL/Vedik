/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, {FC, useState} from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Keyboard,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import colors from '../../style/colors';
import {Controller, useForm} from 'react-hook-form';
import Snackbar from 'react-native-snackbar';
import Feather from 'react-native-vector-icons/Feather';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {CommonActions} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('window');
interface Props {
  navigation: any;
}

const LoginScreen: FC<Props> = ({navigation}: any) => {
  const [loading, setLoading] = useState(false);
  // use React Hook Form
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    getValues,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: any) => {
    Keyboard.dismiss();
    LogIn(data);
  };

  //  Handle to Login Function
  const LogIn = async (props: any) => {
    const raw = {
      email: props.email,
      password: props.password,
    };

    const apiResponse = {
      data: {
        status: false,
        message: 'Incorrect Email and Password',
      },
    };

    try {
      setLoading(true);
      const response: any = await axios.post(
        'http://139.84.169.123/portalforwarding/backend/public/api/login',
        raw,
      );
      await AsyncStorage.setItem('token', response.data.data.token);

      if (response.data.status === true) {

        navigation.dispatch(
          CommonActions.navigate({
            name: 'HomeScreen',
          }),
        );
        Snackbar.show({
          text: response.data.message,
          duration: 1000,
          textColor: colors.white,
          backgroundColor: '#7CA942',
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Snackbar.show({
        text: apiResponse.data.message,
        duration: 1000,
        textColor: colors.white,
        backgroundColor: '#7CA942',
      });
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../img/background.png')}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.cover}>
          <Text style={styles.loginType}>Login</Text>
          {/* <Image
            source={require(url='https://media.licdn.com/dms/image/C4D0BAQFr6hKNzFG-cQ/company-logo_200_200/0/1661410115648/vedikroots_logo?e=1723680000&v=beta&t=GgqSc3u92dyvjpUrzxsnnPaF-4fdLve6lE2Vd2lpJyU')}
            style={styles.logoImage}
          /> */}
          <Controller
            control={control}
            rules={{
              required: true,
              pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            }}
            render={({field: {onChange, value, onBlur}}) => (
              <TextInput
                activeUnderlineColor={colors.lightGray}
                placeholder="Username or Email"
                underlineColor={colors.white}
                placeholderTextColor={colors.text_secondary}
                value={value}
                onChangeText={value => onChange(value)}
                textColor="black"
                style={styles.textInput}
                left={
                  <TextInput.Icon
                    icon="account-circle"
                    color="black"
                    size={20}
                  />
                }
              />
            )}
            name="email"
          />
          {errors.email && errors.email.type === 'required' && (
            <View style={styles.row}>
              <Feather
                name="alert-circle"
                size={9}
                color="red"
                style={styles.icon}
              />
              <Text style={styles.error}>Email is required.</Text>
            </View>
          )}
          {errors.email && errors.email.type === 'pattern' && (
            <View style={styles.row}>
              <Feather
                name="alert-circle"
                size={9}
                color="red"
                style={styles.icon}
              />
              <Text style={styles.error}>Email is not valid.</Text>
            </View>
          )}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value, onBlur}}) => (
              <TextInput
                activeUnderlineColor={colors.lightGray}
                placeholder="Password"
                placeholderTextColor={colors.text_secondary}
                underlineColor={colors.white}
                value={value}
                onChangeText={value => onChange(value)}
                style={styles.textInput}
                textColor="black"
                left={<TextInput.Icon icon="lock" color="black" size={20} />}
              />
            )}
            name="password"
          />
          {errors.password && errors.password.type === 'required' && (
            <View style={styles.row}>
              <Feather
                name="alert-circle"
                size={9}
                color="red"
                style={styles.icon}
              />
              <Text style={styles.error}>Password is required.</Text>
            </View>
          )}
        </View>

        <Pressable
          onPress={handleSubmit(onSubmit)}
          style={styles.btn}
          android_ripple={{color: 'white'}}>
          {loading ? (
            <ActivityIndicator size={20} color={colors.white} />
          ) : (
            <Text style={styles.btnText}>Login</Text>
          )}
        </Pressable>
      </ImageBackground>
    </View>
  );
};
export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cover: {
    padding: 24,
    paddingTop: 30,
  },
  textInput: {
    backgroundColor: colors.white,
    marginVertical: 10,
    elevation: 8,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    marginTop: 7,
    marginLeft: 20,
  },
  icon: {
    marginRight: 4,
    marginTop: -3,
  },
  error: {
    width: 330,
    color: 'red',
    fontSize: 10,
    marginTop: -5,
    marginBottom: 5,
  },
  btn: {
    backgroundColor: colors.brand_primary,
    width: 150,
    alignSelf: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
  },
  btnText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
  },
  logoImage: {
    height: width * 0.33,
    width: width * 0.33,
    marginBottom: width * 0.13,
    alignSelf: 'center',
  },
  loginType: {
    alignSelf: 'center',
    color: colors.brand_primary,
    fontSize: 18,
    marginBottom: 25,
    fontFamily: 'Roboto-Medium',
  },
});
