import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import EntryStack from './src/navigation/Entrystack'

export default function App() {
  return (
    <NavigationContainer>
      <EntryStack />
    </NavigationContainer>
  )
}