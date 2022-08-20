import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Keyboard,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

export const TaskInputField = (props) => {
  const [task, setTask] = useState(null);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  //call this when task is added, closes keyboard and opens date picker
  //as task should already be set when typed
  const handleAddTask = () => {
    Keyboard.dismiss();
    // setOpen(true);
    const add = {
      name: task,
      date: date,
    };
    props.addTask(add);
    setTask(null);
    setDate(new Date());
  };

  //call this when date selected, closes modal and adds new task
  //also resets state variables
  const handleDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setOpen(false);
    setDate(currentDate);
    const add = {
      name: task,
      date: date,
    };
    props.addTask(add);
    setTask(null);
    setDate(new Date());
  };

  return (
    <>
      <Modal visible={open} animationType={"slide"}>
        <View style={styles.datePick}>
          <DateTimePicker
            mode="time"
            value={date}
            is24Hour={true}
            onChange={handleDate}
          />
        </View>
      </Modal>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TextInput
          style={styles.inputField}
          value={task}
          onChangeText={(text) => {
            setTask(text);
            setDate(new Date());
          }}
          placeholder={"Type task here!"}
          placeholderTextColor={"#000"}
        />
        <DateTimePicker
          mode="datetime"
          style={styles.datePick}
          value={date}
          minimumDate={new Date()}
          is24Hour={false}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate;
            setDate(currentDate);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            if (task == null) {
              return Alert.alert(
                "You left the task field blank!",
                "Please make sure to enter a task.",
                [{ text: "ok im sorry" }],
                {
                  cancelable: true,
                }
              );
            } else if(new Date().getTime() > date.getTime()){
              return Alert.alert(
                "Yikes.",
                "Looks like you set a due date before the current date. You don't work that fast, do you?",
                [{ text: "Confirm" }],
                {
                  cancelable: true,
                }
              );
            } else{
              handleAddTask();
            }
          }}
        >
          <View style={styles.button}>
            <MaterialIcons name="publish" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "green",
    backgroundColor: "#fff",
    borderWidth: 2,
    marginHorizontal: 20,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    position: "absolute",
    bottom: 20,
  },
  inputField: {
    color: "#000",
    height: 50,
    flex: 0.7,
  },
  datePick: {
    flex: 1,
    color: "white",
  },
  button: {
    height: 30,
    width: 30,
    borderRadius: 5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
