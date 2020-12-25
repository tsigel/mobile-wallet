import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../screens/Login/Login';
import { Create } from '../screens/Create/Create';
import { Wallet } from '../screens/Wallet/Wallet';
import { Send } from '../screens/Send/Send';
import { CreateSeed } from '../screens/CreateSeed/CreateSeed';
import { InitialLoad } from '../screens/InitialLoad/InitialLoad';


const Stack = createStackNavigator();

export const Router = () => (
    <Stack.Navigator headerMode={'none'} initialRouteName={'InitialLoad'}>
        <Stack.Screen name={'InitialLoad'} component={InitialLoad}/>
        <Stack.Screen name={'Login'} component={Login}/>
        <Stack.Screen name={'Create'} component={Create}/>
        <Stack.Screen name={'CreateSeed'} component={CreateSeed}/>
        <Stack.Screen name={'Wallet'} component={Wallet}/>
        <Stack.Screen name={'Send'} component={Send}/>
    </Stack.Navigator>
);
