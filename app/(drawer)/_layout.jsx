import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
      <Drawer.Screen
          name="index" 
          options={{
            drawerLabel: 'Home',
            title: '',
          }}
        />
        <Drawer.Screen
          name="(tabs)" 
          options={{
            drawerLabel: 'Ride/Eat',
            title: 'Ride/Eat',
          }}
        />
        
        {/* <Drawer.Screen
          name="drawerItems/food" 
          options={{
            drawerLabel: 'Food',
            title: 'overview',
          }}
        />
        <Drawer.Screen
          name="drawerItems/ride" 
          options={{
            drawerLabel: 'Ride',
            title: 'overview',
          }}
        /> */}
        <Drawer.Screen
          name="drawerItems/setting" 
          options={{
            drawerLabel: 'Setting',
            title: 'Setting',
            
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
