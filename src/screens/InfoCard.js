import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { IconButton, Text, Title } from 'react-native-paper';
import { getExhibitionById } from '../api/exhibitions';
//import { getQuizById } from '../api/quizzes'
import ModalBody from '../components/ModalBody';
import { ScrollView } from 'react-native-gesture-handler';
import { map, size } from 'lodash';
import Colors from '../constants/Colors';
import { SliderBox } from 'react-native-image-slider-box';
import StarRatings from './StarRatings';
import curiosidades1 from '../assets/icons/curiosidades1.png';

/**
 * Pantalla que muestra los detalles de una Exhibición.
 * @param {prop} route - Recibe parametros importantes para mostrar en pantalla
 * @param {prop} navigation - Contiene información básica de navegación
 * @param {string} _id - ID asociado a una Exhibición.
 * @property {Object} exhibition - Objeto que contiene la estructura de una Exhibición.
 * @property {function} setExhibition - Método de acceso indirecto para modificar la propieadad exhibition.
 * @property {boolean} visible - Variable auxiliar para controlar la visibilidad de un componente <Modal>.
 * @property {function} setVisible - Método de acceso indirecto para modificar la propieadad visible.
 * @property {function} useEffect - Hook de React que permite realizar tareas asíncronas a la vista.
 * @property {function} useState - Hook de React que permite crear una variable de estado con su método accesor.
 * @property {Promise} getExhibitionById - {@link getExhibitionById} | Promesa que devuelve la información dependiendo la respuesta del servidor.
 * @property {function} size - Función de la librería lodash | Devuelve el tamaño de una colección.
 * @property {function} map - Función de la librería lodash | Crea un arreglo de valores a partir de cada elemento de una colección.
 * @listens {onPress} | El método showModal se dispara cuando ocurre este evento en un componente <ModalButton>.
 * @see https://lodash.com/docs/4.17.15#size
 * @see https://reactjs.org/docs/hooks-state.html
 * @see https://reactnavigation.org/docs/route-prop/
 * @see https://lodash.com/docs/4.17.15#map
 * @return {SafeAreaView} Retorna un componente que contiene maquetada la vista
 */

const InfoCard = ({ route, navigation }) => {
  const { _id } = route.params;
  const [visible, setVisible] = useState(false);
  const [exhibition, setExhibition] = useState(null);
  const [questions, setQuestions] = useState(null);

  const showModal = () => setVisible(!visible);

  useEffect(() => {
    getExhibitionById(_id).then((response) => {
      setQuestions(response.questions);
      setExhibition(response);
    });
  }, []);

  if (!exhibition) return null;

  const imageURL = exhibition.images;
  const [logoURL] = exhibition.sponsorLogo;
  console.log(exhibition)

  return (
    <SafeAreaView >
      <ScrollView showsVerticalScrollIndicator={false}>
        <InfoImage path={imageURL} />
        <InfoModal setVisible={setVisible} />
        <InfoTitle exhibition={exhibition} />
        <Text style={styles.overview}>{exhibition.description}</Text>
        <InfoFooter exhibition={exhibition} />
        {logoURL && <InfoSponsor url={logoURL} />}
        <InfoFooter exhibition={exhibition} />
        <StarRatings />
        <TouchableOpacity
          onPress={() => {
            //console.log(questions);
            navigation.navigate('quiz', questions);
          }}
          style={{
            marginTop: 20, width: '100%', backgroundColor: Colors.accent, padding: 20, borderRadius: 5
          }}>
          <Text style={{ fontSize: 20, color: Colors.white, textAlign: 'center' }}>Realiza un test</Text>
        </TouchableOpacity>
      </ScrollView>
      <ModalBody
        visible={visible}
        showModal={showModal}
        curiousInfo={exhibition.curiousInfo}
      />
    </SafeAreaView >
  );
};

export default InfoCard;

/**
 *@ignore
 */
const InfoImage = ({ path }) => {
  const [imgActive, setimgActive] = useState(0);

  return (
    /* <View style={styles.viewPoster}>
      {path.map((e, index) => (
        <Image key={e} style={styles.poster} source={{ uri: e }} />
      ))}
    </View>*/
    <SliderBox
      images={path}
      sliderBoxHeight={400}
      onCurrentImagePressed={(index) => console.warn(`image ${index} pressed`)}
      currentImageEmitter={(index) => console.warn(`current pos is: ${index}`)}
    />
  );
};

