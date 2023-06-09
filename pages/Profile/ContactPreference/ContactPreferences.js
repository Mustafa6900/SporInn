import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, ScrollView,Image,SafeAreaView} from 'react-native';
import Header from '../../../components/header';
import BackButton from '../../../components/backbutton';
import CheckButton from '../../../components/checkbutton';

export default function ContactPreferences(){
   const [checkedEposta, setCheckedEposta] = useState(true);
   const [checkedNotification, setCheckedNotification] = useState(true);
   const [checkedSms, setCheckedSms] = useState(true);
   const [checkedPhone, setCheckedPhone] = useState(true);

    const handleEpostaPress = (index) => {
        setCheckedEposta(!checkedEposta);
    }
    const handleNotificationPress = (index) => {
        setCheckedNotification(!checkedNotification);
    }
    const handleSmsPress = (index) => {
        setCheckedSms(!checkedSms);
    }
    const handlePhonePress = (index) => {
        setCheckedPhone(!checkedPhone);
    }

    return(
        <SafeAreaView style={styles.container}>
            <Header title="İletişim Tercihleri" />
            <BackButton left={15} top={43} />
            <View>
                <View style={styles.buttons}>
                    <View style={{flexDirection:"column"}}>
                    <Text style={{ fontSize: 20, marginLeft: 20, fontWeight: '900', marginBottom: 10, marginTop: 15 }}>E-posta</Text>
                    <Text style={{ fontSize: 15, marginLeft: 20, width: 310, marginBottom: 20, fontWeight: '500' }}>Kampanyalarla ilgili e-posta almak istiyorum.</Text>
                    </View>
                    <CheckButton 
                     title="✓"
                     onPress={handleEpostaPress}
                     checked={checkedEposta}
                     styletip={{ backgroundColor: '#AAAAAA',justifyContent:"center",alignItems:"center",marginLeft:"auto",marginRight:20,marginTop:"auto",marginBottom:"auto"}}
                    />
                </View>
                <View style={styles.buttons}>
                    <View style={{flexDirection:"column"}}>
                    <Text style={{ fontSize: 20, marginLeft: 20, fontWeight: '900', marginBottom: 10, marginTop: 15 }}>Bildirim</Text>
                    <Text style={{ fontSize: 15, marginLeft: 20, width: 310, marginBottom: 10, fontWeight: '500' }}>Kampanyalarla ilgili bildirim almak istiyorum.</Text>
                    </View>
                    <CheckButton
                        title="✓"
                        onPress={handleNotificationPress}
                        checked={checkedNotification}
                        styletip={{ backgroundColor: '#AAAAAA',justifyContent:"center",alignItems:"center",marginLeft:"auto",marginRight:20,marginTop:"auto",marginBottom:"auto"}}
                    />
                </View>
                <View style={styles.buttons}>
                    <View style={{flexDirection:"column"}}>
                    <Text style={{ fontSize: 20, marginLeft: 20, fontWeight: '900', marginBottom: 10, marginTop: 15 }}>SMS</Text>
                    <Text style={{ fontSize: 15, marginLeft: 20, width: 310, marginBottom: 10, fontWeight: '500' }}>Kampanyalarla ilgili SMS almak istiyorum.</Text>
                    </View>
                    <CheckButton
                        title="✓"
                        onPress={handleSmsPress}
                        checked={checkedSms}
                        styletip={{ backgroundColor: '#AAAAAA',justifyContent:"center",alignItems:"center",marginLeft:"auto",marginRight:20,marginTop:"auto",marginBottom:"auto"}}
                    />
                </View>
                <View style={styles.buttons}>
                    <View style={{flexDirection:"column"}}>
                    <Text style={{ fontSize: 20, marginLeft: 20, fontWeight: '900', marginBottom: 10, marginTop: 15 }}>Telefon</Text>
                    <Text style={{ fontSize: 15, marginLeft: 20, width: 310, marginBottom: 10, fontWeight: '500' }}>Kampanyalarla ilgili cep telefonumdan aranmak istiyorum.</Text>
                    </View>
                    <CheckButton
                        title="✓"
                        onPress={handlePhonePress}
                        checked={checkedPhone}
                        styletip={{ backgroundColor: '#AAAAAA',justifyContent:"center",alignItems:"center",marginLeft:"auto",marginRight:20,marginTop:"auto",marginBottom:"auto"}}
                    />
                </View>
                <View style={styles.buttons}>
                    <Text style={{ fontSize: 15, marginLeft: 20, width: 360, marginBottom: "auto", fontWeight: '500',marginTop:"auto" }}>
                    Kampanyalarla ilgiliiletişim tercihlerinizi kapattığınızda siparişleriniz ve üyelik ayarlarınızla ilgili e-posta, bildirim, SMS veya telefon almaya devam edebilirsiniz.
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#292929",
    },
    buttons: {
        flexDirection: 'row',
        backgroundColor: "#AAAAAA",
        height: 100,
        borderRadius: 3,
        marginBottom: 10,
        marginTop: 15,
    },


});