import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Alert,
} from "react-native";
import { TaskInputField } from "./components/TaskInputField.js";
import { TaskItem } from "./components/TaskItem.js";
import bg from "./assets/bg.jpg";
import Animated, { FadeInLeft, FadeOutRight } from "react-native-reanimated";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [streak, setStreak] = useState(0);
  const addTask = (task) => {
    if (task == null) return;
    setTasks(
      [...tasks, task].sort((a, b) => {
        if (a.date.getTime() < b.date.getTime()) {
          return -1;
        }
        if (a.date.getTime() > b.date.getTime()) {
          return 1;
        } else {
          return 0;
        }
      })
    );
  };

  const deleteTask = (deleteIndex) => {
    if (tasks[deleteIndex].date.getTime() > new Date().getTime()) {
      setStreak(streak + 1);
    } else {
      setStreak(0);
      setTasks(tasks.filter((value, index) => index != deleteIndex));
      return Alert.alert(
        "Oh no!",
        "It looks like you've lost your streak. Don't worry, you got this next time!",
        [{ text: "ok im sorry" }],
        {
          cancelable: true,
        }
      );
    }
    setTasks(tasks.filter((value, index) => index != deleteIndex));
  };

  function formatDate(date) {
    const fullstring = date.toLocaleString();
    const start = fullstring.length - 6;
    const firstpart = fullstring.substr(0, start);
    const secondpart = fullstring.substr(start + 3);
    return firstpart + secondpart;
  }

  useEffect(() => {
    return Alert.alert(
      "Welcome!",
      "Just add a task and a due date at the bottom- If you complete the task before the due date, you'll increase your streak!",
      [{ text: "Alright!" }],
      {
        cancelable: true,
      }
    );
  }, []);
  //empty array means useeffect will only run once on app start

  return (
    <View style={styles.container}>
      <ImageBackground source={bg} resizeMode="cover" style={styles.image}>
        <Text style={styles.heading}>TODO LIST</Text>
        <Text style={styles.streak}>Streak: {streak}</Text>
        <ScrollView style={styles.scrollView}>
          {tasks.map((task, index) => {
            return (
              <View key={index} style={styles.taskContainer}>
                <Animated.View entering={FadeInLeft} exiting={FadeOutRight}>
                  <TaskItem
                    index={index + 1}
                    task={task.name}
                    date={formatDate(task.date)}
                    deleteTask={() => deleteTask(index)}
                  />
                </Animated.View>
              </View>
            );
          })}
        </ScrollView>
        <TaskInputField addTask={addTask} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#307fbf",
  },
  heading: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 40,
    marginBottom: 10,
    marginLeft: 20,
  },
  streak: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginTop: -32,
    marginBottom: 10,
    marginLeft: 275,
  },
  scrollView: {
    marginBottom: 70,
  },
  taskContainer: {
    marginTop: 20,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
