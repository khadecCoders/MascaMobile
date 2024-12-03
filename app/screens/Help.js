import {StyleSheet,View } from 'react-native'
import {Divider, Text } from 'react-native-paper'
import myTheme from '../utils/theme';
import Header from '../Components/Header';
import {
    MaterialIcons,
    MaterialCommunityIcons
  } from "@expo/vector-icons";

const Help = ({ navigation }) => {
    const { COLORS, screenHeight, screenWidth, STYLES } = myTheme();

  return (
    <View style={[styles.container,  {backgroundColor: COLORS.surface}]}>
            <Header title='Help Desk Contacts' titleColor={COLORS.outline}/>

            <View style={{width: '95%', padding: 10, marginTop: 8}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5, paddingVertical: 8}}>
                    <Text style={STYLES.textNormal}>mgumbo@masca.co.zw</Text>
                    <MaterialIcons name="email" size={25} color={COLORS.outline} />
                </View>
                <Divider />
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5, paddingVertical: 8}}>
                    <Text style={STYLES.textNormal}>Ext-203 (M Gumbo)</Text>
                    <MaterialIcons name="phone" size={25} color={COLORS.outline} />
                </View>
                <Divider />
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5, paddingVertical: 8}}>
                    <Text style={STYLES.textNormal}>ptshuma@masca.co.zw</Text>
                    <MaterialIcons name="email" size={25} color={COLORS.outline} />
                </View>
                <Divider />
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5, paddingVertical: 8}}>
                    <Text style={STYLES.textNormal}>Ext-230 (P Tshuma)</Text>
                    <MaterialIcons name="phone" size={25} color={COLORS.outline} />
                </View>
                <Divider />
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5, paddingVertical: 8}}>
                    <Text style={STYLES.textNormal}>it@masca.co.zw</Text>
                    <MaterialIcons name="email" size={25} color={COLORS.outline} />
                </View>
                <Divider />
                <Divider />
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5, paddingVertical: 8}}>
                    <Text style={STYLES.textNormal}>Ext-205 (K Ncube)</Text>
                    <MaterialIcons name="phone" size={25} color={COLORS.outline} />
                </View>
                <Divider />
            </View>
    </View>
  )
}

export default Help

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 15
    },
})