import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const FutsalScoreApp = () => {
  const [teamAScore, setTeamAScore] = useState(0);
  const [teamBScore, setTeamBScore] = useState(0);

  const [scoreAnimationA] = useState(new Animated.Value(1));
  const [scoreAnimationB] = useState(new Animated.Value(1));

  const teamA = "Team 1";
  const teamB = "Team 2";

  // Effect untuk memantau perubahan skor dan menampilkan alert
  useEffect(() => {
    if (teamAScore === 10) {
      console.log(`${teamA} menang!`); // Log untuk debug
      window.alert(`${teamA} menang!`); // Gunakan window.alert untuk aplikasi web
    } else if (teamBScore === 10) {
      console.log(`${teamB} menang!`); // Log untuk debug
      window.alert(`${teamB} menang!`); // Gunakan window.alert untuk aplikasi web
    }
  }, [teamAScore, teamBScore]); // Triggered when teamAScore or teamBScore changes

  const incrementScore = (team) => {
    if (team === 'A' && teamAScore < 10) {
      setTeamAScore(teamAScore + 1);
      animateScoreChange(scoreAnimationA);
    } else if (team === 'B' && teamBScore < 10) {
      setTeamBScore(teamBScore + 1);
      animateScoreChange(scoreAnimationB);
    }
  };

  const decrementScore = (team) => {
    if (team === 'A') {
      setTeamAScore(Math.max(0, teamAScore - 1));
    } else if (team === 'B') {
      setTeamBScore(Math.max(0, teamBScore - 1));
    }
  };

  const resetScores = () => {
    setTeamAScore(0);
    setTeamBScore(0);
  };

  const animateScoreChange = (scoreAnimation) => {
    Animated.sequence([
      Animated.spring(scoreAnimation, {
        toValue: 1.2,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.spring(scoreAnimation, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pertandingan Futsal</Text>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableHeader, styles.alignLeft]}>Tim</Text>
          <Text style={styles.tableHeader}>Skor</Text>
          <Text style={styles.tableHeader}>Aksi</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.alignLeft]}>{teamA}</Text>
          <Animated.Text style={[styles.tableCell, styles.score, { transform: [{ scale: scoreAnimationA }] }]}>
            {teamAScore}
          </Animated.Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.button} onPress={() => incrementScore('A')}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => decrementScore('A')}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.alignLeft]}>{teamB}</Text>
          <Animated.Text style={[styles.tableCell, styles.score, { transform: [{ scale: scoreAnimationB }] }]}>
            {teamBScore}
          </Animated.Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.button} onPress={() => incrementScore('B')}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => decrementScore('B')}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={resetScores}>
        <Text style={styles.resetButtonText}>Reset Pertandingan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 10,
    alignItems: 'center',
  },
  tableHeader: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableCell: {
    flex: 1,
    fontSize: 20,
    textAlign: 'center',
  },
  alignLeft: {
    textAlign: 'left',
    paddingLeft: 10,
  },
  score: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 120,
  },
  button: {
    backgroundColor: '#ff6347',
    padding: 10,
    margin: 5,
    borderRadius: 8,
    width: 40,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#32cd32',
    padding: 15,
    marginTop: 40,
    borderRadius: 8,
    width: 250,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FutsalScoreApp;
