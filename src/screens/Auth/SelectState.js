import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Light_Sec_color, Sec_color} from '../../constants/Colors';
import statesData from '../../constants/statesData';

const SelectState = ({navigation, route}) => {
  const {selectedState, handleStateSelection} = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleServiceSelectioninside = selectedItem => {
    handleStateSelection(selectedItem.name);
    navigation.goBack();
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    // console.log(selectedState);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setData(statesData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const renderItem = ({item}) => {
    const isSelected = item?.name === selectedState;
    return (
      <TouchableOpacity
        onPress={() => handleServiceSelectioninside(item)}
        style={[
          styles.singleService,
          isSelected && styles.selectedService, // Apply different style if selected
        ]}>
        <Text style={styles.txt}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const keyExtractor = item => item.id.toString();

  return (
    <View style={styles.container}>
      {loading === true ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
};

export default SelectState;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  singleService: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: Sec_color, // Use Sec_color as the background color
  },
  txt: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
  },
  selectedService: {
    backgroundColor: Light_Sec_color, // Use Light_Sec_color as the background color when selected
  },
});
