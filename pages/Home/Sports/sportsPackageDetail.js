import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import InformationText from '../../../components/informationtext';
import * as Animatable from 'react-native-animatable';


LocaleConfig.locales['tr'] = {
  monthNames: [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık',
  ],
  monthNamesShort: [
    'Oca.',
    'Şub.',
    'Mar.',
    'Nis.',
    'May.',
    'Haz.',
    'Tem.',
    'Ağu.',
    'Eyl.',
    'Eki.',
    'Kas.',
    'Ara.',
  ],
  dayNames: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
  dayNamesShort: ['Paz.', 'Pzt.', 'Sal.', 'Çar.', 'Per.', 'Cum.', 'Cmt.'],
  today: 'Bugün',
};
LocaleConfig.defaultLocale = 'tr';


const ItemList = ({ item, selectedCategory }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeslot, setSelectedTimeslot] = useState(null);
  const [availableTimeslots, setAvailableTimeslots] = useState([]);
  const [isTimeSelectionVisible, setIsTimeSelectionVisible] = useState(false);
  const [isTransitionComplete, setIsTransitionComplete] = useState(false);  
  const [isAppointmentButtonVisible, setIsAppointmentButtonVisible] = useState(false);
  const items = selectedCategory; 

  console.log(items)

const handleDateSelect = (date) => {
  const selectedDay = date.dateString;
  setSelectedDate(selectedDay);
  setAvailableTimeslots(getAvailableTimeslots(selectedDay));
  setIsTransitionComplete(false);
  setIsTimeSelectionVisible(true);
};

const closedStartDate = items ? items.closed_start_date : null // Kapalı başlangıç tarihi
const closedEndDate = items ? items.closed_end_date : null; // Kapalı bitiş tarihi

// Kapalı tarih aralığını hesaplayın
const disabledDates = {};
let currentDate = new Date(closedStartDate);
const endDate = new Date(closedEndDate);

