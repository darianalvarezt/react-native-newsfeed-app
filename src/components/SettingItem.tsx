import React from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 20,
  },
});

export default (props: {
  text: string;
  enabled: boolean;
  onValueChange: () => void;
}) => {
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <Text style={{...styles.text, color: colors.text}}>{props.text}</Text>
      <Switch
        trackColor={{
          false: colors.trackColor,
          true: colors.trackColor,
        }}
        thumbColor={
          props.enabled ? colors.thumbColorEnabled : colors.thumbColor
        }
        ios_backgroundColor={colors.switchIosBackgroundColor}
        onValueChange={props.onValueChange}
        value={props.enabled}
      />
    </View>
  );
};
