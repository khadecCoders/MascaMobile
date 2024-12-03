import { ScrollView, StyleSheet,View } from 'react-native'
import {Text } from 'react-native-paper'
import myTheme from '../utils/theme';
import Header from '../Components/Header';

const About = ({ navigation }) =>  {

  const { COLORS,} = myTheme();

  return (
    <View style={{backgroundColor: COLORS.surface, flex: 1}}>
      <Header title='About MASCA Mobile' titleColor={COLORS.outline}/>
          <ScrollView style={{paddingHorizontal: 10, paddingVertical: 10}}>
          <Text style={{fontSize: 19, fontFamily: 'DMSansRegular', color: COLORS.outline, fontWeight:'bold',textDecorationLine: 'underline'}}>Developer's Note:</Text>
              <Text style={{fontSize: 18, fontFamily: 'DMSansRegular', color: COLORS.outline}}>The MASCA-Mobile app is a training tool tailored to educate MASCA employees on vital cyber-security practices. Our comprehensive program covers the protection of business documents, emails, and both cloud-hosted and internally-hosted software systems housing MASCA's sensitive data. Through these modules , staff members will learn how to identify and thwart cyber threats effectively, ensuring the confidentiality and integrity of MASCA's digital assets and data. Your role as an employee is to be the first line of defense against cyber attacks. Join the IT team in fortifying our organization's security posture.
          </Text>
          </ScrollView>
    </View>

  )
}

export default About
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 15
    },
})