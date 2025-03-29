import { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import FormContato from '../../components/FormContato';
import api from '../../lib/api';
import { global } from '../../styles/global';

export default function EditarContato() {
  const { id } = useLocalSearchParams();
  const [contato, setContato] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    api.get(`/contatos/${id}`).then(({ data }) => setContato(data));
  }, []);

  const atualizar = async (dados: any) => {
    await api.put(`/contatos/${id}`, dados);
    router.back();
  };

  if (!contato) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <View style={global.container}>
      <FormContato valores={contato} onSubmit={atualizar} />
    </View>
  );
}
