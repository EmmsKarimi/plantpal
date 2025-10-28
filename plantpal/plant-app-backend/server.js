app.get('/api/plants', async (req, res) => {
    try {
      const perPage = req.query.perPage || 10;
  
      // Fetch basic list
      const response = await axios.get(`${BASE_URL}/plants`, {
        params: { token: TREFLE_API_KEY, per_page: perPage },
      });
  
      const plants = await Promise.all(
        response.data.data.map(async (plant) => {
          let description = 'No description available';
  
          try {
            const detailResp = await axios.get(`${BASE_URL}/plants/${plant.id}`, {
              params: { token: TREFLE_API_KEY },
            });
            const detail = detailResp.data.data;
  
            // Try multiple fields for description
            if (detail.main_species?.growth?.description) {
              description = detail.main_species.growth.description;
            } else if (detail.main_species?.specifications?.description) {
              description = detail.main_species.specifications.description;
            } else if (detail.common_name) {
              description = `Commonly known as ${detail.common_name}`;
            } else if (detail.scientific_name) {
              description = `Scientific name: ${detail.scientific_name}`;
            }
          } catch (err) {
            console.log(`Failed to fetch details for plant ${plant.id}: ${err.message}`);
          }
  
          return {
            id: plant.id,
            common_name: plant.common_name || 'Unknown Plant',
            scientific_name: plant.scientific_name || 'Unknown',
            image_url: plant.image_url || 'https://via.placeholder.com/400x300?text=No+Image',
            description,
            watering: 'Refer to care guide',
            sunlight: 'Refer to care guide',
            soil: 'Refer to care guide',
            temperature: 'Refer to care guide',
            humidity: 'Refer to care guide',
            difficulty: 'Moderate',
            family_common_name: plant.family_common_name || 'Unknown',
          };
        })
      );
  
      res.json(plants);
    } catch (err) {
      console.error('Error fetching plants from Trefle:', err.message);
      res.status(500).json({ error: 'Failed to fetch plants' });
    }
  });
  