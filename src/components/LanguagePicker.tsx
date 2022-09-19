import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textTitle: {
    fontSize: 20,
  },
  textValue: {
    fontSize: 14,
  },
  item: {
    margin: 15,
  },
});

const LanguagePicker = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {i18n, t} = useTranslation();
  const {colors} = useTheme();

  const languages = [
    {name: 'en-US', label: 'English (United States)'},
    {name: 'es', label: 'Español'},
  ];

  const LanguageItem = ({name, label}: {name: string; label: string}) => (
    <Pressable
      onPress={() => {
        i18n.changeLanguage(name);
        setModalVisible(!modalVisible);
      }}>
      <Text style={{...styles.textTitle, color: colors.textDefault}}>
        {label}
      </Text>
    </Pressable>
  );

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={() => {
            setModalVisible(!modalVisible);
          }}
          style={styles.centeredView}>
          <View style={styles.modalView}>
            {languages.map(lang => (
              <View key={lang.name} style={styles.item}>
                <LanguageItem {...lang} />
              </View>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>
        <Text style={{...styles.textTitle, color: colors.text}}>
          {t('screen.settings.language.title')}
        </Text>
        <Text style={{...styles.textValue, color: colors.text}}>
          {t(`screen.settings.language.${i18n.language}`)}
        </Text>
      </Pressable>
    </View>
  );
};

export default LanguagePicker;
