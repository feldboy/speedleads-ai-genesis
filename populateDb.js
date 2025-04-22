// populateDb.js
// Purpose: Populates the MongoDB database with initial mock data for products and blog posts.
// Usage: node populateDb.js
// Requires: npm install mongodb

import { MongoClient } from 'mongodb';

// Connection URI - Taken from the MCP server configuration
const uri = "mongodb+srv://titigimad1:sZ1wPPxHTwQiRUgb@cluster012.3bz1pxp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster012";
const client = new MongoClient(uri);

// --- Updated Mock Data ---
const placeholderImageUrl = 'https://via.placeholder.com/300x200?text=Plant+Image';

// Mock data (copied from lush-green-web/src/api/products.ts)
// Added isFeatured and using provided/placeholder imageUrls
const mockProducts = [
  { _id: "1", name: "ספטיפיליום", category: "indoor_plants", price: 65, imageUrls: ["https://4kwallpapers.com/images/walls/thumbs_3t/13881.jpg"], description: "צמח מטהר אוויר פופולרי ונוח לגידול, עם פריחה לבנה אלגנטית.", inStock: true, difficulty: "easy", sunlight: "partial", waterNeeds: "medium", isFeatured: true }, // Featured + User URL 1
  { _id: "2", name: "פוטוס", category: "indoor_plants", price: 45, imageUrls: ["https://4kwallpapers.com/images/walls/thumbs_3t/2434.jpg"], description: "צמח מטפס קל לגידול, מושלם למדפים ולמקומות גבוהים.", inStock: true, difficulty: "easy", sunlight: "partial", waterNeeds: "low", isFeatured: true }, // Featured + User URL 2
  { _id: "3", name: "פלרגוניום", category: "outdoor_plants", price: 35, imageUrls: ["https://4kwallpapers.com/images/walls/thumbs_2t/4736.jpg"], description: "צמח רב-שנתי עם פריחה מרהיבה בגוונים של אדום, ורוד ולבן.", inStock: false, difficulty: "medium", sunlight: "full", waterNeeds: "medium", isFeatured: false }, // User URL 3
  { _id: "4", name: "לוונדר", category: "outdoor_plants", price: 30, imageUrls: ["https://4kwallpapers.com/images/walls/thumbs_2t/6078.jpg"], description: "שיח תבליני עם ריח מרגיע, פורח בקיץ ועמיד ליובש.", inStock: true, difficulty: "easy", sunlight: "full", waterNeeds: "low", isFeatured: true }, // Featured + User URL 4
  { _id: "5", name: "בזיליקום", category: "herbs_vegetables", price: 15, imageUrls: ["https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80"], description: "תבלין פופולרי וקל לגידול, עם טעם מתוק וריח ארומטי.", inStock: true, difficulty: "easy", sunlight: "full", waterNeeds: "medium", isFeatured: false },
  { _id: "9", name: "תערובת שתילה מקצועית", category: "soil_fertilizers", price: 40, imageUrls: ["https://images.unsplash.com/photo-1605256768461-15eb46b1af9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80"], description: "תערובת אדמה איכותית לשתילת צמחי בית וגינה, שק 20 ליטר.", inStock: true, isFeatured: false },
  { _id: "10", name: "דשן אורגני לגינה", category: "soil_fertilizers", price: 35, imageUrls: [placeholderImageUrl], description: "דשן טבעי להזנת כל סוגי הצמחים, בטוח לשימוש ליד ילדים וחיות.", inStock: true, isFeatured: true }, // Featured + Placeholder Image
].map(p => ({ // Ensure all products have at least one image URL (original, provided, or placeholder)
  ...p,
  imageUrls: (p.imageUrls && p.imageUrls.length > 0 && p.imageUrls[0]) ? p.imageUrls : [placeholderImageUrl]
}));


// Mock data (copied from lush-green-web/src/entities/BlogPost.ts)
// Ensure blog posts also have image URLs if needed by frontend components
const mockBlogPosts = [
  { id: 'post_1', title: '5 צמחי בית קלים לגידול שיוסיפו ירוק לחיים', summary: 'רוצים להוסיף קצת טבע הביתה אבל חוששים מהתחייבות? גלו חמישה צמחים עמידים וקלים לטיפול שכל אחד יכול לגדל בהצלחה.', author: 'צוות המשתלה', publishDate: '2025-04-10', imageUrl: 'https://images.unsplash.com/photo-1596713048494-0cf0158a9641?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60', featured: true, link: '/blog/easy-houseplants' },
  { id: 'post_2', title: 'איך להכין את הגינה לקיץ הישראלי החם', summary: 'הקיץ הישראלי מאתגר, אבל עם הכנה נכונה הגינה שלכם יכולה לשגשג. טיפים לבחירת צמחים עמידים, השקיה חכמה והצללה.', author: 'אבי ישראלי', publishDate: '2025-04-01', imageUrl: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60', featured: true, link: '/blog/summer-prep' },
  { id: 'post_3', title: 'המדריך השלם לדישון אורגני', summary: 'רוצים גינה בריאה ושופעת ללא כימיקלים? למדו על סוגי דשנים אורגניים, מתי ואיך להשתמש בהם לקבלת תוצאות מיטביות.', author: 'צוות המשתלה', publishDate: '2025-03-15', imageUrl: 'https://images.unsplash.com/photo-1617179132971-a894b160c53f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60', featured: false, link: '/blog/organic-fertilizer' },
].map(p => ({ // Ensure all blog posts have an image URL
    ...p,
    imageUrl: p.imageUrl || placeholderImageUrl
}));

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected successfully to MongoDB server");


    // Establish and verify connection
    const db = client.db(); // Use default DB from connection string
    console.log(`Using database: ${db.databaseName}`);

    // Get collections
    const productsCollection = db.collection('products');
    const blogPostsCollection = db.collection('blog_posts');

    // --- Clear existing data before inserting new data ---
    console.log("Clearing existing data...");
    const productDeleteResult = await productsCollection.deleteMany({});
    console.log(`Deleted ${productDeleteResult.deletedCount} products.`);
    const blogDeleteResult = await blogPostsCollection.deleteMany({});
    console.log(`Deleted ${blogDeleteResult.deletedCount} blog posts.`);
    // --- End Clear Data ---

    // Insert products
    console.log(`Attempting to insert ${mockProducts.length} products...`);
    if (mockProducts.length > 0) {
        const productInsertResult = await productsCollection.insertMany(mockProducts, { ordered: false }); // ordered: false allows inserting valid docs even if some fail (e.g., duplicate _id)
        console.log(`${productInsertResult.insertedCount} products documents were inserted.`);
    } else {
        console.log("No products to insert.");
    }


    // Insert blog posts
    // Note: Inserting with 'id' field from mock data. MongoDB will add its own '_id'.
    console.log(`Attempting to insert ${mockBlogPosts.length} blog posts...`);
     if (mockBlogPosts.length > 0) {
        const blogPostInsertResult = await blogPostsCollection.insertMany(mockBlogPosts, { ordered: false });
        console.log(`${blogPostInsertResult.insertedCount} blog post documents were inserted.`);
     } else {
         console.log("No blog posts to insert.");
     }

  } catch (err) {
    console.error("An error occurred during database population:", err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("MongoDB connection closed.");
  }
}

run().catch(console.dir);
