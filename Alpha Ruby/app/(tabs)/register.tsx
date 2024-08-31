import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RegisterForm from '../../components/RegisterForm';  // Ajusta esta ruta según la estructura de tu proyecto

const RegisterScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Formulario de Registro</Text>
            <RegisterForm />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default RegisterScreen;