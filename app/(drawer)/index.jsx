import { View, Image, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';





const Index = () => {
  return (
    <View>
      <Text style={styles.heading}>Uber</Text>
      <View style={styles.imagesContainer}>
        <Link href="(tabs)/ride">
          <View>
            <Image
              source={require('./../../assets/images/car.jpg')}
              style={styles.images}
            />
            <Text>
              Get a ride
            </Text>
            <View style={styles.icons}>
              <Ionicons name="arrow-forward-circle" size={30} />
            </View>
          </View>
        </Link>
        <Link href="(tabs)/food">
          <View>
            <Image
              source={require('./../../assets/images/food.jpg')}
              style={styles.images}
            />
            <Text>
              Order Food
            </Text>
            <View style={styles.icons}>
              <Ionicons name="arrow-forward-circle" size={30} />
            </View>
          </View>
        </Link>
      </View>
      <View style={{ paddingLeft: 10 }}>
        <Text style={{ fontSize: 18, color: "gray" }}>Go again</Text>
        <View style={{ display: "flex", flexDirection: "row", paddingTop: 20 }}>
          <Ionicons name="bag-handle"  color={"gray"} size={30} />
          <View style={{ paddingLeft: 10 }}>
            <Text style={{ fontSize: 18 }}>Work</Text>
            <Text style={{ color: "gray" }}>2432 Market street</Text>
          </View>
        </View>
        <View style={{ display: "flex", flexDirection: "row", paddingTop: 30 }}>
          <Ionicons name="stopwatch-sharp" color={"gray"} size={30} />
          <View style={{ paddingLeft: 10 }}>
            <Text style={{ fontSize: 18 }}>1600 Michigan Street</Text>
            <Text style={{ color: "gray" }}>2432 Market street</Text>
          </View>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  imagesContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    height: "55%"
  },
  images: {
    width: 150,
    height: 150,

  },
  heading: {
    marginTop: 50,
    fontWeight: 'bold',
    fontSize: 50,
  },
  icons: {
    paddingTop: 10
  },
});

export default Index;
