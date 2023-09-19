import { Dimensions, StyleSheet, Text, View } from "react-native"
const width = Dimensions.get('screen').width;
const Nav = () => {
    return(
        <View style={Style.nav}>
            <Text style={{fontSize: 20, fontWeight: 'bold', letterSpacing: 1, color: "white"}}>Todo App</Text>
        </View>
    )
}
const Style = StyleSheet.create({
    nav: {
        width: width,
        height: 80,
        backgroundColor: '#2196f3',
        display: "flex",
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginBottom: 10
    }
})
export default Nav