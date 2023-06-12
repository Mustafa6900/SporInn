import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import InformationText from '../../../components/informationtext';
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

const ItemList = ({ items, onItemPress }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeslot, setSelectedTimeslot] = useState(null);
  const [availableTimeslots, setAvailableTimeslots] = useState([]);
  const [isTimeSelectionVisible, setIsTimeSelectionVisible] = useState(false);
  const [isAppointmentButtonVisible, setIsAppointmentButtonVisible] = useState(false);

  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
    setAvailableTimeslots(getAvailableTimeslots(date.dateString));
    setIsTimeSelectionVisible(true);
  };

  const getAvailableTimeslots = (selectedDate) => {
    // Seçilen güne göre boş olan saat dilimlerini hesaplayın ve döndürün
    // Bu, bir API isteği yaparak veya yerel olarak bir veri kümesini filtreleyerek gerçekleştirilebilir
    // Örneğin, burada sabit bir saat dilimi listesi döndürülecek:
    const availableTimes = ['09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
    return availableTimes;
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
    <View style={styles.container}>
      {!isTimeSelectionVisible ? (
        <View>
        <Calendar
          theme={calendarTheme}
          style={{ borderRadius: 7, }}
          onDayPress={handleDateSelect}
          markedDates={{ [selectedDate]: { selected: true } }}
          disableAllTouchEventsForDisabledDays={true}
        />
        <InformationText text="Lütfen randevu almak istediğiniz tarihi seçiniz." />
        </View>
      ) : (
        <View style={styles.timeSelectionContainer}>
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
        </View>
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
