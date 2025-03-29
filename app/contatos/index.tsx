import { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import api from '../../lib/api';
import { global } from '../../styles/global';
import { Contato } from '../../types/Contato';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export default function ListaContatos() {
  const [contatos, setContatos] = useState<Contato[]>([]);
  const router = useRouter();

  const carregar = async () => {
    try {
      const { data } = await api.get('/contatos');
      setContatos(data);
    } catch (err) {
      Alert.alert('Erro ao carregar contatos');
    }
  };

  const excluir = async (id: string) => {
    try {
      await api.delete(`/contatos/${id}`);
      carregar();
    } catch {
      Alert.alert('Erro ao excluir');
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregar(); // sua função para carregar dados
    }, [])
  );

  return (
    <View style={global.container}>
      <Button title="Novo contato" onPress={() => router.push('/contatos/novo')} />
      <FlatList
        data={contatos}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/contatos/${item._id}`)}>
            <Text>{item.nome}</Text>
            <Text>{item.telefone}</Text>
            {item.foto && (
              <Image
                source={{ uri: `https://api-cont-auth-cdg7.onrender.com/uploads/${item.foto}` }}
                style={{ width: 100, height: 100 }}
              />
            )}
            <Button title="Excluir" onPress={() => excluir(item._id)} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
