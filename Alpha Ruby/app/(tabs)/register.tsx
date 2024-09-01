import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import RegisterForm from '../../components/RegisterForm';  // Ajusta esta ruta según la estructura de tu proyecto

const RegisterScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}></Text>
            <RegisterForm />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,             // Asegura que el contenido ocupe toda la pantalla
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#3D3D3D',  // Fondo gris oscuro
    },
    title: {
        fontSize: 32,           // Aumentado para mayor visibilidad
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',       // Color del texto blanco
    },
});

export default RegisterScreen;
