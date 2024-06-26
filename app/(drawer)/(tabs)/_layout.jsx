import { Tabs } from "expo-router"
import { Ionicons } from '@expo/vector-icons';


const TabsLayout = () => {
  return (
    <Tabs>
      {/* <Tabs.Screen name="abc" options={{
            title:"Abc",
            tabBarIcon:({size,color})=><Feather name="home" size={size} color={color} />
            
        }}/> */}
      <Tabs.Screen name="food" options={{
        title: "Food",
        headerShown: false,
        tabBarIcon: ({ size, color }) => <Ionicons name="fast-food-outline" size={size} color={color} />
      }} />
      <Tabs.Screen name="ride" options={{
        title: "Ride",
        headerShown: false,
        tabBarIcon: ({ size, color }) => <Ionicons name="car-outline" size={size} color={color} />
      }} />
    </Tabs>
  )
}

export default TabsLayout