while (currentDate <= endDate) {
  const formattedDate = currentDate.toISOString().split('T')[0];
  disabledDates[formattedDate] = { disabled: true };
  currentDate.setDate(currentDate.getDate() + 1);
}

  const getAvailableTimeslots = (selectedDate) => {
    const openTime = items.open_time;
    const closeTime = items.close_time;
  
    const availableTimes = [];
  
    let startTime = parseInt(openTime.replace(':', ''));
    const endTime = parseInt(closeTime.replace(':', ''));
  
    while (startTime < endTime) {
      const startHour = Math.floor(startTime / 100);
      const startMinute = startTime % 100;
      const endHour = Math.floor((startTime + 100) / 100);
      const endMinute = (startTime + 100) % 100;
  
      const timeslot = `${formatTime(startHour, startMinute)} - ${formatTime(endHour, endMinute)}`; // Başlangıç ve bitiş saatlerini formatlayarak saat dilimini oluştur
      availableTimes.push(timeslot); // Saat dilimini listeye ekle
  
      startTime = addHour(startTime); // Başlangıç saatine 1 saat ekleyerek yeni başlangıç saati hesapla
    }
  
    return availableTimes;
  };
  
  const addHour = (time) => {
    let newTime = time + 100; // Başlangıç saatine 1 saat ekleniyor
  
    // Saat 24 olduğunda 0'a döner
    if (newTime >= 2400) {
      newTime = 0;
    }
  
    return newTime;
  };
  
  const formatTime = (hour, minute) => {
    const formattedHour = hour < 10 ? '0' + hour : hour.toString();
    const formattedMinute = minute < 10 ? '0' + minute : minute.toString();
  
    return `${formattedHour}:${formattedMinute}`;
  };
  
  
  const handleAppointmentBook = (timeslot) => {
    console.log('Randevu alındı:', timeslot, selectedDate);
    setSelectedTimeslot(timeslot);
    setIsAppointmentButtonVisible(true);
  };

  const handleGoBack = () => {
    setIsTimeSelectionVisible(false);

  };

  const handleConfirmAppointment = () => {
    console.log('Randevu onaylandı:', selectedTimeslot, selectedDate);
  };

  const calendarTheme = {
    backgroundColor: '#000000',
    calendarBackground: '#AAAAAA',
    textSectionTitleColor: '#0D0D0D',
    selectedDayBackgroundColor: '#FF6F25' ,
    selectedDayTextColor: '#FFFFFF',
    todayTextColor: '#333333',
    dayTextColor: '#333333',
    textDisabledColor: '#cccccc',
    dotColor: '#0D0D0D',
    selectedDotColor: '#0D0D0D',
    arrowColor: '#333333',
    monthTextColor: '#0D0D0D',
    indicatorColor: '#0D0D0D',
    textDayFontWeight: '800',
    textMonthFontWeight: '800',
    textDayHeaderFontWeight: '700',
    textDayFontSize: 18,
    textMonthFontSize: 20,
    textDayHeaderFontSize: 16,
  };

    return (
    <View key={selectedCategory?.id} style={styles.container}>
      {!isTimeSelectionVisible ? (
        <Animatable.View
        animation={isTimeSelectionVisible ? 'bounceOut' : 'pulse'}
        duration={800}
        style={{ top: -10, opacity: isTimeSelectionVisible ? 0 : 1 }}
      >
        <Calendar
          theme={calendarTheme}
          style={{ borderRadius: 7, }}
          onDayPress={handleDateSelect}
          markedDates={{
            [selectedDate]: { selected: true },
            ...disabledDates
            // Devre dışı bırakmak istediğiniz diğer tarihler...
          }}
          disableAllTouchEventsForDisabledDays={true}
          horizontal
          pagingEnabled
        />
        <View style={{bottom:10}}> 
        <InformationText text="Lütfen randevu almak istediğiniz tarihi seçiniz." />
        </View>
        </Animatable.View>
      ) : (
      <Animatable.View
      animation="bounceIn"
      duration={1000}
      style={[
        styles.timeSelectionContainer,
        isTransitionComplete && { opacity: 1 },
      ]}
      onAnimationEnd={() => setIsTransitionComplete(true)}
      >
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {availableTimeslots.map((timeslot) => (
              <TouchableOpacity
                key={timeslot}
                style={[
                  styles.timeslotButton,
                  selectedTimeslot === timeslot && styles.timeslotButtonSelected,
                ]}
                onPress={() => handleAppointmentBook(timeslot)}
              >
                <Text
                  style={[
                    styles.timeslotButtonText,
                    selectedTimeslot === timeslot && styles.timeslotButtonTextSelected,
                  ]}
                >
                  {timeslot}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Text style={styles.backButtonText}>Geri</Text>
          </TouchableOpacity>
          {!isAppointmentButtonVisible && (
            <View style={{ bottom:15,right:20 }} >
            <InformationText text="Lütfen randevu almak istediğiniz saati seçiniz." />
            </View>
          )}
          {isAppointmentButtonVisible && (
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmAppointment}>
              <Text style={styles.confirmButtonText}>
                Randevu Tarihi: {selectedDate} {selectedTimeslot}
              </Text>
              <Text style={styles.confirmButtonText2}>
              Randevuyu Al 
              </Text>
            </TouchableOpacity>
          )}
        </Animatable.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 35,
  },
  timeSelectionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    height: 280,
    width: '100%',
    marginBottom: 15,
  },
  timeslotButton: {
    width: '100%',
    height: 30,
    backgroundColor: '#AAAAAA',
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeslotButtonSelected: {
    backgroundColor: '#FF6F25',
  },
  backButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#0D0D0D',
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButton: {
    width: '100%',
    height: 80,
    backgroundColor: '#FF6F25',
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeslotButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0D0D0D',
  },
  timeslotButtonTextSelected: {
    color: '#FFFFFF',
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#AAAAAA',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop:5,
    marginBottom: 5,
  },
  confirmButtonText2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0D0D0D',
    textAlign: 'center',
  
  },
});

export default ItemList;
