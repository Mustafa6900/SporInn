import React, { useState } from 'react';
import { View, StyleSheet, TextInput,TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { supabase } from "../supabaseClient.js";
import { PermissionsAndroid } from 'react-native';




const SearchButton = ({ name, placeholder, table, column, storage, onSearchResults, categoryId, selectedCategory, city, district}) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = async () => {
    try {
      if (!searchText) {
        if(name==="Spor Tesisi"){
        // Empty search text, fetch all data and pass to the parent component
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .eq('sports_category_id', categoryId)
          .eq('city', city)
          .eq('district', district);
  
        if (error) {
          console.error(error);
        } else {
          // If the storage name is provided, fetch and attach the imageData to each item
          if (storage) {
            const updatedData = await Promise.all(data.map(async (item) => {
              if (item.image_url) {
                const { data: imageData, error: imageError } = await supabase.storage
                  .from(storage)
                  .getPublicUrl(item.image_url);
  
                if (imageError) {
                  console.error('Resim alınamadı:', imageError.message);
                } else {
                  if (imageData) {
                    item.imageData = imageData;
                  }
                }
              }
              return item;
            }));
  
            onSearchResults(updatedData);
          } else {
            // If no storage name is provided, simply pass the search results to the parent component
            onSearchResults(data);
          }
        }
      }
      else if(name==="Ürün"){
        if(selectedCategory.id==0){
        const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('main_category_id', categoryId)
        .eq('categoryid', selectedCategory.id);

        if (error) {
            console.error(error);
          }  else {
            // If the storage name is provided, fetch and attach the imageData to each item
            if (storage) {
              const updatedData = await Promise.all(data.map(async (item) => {
                if (item.image_url) {
                  const { data: imageData, error: imageError } = await supabase.storage
                    .from(storage)
                    .getPublicUrl(item.image_url);
    
                  if (imageError) {
                    console.error('Resim alınamadı:', imageError.message);
                  } else {
                    if (imageData) {
                      item.imageData = imageData;
                    }
                  }
                }
                return item;
              }));
    
              onSearchResults(updatedData);
            } else {
              // If no storage name is provided, simply pass the search results to the parent component
              onSearchResults(data);
            }
          }
        }
      }
      else if(name==="Challenge"){
        const { data, error } = await supabase
        .from(table)
        .select("*")
        
        if (error) {
            console.error(error);
          }
          else{
            if(storage)
            {
              const updatedData = await Promise.all(data.map(async (item) => {
                if (item.image_url) {
                  const { data: imageData, error: imageError } = await supabase.storage
                    .from(storage)
                    .getPublicUrl(item.image_url);
    
                  if (imageError) {
                    console.error('Resim alınamadı:', imageError.message);
                  } else {
                    if (imageData) {
                      item.imageData = imageData;
                    }
                  }
                }
                return item;
              }));
    
              onSearchResults(updatedData);
            }
          }
      }
        else{
            const { data, error } = await supabase
            .from(table)
            .select('*')
            .eq('city', city)
            .eq('district', district);
            if (error) {
                console.error(error);
              } else {
                // If the storage name is provided, fetch and attach the imageData to each item
                if (storage) {
                  const updatedData = await Promise.all(data.map(async (item) => {
                    if (item.image_url) {
                      const { data: imageData, error: imageError } = await supabase.storage
                        .from(storage)
                        .getPublicUrl(item.image_url);
        
                      if (imageError) {
                        console.error('Resim alınamadı:', imageError.message);
                      } else {
                        if (imageData) {
                          item.imageData = imageData;
                        }
                      }
                    }
                    return item;
                  }));
        
                  onSearchResults(updatedData);
                } else {
                  // If no storage name is provided, simply pass the search results to the parent component
                  onSearchResults(data);
                }
              }
        }
            
    } else {
        if(name==="Spor Tesisi"){
        // Non-empty search text, perform the search as usual
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .eq('sports_category_id', categoryId)
          .eq('city', city)
          .eq('district', district)
          .ilike(column, `%${searchText}%`);
  
        if (error) {
          console.error(error);
        } else {
          // If the storage name is provided, fetch and attach the imageData to each item
          if (storage) {
            const updatedData = await Promise.all(data.map(async (item) => {
              if (item.image_url) {
                const { data: imageData, error: imageError } = await supabase.storage
                  .from(storage)
                  .getPublicUrl(item.image_url);
  
                if (imageError) {
                  console.error('Resim alınamadı:', imageError.message);
                } else {
                  if (imageData) {
                    item.imageData = imageData;
                  }
                }
              }
              return item;
            }));
  
            onSearchResults(updatedData);
          } else {
            // If no storage name is provided, simply pass the search results to the parent component
            onSearchResults(data);
          }
        }
  
        // Check if the search results are empty
        if (data.length === 0) {
          // If the search results are empty, show an alert message
          alert(`${name} bulunamadı.`);
        }
      }
        else if(name==="Ürün"){
         // Non-empty search text, perform the search as usual
         if(selectedCategory.id!==0){
         const { data, error } = await supabase
         .from(table)
         .select('*')
         .eq('main_category_id', categoryId)
         .eq('categoryid', selectedCategory.id)
         .ilike(column, `%${searchText}%`);
         
       if (error) {
         console.error(error);
       } else {
         // If the storage name is provided, fetch and attach the imageData to each item
         if (storage) {
           const updatedData = await Promise.all(data.map(async (item) => {
             if (item.image_url) {
               const { data: imageData, error: imageError } = await supabase.storage
                 .from(storage)
                 .getPublicUrl(item.image_url);
 
               if (imageError) {
                 console.error('Resim alınamadı:', imageError.message);
               } else {
                 if (imageData) {
                   item.imageData = imageData;
                 }
               }
             }
             return item;
           }));
 
           onSearchResults(updatedData);
         } else {
           // If no storage name is provided, simply pass the search results to the parent component
           onSearchResults(data);
         }
       }
       if (data.length === 0) {
        // If the search results are empty, show an alert message
        alert(`${name} bulunamadı.`);
      }
    }
       else{
        const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('main_category_id', categoryId)
        .ilike(column, `%${searchText}%`);

        if (error) {
            console.error(error);
          } else {
            // If the storage name is provided, fetch and attach the imageData to each item
            if (storage) {
              const updatedData = await Promise.all(data.map(async (item) => {
                if (item.image_url) {
                  const { data: imageData, error: imageError } = await supabase.storage
                    .from(storage)
                    .getPublicUrl(item.image_url);
    
                  if (imageError) {
                    console.error('Resim alınamadı:', imageError.message);
                  } else {
                    if (imageData) {
                      item.imageData = imageData;
                    }
                  }
                }
                return item;
              }));
    
              onSearchResults(updatedData);
            } else {
              // If no storage name is provided, simply pass the search results to the parent component
              onSearchResults(data);
            }
          }
          if (data.length === 0) {
            // If the search results are empty, show an alert message
            alert(`${name} bulunamadı.`);
          }
    }
 
        }
        else if(name==="Challenge"){
            const { data, error } = await supabase
            .from(table)
            .select('*')
            .ilike(column, `%${searchText}%`);

            if (error) {
                console.error(error);
              } else {
                // If the storage name is provided, fetch and attach the imageData to each item
                if (storage) {
                  const updatedData = await Promise.all(data.map(async (item) => {
                    if (item.image_url) {
                      const { data: imageData, error: imageError } = await supabase.storage
                        .from(storage)
                        .getPublicUrl(item.image_url);

                      if (imageError) {
                        console.error('Resim alınamadı:', imageError.message);
                      } else {
                        if (imageData) {
                          item.imageData = imageData;
                        }
                      }
                    }
                    return item;
                  }));
                  
                  onSearchResults(updatedData);
                } else {
                  // If no storage name is provided, simply pass the search results to the parent component
                  onSearchResults(data);
                }
              }
              if (data.length === 0) {
                // If the search results are empty, show an alert message
                alert(`${name} bulunamadı.`);
              }
        }

        else{
            const { data, error } = await supabase
            .from(table)
            .select('*')
            .eq('city', city)
            .eq('district', district)
            .ilike(column, `%${searchText}%`);
    
          if (error) {
            console.error(error);
          } else {
            // If the storage name is provided, fetch and attach the imageData to each item
            if (storage) {
              const updatedData = await Promise.all(data.map(async (item) => {
                if (item.image_url) {
                  const { data: imageData, error: imageError } = await supabase.storage
                    .from(storage)
                    .getPublicUrl(item.image_url);
    
                  if (imageError) {
                    console.error('Resim alınamadı:', imageError.message);
                  } else {
                    if (imageData) {
                      item.imageData = imageData;
                    }
                  }
                }
                return item;
              }));
    
              onSearchResults(updatedData);
            } else {
              // If no storage name is provided, simply pass the search results to the parent component
              onSearchResults(data);
            }
          }
    
          // Check if the search results are empty
          if (data.length === 0) {
            // If the search results are empty, show an alert message
            alert(`${name} bulunamadı.`);
          }
        }
    }}
     catch (error) {
      console.error(error);
    }
  };

  const requestMicrophonePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Mikrofon İzni',
          message: 'Uygulamamızın mikrofonunu kullanmak için izin vermelisiniz.',
          buttonNeutral: 'Daha Sonra Sor',
          buttonNegative: 'İptal',
          buttonPositive: 'İzin Ver',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Mikrofon izni verildi.');
        // Mikrofon izni verildiğinde konuşma tanıma işlemini başlatabilirsiniz.
      } else {
        console.log('Mikrofon izni reddedildi.');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  
  

  return (
    <View style={styles.textinputcontainer}>
      <MaterialCommunityIcons name="magnify" size={24} color="#FF6F25" style={{ marginLeft: 20 }} />
      <TextInput
        style={{ height: 50, width: "80%", color: 'white', fontSize: 20, marginLeft: 15 }}
        placeholder={placeholder}
        placeholderTextColor="#AAAAAA"
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={false}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearch}
        value={searchText}
      />
            <TouchableOpacity onPress={requestMicrophonePermission} style={{right:20}}>
  <MaterialCommunityIcons name="microphone-outline" size={24} color="#AAAAAA" />
  </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textinputcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D0D0D',
    height: 50,
    width: "90%",
    marginTop: 30,
    left: 20,
    borderRadius: 7,
  },
});

export default SearchButton;
