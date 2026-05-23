import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

const workflows = [
  'Super Admin controls all admins, public publishing, page toggles, API tokens, and media protection.',
  'Admin can approve provincial CRUD and publish only when the Super Admin grants direct publishing.',
  'Provincial Admin updates assigned provincial pages, with executive details locked and review required.',
  'Secretary drafts articles and uploads media for Admin or Super Admin approval.',
];

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.kicker}>CBMC Mobile</Text>
          <Text style={styles.title}>Admin and public app shell</Text>
          <Text style={styles.copy}>
            Prepared for the same CMS, approvals, analytics, media, and API workflows as the web app.
          </Text>
        </View>

        <View style={styles.grid}>
          {['Home', 'Media', 'Analytics', 'Admin'].map((item) => (
            <View key={item} style={styles.tile}>
              <Text style={styles.tileText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Role workflow</Text>
          {workflows.map((item) => (
            <Text key={item} style={styles.workflow}>
              {item}
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f3f16',
  },
  container: {
    padding: 20,
    gap: 18,
    backgroundColor: '#f4f7f2',
  },
  hero: {
    backgroundColor: '#1a8000',
    borderRadius: 8,
    padding: 22,
  },
  kicker: {
    color: '#dff4dd',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  title: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 10,
  },
  copy: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 23,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tile: {
    width: '47%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 18,
    borderWidth: 1,
    borderColor: '#d8e3d5',
  },
  tileText: {
    color: '#000000',
    fontSize: 17,
    fontWeight: '700',
  },
  panel: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 18,
    borderWidth: 1,
    borderColor: '#d8e3d5',
  },
  panelTitle: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 12,
  },
  workflow: {
    color: '#4b5563',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 10,
  },
});
