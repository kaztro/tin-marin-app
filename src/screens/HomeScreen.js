import { noConflict } from 'lodash';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Covid from '../assets/Covid.jpeg';
import FAQs from '../assets/FAQs.jpeg';
import WebLinks from '../assets/WebLinks.jpg';
import Sugerencias from '../assets/Sugerencias.png';
import Exhibicion from '../assets/Exhibicion.jpg';
import { 
  playButtonPress, 
  heyListenButton,
  wowButton, 
  msnButton,
  catcButton,
  ohhButton
} from '../helpers/audio';
import ConocenosMas from '../assets/ConocenosMas.jpg';

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.view}>
        <TouchableOpacity onPress={playButtonPress}>
          <Text style={styles.title}>Menu Principal</Text>
        </TouchableOpacity>

        <View style={styles.line}></View>

        <TouchableOpacity
          onPressIn={playButtonPress}
          onPress={() => {
            navigation.navigate('exhibits');
          }}
          style={styles.cardContainer}>
          <ImageBackground
            imageStyle={{ opacity: 0.5 }}
            source={Exhibicion}
            style={styles.card}
            borderRadius={10}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Exhibiciones</Text>
              <Text style={styles.text2}>
                Ven y conoce todas nuestras exhibiciones disponibles para que
                las puedas visitar !
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          onPressIn={heyListenButton}
          onPress={() => {
            navigation.navigate('covid');
          }}
          style={styles.cardContainer}>
          <ImageBackground
            imageStyle={{ opacity: 0.5 }}
            source={Covid}
            style={styles.card}
            borderRadius={10}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Recomendaciones Covid-19</Text>
              <Text style={styles.text2}>
                Toma en cuenta las siguientes recomendaciones al visitarnos!
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          onPressIn={ohhButton}
          onPress={() => {
            navigation.navigate('knowMore');
          }}
          style={styles.cardContainer}>
          <ImageBackground
            imageStyle={{ opacity: 0.5 }}
            source={ConocenosMas}
            style={styles.card}
            borderRadius={10}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Conocenos Más</Text>
              <Text style={styles.text2}>
                Aqui puedes encontrar informacion de contacto, estamos a la
                orden!
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          onPressIn={msnButton}
          onPress={() => {
            navigation.navigate('comments');
          }}
          style={styles.cardContainer}>
          <ImageBackground
            imageStyle={{ opacity: 0.5 }}
            source={Sugerencias}
            style={styles.card}
            borderRadius={10}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Sugerencias</Text>
              <Text style={styles.text2}>
                Para seguir mejorando, puedes dejarnos cualquier duda o
                inquietud!
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          onPressIn={catcButton}
          onPress={() => {
            navigation.navigate('FAQs');
          }}
          style={styles.cardContainer}>
          <ImageBackground
            imageStyle={{ opacity: 0.5 }}
            source={FAQs}
            style={styles.card}
            borderRadius={10}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Preguntas Frecuentes</Text>
              <Text style={styles.text2}>
                Por si tienes alguna consulta para resolver de forma rápida!
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          onPressIn={wowButton}
          onPress={() => {
            navigation.navigate('WebLinks');
          }}
          style={{ ...styles.cardContainer, marginBottom: 30 }}>
          <ImageBackground
            imageStyle={{ opacity: 0.5 }}
            source={WebLinks}
            style={styles.card}
            borderRadius={10}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Sitios de Interés</Text>
              <Text style={styles.text2}>
                Si deseas profundizar un poco más en otros temas relevantes!
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'NunitoSans-Bold',
    marginTop: 20,
    fontSize: 30,
    color: '#566573',
    fontWeight: 'bold',
  },
  line: {
    height: 1,
    width: '90%',
    backgroundColor: '#D5D8DC',
  },
  card: {
    width: 350,
    height: 200,
    backgroundColor: 'rgb(0,0,0)',
    borderRadius: 10,
  },

  cardContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 40,
  },
  textContainer: {
    marginLeft: 20,
    marginTop: 20,
  },
  text: {
    fontFamily: 'NunitoSans-Bold',
    color: 'white',
    fontSize: 25,
  },
  text2: {
    fontFamily: 'NunitoSans-Bold',
    color: 'white',
    fontSize: 15,
  },
});

export default HomeScreen;
