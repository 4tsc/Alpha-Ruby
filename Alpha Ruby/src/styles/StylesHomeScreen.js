import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4c4543',
  },
  header: {
    backgroundColor: '#cf4b24',
    paddingVertical: hp('2%'),
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    flexDirection: 'row',
  },
  headerText: {
    color: '#fff',
    fontSize: wp('8%'),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: wp('5%'),
  },
  cardsSection: {
    marginBottom: hp('2%'),
  },
  sectionTitle: {
    color: '#fff',
    fontSize: wp('6%'),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    backgroundColor: '#2a2827',
    marginHorizontal: wp('1%'),
    padding: wp('5%'),
    height: hp('20%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    color: '#fff',
    textAlign: 'center',
  },
  newsSection: {
    marginTop: hp('2%'),
  },
  newsContainer: {
    marginTop: hp('1%'),
  },
  newsItem: {
    backgroundColor: '#2a2827',
    marginBottom: hp('1%'),
    padding: wp('2.5%'),
    borderRadius: 8,
  },
  newsText: {
    color: '#fff',
    textAlign: 'center',
  },
});