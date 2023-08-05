import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { supabase } from "../supabaseClient.js";

const SearchButton = ({ name,placeholder, table, column, storage, onSearchResults,categoryId }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = async () => {
    try {
      if (!searchText) {
        if(name==="Spor Tesisi"){
        // Empty search text, fetch all data and pass to the parent component
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .eq('sports_category_id', categoryId);
  
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
        else{
            const { data, error } = await supabase
            .from(table)
            .select('*')
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
        else{
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
      <MaterialCommunityIcons name="microphone-outline" size={24} color="#AAAAAA" style={{ right: 20 }} />
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
