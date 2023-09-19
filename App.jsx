import {
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Nav from './src/Components/Nav';
import {Component} from 'react';
import {Hoshi} from 'react-native-textinput-effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';

let data = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: '',
      openModal: false,
      index: -1,
      text: '',
      edit: false,
    };
  }

  inc = () => {
    return data.length + 1;
  };

  addNewTodo = () => {
    data.push({
      i: this.inc(),
      todo: this.state.newTodo,
      check: false,
    });
    this.setState({
      newTodo: '',
    });
  };

  componentDidMount() {
    this.getData();
  }

  storeData = async () => {
    try {
      await AsyncStorage.setItem('@todoData', JSON.stringify(data));
    } catch (err) {
      console.warn('Error while saving data!');
    }
  };

  getData = async () => {
    try {
      let value = await AsyncStorage.getItem('@todoData');
      const val = JSON.parse(value);
      if (val !== null) {
        data = val;
        this.setState({});
      }
    } catch (err) {
      console.warn('Error while fetching data!');
    }
  };

  editData = () => {
    this.setState({newTodo: this.state.text, edit: true, openModal: false});
  };

  onSubmitEdit = () => {
    data[this.state.index].todo = this.state.newTodo;
    this.setState({edit: false, newTodo: ''});
    this.storeData();
  };

  onSubmit = (value) => {
    if(value == ''){
      return false;
    }
    this.state.edit ? this.onSubmitEdit() : this.addNewTodo()
  }

  deleteData = index => {
    data.splice(index, 1);
    this.setState({openModal: false});
    this.storeData();
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#f5f5f5'}}>
        <StatusBar backgroundColor="blue" barStyle={'dark-content'} />
        <Nav />
        <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
          <FlatList
            data={data}
            renderItem={({item, index}) => (
              <TouchableOpacity
                key={index}
                style={{
                  marginHorizontal: 20,
                  marginVertical: 5,
                  borderWidth: 1,
                  borderColor: '#e0e0e0',
                  paddingVertical: 15,
                  borderRadius: 3,
                  backgroundColor: '#fff',
                  elevation: 1,
                }}
                onLongPress={() =>
                  this.setState({
                    openModal: true,
                    index: index,
                    text: item.todo,
                  })
                }
                >
                <Text style={{marginLeft: 10}}>{item.todo}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.i}
            style={{flex: 1, backgroundColor: '#f5f5f5'}}
          />
        </View>
        <Hoshi
          label={`${this.state.edit ? 'Edit' : 'Tambah'} Todo Baru`}
          borderColor={'#2196f3'}
          inputPadding={16}
          backgroundColor={'#F9F7F6'}
          value={this.state.newTodo}
          onChangeText={text => {
            this.setState({newTodo: text});
          }}
          onSubmitEditing={() => this.onSubmit(this.state.newTodo)}
        />
        <Modal isVisible={this.state.openModal}>
          <View
            style={{backgroundColor: 'white', padding: 10, borderRadius: 5}}>
            <TouchableOpacity
              style={{backgroundColor: '#2196f3', paddingVertical: 10}}
              onPress={() => this.editData(this.state.text)}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                Edit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#f44336',
                paddingVertical: 10,
                marginVertical: 10,
              }}
              onPress={() => this.deleteData(this.state.index)}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                Delete
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({openModal: false})}
              style={{backgroundColor: '#757575', paddingVertical: 10}}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}
export default App;
