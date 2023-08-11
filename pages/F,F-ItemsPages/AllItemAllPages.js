import React,{useEffect,useState}from 'react';
import { SafeAreaView, StyleSheet, SectionList,View,Text } from 'react-native';
import Header from '../../components/header';
import AddresesTopInfo from '../../components/addresesTopInfo';
import InformationText from '../../components/informationtext';
import BackButton from '../../components/backbutton';
import SearchButton from '../../components/searchbutton';
import SportTitle from '../../components/sportptTitle';
import ItemList from './AllItemPageslist';
import { supabase } from "../../supabaseClient.js";
const ItemAllPage = ({ route }) => {
  const { category } = route.params;
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  


  const handleSearchResults = async (results) => {
    setSearchResults(results);
    setItems(results|| []);
  };


  useEffect(() => {
    if (searchResults.length === 0) {
    if (category === "Spor Salonları") {
      const fetchData = async () => {
        try {
          const { data, error } = await supabase
            .from('fitness_centers')
            .select('*')
            .eq( 'city', cities)
            .eq('district', districts);
          if (error) {
            console.error(error);
          } else {
            setTitle(category);
            const updatedData = await Promise.all(data.map(async (item) => {
              if (item.image_url) {
                const { data: imageData, error: imageError } = await supabase.storage
                  .from('fitnesscenterimage')
                  .getPublicUrl(item.image_url);
  
                if (imageError) {
                  console.error('Resim alınamadı:', imageError.message);
                } else {
                  if (imageData) {
                    item.imageData = imageData; // imageData verisini tesis verisine ekleyin
                  }
                }
              }
              return item;
            }));
  
            setItems(updatedData);
          }
        } catch (error) {
          console.error("catch",error);
        }
      };
    fetchData(); 
  }
  else {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('sports_facilities')
          .select('*')
          .eq('sports_category_id', category.id)
          .eq( 'city', cities)
          .eq('district', districts);
        if (error) {
          console.error(error);
        } else {
          setTitle(category.name);
          const updatedData = await Promise.all(data.map(async (item) => {
            if (item.image_url) {
              const { data: imageData, error: imageError } = await supabase.storage
                .from('sportsfacilityimage')
                .getPublicUrl(item.image_url);

              if (imageError) {
                console.error('Resim alınamadı:', imageError.message);
              } else {
                if (imageData) {
                  item.imageData = imageData; // imageData verisini tesis verisine ekleyin
                }
              }
            }
            return item;
          }));

          setItems(updatedData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

  }}},
 [searchResults,cities,districts]);


  const sections = [ 
    { title: `Tüm ${title}`, data: items },
  ];

  return (
    <SafeAreaView style={styles.container}>
       <Header title={title} />
      <BackButton left={15} top={43} />
      <View>
      <SectionList
    sections={sections}
    renderItem={({ item }) => {
        if (cities.length > 0 && districts.length > 0) {
            return <ItemList items={[item]} title={title}/>
          } 
        else {
            return null;
        }
    }}
    renderSectionHeader={({ section }) => (
      <>
      <AddresesTopInfo city={setCities} district={setDistricts} />
      <InformationText text={`Şehrinizdeki ${title} listelenmektedir. Adresinize yakın ${title} görmek için lütfen adresinizi giriniz.`} />
      {cities.length > 0 && districts.length > 0 && (
          <>
              {items.length > 0 ? (
                  <View>
                      {category === "Spor Salonları" ? (
                          <SearchButton
                              name={"Fitness Salonu"}
                              placeholder={title + " Ara"}
                              table={"fitness_centers"}
                              column={"name"}
                              city={cities}
                              district={districts}
                              storage={"fitnesscenterimage"}
                              onSearchResults={handleSearchResults}
                          />
                      ) : (
                          <SearchButton
                              name={"Spor Tesisi"}
                              placeholder={title + " Ara"}
                              table={"sports_facilities"}
                              column={"name"}
                              city={cities}
                              district={districts}
                              storage={"sportsfacilityimage"}
                              onSearchResults={handleSearchResults}
                              categoryId={category.id}
                          />
                      )}
                      <SportTitle title={`Tüm ${title}`} />
                  </View>
              ) : (
                  <Text style={styles.noItem}> Seçtiğiniz şehirde {title} bulunmamaktadır.</Text>
              )}
          </>
      )}
  </>
  
    )}
    keyExtractor={(item, index) => index.toString()}
    style={styles.sectionList}
    showsVerticalScrollIndicator={false}
/>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292929',
    
  },
  sectionList: {
    marginBottom: 60,
  },
  noItem: {
    fontSize: 16,
    fontWeight: '700',
    color: "#AAAAAA",
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: "50%",
    marginBottom: "50%",
  },
});

export default ItemAllPage;