/**
 *@ignore
 */
const InfoModal = ({ setVisible }) => {
  return (
    <View style={styles.viewModal}>
      <IconButton
        icon="google-downasaur"
        size={40}
        color="#97be0d"
        style={styles.info}
        onPress={() => setVisible(true)}
      />
    </View>
  );
};

/**
 *@ignore
 */
const InfoTitle = ({ exhibition }) => {
  return (
    <View style={styles.viewInfo}>
      <Title style={{ color: '#F29F05', fontWeight: 'bold', fontSize: 23, textAlign: 'center' }}>
        {exhibition.name}
      </Title>
    </View>
  );
  
};

/**
 *@ignore
 */
const InfoSponsor = ({ url }) => {
  return (
    <View style={styles.viewSponsor}>
      <Title
        style={{
          color: 'black',
          fontSize: 17,
          fontWeight: 'bold',
          marginHorizontal: 30,
          marginTop: 5,
        }}>
        Patrocina:{' '}
      </Title>
      <Image source={{ uri: url }} style={styles.imgSponsor} />
    </View>
  );
};

/**
 *@ignore
 */
const InfoFooter = ({ exhibition }) => {
  const {
    minimumAge,
    maximumAge,
    educationArea,
    duration,
    capacity,
  } = exhibition;
  return (
    <View style={styles.viewFooter}>
      <FooterItem
        title="Educación:"
        desc={educationArea}
        icon="book-open-variant"
      />
      <FooterItem
        title="Edades:"
        desc={`${minimumAge} a ${maximumAge} años`}
        icon="human-male-boy"
      />
      <FooterItem
        title="Duración:"
        desc={duration == 1 ? `${duration} minuto` : `${duration} minutos`}
        icon="clock-time-three-outline"
      />
      <FooterItem
        title="Capacidad:"
        desc={capacity == 1 ? `${capacity} niño` : `${capacity} niños`}
        icon="account-group"
      />
    </View>
  );
};

/**
 *@ignore
 */
const FooterItem = ({ title, desc, icon }) => {
  return (
    <View>
      <IconButton
        icon={icon}
        size={30}
        color="#F87311"
        style={styles.footerItem}
      />
      <Text style={[styles.textItem, { fontWeight: 'bold' }]}>{title}</Text>
      {Array.isArray(desc) ? (
        map(desc, (d, index) => (
          <Text key={index} style={styles.textItem}>
            {d}
            {index !== size(desc) - 1 && ', '}
          </Text>
        ))
      ) : (
        <Text style={styles.textItem}>{desc}</Text>
      )}
    </View>
  );
};

/**
 *@ignore
 */
const styles = StyleSheet.create({
  viewPoster: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  poster: {
    width: '100%',
    height: 500,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  info: {
    backgroundColor: '#fff',
    marginTop: -40,
    marginRight: 30,
    width: 60,
    height: 60,
    borderRadius: 100,
    borderColor: '#000',
    borderWidth: 0.15,
  },
  viewInfo: {
    marginHorizontal: 30,
  },
  viewRating: {
    marginHorizontal: 30,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewModal: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  viewFooter: {
    marginVertical: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerItem: {
    borderRadius: 100,
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderColor: '#F87311',
    borderWidth: 2,
  },
  textItem: {
    fontFamily: 'NunitoSans-Bold',
    textAlign: 'center',
    fontSize: 13,
    color: '#000',
  },
  overview: {
    fontFamily: 'NunitoSans-Bold',
    marginHorizontal: 30,
    marginTop: 20,
    textAlign: 'justify',
    color: '#929292',
    fontSize: 16,
  },
  imgSponsor: {
    width: 120,
    height: 60,
    alignSelf: 'center',
    marginTop: 4,
    marginBottom: 2,
  },
  wrapDot: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dotActivate: {
    margin: 3,
    color: 'black',
  },
  dot: {
    margin: 3,
    color: 'white',
  },
});
