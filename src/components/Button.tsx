import {FC} from 'react';
import {
  TouchableOpacity,
  Text,
  TextProps,
  TouchableOpacityProps,
} from 'react-native';

interface Props extends TouchableOpacityProps {
  title: string;
  textProps?: TextProps;
}

const Button: FC<Props> = ({title, ...otherProps}) => {
  return (
    <TouchableOpacity {...otherProps}>
      <Text {...otherProps.textProps}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
