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
} from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import Swiper from "react-native-swiper";
import FlatButton from "@/components/FlatButton";

const { width } = Dimensions.get("screen");

export default function ScheduleScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const swiper = React.useRef();
  const [value, setValue] = React.useState(new Date());
  const [week, setWeek] = React.useState(0);

  const testTimes = [
    { hour: "12:00am" },
    { hour: "1:00am" },
    { hour: "2:00am" },
    { hour: "3:00am" },
    { hour: "4:00am" },
    { hour: "5:00am" },
    { hour: "6:00am" },
    { hour: "7:00am" },
    { hour: "8:00am" },
    { hour: "9:00am" },
    { hour: "10:00am" },
    { hour: "11:00am" },
    { hour: "12:00pm" },
    { hour: "1:00pm" },
    { hour: "2:00pm" },
    { hour: "3:00pm" },
    { hour: "4:00pm" },
    { hour: "5:00pm" },
    { hour: "6:00pm" },
    { hour: "7:00pm" },
    { hour: "8:00pm" },
    { hour: "9:00pm" },
    { hour: "10:00pm" },
    { hour: "11:00pm" },
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
    <SafeAreaView style={{ flex: 1 }}>
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
              if (ind === 1) {
                return;
              }

              setTimeout(() => {
                const newIndex = ind - 1;
                const newWeek = week + newIndex;
                setWeek(newWeek);
                setValue(moment(value).add(newIndex, "week").toDate());
                swiper.current.scrollTo(1, false);
              }, 100);
            }}
          >
            {weeks.map((dates, index) => (
              <View
                style={[styles.itemRow, { paddingHorizontal: 16 }]}
                key={index}
              >
                {dates.map((item, dateIndex) => {
                  const isActive =
                    value.toDateString() === item.date.toDateString();

                  return (
                    <TouchableWithoutFeedback
                      key={dateIndex}
                      onPress={() => setValue(item.date)}
                    >
                      <View
                        style={[
                          styles.item,
                          isActive && {
                            backgroundColor: "cornflowerblue",
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
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 22,
                    }}
                  >
                    <Text>Placeholder Add Schedule</Text>
                    <FlatButton
                      text="Add Event"
                      onPressFunction={() => setModalVisible(!modalVisible)}
                    ></FlatButton>
                  </View>
                </Modal>
                {testTimes.map((item) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
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
    color: "cornflowerblue",
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
    borderColor: "cornflowerblue",
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
});
