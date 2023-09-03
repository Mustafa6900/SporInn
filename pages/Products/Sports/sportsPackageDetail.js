import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView,ActivityIndicator  } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import InformationText2 from '../../../components/informationtext2';
import * as Animatable from 'react-native-animatable';
import { supabase } from "../../../supabaseClient.js";
import { useNavigation } from '@react-navigation/native';

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


const ItemList = ({selectedCategory }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeslot, setSelectedTimeslot] = useState(null);
  const [availableTimeslots, setAvailableTimeslots] = useState([]);
  const [isTimeSelectionVisible, setIsTimeSelectionVisible] = useState(false);
  const [isTransitionComplete, setIsTransitionComplete] = useState(false);  
  const [isAppointmentButtonVisible, setIsAppointmentButtonVisible] = useState(false);
  const [isAppointmentTaken, setIsAppointmentTaken] = useState(false);
  const [appointmentsMade, setAppointmentsMade] = useState([]);
  const items = selectedCategory;
  const navigation = useNavigation();

  
  
  useEffect(() => {
    const fetchAppointments = async () => {
      const { data: appointments, error } = await supabase
        .from('users_appointments')
        .select('*')
      if (error) {
        console.error(error);
        return;
      }
      setAppointmentsMade(appointments);
      
    };
    fetchAppointments();
  }, []); 

  useEffect(() => {
    setIsTimeSelectionVisible(false);
    setSelectedTimeslot('');
    setIsAppointmentButtonVisible(false);
    setIsAppointmentTaken(false);
    setSelectedDate(null);
  }, [selectedCategory]);
  

  const getDisabledDates = (closedDays) => {
    const disabledDates = {};

    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 10; // 10 yıl öncesinden başlayarak tüm yılları kontrol edebilirsiniz
    const endYear = currentYear + 10; // 10 yıl ilerisine kadar tüm yılları kontrol edebilirsiniz

    const disabledDayNumbers = closedDays && Array.isArray(closedDays)
      ? closedDays.map((dayName) => {
          switch (dayName) {
            case 'Pazartesi':
              return 1;
            case 'Salı':
              return 2;
            case 'Çarşamba':
              return 3;
            case 'Perşembe':
              return 4;
            case 'Cuma':
              return 5;
            case 'Cumartesi':
              return 6;
            case 'Pazar':
              return 0;
            default:
              return null;
          }
        }).filter((dayNumber) => dayNumber !== null)
      : [];

    for (let year = startYear; year <= endYear; year++) {
      for (let month = 0; month < 12; month++) {
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);

        for (let day = firstDayOfMonth.getDate(); day <= lastDayOfMonth.getDate(); day++) {
          const currentDate = new Date(year, month, day);

          if (disabledDayNumbers.includes(currentDate.getDay())) {
            const disabledDateString = currentDate.toISOString().split('T')[0];
            disabledDates[disabledDateString] = { disabled: true };
          }
        }
      }
    }

    return disabledDates;
  };
  const closedDays = items && items.closed_days ? JSON.parse(items.closed_days) : null;
  const disabledDays = getDisabledDates(closedDays);
 
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
    setSelectedTimeslot(timeslot);
    setIsAppointmentButtonVisible(true);
    const appointmentsMades = appointmentsMade
      .filter(appointment => appointment.packages_id === selectedCategory.id)
      .map(appointment => appointment.purchase_date);
      
    
    const [startTime, endTime] = timeslot.split(' - ');
    
    const startDate = new Date(`${selectedDate}T${startTime}`);
    const formattedStartDate = startDate.toJSON();
    const formattedStartDateUTC = new Date(formattedStartDate).toISOString();
    const purchaseDatesUTC = appointmentsMades.map(appointment => new Date(appointment).toISOString());
    const isAppointmentTaken = purchaseDatesUTC.includes(formattedStartDateUTC);
    
    if (isAppointmentTaken) {
      setIsAppointmentTaken(true);
    } else {
      setIsAppointmentTaken(false);
    }
  };

  const handleGoBack = () => {
    setIsTimeSelectionVisible(false);

  };
  const handleConfirmAppointment = async () => {
    const [startTime, endTime] = selectedTimeslot.split(' - ');
    const purchaseDate = new Date(`${selectedDate}T${startTime}`);
    const endDate = new Date(`${selectedDate}T${endTime}`);
    const purchaseDateUTC = purchaseDate.toISOString();
    const endDateUTC = endDate.toISOString();
    navigation.navigate('PaymentSports',  { items, purchaseDateUTC, endDateUTC });
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
            ...disabledDates,
            ...disabledDays,
            // Devre dışı bırakmak istediğiniz diğer tarihler...
          }}
          disableAllTouchEventsForDisabledDays={true}
          horizontal
          pagingEnabled
        />
        <View style={{bottom:10}}> 
        <InformationText2 text="Lütfen randevu almak istediğiniz tarihi seçiniz." />
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
                  isAppointmentTaken && selectedTimeslot === timeslot && { backgroundColor: '#0d0d0d' },
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
          {!isAppointmentButtonVisible && !isAppointmentTaken && (
  <View style={{ bottom: 15, right: 20 }}>
    <InformationText2 text="Lütfen randevu almak istediğiniz saati seçiniz." />
  </View>
)}

{isAppointmentButtonVisible && !isAppointmentTaken && (
  <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmAppointment}>
    <Text style={styles.confirmButtonText}>
      Randevu Tarihi: {selectedDate} {selectedTimeslot}
    </Text>
    <Text style={styles.confirmButtonText2}>
      Randevuyu Al
    </Text>
  </TouchableOpacity>
)}

{isAppointmentTaken && (
  <View style={[styles.confirmButton, { backgroundColor: '#0d0d0d'}]}>
    <Text style={[styles.confirmButtonText,{ color:"#AAAAAA" }]}>
      Seçtiğiniz Randevu Tarihi Dolu, Lütfen Başka Bir Tarih Seçiniz.
    </Text>
  </View>
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
    marginTop: 20,
  },
  timeSelectionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    height: 280,
    width: '100%',
    marginBottom: 5,
  },
  timeslotButton: {
    width: '100%',
    height: 25,
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
    height: 35,
    backgroundColor: '#0D0D0D',
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButton: {
    width: '100%',
    height: 60,
    backgroundColor: '#FF6F25',
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  timeslotButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D0D0D',
  },
  timeslotButtonTextSelected: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#AAAAAA',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D0D0D',
    textAlign: 'center',
    marginTop:5,
    marginBottom: 5,
    marginTop: 10,
  },
  confirmButtonText2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default ItemList;
