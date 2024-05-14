/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
// MainScreen.js
import React, {FC, useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Pressable,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Props, TextInput} from 'react-native-paper';
import colors from '../../style/colors';
const {width} = Dimensions.get('window');

const HomeScreen: FC<Props> = ({navigation}: any) => {
  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/users',
        );
        const userData = response.data.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
        }));
        setUsers(userData);
        setLoading(false);

        await AsyncStorage.setItem('users', JSON.stringify(userData));
      } catch (error) {
        setLoading(false);

        const storedUsers = await AsyncStorage.getItem('users');
        if (storedUsers) {
          setUsers(JSON.parse(storedUsers));
        }
      }
    };

    fetchData();
  }, []);

  const addUser = async () => {
    const newUser = {id: users.length + 1, name: newName, email: newEmail};
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
    setNewName('');
    setNewEmail('');
  };

  const updateUser = async () => {
    const updatedUsers = users.map(user =>
      user.id === editingUser.id
        ? {...user, name: newName, email: newEmail}
        : user,
    );
    setUsers(updatedUsers);
    await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
    setNewName('');
    setNewEmail('');
    setEditingUser(null);
  };

  const deleteUser = async (id: number) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const startEditing = (user) => {
    setNewName(user.name);
    setNewEmail(user.email);
    setEditingUser(user);
  };

  const renderItem = ({item}) => (
    <View style={styles.item0}>
      <View style={styles.item}>
        <Text style={styles.text}>Name: {item.name}</Text>
        <Text style={styles.text}>Email: {item.email}</Text>
      </View>
      <View style={styles.buttons}>
        <Pressable onPress={() => startEditing(item)} style={styles.buttonItem}>
          <Text style={styles.buttonText}>Edit</Text>
        </Pressable>
        <Pressable
          onPress={() => deleteUser(item.id)}
          style={styles.buttonItem0}>
          <Text style={styles.buttonText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.item1}>
          {loading ? (
            <ActivityIndicator size={20} color={colors.brand_primary} />
          ) : (
            <FlatList
              data={users}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}
            />
          )}
        </View>
         {
          users ?
          <View style={styles.cover}>
          <TextInput
            activeUnderlineColor={colors.lightGray}
            placeholder="Name"
            underlineColor={colors.white}
            placeholderTextColor={colors.text_secondary}
            value={newName}
            onChangeText={setNewName}
            textColor="black"
            style={styles.textInput}
            left={
              <TextInput.Icon icon="account-circle" color="black" size={20} />
            }
          />

          <TextInput
            activeUnderlineColor={colors.lightGray}
            placeholder="Email"
            placeholderTextColor={colors.text_secondary}
            underlineColor={colors.white}
            value={newEmail}
            onChangeText={setNewEmail}
            style={styles.textInput}
            textColor="black"
            left={
              <TextInput.Icon icon="email" color="black" size={20} />
            }
          />
          <View style={styles.buttons0}>
            {editingUser ? (
              <Pressable onPress={updateUser} style={styles.buttonItem}>
                <Text style={styles.buttonText}>Update User</Text>
              </Pressable>
            ) : (
              <Pressable onPress={addUser} style={styles.buttonItem0}>
                <Text style={styles.buttonText}>Add User</Text>
              </Pressable>
            )}
          </View>
        </View>
          :
          <Text  style={styles.buttonText}>No Data available</Text>
         }
        
      </View>
    </ScrollView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cover: {
    padding: 24,
    paddingTop: 50,
  },

  item: {
    width: 250,

    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 15,
    marginBottom: 20,
    alignSelf: 'center',
    padding: 10,
    marginVertical: 10,
  },
  item0: {
    width: 300,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginBottom: 5,
    alignSelf: 'center',
    borderRadius: 15,
    padding: 20,
    marginVertical: 20,
  },

  buttons: {
    width: 250,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  buttons0: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  buttonItem: {
    width: 110,
    height: 40,
    borderColor: 'gray',
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: 20,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonItem0: {
    width: 110,
    height: 40,
    borderColor: 'gray',
    backgroundColor: colors.brand_primary,
    elevation: 10,
    borderRadius: 20,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: 'red',
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
  },
  buttonText: {
    color: 'black',
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
  },
  textInput: {
    backgroundColor: colors.white,
    marginVertical: 10,
    elevation: 8,
    borderRadius: 5,
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
