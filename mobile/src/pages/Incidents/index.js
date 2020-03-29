import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';

import api from '../../services/api'

import styles from './styles';
import logoImg from '../../assets/logo.png'

export default function Incidents() {
    const navigation = useNavigation();
    const [incidents, setIncidents] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    function navigateToDetail(incident) {
        navigation.navigate('Detail', {
            incident
        })
    }
    async function loadIncidents() {
        if (loading) {
            return;
        }
        if (total > 0 && incidents.length === total) {
            return;
        }
        setLoading(true)

        const response = await api.get(`incidents`, {
            params: { page }
        })
        setIncidents([...incidents, ...response.data])
        setTotal(response.headers['x-total-count'])
        setPage(page + 1)
        setLoading(false)

    }
    useEffect(() => {
        loadIncidents();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total of <Text style={styles.headerTextBold}>{total} cases</Text>
                </Text>
            </View>

            <Text style={styles.title}>Welcome</Text>
            <Text>Choose one of the cases below and save the day</Text>


            <FlatList
                data={incidents} 
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={true}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>Ong:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASE:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALUE:</Text>
                        <Text style={styles.incidentValue}>{
                            Intl.NumberFormat('pt-BR', {
                                style: 'currency', 
                                currency: 'BRL'
                            }).format(incident.value)}
                        </Text>

                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={styles.detailsButtonText}>View more</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}
