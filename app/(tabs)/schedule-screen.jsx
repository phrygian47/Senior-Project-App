import React from "react";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import Swiper from "react-native-swiper";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const { width } = Dimensions.get("screen");

export default function ScheduleScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTime1, setSelectedTime1] = useState("");
  const [selectedDay1, setSelectedDay1] = useState("");
  const [selectedTime2, setSelectedTime2] = useState("");
  const [selectedDay2, setSelectedDay2] = useState("");
  const [openStartTimePicker, setOpenStartTimePicker] = useState(false);
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openEndTimePicker, setOpenEndTimePicker] = useState(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);
  const [checkBox, setCheckBox] = useState(false);
  const swiper = React.useRef();
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);
  const [mode1, setMode1] = useState("Off");
  const [mode2, setMode2] = useState("Off");

  const [events, setEvents] = useState([
    { date: "12/4/2024" },
    { date: "12/5/2024" },
  ]);

  const handleConfirmTime1 = (date) => {
    options = { hour: "numeric", minute: "numeric" };
    setSelectedTime1(date.toLocaleTimeString("en-US", options));
    setOpenStartTimePicker(false);
  };

  const isEventScheduled = (date) => {
    found = events.some((event) => event.date === date);
    return found;
  };

  const handleConfirmDate1 = (date) => {
    options = { month: "short", day: "numeric", year: "numeric" };
    setSelectedDay1(date.toLocaleDateString("en-US", options));
    setOpenStartDatePicker(false);
  };

  const handleConfirmTime2 = (date) => {
    options = { hour: "numeric", minute: "numeric" };
    setSelectedTime2(date.toLocaleTimeString("en-US", options));
    setOpenEndTimePicker(false);
  };

  const handleConfirmDate2 = (date) => {
    options = { month: "short", day: "numeric", year: "numeric" };
    setSelectedDay2(date.toLocaleDateString("en-US", options));
    setOpenEndDatePicker(false);
  };

  const triButtonHandler = (buttonName, num) => {
    setMode1(buttonName) ? num === 1 : setMode1(buttonName);
  };

  const triButtonHandler2 = (buttonName, num) => {
    setMode2(buttonName) ? num === 1 : setMode2(buttonName);
  };

  // Map of month abbreviations to numbers, this was done as the Date() function was not working
  const monthMap = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
  };

  const convertToDate = (date) => {
    const dateParts = date.split(" ");
    const month = monthMap[dateParts[0]];
    const day = parseInt(dateParts[1].replace(",", ""));
    const year = parseInt(dateParts[2]);
    return `${month}/${day}/${year}`;
  };

  const addEventHandler = () => {
    const formattedDate1 = convertToDate(selectedDay1);
    console.log(selectedTime1);
    const newEvent = {
      date: formattedDate1,
      time: selectedTime1,
      mode: mode1,
    };
    if (checkBox) {
      const formattedDate2 = convertToDate(selectedDay2);
      const newEndEvent = {
        date: formattedDate2,
        time: selectedTime2,
        mode: mode2,
      };
      setEvents([...events, newEndEvent]);
    }
    setEvents([...events, newEvent]);
    setModalVisible(!modalVisible);
  };

  const testTimes = [
    { hour: "12:00 AM", id: 0 },
    { hour: "1:00 AM", id: 1 },
    { hour: "2:00 AM", id: 2 },
    { hour: "3:00 AM", id: 3 },
    { hour: "4:00 AM", id: 4 },
    { hour: "5:00 AM", id: 5 },
    { hour: "6:00 AM", id: 6 },
    { hour: "7:00 AM", id: 7 },
    { hour: "8:00 AM", id: 8 },
    { hour: "9:00 AM", id: 9 },
    { hour: "10:00 AM", id: 10 },
    { hour: "11:00 AM", id: 11 },
    { hour: "12:00 PM", id: 12 },
    { hour: "1:00 PM", id: 13 },
    { hour: "2:00 PM", id: 14 },
    { hour: "3:00 PM", id: 15 },
    { hour: "4:00 PM", id: 16 },
    { hour: "5:00 PM", id: 17 },
    { hour: "6:00 PM", id: 18 },
    { hour: "7:00 PM", id: 19 },
    { hour: "8:00 PM", id: 20 },
    { hour: "9:00 PM", id: 21 },
    { hour: "10:00 PM", id: 22 },
    { hour: "11:00 PM", id: 23 },
  ];

  const [items] = React.useState([
    {
      title: "Some event",
      startDate: moment().subtract(1, "hour").toDate(),
      endDate: moment().add(1, "hour").toDate(),
    },
  ]);

  const weeks = React.useMemo(() => {
    const start = moment(start).add(week, "weeks").startOf("week");

    return [-1, 0, 1].map((adj) => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = moment(start).add(adj, "week").add(index, "day");

        return {
          weekday: date.format("ddd"),
          date: date.toDate(),
        };
      });
    });
  }, [week]);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#FFFFFF", "#FAF3E0"]}
        dither={true}
        style={styles.background}
      />
      <SafeAreaView style={{ flex: 1, marginTop: 20 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Schedule</Text>
          </View>

          <View style={styles.picker}>
            <Swiper
              index={1}
              ref={swiper}
              showsPagination={false}
              loop={false}
              onIndexChanged={(ind) => {
                if (ind === 1) return; // If center index, do nothing

                const newIndex = ind - 1; // Calculate offset (-1, 0, +1)
                const newWeek = week + newIndex;

                // Update week and value immediately
                setWeek(newWeek);
                setValue((prevValue) =>
                  moment(prevValue).add(newIndex, "week").toDate()
                );

                // Reset Swiper index without delay
                requestAnimationFrame(() => swiper.current.scrollTo(1, false));
              }}
            >
              {weeks.map((dates, index) => (
                <View
                  style={[styles.itemRow, { paddingHorizontal: 16 }]}
                  key={index}
                >
                  {dates.map((item, dateIndex) => {
                    // Compare the value in React state (safe)
                    const isActive = React.useMemo(() => {
                      return value.toDateString() === item.date.toDateString();
                    }, [value, item.date]);

                    return (
                      <TouchableWithoutFeedback
                        key={dateIndex}
                        onPress={() => setValue(item.date)}
                      >
                        <View
                          style={[
                            styles.item,
                            isActive && {
                              backgroundColor: "#333333",
                              borderColor: "#111",
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.itemWeekDay,
                              isActive && { color: "#fff" },
                            ]}
                          >
                            {item.weekday}
                          </Text>
                          <Text
                            style={[
                              styles.itemDate,
                              isActive && { color: "#fff" },
                            ]}
                          >
                            {item.date.getDate()}
                          </Text>
                          {isEventScheduled(
                            item.date.toLocaleDateString("en-US")
                          ) && <View style={styles.redDot}></View>}
                        </View>
                      </TouchableWithoutFeedback>
                    );
                  })}
                </View>
              ))}
            </Swiper>
          </View>

          <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}>
            <Text style={styles.contentText}>{value.toDateString()}</Text>
            <View style={styles.contentHeader}>
              <View style={styles.content}>
                <ScrollView>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      Alert.alert("window closed");
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <View style={styles.modalContainer}>
                      <View style={styles.modalHeader}>
                        <TouchableOpacity
                          style={styles.modalCancel}
                          onPress={() => setModalVisible(!modalVisible)}
                        >
                          <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <Text style={styles.modalHeaderText}>New Event</Text>
                        <TouchableOpacity
                          style={styles.modalAdd}
                          onPress={() => addEventHandler()}
                        >
                          <Text style={styles.addText}>Add</Text>
                        </TouchableOpacity>
                      </View>
                      <SafeAreaView>
                        <View style={styles.modalContent}>
                          <TouchableOpacity
                            style={styles.timePicker}
                            onPress={() => setOpenStartTimePicker(true)}
                          >
                            <DateTimePickerModal
                              isVisible={openStartTimePicker}
                              mode="time"
                              minuteInterval={15}
                              onConfirm={handleConfirmTime1}
                              onCancel={() => setOpenStartTimePicker(false)}
                            />
                            <Text style={styles.timePickerText}>
                              {selectedTime1}
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={styles.datePicker}
                            onPress={() => setOpenStartDatePicker(true)}
                          >
                            <DateTimePickerModal
                              isVisible={openStartDatePicker}
                              mode="date"
                              onConfirm={handleConfirmDate1}
                              onCancel={() => setOpenStartDatePicker(false)}
                            />
                            <Text style={styles.datePickerText}>
                              {selectedDay1}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.triSwitch}>
                          <Pressable
                            onPress={() => triButtonHandler("Off")}
                            style={[
                              styles.triButtonL,
                              mode1 === "Off" && {
                                backgroundColor: "#FAF3E0",
                                borderWidth: 1,
                              },
                            ]}
                          >
                            <Text style={styles.offButton}>Off</Text>
                          </Pressable>
                          <Pressable
                            onPress={() => triButtonHandler("Low")}
                            style={[
                              styles.triButtonM,
                              mode1 === "Low" && {
                                backgroundColor: "#FAF3E0",
                                borderWidth: 1,
                              },
                            ]}
                          >
                            <Text style={[styles.lowButton]}>Low</Text>
                          </Pressable>
                          <Pressable
                            onPress={() => triButtonHandler("High")}
                            style={[
                              styles.triButtonR,
                              mode1 === "High" && {
                                backgroundColor: "#FAF3E0",
                                borderWidth: 1,
                              },
                            ]}
                          >
                            <Text style={styles.highButton}>High</Text>
                          </Pressable>
                        </View>
                        <View style={styles.checkBoxContainer}>
                          <BouncyCheckbox
                            isChecked={checkBox}
                            text="Add End Time"
                            useBuiltInState={false}
                            textStyle={{
                              textDecorationLine: "none",
                            }}
                            onPress={() => setCheckBox(!checkBox)}
                          />
                        </View>
                      </SafeAreaView>
                      <SafeAreaView>
                        {checkBox && (
                          <View style={styles.modalContent}>
                            <TouchableOpacity
                              style={[styles.timePicker, { marginTop: 0 }]}
                              onPress={() => setOpenEndTimePicker(true)}
                            >
                              <DateTimePickerModal
                                isVisible={openEndTimePicker}
                                mode="time"
                                onConfirm={handleConfirmTime2}
                                onCancel={() => setOpenEndTimePicker(false)}
                              />
                              <Text style={styles.timePickerText}>
                                {selectedTime2}
                              </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                              style={styles.datePicker}
                              onPress={() => setOpenEndDatePicker(true)}
                            >
                              <DateTimePickerModal
                                isVisible={openEndDatePicker}
                                mode="date"
                                onConfirm={handleConfirmDate2}
                                onCancel={() => setOpenEndDatePicker(false)}
                              />
                              <Text style={styles.datePickerText}>
                                {selectedDay2}
                              </Text>
                            </TouchableOpacity>
                            <View style={styles.triSwitch}>
                              <Pressable
                                onPress={() => triButtonHandler2("Off")}
                                style={[
                                  styles.triButtonL,
                                  mode2 === "Off" && {
                                    backgroundColor: "#FAF3E0",
                                    borderWidth: 1,
                                  },
                                ]}
                              >
                                <Text style={styles.offButton}>Off</Text>
                              </Pressable>
                              <Pressable
                                onPress={() => triButtonHandler2("Low")}
                                style={[
                                  styles.triButtonM,
                                  mode2 === "Low" && {
                                    backgroundColor: "#FAF3E0",
                                    borderWidth: 1,
                                  },
                                ]}
                              >
                                <Text style={[styles.lowButton]}>Low</Text>
                              </Pressable>
                              <Pressable
                                onPress={() => triButtonHandler2("High")}
                                style={[
                                  styles.triButtonR,
                                  mode2 === "High" && {
                                    backgroundColor: "#FAF3E0",
                                    borderWidth: 1,
                                  },
                                ]}
                              >
                                <Text style={styles.highButton}>High</Text>
                              </Pressable>
                            </View>
                          </View>
                        )}
                      </SafeAreaView>
                    </View>
                  </Modal>
                  {testTimes.map((item) => {
                    return (
                      <TouchableOpacity
                        key={item.id}
                        onLongPress={() => {
                          setSelectedTime1(item.hour);
                          setSelectedDay1(
                            value.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          );
                          setSelectedTime2(item.hour);
                          setSelectedDay2(
                            value.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          );
                          setModalVisible(true);
                        }}
                      >
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <View>
                            <Text style={styles.schedulerContent}>
                              {item.hour}
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 1,
                              height: 1,
                              backgroundColor: "black",
                            }}
                          />
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
  },
  header: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#242323",
    marginBottom: 12,
  },
  picker: {
    flex: 1,
    maxHeight: 74,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  contentText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#999",
    marginBottom: 12,
  },
  itemRow: {
    width,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginHorizontal: -4,
  },
  item: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: "#280003",
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "column",
  },
  itemWeekDay: {
    fontSize: 13,
    fontWeight: "500",
    color: "#1C2321",
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1C2321",
  },
  contentHeader: {
    flex: 1,
    height: 400,
  },
  content: {
    borderWidth: 4,
    borderColor: "#242323",
    borderStyle: "solid",
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: StyleSheet.thick,
    borderBottomWidth: StyleSheet.thick,
    flex: 1,
  },
  schedulerContent: {
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 20,
  },
  footer: {
    marginHorizontal: "auto",
  },
  modalHeader: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    flexDirection: "row",
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d8d8d8",
    justifyContent: "center",
  },
  modalCancel: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  cancelText: {
    color: "red",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    marginTop: "10%",
    backgroundColor: "#272727",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "flex-start",
  },
  modalContent: {
    padding: 20,
    width: "100%",
  },
  modalAdd: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addText: {
    color: "#007903",
    fontSize: 16,
  },
  timePicker: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#626262",
    borderWidth: 3,
    borderColor: "#FAF3E0",
    borderRadius: 8,
    marginVertical: 10,
    padding: 10,
  },
  timePickerText: {
    fontSize: 30,
    color: "#d8d8d8",
  },
  datePicker: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#626262",
    borderWidth: 3,
    borderColor: "#FAF3E0",
    borderRadius: 8,
    marginVertical: 10,
    padding: 10,
  },
  datePickerText: {
    fontSize: 30,
    color: "#d8d8d8",
  },
  triSwitch: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  triButtonL: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderWidth: 2,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#626262",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 8,
    elevation: 5,
  },
  triButtonM: {
    borderWidth: 2,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#626262",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 40,
    elevation: 5,
  },
  triButtonR: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderWidth: 2,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#626262",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 40,
    elevation: 5,
  },
  offButton: {
    fontSize: 20,
  },
  lowButton: {
    fontSize: 20,
  },
  highButton: {
    fontSize: 20,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  gradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkBoxContainer: {
    marginVertical: 10,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  redDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "red",
  },
});
