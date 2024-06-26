import { Stack } from "expo-router"
import { View ,  Text} from 'react-native';


const RootLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="(drawer)" options={{
            headerShown:false,
        }}/>
       
    </Stack>
  )
}

export default RootLayout;
