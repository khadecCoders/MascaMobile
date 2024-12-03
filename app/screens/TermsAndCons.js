import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Card, Text } from 'react-native-paper'
import myTheme from '../utils/theme';
import { useLogin } from '../utils/LoginProvider';
import Header from '../Components/Header';

const TermsAndCons = ({ navigation }) => {
  
    const { COLORS, screenHeight, screenWidth, STYLES } = myTheme();
    const { isLoggedIn, setIsLoggedIn, profile, setProfile } = useLogin();
  
    return (
      <View style={{backgroundColor: COLORS.surface}}>
      <Header title='Ts & Cs' titleColor={COLORS.outline}/>
        <ScrollView style={{paddingHorizontal: 10, marginBottom: 110}}>
        <Text style={{fontSize: 19, fontFamily: 'DMSansSemiBold', color: COLORS.onSurfaceVariant, marginTop: 10,textDecorationLine: 'underline'}}>Introduction:</Text>
        <Text style={{fontSize: 18, fontFamily: 'DMSansRegular', color: COLORS.outline}}>Welcome to MASCA-Mobile, your go-to platform for cyber security training at MASCA. Before you embark on your journey to enhance your knowledge and skills in protecting our organization's digital assets, we kindly ask you to review and acknowledge the following terms and conditions:</Text>
  
        <Text style={{fontSize: 19, fontFamily: 'DMSansSemiBold', color: COLORS.onSurfaceVariant, marginTop: 10,textDecorationLine: 'underline'}}>User Responsibilities:</Text>
        <Text style={{fontSize: 18, fontFamily: 'DMSansRegular', color: COLORS.outline}}>a. Constantly checking for application updates and installing them on your device to ensure you have access to the latest content and features.</Text>
        <Text style={{fontSize: 18, fontFamily: 'DMSansRegular', color: COLORS.outline}}>b. Checking for newly uploaded information regularly to stay informed about the latest cyber security practices and updates.</Text>
        <Text style={{fontSize: 18, fontFamily: 'DMSansRegular', color: COLORS.outline}}>c. Giving your feedback on every lesson uploaded. Your feedback is crucial for providing evidence to auditors that every staff member participated and helps the IT team assess user needs versus the content delivered, enabling us to structure lessons accordingly for maximum effectiveness.</Text>
        <Text style={{fontSize: 18, fontFamily: 'DMSansRegular', color: COLORS.outline}}>d. Maintaining the confidentiality of your MASCA-Mobile account credentials.</Text>
  
        <Text style={{fontSize: 19, fontFamily: 'DMSansSemiBold', color: COLORS.onSurfaceVariant, marginTop: 10,textDecorationLine: 'underline'}}>IT Department's Responsibilities:</Text>
        <Text style={{fontSize: 18, fontFamily: 'DMSansRegular', color: COLORS.outline}}>a. Maintaining and updating the MASCA-Mobile app.</Text>
        <Text style={{fontSize: 18, fontFamily: 'DMSansRegular', color: COLORS.outline}}>b. Generating Content For User Training.</Text>
        <Text style={{fontSize: 18, fontFamily: 'DMSansRegular', color: COLORS.outline}}>b. Training users on how to use the app.</Text>
        <Text style={{fontSize: 18, fontFamily: 'DMSansRegular', color: COLORS.outline}}>c. Folowing up to ensure participation of all staff members and escalating issues to the company's authorities in cases of resistance.</Text>
  
        <Text style={{fontSize: 19, fontFamily: 'DMSansSemiBold', color: COLORS.onSurfaceVariant, marginTop: 10,textDecorationLine: 'underline'}}>Usage Guidelines:</Text>
        <Text style={{fontSize: 18, fontFamily: 'DMSansRegular', color: COLORS.outline}}>a. The content provided in MASCA-Mobile is solely for internal training purposes at MASCA.</Text>
        <Text style={{fontSize: 18, fontFamily: 'DMSansRegular', color: COLORS.outline}}>b. Any unauthorized distribution or reproduction of the app's content is strictly prohibited.</Text>
      </ScrollView>
      </View>
    )
}

export default TermsAndCons

const styles = StyleSheet.create({})