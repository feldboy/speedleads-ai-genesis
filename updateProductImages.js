// updateProductImages.js
// Purpose: Updates existing products in the database that lack image URLs.
// Usage: node lush-green-web/updateProductImages.js
// Requires: npm install mongodb (should already be installed)

import { MongoClient, ObjectId } from 'mongodb';

// Connection URI - Taken from the MCP server configuration/populateDb.js
const uri = "mongodb+srv://titigimad1:sZ1wPPxHTwQiRUgb@cluster012.3bz1pxp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster012";
const client = new MongoClient(uri);

// Placeholder URL used in populateDb.js
const placeholderImageUrl = 'https://via.placeholder.com/300x200?text=Plant+Image';

// Image URLs provided by the user
const newImageUrls = [
  "https://4kwallpapers.com/images/walls/thumbs_2t/6885.jpg",
  "https://4kwallpapers.com/images/walls/thumbs_2t/8446.jpg",
  "https://4kwallpapers.com/images/walls/thumbs_2t/3559.jpg",
  "https://4kwallpapers.com/images/walls/thumbs_2t/2445.jpg",
  "https://4kwallpapers.com/images/walls/thumbs_2t/4736.jpg"
];

async function runUpdate() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected successfully to MongoDB server for update.");

    // Establish connection and get database/collection
    const db = client.db(); // Use default DB from connection string
    const productsCollection = db.collection('products');
    console.log(`Using database: ${db.databaseName}, collection: products`);

    // Find products where imageUrls contains only the placeholder
    // We limit the find to the number of URLs we have to assign
    console.log(`Finding up to ${newImageUrls.length} products with only placeholder images...`);
    const productsToUpdate = await productsCollection.find(
      {
        imageUrls: { $size: 1, $eq: [placeholderImageUrl] } // Find where imageUrls is an array of size 1 containing only the placeholder
      },
      { projection: { _id: 1 } } // Only fetch the ID
    ).limit(newImageUrls.length).toArray();

    if (productsToUpdate.length === 0) {
      console.log("No products found with only placeholder images to update.");
      return;
    }

    console.log(`Found ${productsToUpdate.length} products to update. Starting update...`);

    // Update each product with a unique URL from the list
    const updatePromises = productsToUpdate.map((product, index) => {
      const imageUrlToAdd = newImageUrls[index];
      console.log(`Updating product ${product._id} with image: ${imageUrlToAdd}`);
      return productsCollection.updateOne(
        { _id: product._id }, // Filter by ID
        { $set: { imageUrls: [imageUrlToAdd] } } // Set the imageUrls array
      );
    });

    // Wait for all updates to complete
    const updateResults = await Promise.all(updatePromises);

    let successfulUpdates = 0;
    for (const result of updateResults) {
      if (result.modifiedCount === 1) {
        successfulUpdates++;
      }
    }

    console.log(`Successfully updated ${successfulUpdates} out of ${productsToUpdate.length} products found.`);

  } catch (err) {
    console.error("An error occurred during the product image update:", err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("MongoDB connection closed after update.");
  }
}

runUpdate().catch(console.dir);
