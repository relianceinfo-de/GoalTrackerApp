import { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
import { StatusBar } from 'expo-status-bar';

export default function App() {

  const [courseGoals, setCourseGoals] = useState([])
  const [modalIsVisible, setModalIsVisible] = useState(false)

  function startAddGoalHandler () {
    setModalIsVisible(true)
  }

  function endAddGoalHandler () {
    setModalIsVisible(false)
  }

  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    endAddGoalHandler()
  };

  function deleteGoalHandler(id) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id )
    })
  }


  return (
    <>
      <StatusBar style='auto'/>

      <View style={styles.appContainer}>
 
        <Button title='Add new Goal' color="#a065ec" onPress={startAddGoalHandler}/>

        {/* one way to show modal, when the button above is clicked {modalIsVisible && <GoalInput onAddGoal={addGoalHandler} />} */}

        <GoalInput visible={modalIsVisible} onAddGoal={addGoalHandler} onCancel={endAddGoalHandler} />

        <View style={styles.goalsContainer}>

          {/* It's recommended to use FlatList instead of ScrollView to render long dynamic lists that you want scrollable. */}
          
          {/* Using FlatList */}
          <FlatList data={courseGoals} alwaysBounceVertical={false} renderItem={(itemData) => {
              return (
                <GoalItem text={itemData.item.text} id={itemData.item.id} onDeleteItem={deleteGoalHandler} />
              )
            }}
            keyExtractor={(item, index) => {
              return (
                item.id
              )
            }}
          />
          
          {/* Using ScrollView */}
          {/* <ScrollView>
            {courseGoals.map((goal) => 
                <View style={styles.goalItem} key={goal}>
                  <Text style={styles.goalText}>{goal}</Text>
                </View>
              )}
          </ScrollView> */}

        </View>
      </View>
    </>
    
  );
}

const styles = StyleSheet.create({
    appContainer: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 16,

  },
  
  goalsContainer: {
    flex: 5,
  },
 
});
