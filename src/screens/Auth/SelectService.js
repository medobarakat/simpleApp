import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Base_Url, Get_Service} from '../../constants/Apis';
import {Button} from 'native-base';

const SelectService = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const url = Base_Url + Get_Service + `?pageNumber=${page}&pageSize=20`;
    try {
      setLoading(true);
      const response = await axios.get(url);
      const jsonData = response.data.content;
      console.log(jsonData);
      setData(jsonData);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const loadMoreData = async () => {
    const url = Base_Url + Get_Service + `?pageNumber=${page + 1}&pageSize=20`;
    try {
      setLoading(true);
      const nextPage = page + 1;
      const response = await axios.get(url);
      const jsonData = response.data.content;
      console.log(nextPage);
      console.log(jsonData);

      setData(prevData => [...prevData, ...jsonData]);
      setPage(nextPage);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const renderItem = ({item}) => <Text>{item.title}</Text>;

  const keyExtractor = item => item.id.toString();

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
      />
      <Button onPress={loadMoreData}>
        {loading ? (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <Text style={styles.loadMoreText}>Load More</Text>
        )}
      </Button>
    </View>
  );
};

export default SelectService;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  loadingIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loadMore: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    width: '80%',
    backgroundColor: '#233123',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  loadMoreText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
