import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Switch, Animated } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TransitionPresets } from '@react-navigation/stack';

// Sample data for Movies and TV Shows with images
const movies = [
  { id: '1', title: 'The Shawshank Redemption', image: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg' },
  { id: '2', title: 'The Dark Knight', image: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg' },
  { id: '3', title: 'Inception', image: 'https://static.toiimg.com/photo/msid-6177430/6177430.jpg?57181' },
  { id: '4', title: 'Pulp Fiction', image: 'https://cdn.britannica.com/66/141066-050-36AB089D/John-Travolta-Samuel-L-Jackson-Pulp-Fiction.jpg' },
];

const tvShows = [
  { id: '1', title: 'Breaking Bad', image: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg' },
  { id: '2', title: 'Game of Thrones', image: 'https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg' },
  { id: '3', title: 'Stranger Things', image: 'https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg' },
  { id: '4', title: 'The Witcher', image: 'https://image.tmdb.org/t/p/w500/84XPpjGvxNyExjSuLQe0SzioErt.jpg' },
];

// Movie Screen Component with dark mode support and transition
function MoviesScreen({ theme }) {
  return (
    <Animated.View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.heading, { color: theme.text }]}>Popular Movies</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={[styles.itemText, { color: theme.text }]}>{item.title}</Text>
          </View>
        )}
      />
    </Animated.View>
  );
}

// TV Shows Screen Component with dark mode support and transition
function TVShowsScreen({ theme }) {
  return (
    <Animated.View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.heading, { color: theme.text }]}>Favourite TV Shows</Text>
      <FlatList
        data={tvShows}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={[styles.itemText, { color: theme.text }]}>{item.title}</Text>
          </View>
        )}
      />
    </Animated.View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false); // State to toggle dark/light mode
  const [bgColor] = useState(new Animated.Value(0)); // Animated value for transitions

  // Define theme colors for dark and light mode
  const lightTheme = {
    background: '#fff',
    text: '#000',
  };

  const darkTheme = {
    background: '#121212',
    text: '#fff',
  };

  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  // Animate background color transition when theme changes
  useEffect(() => {
    Animated.timing(bgColor, {
      toValue: isDarkMode ? 1 : 0,
      duration: 500, // Adjust transition duration
      useNativeDriver: false,
    }).start();
  }, [isDarkMode]);

  const backgroundColorInterpolation = bgColor.interpolate({
    inputRange: [0, 1],
    outputRange: [lightTheme.background, darkTheme.background],
  });

  const textColorInterpolation = bgColor.interpolate({
    inputRange: [0, 1],
    outputRange: [lightTheme.text, darkTheme.text],
  });

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Animated.View style={[styles.switchContainer, { backgroundColor: backgroundColorInterpolation }]}>
        <Animated.Text style={{ color: textColorInterpolation }}>Dark Mode</Animated.Text>
        <Switch
          value={isDarkMode}
          onValueChange={() => setIsDarkMode((prevMode) => !prevMode)}
        />
      </Animated.View>

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Movies') {
              iconName = 'film-outline';
            } else if (route.name === 'TV Shows') {
              iconName = 'tv-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          ...TransitionPresets.SlideFromRightIOS, // Adding transition effect
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Movies">
          {() => <MoviesScreen theme={currentTheme} />}
        </Tab.Screen>
        <Tab.Screen name="TV Shows">
          {() => <TVShowsScreen theme={currentTheme} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 75,
    marginRight: 10,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 18,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
