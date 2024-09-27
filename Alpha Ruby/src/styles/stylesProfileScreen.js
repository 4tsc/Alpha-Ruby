import { StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4c4543',
  },
  header: {
    backgroundColor: '#cf4b24',
    paddingVertical: 10,
    height: height * 0.15,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: width * 0.1,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  label: {
    color: '#fff',
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  value: {
    color: '#fff',
    fontSize: width * 0.05,
    marginBottom: 20,
  },
  logoutButtonContainer: {
    padding: wp('5%'),
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});