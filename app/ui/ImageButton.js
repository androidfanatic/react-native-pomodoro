import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

const ImageButton = ({name, onClick}) => (
    <Icon 
        name={name}
        onPress={onClick}
        style={{color: '#ddd', fontSize: 24 }}
    />
);

ImageButton.propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default ImageButton;